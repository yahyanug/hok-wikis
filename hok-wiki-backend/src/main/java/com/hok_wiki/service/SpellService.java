package com.hok_wiki.service;

import com.hok_wiki.dto.request.SpellRequest;
import com.hok_wiki.dto.response.CatalogSpellView;
import com.hok_wiki.dto.response.SpellView;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface SpellService {

    List<CatalogSpellView> findAll(Pageable pageable);

    SpellView findBySlug(String slug);

    SpellView findById(UUID id);

    SpellView create(SpellRequest request);

    SpellView update(UUID id, SpellRequest request);

    void delete(UUID id);

}
