package com.hok_wiki.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ResetPasswordRequest(
		@NotBlank @Size(max = 128) String token,
		@NotBlank @Size(min = 12, max = 72) String newPassword) {

	@Override
	public String toString() {
		return "ResetPasswordRequest[credentials=REDACTED]";
	}

}
