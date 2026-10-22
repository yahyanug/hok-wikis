package com.hok_wiki.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ResourceAttributeView(String label, String value, String description) {
}
