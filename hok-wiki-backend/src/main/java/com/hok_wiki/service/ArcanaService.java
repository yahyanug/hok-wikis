package com.hok_wiki.service;

import java.util.UUID;

import com.hok_wiki.dto.request.ArcanaRequest;

import com.hok_wiki.dto.response.ArcanaView;
import com.hok_wiki.dto.request.PageRequest;
import com.hok_wiki.dto.response.PageView;

public interface ArcanaService {

	PageView<ArcanaView> findAll(PageRequest request);

	ArcanaView findBySlug(String slug);

	ArcanaView findById(UUID id);

	ArcanaView create(ArcanaRequest request);

	ArcanaView update(UUID id, ArcanaRequest request);

	void delete(UUID id);

}
