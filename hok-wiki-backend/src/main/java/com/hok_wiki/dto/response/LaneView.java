package com.hok_wiki.dto.response;

import com.hok_wiki.constant.HeroLane;

public record LaneView(HeroLane name, String slug, String imageUrl) {
}
