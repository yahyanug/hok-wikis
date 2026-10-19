package com.hok_wiki.constant;

import com.hok_wiki.exception.ExceptionEnum;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCodeGlobalEnum implements ExceptionEnum {

	RUNTIME_EXCEPTION("GBL9999", HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred"),
	VALIDATION_ERROR("GBL0001", HttpStatus.BAD_REQUEST, "Request validation failed"),
	HTTP_MESSAGE_NOT_READABLE("GBL0002", HttpStatus.BAD_REQUEST, "Request body is missing or malformed"),
	INVALID_ARGUMENT("GBL0003", HttpStatus.BAD_REQUEST, "Request parameter is invalid"),
	UNAUTHORIZED("GBL0004", HttpStatus.UNAUTHORIZED, "Admin authentication required"),
	HTTP_ACCESS_DENIED("GBL0005", HttpStatus.FORBIDDEN, "Admin role required"),
	CONSTRAINT_VIOLATION("GBL0006", HttpStatus.CONFLICT,
			"Data conflicts with an existing slug or a referenced record"),
	ENTITY_NOT_FOUND("GBL0007", HttpStatus.NOT_FOUND, "%s not found"),
	SLUG_ALREADY_EXISTS("GBL0008", HttpStatus.CONFLICT, "%s slug already exists"),
	RESOURCE_IN_USE("GBL0009", HttpStatus.CONFLICT, "%s is still assigned to a hero"),
	HTTP_ERROR("GBL0010", HttpStatus.BAD_REQUEST, "HTTP request could not be processed");

	private final String code;

	private final HttpStatus status;

	private final String description;

	ErrorCodeGlobalEnum(String code, HttpStatus status, String description) {
		this.code = code;
		this.status = status;
		this.description = description;
	}

}
