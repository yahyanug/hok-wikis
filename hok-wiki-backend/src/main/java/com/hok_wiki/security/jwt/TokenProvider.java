package com.hok_wiki.security.jwt;

import com.hok_wiki.config.AuthProperties;
import com.hok_wiki.domain.UserToken;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.HexFormat;

@Component
public class TokenProvider {

	private final AuthProperties authProperties;

	private final SecretKey key;

	private final JwtParser jwtParser;

	private final SecureRandom secureRandom = new SecureRandom();

	public TokenProvider(AuthProperties authProperties) {
		this.authProperties = authProperties;
		byte[] keyBytes;
		try {
			keyBytes = Base64.getDecoder().decode(authProperties.getBase64Secret());
		}
		catch (IllegalArgumentException exception) {
			throw new IllegalStateException("security.jwt.base64-secret must contain a valid Base64 signing key");
		}
		if (keyBytes.length < 64) {
			throw new IllegalStateException("security.jwt.base64-secret must decode to at least 64 bytes");
		}
		this.key = Keys.hmacShaKeyFor(keyBytes);
		this.jwtParser = Jwts.parser().verifyWith(key).requireIssuer(authProperties.getIssuer())
				.sig().clear().add(Jwts.SIG.HS512).and().build();
	}

	public String createAccessToken(UserToken token) {
		return Jwts.builder().subject(token.getAccount().getId().toString())
				.claim("tokenId", token.getId().toString()).issuer(authProperties.getIssuer())
				.issuedAt(Date.from(token.getCreatedAt())).expiration(Date.from(token.getAccessExpiresAt()))
				.signWith(key, Jwts.SIG.HS512).compact();
	}

	public Claims parseToken(String token) {
		Claims claims = jwtParser.parseSignedClaims(token).getPayload();
		if (claims.getExpiration() == null || !claims.getExpiration().toInstant().isAfter(Instant.now())) {
			throw new JwtException("Invalid access token");
		}
		if (claims.getIssuedAt() != null && claims.getIssuedAt().toInstant().isAfter(Instant.now())) {
			throw new JwtException("Invalid access token");
		}
		return claims;
	}

	public String createOpaqueToken() {
		byte[] tokenBytes = new byte[32];
		secureRandom.nextBytes(tokenBytes);
		return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
	}

	public String hashToken(String token) {
		try {
			byte[] hash = MessageDigest.getInstance("SHA-256").digest(token.getBytes(StandardCharsets.UTF_8));
			return HexFormat.of().formatHex(hash);
		}
		catch (NoSuchAlgorithmException exception) {
			throw new IllegalStateException("SHA-256 is unavailable", exception);
		}
	}

}
