package com.hok_wiki.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum HeroErrorCodeEnum implements ExceptionEnum {

	NOT_FOUND("HERO0001", HttpStatus.NOT_FOUND, "Hero not found"),
	SLUG_ALREADY_EXISTS("HERO0002", HttpStatus.CONFLICT, "Hero slug already exists"),
	ROLE_NOT_FOUND("HERO0003", HttpStatus.BAD_REQUEST, "One or more roleIds do not exist"),
	LANE_NOT_FOUND("HERO0004", HttpStatus.BAD_REQUEST, "One or more laneIds do not exist");

	private final String code;

	private final HttpStatus status;

	private final String description;

	HeroErrorCodeEnum(String code, HttpStatus status, String description) {
		this.code = code;
		this.status = status;
		this.description = description;
	}

}
