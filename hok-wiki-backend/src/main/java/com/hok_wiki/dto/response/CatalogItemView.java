package com.hok_wiki.dto.response;

import java.util.List;
import java.util.UUID;

import com.hok_wiki.constant.ItemCategory;

public record CatalogItemView(UUID id, String slug, String name, String image, String description,
		List<ResourceAttributeView> attributes, List<String> tips, ItemCategory category, Integer price,
		List<ResourceEffectView> effects, List<String> buildsFrom) {

	public CatalogItemView {
		attributes = List.copyOf(attributes);
		tips = List.copyOf(tips);
		effects = List.copyOf(effects);
		buildsFrom = List.copyOf(buildsFrom);
	}

}
