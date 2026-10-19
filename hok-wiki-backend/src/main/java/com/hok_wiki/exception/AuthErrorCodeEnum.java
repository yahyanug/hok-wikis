package com.hok_wiki.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum AuthErrorCodeEnum implements ExceptionEnum {

	INVALID_CREDENTIALS("AUTH0001", HttpStatus.UNAUTHORIZED, "Invalid email/phone number or password"),
	ACCOUNT_ALREADY_EXISTS("AUTH0002", HttpStatus.CONFLICT, "Email or phone number is already registered"),
	INVALID_TOKEN("AUTH0003", HttpStatus.UNAUTHORIZED, "Token is invalid or expired"),
	INVALID_RESET_TOKEN("AUTH0004", HttpStatus.BAD_REQUEST, "Password reset token is invalid or expired"),
	INVALID_CURRENT_PASSWORD("AUTH0005", HttpStatus.BAD_REQUEST, "Current password is incorrect"),
	PASSWORD_REUSED("AUTH0006", HttpStatus.BAD_REQUEST, "New password must differ from the current password"),
	INVALID_PASSWORD("AUTH0007", HttpStatus.BAD_REQUEST,
			"Password must contain 12 to 72 characters and at most 72 UTF-8 bytes"),
	PASSWORD_RESET_UNAVAILABLE("AUTH0008", HttpStatus.SERVICE_UNAVAILABLE,
			"Password recovery is temporarily unavailable"),
	ACCOUNT_LOCKED("AUTH0009", HttpStatus.TOO_MANY_REQUESTS,
			"Too many failed login attempts. Please try again later");

	private final String code;

	private final HttpStatus status;

	private final String description;

	AuthErrorCodeEnum(String code, HttpStatus status, String description) {
		this.code = code;
		this.status = status;
		this.description = description;
	}

}
