package com.hok_wiki.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
		@NotBlank @Size(max = 255) String fullName,
		@NotBlank @Email @Size(max = 254) String email,
		@Pattern(regexp = "^\\+[1-9][0-9]{7,14}$") String phoneNumber,
		@NotBlank @Size(min = 12, max = 72) String password) {

	@Override
	public String toString() {
		return "RegisterRequest[credentials=REDACTED]";
	}

}
