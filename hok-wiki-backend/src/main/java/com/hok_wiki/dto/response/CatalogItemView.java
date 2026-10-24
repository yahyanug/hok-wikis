package com.hok_wiki.dto.response;

import java.util.List;
import java.util.UUID;

import com.hok_wiki.constant.ItemCategory;

public record CatalogItemView(UUID id, String slug, String name, String image, ItemCategory category, Integer price,
		List<ResourceEffectView> stats, List<ResourceEffectView> passive, List<String> buildsFrom) {

	public CatalogItemView {
		stats = List.copyOf(stats);
		passive = List.copyOf(passive);
		buildsFrom = List.copyOf(buildsFrom);
	}

}
