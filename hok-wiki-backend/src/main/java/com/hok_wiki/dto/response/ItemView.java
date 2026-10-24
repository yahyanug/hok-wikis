package com.hok_wiki.dto.response;

import java.util.List;
import java.util.UUID;

import com.hok_wiki.constant.ItemCategory;

public record ItemView(UUID id, String name, String slug, Integer priceGold, String imageUrl,
		ItemCategory category, List<ResourceEffectView> stats, List<ResourceEffectView> passive,
		List<String> buildsFrom) {

	public ItemView {
		stats = stats == null ? List.of() : List.copyOf(stats);
		passive = passive == null ? List.of() : List.copyOf(passive);
		buildsFrom = buildsFrom == null ? List.of() : List.copyOf(buildsFrom);
	}

}
