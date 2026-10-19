package com.hok_wiki.service.impl;

import java.util.UUID;

import com.hok_wiki.domain.Item;
import com.hok_wiki.exception.GlobalErrorCodeEnum;
import com.hok_wiki.dto.response.ItemView;
import com.hok_wiki.dto.request.ItemRequest;
import com.hok_wiki.dto.request.PageRequest;
import com.hok_wiki.dto.response.PageView;
import com.hok_wiki.exception.BusinessException;
import com.hok_wiki.mapper.MapStructConverter;
import com.hok_wiki.repository.ItemRepository;
import com.hok_wiki.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ItemServiceImpl implements ItemService {

	private final ItemRepository itemRepository;

	private final MapStructConverter mapStructConverter;

	@Override
	public PageView<ItemView> findAll(PageRequest request) {
		Page<Item> page = itemRepository.findAll(request.toPageable());
		return new PageView<>(page.getContent().stream().map(mapStructConverter::toView).toList(),
				page.getNumber(), page.getSize(), page.getTotalElements(), page.getTotalPages());
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
