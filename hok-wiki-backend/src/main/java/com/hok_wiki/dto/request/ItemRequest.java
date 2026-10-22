package com.hok_wiki.dto.request;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.hok_wiki.constant.ItemCategory;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record ItemRequest(
		@NotBlank @Size(max = 255) String name,
		@NotBlank @Size(max = 128) @Pattern(regexp = "[a-z0-9]+(?:-[a-z0-9]+)*") String slug,
		@JsonAlias("price") @NotNull @PositiveOrZero Integer priceGold,
		@JsonAlias("image") @Size(max = 2048) String imageUrl,
		@NotNull ItemCategory category,
		@Size(max = 8000) String description,
		@Size(max = 30) List<@NotNull @Valid ResourceAttributeRequest> attributes,
		@Size(max = 30) List<@NotNull @Valid ResourceEffectRequest> effects,
		@Size(max = 50) List<@NotBlank @Size(max = 255) String> buildsFrom,
		@Size(max = 50) List<@NotBlank @Size(max = 8000) String> tips) {

	public ItemRequest {
		name = name == null ? null : name.strip();
		slug = slug == null ? null : slug.strip();
		description = description == null ? "" : description.strip();
		attributes = attributes == null ? List.of() : attributes;
		effects = effects == null ? List.of() : effects;
		buildsFrom = buildsFrom == null ? List.of() : buildsFrom;
		tips = tips == null ? List.of() : tips;
	}

}
