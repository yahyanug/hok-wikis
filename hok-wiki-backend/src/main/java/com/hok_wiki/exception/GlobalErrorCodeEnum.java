package com.hok_wiki.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum GlobalErrorCodeEnum implements ExceptionEnum {

	RUNTIME_EXCEPTION("GBL9999", HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred"),
	VALIDATION_ERROR("GBL0001", HttpStatus.BAD_REQUEST, "Request validation failed"),
	HTTP_MESSAGE_NOT_READABLE("GBL0002", HttpStatus.BAD_REQUEST, "Request body is missing or malformed"),
	INVALID_ARGUMENT("GBL0003", HttpStatus.BAD_REQUEST, "Request parameter is invalid"),
	UNAUTHORIZED("GBL0004", HttpStatus.UNAUTHORIZED, "Authentication required"),
	HTTP_ACCESS_DENIED("GBL0005", HttpStatus.FORBIDDEN, "Insufficient permissions"),
	CONSTRAINT_VIOLATION("GBL0006", HttpStatus.CONFLICT,
			"Data conflicts with an existing slug or a referenced record"),
	ENTITY_NOT_FOUND("GBL0007", HttpStatus.NOT_FOUND, "%s not found"),
	SLUG_ALREADY_EXISTS("GBL0008", HttpStatus.CONFLICT, "%s slug already exists"),
	RESOURCE_IN_USE("GBL0009", HttpStatus.CONFLICT, "%s is still referenced by another resource"),
	HTTP_ERROR("GBL0010", HttpStatus.BAD_REQUEST, "HTTP request could not be processed");

	private final String code;

	private final HttpStatus status;

	private final String description;

	GlobalErrorCodeEnum(String code, HttpStatus status, String description) {
		this.code = code;
		this.status = status;
		this.description = description;
	}

}
