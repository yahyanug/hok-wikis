package com.hok_wiki.dto.response;

import java.util.List;
import java.util.UUID;

public record ArcanaView(UUID id, String name, String slug, String color, Integer level, String stats, String imageUrl,
		String description, List<ResourceAttributeView> attributes, List<String> tips, String explanation) {

	public ArcanaView {
		attributes = attributes == null ? List.of() : List.copyOf(attributes);
		tips = tips == null ? List.of() : List.copyOf(tips);
	}

}
