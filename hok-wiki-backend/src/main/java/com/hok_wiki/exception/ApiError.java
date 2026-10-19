package com.hok_wiki.exception;

import java.time.Instant;
import java.util.List;

import org.springframework.http.HttpStatus;

public record ApiError(String errorCode, String title, String message, HttpStatus status, Instant timestamp,
		List<ApiValidationError> subErrors) {

	public ApiError {
		subErrors = subErrors == null ? List.of() : List.copyOf(subErrors);
	}

	public ApiError(ExceptionEnum exceptionEnum, Object... params) {
		this(exceptionEnum.getStatus(), exceptionEnum,
				params.length == 0 ? exceptionEnum.getDescription()
						: String.format(exceptionEnum.getDescription(), params),
				List.of());
	}

	public ApiError(HttpStatus status, ExceptionEnum exceptionEnum, String message,
			List<ApiValidationError> subErrors) {
		this(exceptionEnum.getCode(), exceptionEnum.getTitle(), message, status, Instant.now(), subErrors);
	}

	public ApiError(HttpStatus status, ExceptionEnum exceptionEnum) {
		this(status, exceptionEnum, exceptionEnum.getDescription(), List.of());
	}

}
