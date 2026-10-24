package com.hok_wiki.service.impl;

import com.hok_wiki.domain.Item;
import com.hok_wiki.dto.request.ItemRequest;
import com.hok_wiki.dto.response.ItemView;
import com.hok_wiki.dto.response.CatalogItemView;
import com.hok_wiki.exception.BusinessException;
import com.hok_wiki.exception.GlobalErrorCodeEnum;
import com.hok_wiki.mapper.MapStructConverter;
import com.hok_wiki.repository.ItemRepository;
import com.hok_wiki.service.ItemService;
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
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    private final MapStructConverter mapStructConverter;

    @Override
    public List<CatalogItemView> findAll(Pageable pageable) {
        if (pageable == null || pageable.isUnpaged() || pageable.getPageSize() > 100
                || pageable.getOffset() > Integer.MAX_VALUE
                || pageable.getSort().stream().anyMatch(order -> !Set.of("id", "name", "slug")
                        .contains(order.getProperty()) || order.isIgnoreCase() && "id".equals(order.getProperty()))) {
            throw new BusinessException(GlobalErrorCodeEnum.INVALID_ARGUMENT);
        }
        return itemRepository.findAll(pageable).getContent().stream()
                .map(mapStructConverter::toView).map(mapStructConverter::toCatalog).toList();
    }

    @Override
    public ItemView findBySlug(String slug) {
        return itemRepository.findBySlug(slug)
                .map(mapStructConverter::toView)
                .orElseThrow(() -> new BusinessException(GlobalErrorCodeEnum.ENTITY_NOT_FOUND, "Item"));
    }

    @Override
    public ItemView findById(UUID id) {
        return mapStructConverter.toView(findEntity(id));
    }

    @Override
    @Transactional
    public ItemView create(ItemRequest request) {
        ensureSlugAvailable(request.slug(), null);
        Item item = mapStructConverter.toEntity(request);
        return mapStructConverter.toView(itemRepository.saveAndFlush(item));
    }

    @Override
    @Transactional
    public ItemView update(UUID id, ItemRequest request) {
        Item item = findEntity(id);
        ensureSlugAvailable(request.slug(), id);
        mapStructConverter.update(request, item);
        return mapStructConverter.toView(itemRepository.saveAndFlush(item));
    }

    @Override
    @Transactional
    public void delete(UUID id) {
        Item item = findEntity(id);
        itemRepository.delete(item);
        itemRepository.flush();
    }

    private Item findEntity(UUID id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new BusinessException(GlobalErrorCodeEnum.ENTITY_NOT_FOUND, "Item"));
    }

    private void ensureSlugAvailable(String slug, UUID id) {
        boolean exists = id == null ? itemRepository.existsBySlug(slug)
                : itemRepository.existsBySlugAndIdNot(slug, id);
        if (exists) {
            throw new BusinessException(GlobalErrorCodeEnum.SLUG_ALREADY_EXISTS, "Item");
        }
    }

}
