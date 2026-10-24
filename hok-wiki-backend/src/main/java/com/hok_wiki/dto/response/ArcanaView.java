package com.hok_wiki.dto.response;

import java.util.List;
import java.util.UUID;

public record ArcanaView(UUID id, String name, String slug, List<ResourceEffectView> stats, String imageUrl) {

	public ArcanaView {
		stats = stats == null ? List.of() : List.copyOf(stats);
	}

}
