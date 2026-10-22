package com.hok_wiki.dto.response;

import java.util.List;
import java.util.UUID;

public record CatalogSpellView(UUID id, String slug, String name, String image, String description,
		List<ResourceAttributeView> attributes, List<String> tips, String cooldown, String usageTip) {

	public CatalogSpellView {
		attributes = List.copyOf(attributes);
		tips = List.copyOf(tips);
	}

}
