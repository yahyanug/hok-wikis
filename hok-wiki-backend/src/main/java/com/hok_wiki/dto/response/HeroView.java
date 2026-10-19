package com.hok_wiki.dto.response;

import java.util.List;
import java.util.UUID;

public record HeroView(UUID id, String name, String slug, String imageUrl, List<String> roles, List<String> lanes) {

	public HeroView {
		roles = List.copyOf(roles);
		lanes = List.copyOf(lanes);
	}

}
