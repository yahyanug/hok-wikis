package com.hok_wiki.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageRequest {

	@Min(0)
	@Max(Integer.MAX_VALUE / 100)
	private int page;

	@Min(1)
	@Max(100)
	private int size = 20;

	public org.springframework.data.domain.Pageable toPageable() {
		return org.springframework.data.domain.PageRequest.of(page, size,
				org.springframework.data.domain.Sort.by("name", "slug"));
	}

}
