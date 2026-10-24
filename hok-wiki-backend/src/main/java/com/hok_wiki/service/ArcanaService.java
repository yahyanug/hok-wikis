package com.hok_wiki.service;

import com.hok_wiki.dto.request.ArcanaRequest;
import com.hok_wiki.dto.response.ArcanaView;
import com.hok_wiki.dto.response.CatalogArcanaView;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface ArcanaService {

    List<CatalogArcanaView> findAll(Pageable pageable);

    ArcanaView findBySlug(String slug);

    ArcanaView findById(UUID id);

    ArcanaView create(ArcanaRequest request);

    ArcanaView update(UUID id, ArcanaRequest request);

    void delete(UUID id);

}
