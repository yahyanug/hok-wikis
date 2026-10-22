package com.hok_wiki.dto.response;

import java.util.List;
import java.util.UUID;

public record CatalogArcanaView(UUID id, String slug, String name, String image, String description,
		List<ResourceAttributeView> attributes, List<String> tips, String color, String explanation) {

	public CatalogArcanaView {
		attributes = List.copyOf(attributes);
		tips = List.copyOf(tips);
	}

}
