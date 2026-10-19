package com.hok_wiki.exception;

import org.springframework.http.HttpStatus;

public interface ExceptionEnum {

	String getCode();

	String getDescription();

	default String getTitle() {
		return null;
	}

	default HttpStatus getStatus() {
		return HttpStatus.BAD_REQUEST;
	}

}
