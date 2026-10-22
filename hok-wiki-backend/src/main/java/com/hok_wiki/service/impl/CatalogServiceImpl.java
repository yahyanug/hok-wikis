package com.hok_wiki.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.function.IntFunction;

import com.hok_wiki.constant.HeroLane;
import com.hok_wiki.constant.HeroRole;
import com.hok_wiki.dto.request.HeroSearchCriteria;
import com.hok_wiki.dto.request.PageRequest;
import com.hok_wiki.dto.response.CatalogArcanaView;
import com.hok_wiki.dto.response.CatalogHeroView;
import com.hok_wiki.dto.response.CatalogItemView;
import com.hok_wiki.dto.response.CatalogSpellView;
import com.hok_wiki.dto.response.HeroPage;
import com.hok_wiki.dto.response.HeroView;
import com.hok_wiki.dto.response.ItemView;
import com.hok_wiki.dto.response.PageView;
import com.hok_wiki.exception.ApiError;
import com.hok_wiki.exception.BusinessException;
import com.hok_wiki.exception.GlobalErrorCodeEnum;
import com.hok_wiki.mapper.MapStructConverter;
import com.hok_wiki.service.ArcanaService;
import com.hok_wiki.service.CatalogService;
import com.hok_wiki.service.HeroService;
import com.hok_wiki.service.ItemService;
import com.hok_wiki.service.SpellService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true, isolation = Isolation.REPEATABLE_READ)
public class CatalogServiceImpl implements CatalogService {

	private static final int PAGE_SIZE = 100;

	private static final int MAX_CATALOG_SIZE = 2000;

	private final HeroService heroService;

	private final ItemService itemService;

	private final ArcanaService arcanaService;

	private final SpellService spellService;

	private final MapStructConverter mapStructConverter;

	@Override
	public List<CatalogHeroView> findHeroes(HeroRole role, HeroLane lane) {
		List<HeroView> heroes = readCatalog(page -> {
			HeroPage result = heroService.findHeroes(new HeroSearchCriteria(role, lane, page, PAGE_SIZE));
			return new PageView<>(result.items(), result.page(), result.size(), result.totalElements(), result.totalPages());
		});
		return heroes.stream().map(mapStructConverter::toCatalog).toList();
	}

	@Override
	public List<CatalogItemView> findItems() {
		List<ItemView> items = readCatalog(page -> itemService.findAll(pageRequest(page)));
		if (items.stream().anyMatch(item -> item.category() == null)) {
			throw unavailable("An item category must be completed before publishing the catalog");
		}
		return items.stream().map(mapStructConverter::toCatalog).toList();
	}

	@Override
	public List<CatalogArcanaView> findArcana() {
		return readCatalog(page -> arcanaService.findAll(pageRequest(page))).stream()
				.map(mapStructConverter::toCatalog).toList();
	}

	@Override
	public List<CatalogSpellView> findSpells() {
		return readCatalog(page -> spellService.findAll(pageRequest(page))).stream()
				.map(mapStructConverter::toCatalog).toList();
	}

	private <T> List<T> readCatalog(IntFunction<PageView<T>> pageLoader) {
		PageView<T> firstPage = pageLoader.apply(0);
		if (firstPage.totalElements() > MAX_CATALOG_SIZE) {
			throw unavailable("This catalog exceeds the array endpoint limit; use the paginated API");
		}
		List<T> items = new ArrayList<>(firstPage.items());
		for (int page = 1; page < firstPage.totalPages(); page++) {
			items.addAll(pageLoader.apply(page).items());
		}
		return items;
	}

	private PageRequest pageRequest(int page) {
		PageRequest request = new PageRequest();
		request.setPage(page);
		request.setSize(PAGE_SIZE);
		return request;
	}

	private BusinessException unavailable(String message) {
		return new BusinessException(new ApiError(HttpStatus.SERVICE_UNAVAILABLE,
				GlobalErrorCodeEnum.HTTP_ERROR, message, List.of()));
	}

}
