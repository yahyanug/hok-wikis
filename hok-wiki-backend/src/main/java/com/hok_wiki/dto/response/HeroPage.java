package com.hok_wiki.dto.response;

import java.util.List;

public record HeroPage(List<HeroView> items, int page, int size, long totalElements, int totalPages) {

	public HeroPage {
		items = List.copyOf(items);
	}

}
