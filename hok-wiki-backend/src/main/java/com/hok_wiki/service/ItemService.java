package com.hok_wiki.service;

import java.util.UUID;

import com.hok_wiki.dto.request.ItemRequest;

import com.hok_wiki.dto.response.ItemView;
import com.hok_wiki.dto.request.PageRequest;
import com.hok_wiki.dto.response.PageView;

public interface ItemService {

	PageView<ItemView> findAll(PageRequest request);

	ItemView findBySlug(String slug);

	ItemView findById(UUID id);

	ItemView create(ItemRequest request);

	ItemView update(UUID id, ItemRequest request);

	void delete(UUID id);

}
