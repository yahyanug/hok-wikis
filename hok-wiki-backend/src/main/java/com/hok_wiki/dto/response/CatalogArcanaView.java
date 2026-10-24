package com.hok_wiki.dto.response;

import java.util.List;
import java.util.UUID;

public record CatalogArcanaView(UUID id, String slug, String name, String image, List<ResourceEffectView> stats) {

	public CatalogArcanaView {
		stats = List.copyOf(stats);
	}

}
