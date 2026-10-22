package com.hok_wiki.service.impl;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Locale;
import java.util.UUID;

import com.hok_wiki.config.AuthProperties;
import com.hok_wiki.constant.UserType;
import com.hok_wiki.domain.PasswordResetToken;
import com.hok_wiki.domain.UserAccount;
import com.hok_wiki.domain.UserToken;
import com.hok_wiki.dto.request.ChangePasswordRequest;
import com.hok_wiki.dto.request.ForgotPasswordRequest;
import com.hok_wiki.dto.request.LoginRequest;
import com.hok_wiki.dto.request.RefreshTokenRequest;
import com.hok_wiki.dto.request.RegisterRequest;
import com.hok_wiki.dto.request.ResetPasswordRequest;
import com.hok_wiki.dto.response.AccountView;
import com.hok_wiki.dto.response.AuthenticationResponse;
import com.hok_wiki.dto.response.MessageResponse;
import com.hok_wiki.exception.AuthErrorCodeEnum;
import com.hok_wiki.exception.BusinessException;
import com.hok_wiki.mapper.MapStructConverter;
import com.hok_wiki.repository.PasswordResetTokenRepository;
import com.hok_wiki.repository.UserAccountRepository;
import com.hok_wiki.repository.UserTokenRepository;
import com.hok_wiki.security.jwt.TokenProvider;
import com.hok_wiki.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

	private static final int MAX_FAILED_LOGIN_ATTEMPTS = 5;

	private static final long LOGIN_LOCK_SECONDS = 900;

	private final UserAccountRepository userAccountRepository;

	private final UserTokenRepository userTokenRepository;

	private final PasswordResetTokenRepository passwordResetTokenRepository;

	private final PasswordEncoder passwordEncoder;

	private final AuthenticationManager authenticationManager;

	private final TokenProvider tokenProvider;

	private final MapStructConverter mapStructConverter;

	private final AuthProperties properties;

	@Override
	@Transactional(readOnly = true)
	public AccountView getCurrentAccount(UUID accountId) {
		UserAccount account = userAccountRepository.findById(accountId)
				.filter(UserAccount::isEnabled)
				.orElseThrow(() -> new BusinessException(AuthErrorCodeEnum.INVALID_TOKEN));
		return mapStructConverter.toView(account);
	}

	@Override
	@Transactional
	public MessageResponse logout(UUID accountId, UUID tokenId) {
		if (tokenId == null) {
			throw new BusinessException(AuthErrorCodeEnum.INVALID_TOKEN);
		}
		userAccountRepository.findForUpdateById(accountId)
				.orElseThrow(() -> new BusinessException(AuthErrorCodeEnum.INVALID_TOKEN));
		UserToken token = userTokenRepository.findForUpdateByIdAndAccountId(tokenId, accountId)
				.orElseThrow(() -> new BusinessException(AuthErrorCodeEnum.INVALID_TOKEN));
		if (token.getRevokedAt() == null) {
			token.setRevokedAt(Instant.now());
		}
		return new MessageResponse("Logged out successfully");
	}

	@Override
	@Transactional
	public AccountView register(RegisterRequest request) {
		String email = normalizeIdentifier(request.email());
		String phoneNumber = request.phoneNumber() == null ? null : request.phoneNumber().strip();
		if (userAccountRepository.existsByEmail(email)
				|| (phoneNumber != null && userAccountRepository.existsByPhoneNumber(phoneNumber))) {
			throw new BusinessException(AuthErrorCodeEnum.ACCOUNT_ALREADY_EXISTS);
		}
		validatePassword(request.password());
		UserAccount account = new UserAccount();
		account.setFullName(request.fullName().strip());
		account.setEmail(email);
		account.setPhoneNumber(phoneNumber);
		account.setPasswordHash(passwordEncoder.encode(request.password()));
		account.setUserType(UserType.USER);
		account.setEnabled(true);
		account.setCreatedAt(Instant.now());
		return mapStructConverter.toView(userAccountRepository.saveAndFlush(account));
	}

	@Override
	@Transactional(noRollbackFor = AuthenticationException.class)
	public AuthenticationResponse login(LoginRequest request) {
		String identifier = normalizeIdentifier(request.username());
		UserAccount account = userAccountRepository.findForUpdateByIdentifier(identifier).orElse(null);
		Instant now = Instant.now();
		if (account != null && account.getLoginBlockedUntil() != null) {
			if (account.getLoginBlockedUntil().isAfter(now)) {
				throw new LockedException("Login is temporarily locked");
			}
			account.setLoginBlockedUntil(null);
			account.setFailedLoginAttempts(0);
		}
		try {
			if (request.password().getBytes(StandardCharsets.UTF_8).length > 72) {
				throw new BadCredentialsException("Invalid credentials");
			}
			authenticationManager.authenticate(
					UsernamePasswordAuthenticationToken.unauthenticated(identifier, request.password()));
		}
		catch (BadCredentialsException exception) {
			if (account != null) {
				int attempts = Math.min(account.getFailedLoginAttempts() + 1, MAX_FAILED_LOGIN_ATTEMPTS);
				account.setFailedLoginAttempts(attempts);
				if (attempts >= MAX_FAILED_LOGIN_ATTEMPTS) {
					account.setLoginBlockedUntil(now.plusSeconds(LOGIN_LOCK_SECONDS));
				}
				userAccountRepository.save(account);
			}
			throw exception;
		}
		if (account == null || !account.isEnabled()) {
			throw new BadCredentialsException("Invalid credentials");
		}
		account.setFailedLoginAttempts(0);
		account.setLoginBlockedUntil(null);
		return createSession(account, request.rememberMe());
	}

	@Override
	@Transactional
	public AuthenticationResponse refreshToken(RefreshTokenRequest request) {
		String hash = tokenProvider.hashToken(request.refreshToken());
		UUID accountId = userTokenRepository.findAccountIdByRefreshTokenHash(hash)
				.orElseThrow(() -> new BusinessException(AuthErrorCodeEnum.INVALID_TOKEN));
		UserAccount account = userAccountRepository.findForUpdateById(accountId)
				.orElseThrow(() -> new BusinessException(AuthErrorCodeEnum.INVALID_TOKEN));
		UserToken oldToken = userTokenRepository.findForUpdateByRefreshTokenHash(hash)
				.orElseThrow(() -> new BusinessException(AuthErrorCodeEnum.INVALID_TOKEN));
		Instant now = Instant.now();
		if (!account.isEnabled() || oldToken.getRevokedAt() != null
				|| !oldToken.getRefreshExpiresAt().isAfter(now)) {
			throw new BusinessException(AuthErrorCodeEnum.INVALID_TOKEN);
		}
		oldToken.setRevokedAt(now);
		return createSession(account, oldToken.isRememberMe());
	}

	@Override
	public MessageResponse forgotPassword(ForgotPasswordRequest request) {
		throw new BusinessException(AuthErrorCodeEnum.PASSWORD_RESET_UNAVAILABLE);
	}

	@Override
	@Transactional
	public MessageResponse resetPassword(ResetPasswordRequest request) {
		String hash = tokenProvider.hashToken(request.token());
		UUID accountId = passwordResetTokenRepository.findAccountIdByTokenHash(hash)
				.orElseThrow(() -> new BusinessException(AuthErrorCodeEnum.INVALID_RESET_TOKEN));
		UserAccount account = userAccountRepository.findForUpdateById(accountId)
				.orElseThrow(() -> new BusinessException(AuthErrorCodeEnum.INVALID_RESET_TOKEN));
		PasswordResetToken reset = passwordResetTokenRepository.findForUpdateByTokenHash(hash)
				.orElseThrow(() -> new BusinessException(AuthErrorCodeEnum.INVALID_RESET_TOKEN));
		Instant now = Instant.now();
		if (!account.isEnabled() || reset.getConsumedAt() != null || !reset.getExpiresAt().isAfter(now)) {
			throw new BusinessException(AuthErrorCodeEnum.INVALID_RESET_TOKEN);
		}
		replacePassword(account, request.newPassword(), now);
		reset.setConsumedAt(now);
		passwordResetTokenRepository.consumeAllByAccountId(account.getId(), now);
		return new MessageResponse("Password reset successfully. Please log in again");
	}

	@Override
	@Transactional
	public MessageResponse changePassword(UUID accountId, ChangePasswordRequest request) {
		UserAccount account = userAccountRepository.findForUpdateById(accountId)
				.orElseThrow(() -> new BusinessException(AuthErrorCodeEnum.INVALID_TOKEN));
		if (!account.isEnabled()) {
			throw new BusinessException(AuthErrorCodeEnum.INVALID_TOKEN);
		}
		if (!matchesPassword(request.currentPassword(), account.getPasswordHash())) {
			throw new BusinessException(AuthErrorCodeEnum.INVALID_CURRENT_PASSWORD);
		}
		Instant now = Instant.now();
		replacePassword(account, request.newPassword(), now);
		passwordResetTokenRepository.consumeAllByAccountId(account.getId(), now);
		return new MessageResponse("Password changed successfully. Please log in again");
	}

	private AuthenticationResponse createSession(UserAccount account, boolean rememberMe) {
		Instant now = Instant.now().truncatedTo(ChronoUnit.SECONDS);
		long refreshValidity = rememberMe ? properties.getRememberMeRefreshTokenValidityInSeconds()
				: properties.getRefreshTokenValidityInSeconds();
		String rawRefreshToken = tokenProvider.createOpaqueToken();
		UserToken token = new UserToken();
		token.setAccount(account);
		token.setRefreshTokenHash(tokenProvider.hashToken(rawRefreshToken));
		token.setCreatedAt(now);
		token.setAccessExpiresAt(now.plusSeconds(properties.getTokenValidityInSeconds()));
		token.setRefreshExpiresAt(now.plusSeconds(refreshValidity));
		token.setRememberMe(rememberMe);
		userTokenRepository.saveAndFlush(token);
		return new AuthenticationResponse(tokenProvider.createAccessToken(token), rawRefreshToken, "Bearer",
				token.getAccessExpiresAt(), token.getRefreshExpiresAt(), mapStructConverter.toView(account));
	}

	private void replacePassword(UserAccount account, String newPassword, Instant now) {
		validatePassword(newPassword);
		if (matchesPassword(newPassword, account.getPasswordHash())) {
			throw new BusinessException(AuthErrorCodeEnum.PASSWORD_REUSED);
		}
		account.setPasswordHash(passwordEncoder.encode(newPassword));
		account.setFailedLoginAttempts(0);
		account.setLoginBlockedUntil(null);
		userAccountRepository.save(account);
		userTokenRepository.revokeAllByAccountId(account.getId(), now);
	}

	private boolean matchesPassword(String rawPassword, String passwordHash) {
		return rawPassword.getBytes(StandardCharsets.UTF_8).length <= 72
				&& passwordEncoder.matches(rawPassword, passwordHash);
	}

	private void validatePassword(String password) {
		if (password.length() < 12 || password.length() > 72
				|| password.getBytes(StandardCharsets.UTF_8).length > 72) {
			throw new BusinessException(AuthErrorCodeEnum.INVALID_PASSWORD);
		}
	}

	private String normalizeIdentifier(String identifier) {
		return identifier.strip().toLowerCase(Locale.ROOT);
	}

}
