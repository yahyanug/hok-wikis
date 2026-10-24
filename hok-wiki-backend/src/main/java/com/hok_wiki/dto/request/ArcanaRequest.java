package com.hok_wiki.dto.request;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ArcanaRequest(
		@NotBlank @Size(max = 255) String name,
		@NotBlank @Size(max = 128) @Pattern(regexp = "[a-z0-9]+(?:-[a-z0-9]+)*") String slug,
		@Size(max = 30) List<@NotNull @Valid ResourceEffectRequest> stats,
		@JsonAlias("image") @Size(max = 2048) String imageUrl) {

	public ArcanaRequest {
		name = name == null ? null : name.strip();
		slug = slug == null ? null : slug.strip();
		stats = stats == null ? List.of() : stats;
	}

}
