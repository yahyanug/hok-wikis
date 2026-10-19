package com.hok_wiki.dto.response;

import java.util.List;

public record PageView<T>(List<T> items, int page, int size, long totalElements, int totalPages) {

	public PageView {
		items = List.copyOf(items);
	}

}
