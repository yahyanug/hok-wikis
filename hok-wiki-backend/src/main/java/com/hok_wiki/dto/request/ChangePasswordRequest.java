package com.hok_wiki.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChangePasswordRequest(
		@NotBlank @Size(max = 1024) String currentPassword,
		@NotBlank @Size(min = 12, max = 72) String newPassword) {

	@Override
	public String toString() {
		return "ChangePasswordRequest[credentials=REDACTED]";
	}

}
