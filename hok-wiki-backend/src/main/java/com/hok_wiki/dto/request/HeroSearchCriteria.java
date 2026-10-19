package com.hok_wiki.dto.request;

import com.hok_wiki.constant.HeroLane;
import com.hok_wiki.constant.HeroRole;

public record HeroSearchCriteria(HeroRole role, HeroLane lane, int page, int size) {

	public static final int DEFAULT_PAGE_SIZE = 20;

	public static final int MAX_PAGE_SIZE = 100;

	public static final int MAX_PAGE = Integer.MAX_VALUE / MAX_PAGE_SIZE;

	public HeroSearchCriteria {
		if (page < 0 || page > MAX_PAGE) {
			throw new IllegalArgumentException("page must be between 0 and " + MAX_PAGE);
		}
		if (size < 1 || size > MAX_PAGE_SIZE) {
			throw new IllegalArgumentException("size must be between 1 and " + MAX_PAGE_SIZE);
		}
	}

}
