package com.hok_wiki.service.impl;

import com.hok_wiki.domain.Spell;
import com.hok_wiki.dto.request.SpellRequest;
import com.hok_wiki.dto.response.CatalogSpellView;
import com.hok_wiki.dto.response.SpellView;
import com.hok_wiki.exception.BusinessException;
import com.hok_wiki.exception.GlobalErrorCodeEnum;
import com.hok_wiki.mapper.MapStructConverter;
import com.hok_wiki.repository.SpellRepository;
import com.hok_wiki.service.SpellService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SpellServiceImpl implements SpellService {

    private final SpellRepository spellRepository;

    private final MapStructConverter mapStructConverter;

    @Override
    public List<CatalogSpellView> findAll(Pageable pageable) {
        if (pageable == null || pageable.isUnpaged() || pageable.getPageSize() > 100
                || pageable.getOffset() > Integer.MAX_VALUE
                || pageable.getSort().stream().anyMatch(order -> !Set.of("id", "name", "slug")
                        .contains(order.getProperty()) || order.isIgnoreCase() && "id".equals(order.getProperty()))) {
            throw new BusinessException(GlobalErrorCodeEnum.INVALID_ARGUMENT);
        }
        return spellRepository.findAll(pageable).getContent().stream()
                .map(mapStructConverter::toView).map(mapStructConverter::toCatalog).toList();
    }

    @Override
    public SpellView findBySlug(String slug) {
        return spellRepository.findBySlug(slug)
                .map(mapStructConverter::toView)
                .orElseThrow(() -> new BusinessException(GlobalErrorCodeEnum.ENTITY_NOT_FOUND, "Spell"));
    }

    @Override
    public SpellView findById(UUID id) {
        return mapStructConverter.toView(findEntity(id));
    }

    @Override
    @Transactional
    public SpellView create(SpellRequest request) {
        ensureSlugAvailable(request.slug(), null);
        Spell spell = mapStructConverter.toEntity(request);
        return mapStructConverter.toView(spellRepository.saveAndFlush(spell));
    }

    @Override
    @Transactional
    public SpellView update(UUID id, SpellRequest request) {
        Spell spell = findEntity(id);
        ensureSlugAvailable(request.slug(), id);
        mapStructConverter.update(request, spell);
        return mapStructConverter.toView(spellRepository.saveAndFlush(spell));
    }

    @Override
    @Transactional
    public void delete(UUID id) {
        Spell spell = findEntity(id);
        spellRepository.delete(spell);
        spellRepository.flush();
    }

    private Spell findEntity(UUID id) {
        return spellRepository.findById(id)
                .orElseThrow(() -> new BusinessException(GlobalErrorCodeEnum.ENTITY_NOT_FOUND, "Spell"));
    }

    private void ensureSlugAvailable(String slug, UUID id) {
        boolean exists = id == null ? spellRepository.existsBySlug(slug)
                : spellRepository.existsBySlugAndIdNot(slug, id);
        if (exists) {
            throw new BusinessException(GlobalErrorCodeEnum.SLUG_ALREADY_EXISTS, "Spell");
        }
    }

}
