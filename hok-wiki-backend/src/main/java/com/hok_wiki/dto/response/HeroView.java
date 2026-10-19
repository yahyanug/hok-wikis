package com.hok_wiki.dto.response;

import java.util.List;
import java.util.UUID;

import com.hok_wiki.constant.HeroLane;
import com.hok_wiki.constant.HeroRole;

public record HeroView(UUID id, String name, String slug, String imageUrl, List<HeroRole> roles, List<HeroLane> lanes) {

	public HeroView {
		roles = List.copyOf(roles);
		lanes = List.copyOf(lanes);
	}

}
