package com.hok_wiki.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record ArcanaRequest(
		@NotBlank @Size(max = 255) String name,
		@NotBlank @Size(max = 128) @Pattern(regexp = "[a-z0-9]+(?:-[a-z0-9]+)*") String slug,
		@NotBlank @Pattern(regexp = "RED|GREEN|BLUE") String color,
		@NotNull @Positive Integer level,
		@NotBlank @Size(max = 8000) String stats,
		@Size(max = 2048) String imageUrl) {

	public ArcanaRequest {
		name = name == null ? null : name.strip();
		slug = slug == null ? null : slug.strip();
	}

}
