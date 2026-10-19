package com.hok_wiki.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record ItemRequest(
		@NotBlank @Size(max = 255) String name,
		@NotBlank @Size(max = 128) @Pattern(regexp = "[a-z0-9]+(?:-[a-z0-9]+)*") String slug,
		@NotNull @PositiveOrZero Integer priceGold,
		@Size(max = 2048) String imageUrl) {

	public ItemRequest {
		name = name == null ? null : name.strip();
		slug = slug == null ? null : slug.strip();
	}

}
