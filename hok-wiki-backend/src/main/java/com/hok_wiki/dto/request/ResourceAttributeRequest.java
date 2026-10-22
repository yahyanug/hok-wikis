package com.hok_wiki.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ResourceAttributeRequest(
		@NotBlank @Size(max = 255) String label,
		@Size(max = 2048) String value,
		@Size(max = 8000) String description) {

	public ResourceAttributeRequest {
		label = label == null ? null : label.strip();
		value = value == null ? null : value.strip();
		description = description == null ? null : description.strip();
	}

}
