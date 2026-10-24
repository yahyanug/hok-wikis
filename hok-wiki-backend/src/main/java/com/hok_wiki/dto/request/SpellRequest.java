package com.hok_wiki.dto.request;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record SpellRequest(
		@NotBlank @Size(max = 255) String name,
		@NotBlank @Size(max = 128) @Pattern(regexp = "[a-z0-9]+(?:-[a-z0-9]+)*") String slug,
		@NotBlank @Size(max = 8000) String description,
		@JsonAlias("image") @Size(max = 2048) String imageUrl,
		@Size(max = 8000) String usageTip) {

	public SpellRequest {
		name = name == null ? null : name.strip();
		slug = slug == null ? null : slug.strip();
		usageTip = usageTip == null ? "" : usageTip.strip();
	}

}
