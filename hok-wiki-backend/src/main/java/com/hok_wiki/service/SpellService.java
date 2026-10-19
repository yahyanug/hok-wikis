package com.hok_wiki.service;

import java.util.UUID;

import com.hok_wiki.dto.request.SpellRequest;

import com.hok_wiki.dto.response.SpellView;
import com.hok_wiki.dto.request.PageRequest;
import com.hok_wiki.dto.response.PageView;

public interface SpellService {

	PageView<SpellView> findAll(PageRequest request);

	SpellView findBySlug(String slug);

	SpellView findById(UUID id);

	SpellView create(SpellRequest request);

	SpellView update(UUID id, SpellRequest request);

	void delete(UUID id);

}
