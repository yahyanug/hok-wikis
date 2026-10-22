package com.hok_wiki.dto.response;

import java.util.List;

import com.hok_wiki.constant.HeroLane;
import com.hok_wiki.constant.HeroRole;

public record CatalogHeroView(long id, String slug, String name, List<HeroRole> roles, List<HeroLane> lanes,
		String image, String description, List<String> tags, List<String> guide) {

	public CatalogHeroView {
		roles = List.copyOf(roles);
		lanes = List.copyOf(lanes);
		tags = List.copyOf(tags);
		guide = List.copyOf(guide);
	}

}
