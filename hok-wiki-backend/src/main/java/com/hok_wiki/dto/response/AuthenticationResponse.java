package com.hok_wiki.dto.response;

import java.time.Instant;

public record AuthenticationResponse(String accessToken, String refreshToken, String tokenType, Instant expiresAt,
		Instant refreshTokenExpiresAt, AccountView user) {

	@Override
	public String toString() {
		return "AuthenticationResponse[tokens=REDACTED]";
	}

}
