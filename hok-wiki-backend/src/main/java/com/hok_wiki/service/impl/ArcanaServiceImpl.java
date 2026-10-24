package com.hok_wiki.service.impl;

import com.hok_wiki.domain.Arcana;
import com.hok_wiki.dto.request.ArcanaRequest;
import com.hok_wiki.dto.response.ArcanaView;
import com.hok_wiki.dto.response.CatalogArcanaView;
import com.hok_wiki.exception.BusinessException;
import com.hok_wiki.exception.GlobalErrorCodeEnum;
import com.hok_wiki.mapper.MapStructConverter;
import com.hok_wiki.repository.ArcanaRepository;
import com.hok_wiki.service.ArcanaService;
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
public class ArcanaServiceImpl implements ArcanaService {

    private final ArcanaRepository arcanaRepository;

    private final MapStructConverter mapStructConverter;

    @Override
    public List<CatalogArcanaView> findAll(Pageable pageable) {
        if (pageable == null || pageable.isUnpaged() || pageable.getPageSize() > 100
                || pageable.getOffset() > Integer.MAX_VALUE
                || pageable.getSort().stream().anyMatch(order -> !Set.of("id", "name", "slug")
                        .contains(order.getProperty()) || order.isIgnoreCase() && "id".equals(order.getProperty()))) {
            throw new BusinessException(GlobalErrorCodeEnum.INVALID_ARGUMENT);
        }
        return arcanaRepository.findAll(pageable).getContent().stream()
                .map(mapStructConverter::toView).map(mapStructConverter::toCatalog).toList();
    }

    @Override
    public ArcanaView findBySlug(String slug) {
        return arcanaRepository.findBySlug(slug)
                .map(mapStructConverter::toView)
                .orElseThrow(() -> new BusinessException(GlobalErrorCodeEnum.ENTITY_NOT_FOUND, "Arcana"));
    }

    @Override
    public ArcanaView findById(UUID id) {
        return mapStructConverter.toView(findEntity(id));
    }

    @Override
    @Transactional
    public ArcanaView create(ArcanaRequest request) {
        ensureSlugAvailable(request.slug(), null);
        Arcana arcana = mapStructConverter.toEntity(request);
        return mapStructConverter.toView(arcanaRepository.saveAndFlush(arcana));
    }

    @Override
    @Transactional
    public ArcanaView update(UUID id, ArcanaRequest request) {
        Arcana arcana = findEntity(id);
        ensureSlugAvailable(request.slug(), id);
        mapStructConverter.update(request, arcana);
        return mapStructConverter.toView(arcanaRepository.saveAndFlush(arcana));
    }

    @Override
    @Transactional
    public void delete(UUID id) {
        Arcana arcana = findEntity(id);
        arcanaRepository.delete(arcana);
        arcanaRepository.flush();
    }

    private Arcana findEntity(UUID id) {
        return arcanaRepository.findById(id)
                .orElseThrow(() -> new BusinessException(GlobalErrorCodeEnum.ENTITY_NOT_FOUND, "Arcana"));
    }

    private void ensureSlugAvailable(String slug, UUID id) {
        boolean exists = id == null ? arcanaRepository.existsBySlug(slug)
                : arcanaRepository.existsBySlugAndIdNot(slug, id);
        if (exists) {
            throw new BusinessException(GlobalErrorCodeEnum.SLUG_ALREADY_EXISTS, "Arcana");
        }
    }

}
