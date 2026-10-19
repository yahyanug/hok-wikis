package com.hok_wiki.service;

import java.util.UUID;

import com.hok_wiki.dto.request.HeroRequest;

import com.hok_wiki.dto.response.HeroPage;
import com.hok_wiki.dto.request.HeroSearchCriteria;
import com.hok_wiki.dto.response.HeroView;

public interface HeroService {

	HeroPage findHeroes(HeroSearchCriteria criteria);

	HeroView findBySlug(String slug);

	HeroView findById(UUID id);

	HeroView create(HeroRequest request);

	HeroView update(UUID id, HeroRequest request);

	void delete(UUID id);
}
