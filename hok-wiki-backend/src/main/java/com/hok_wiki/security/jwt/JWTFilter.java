package com.hok_wiki.security.jwt;

import com.hok_wiki.domain.UserToken;
import com.hok_wiki.repository.UserTokenRepository;
import com.hok_wiki.security.AccountPrincipal;
import com.hok_wiki.security.SecurityErrorHandler;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Set;
import java.util.UUID;

@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

	private static final Set<String> RECOVERY_PATHS = Set.of("/api/auth/login", "/api/auth/register",
			"/api/auth/forgot-password", "/api/auth/reset-password", "/api/auth/refresh-token", "/refresh-token");

	private final TokenProvider tokenProvider;

	private final UserTokenRepository userTokenRepository;

	private final SecurityErrorHandler securityErrorHandler;

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) {
		String path = request.getRequestURI().substring(request.getContextPath().length());
		return HttpMethod.POST.matches(request.getMethod()) && RECOVERY_PATHS.contains(path);
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
		if (authorization != null && authorization.regionMatches(true, 0, "Bearer ", 0, 7)) {
			try {
				authenticate(authorization.substring(7), request);
			}
			catch (JwtException | IllegalArgumentException exception) {
				SecurityContextHolder.clearContext();
				securityErrorHandler.unauthorized(request, response);
				return;
			}
			catch (DataAccessException exception) {
				SecurityContextHolder.clearContext();
				securityErrorHandler.failure(request, response, exception);
				return;
			}
		}
		filterChain.doFilter(request, response);
	}

	private void authenticate(String jwt, HttpServletRequest request) {
		Claims claims = tokenProvider.parseToken(jwt);
		String subject = claims.getSubject();
		String tokenId = claims.get("tokenId", String.class);
		if (subject == null || tokenId == null) {
			throw new JwtException("Invalid access token");
		}
		UUID accountId = UUID.fromString(subject);
		UserToken token = userTokenRepository.findById(UUID.fromString(tokenId))
				.orElseThrow(() -> new JwtException("Invalid access token"));
		if (token.getRevokedAt() != null || !token.getAccessExpiresAt().isAfter(Instant.now())
				|| !claims.getExpiration().toInstant().equals(token.getAccessExpiresAt().truncatedTo(ChronoUnit.SECONDS))
				|| !token.getAccount().getId().equals(accountId) || !token.getAccount().isEnabled()) {
			throw new JwtException("Invalid access token");
		}

		AccountPrincipal principal = new AccountPrincipal(token.getAccount(), token.getId());
		UsernamePasswordAuthenticationToken authentication = UsernamePasswordAuthenticationToken
				.authenticated(principal, null, principal.getAuthorities());
		authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
		SecurityContext context = SecurityContextHolder.createEmptyContext();
		context.setAuthentication(authentication);
		SecurityContextHolder.setContext(context);
	}

}
