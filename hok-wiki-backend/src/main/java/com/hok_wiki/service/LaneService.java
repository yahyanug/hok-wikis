package com.hok_wiki.service;

import java.util.UUID;

import com.hok_wiki.dto.request.LaneRequest;

import com.hok_wiki.dto.response.LaneView;
import com.hok_wiki.dto.request.PageRequest;
import com.hok_wiki.dto.response.PageView;

public interface LaneService {

	PageView<LaneView> findAll(PageRequest request);

	LaneView findBySlug(String slug);

	LaneView findById(UUID id);

	LaneView create(LaneRequest request);

	LaneView update(UUID id, LaneRequest request);

	void delete(UUID id);

}
