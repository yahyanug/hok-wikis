package com.hok_wiki.service;

import com.hok_wiki.dto.request.ItemRequest;
import com.hok_wiki.dto.response.ItemView;
import com.hok_wiki.dto.response.CatalogItemView;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface ItemService {

    List<CatalogItemView> findAll(Pageable pageable);

    ItemView findBySlug(String slug);

    ItemView findById(UUID id);

    ItemView create(ItemRequest request);

    ItemView update(UUID id, ItemRequest request);

    void delete(UUID id);

}
