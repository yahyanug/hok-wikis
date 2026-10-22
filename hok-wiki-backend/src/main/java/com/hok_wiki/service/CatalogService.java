package com.hok_wiki.service;

import java.util.List;

import com.hok_wiki.constant.HeroLane;
import com.hok_wiki.constant.HeroRole;
import com.hok_wiki.dto.response.CatalogArcanaView;
import com.hok_wiki.dto.response.CatalogHeroView;
import com.hok_wiki.dto.response.CatalogItemView;
import com.hok_wiki.dto.response.CatalogSpellView;

public interface CatalogService {

	List<CatalogHeroView> findHeroes(HeroRole role, HeroLane lane);

	List<CatalogItemView> findItems();

	List<CatalogArcanaView> findArcana();

	List<CatalogSpellView> findSpells();

}
