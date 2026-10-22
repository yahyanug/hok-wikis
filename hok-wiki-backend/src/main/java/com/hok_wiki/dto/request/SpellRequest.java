package com.hok_wiki.dto.request;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record SpellRequest(
		@NotBlank @Size(max = 255) String name,
		@NotBlank @Size(max = 128) @Pattern(regexp = "[a-z0-9]+(?:-[a-z0-9]+)*") String slug,
		@NotNull @PositiveOrZero Integer cooldownSeconds,
		@NotBlank @Size(max = 8000) String description,
		@JsonAlias("image") @Size(max = 2048) String imageUrl,
		@Size(max = 30) List<@NotNull @Valid ResourceAttributeRequest> attributes,
		@Size(max = 50) List<@NotBlank @Size(max = 8000) String> tips,
		@Size(max = 8000) String usageTip) {

	public SpellRequest {
		name = name == null ? null : name.strip();
		slug = slug == null ? null : slug.strip();
		attributes = attributes == null ? List.of() : attributes;
		tips = tips == null ? List.of() : tips;
		usageTip = usageTip == null ? "" : usageTip.strip();
	}

}
