package com.hok_wiki.dto.request;

import com.hok_wiki.constant.HeroLane;
import com.hok_wiki.constant.HeroRole;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public class HeroListRequest {

	private HeroRole role;

	private HeroLane lane;

	@Min(0)
	@Max(HeroSearchCriteria.MAX_PAGE)
	private int page;

	@Min(1)
	@Max(HeroSearchCriteria.MAX_PAGE_SIZE)
	private int size = HeroSearchCriteria.DEFAULT_PAGE_SIZE;

	public HeroRole getRole() {
		return role;
	}

	public void setRole(HeroRole role) {
		this.role = role;
	}

	public HeroLane getLane() {
		return lane;
	}

	public void setLane(HeroLane lane) {
		this.lane = lane;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public HeroSearchCriteria toCriteria() {
		return new HeroSearchCriteria(role, lane, page, size);
	}

}
