package com.hok_wiki.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public class HeroListRequest {

	@Size(min = 1, max = HeroSearchCriteria.MAX_CLASSIFICATION_LENGTH)
	private String role;

	@Size(min = 1, max = HeroSearchCriteria.MAX_CLASSIFICATION_LENGTH)
	private String lane;

	@Min(0)
	@Max(HeroSearchCriteria.MAX_PAGE)
	private int page;

	@Min(1)
	@Max(HeroSearchCriteria.MAX_PAGE_SIZE)
	private int size = HeroSearchCriteria.DEFAULT_PAGE_SIZE;

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role == null ? null : role.strip();
	}

	public String getLane() {
		return lane;
	}

	public void setLane(String lane) {
		this.lane = lane == null ? null : lane.strip();
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
