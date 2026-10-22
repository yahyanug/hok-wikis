package com.hok_wiki.dto.response;

import java.util.List;
import java.util.UUID;

import com.hok_wiki.constant.ItemCategory;

public record ItemView(UUID id, String name, String slug, Integer priceGold, String imageUrl,
		ItemCategory category, String description, List<ResourceAttributeView> attributes,
		List<ResourceEffectView> effects, List<String> buildsFrom, List<String> tips) {

	public ItemView {
		attributes = attributes == null ? List.of() : List.copyOf(attributes);
		effects = effects == null ? List.of() : List.copyOf(effects);
		buildsFrom = buildsFrom == null ? List.of() : List.copyOf(buildsFrom);
		tips = tips == null ? List.of() : List.copyOf(tips);
	}

}
