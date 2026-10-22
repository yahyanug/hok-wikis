package com.hok_wiki.service.impl;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.EnumSet;
import java.util.Locale;

import com.hok_wiki.constant.UserType;
import com.hok_wiki.domain.UserAccount;
import com.hok_wiki.dto.request.RegisterRequest;
import com.hok_wiki.repository.UserAccountRepository;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Profile({"admin-bootstrap", "local"})
@RequiredArgsConstructor
public class AdminBootstrapService {

	private final UserAccountRepository userAccountRepository;

	private final PasswordEncoder passwordEncoder;

	private final Validator validator;

	@Transactional
	public void bootstrap(String email, String password, String fullName) {
		userAccountRepository.lockForAdminBootstrap();
		if (userAccountRepository.existsByUserTypeIn(EnumSet.of(UserType.ADMIN, UserType.SUPER_USER))) {
			return;
		}

		String normalizedEmail = email == null ? null : email.strip().toLowerCase(Locale.ROOT);
		String normalizedName = fullName == null ? null : fullName.strip();
		RegisterRequest request = new RegisterRequest(normalizedName, normalizedEmail, null, password);
		if (password == null || !validator.validate(request).isEmpty()
				|| password.getBytes(StandardCharsets.UTF_8).length > 72) {
			throw new IllegalStateException("Admin bootstrap requires ADMIN_BOOTSTRAP_EMAIL with a valid email, "
					+ "ADMIN_BOOTSTRAP_FULL_NAME with 1 to 255 characters, and ADMIN_BOOTSTRAP_PASSWORD "
					+ "with 12 to 72 characters and at most 72 UTF-8 bytes");
		}
		if (userAccountRepository.existsByEmail(normalizedEmail)) {
			throw new IllegalStateException("Admin bootstrap cannot reuse an existing account email");
		}

		UserAccount account = new UserAccount();
		account.setFullName(normalizedName);
		account.setEmail(normalizedEmail);
		account.setPasswordHash(passwordEncoder.encode(password));
		account.setUserType(UserType.SUPER_USER);
		account.setEnabled(true);
		account.setCreatedAt(Instant.now());
		userAccountRepository.saveAndFlush(account);
	}

}
