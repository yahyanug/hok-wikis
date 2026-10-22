package com.hok_wiki.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ResourceEffectRequest(
		@NotBlank @Size(max = 255) String name,
		@NotBlank @Size(max = 8000) String description) {

	public ResourceEffectRequest {
		name = name == null ? null : name.strip();
		description = description == null ? null : description.strip();
	}

}
