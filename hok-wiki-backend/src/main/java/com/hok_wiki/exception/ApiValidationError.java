package com.hok_wiki.exception;

public record ApiValidationError(String object, String field, String message) {

}
