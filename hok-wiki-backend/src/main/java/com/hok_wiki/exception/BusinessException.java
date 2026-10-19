package com.hok_wiki.exception;

public class BusinessException extends RuntimeException {

	private final ApiError apiError;

	public BusinessException(ExceptionEnum exceptionEnum, Object... params) {
		this(new ApiError(exceptionEnum, params));
	}

	public BusinessException(ApiError apiError) {
		super(apiError.message());
		this.apiError = apiError;
	}

	public BusinessException(ApiError apiError, Throwable cause) {
		super(apiError.message(), cause);
		this.apiError = apiError;
	}

	public ApiError getApiError() {
		return apiError;
	}

}
