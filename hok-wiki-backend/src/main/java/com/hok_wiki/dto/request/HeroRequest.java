package com.hok_wiki.dto.request;

import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.hok_wiki.constant.HeroLane;
import com.hok_wiki.constant.HeroRole;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record HeroRequest(
		@NotBlank @Size(max = 255) String name,
		@NotBlank @Size(max = 128) @Pattern(regexp = "[a-z0-9]+(?:-[a-z0-9]+)*") String slug,
		@JsonAlias("image") @Size(max = 2048) String imageUrl,
		@NotNull @Size(max = 20) Set<@NotNull HeroRole> roles,
		@NotNull @Size(max = 20) Set<@NotNull HeroLane> lanes,
		@Size(max = 8000) String description,
		@Size(max = 50) List<@NotBlank @Size(max = 255) String> tags,
		@Size(max = 50) List<@NotBlank @Size(max = 8000) String> guide) {

	public HeroRequest {
		name = name == null ? null : name.strip();
		slug = slug == null ? null : slug.strip();
		description = description == null ? "" : description.strip();
		tags = tags == null ? List.of() : tags;
		guide = guide == null ? List.of() : guide;
	}

}
