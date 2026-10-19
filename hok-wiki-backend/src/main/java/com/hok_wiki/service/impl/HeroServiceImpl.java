package com.hok_wiki.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.HashSet;
import java.util.Set;

import com.hok_wiki.domain.Hero;
import com.hok_wiki.domain.Lane;
import com.hok_wiki.domain.Role;
import com.hok_wiki.repository.LaneRepository;
import com.hok_wiki.repository.RoleRepository;

import com.hok_wiki.dto.response.HeroPage;
import com.hok_wiki.dto.request.HeroSearchCriteria;
import com.hok_wiki.dto.response.HeroView;
import com.hok_wiki.dto.request.HeroRequest;
import com.hok_wiki.exception.HeroErrorCodeEnum;
import com.hok_wiki.exception.BusinessException;
import com.hok_wiki.mapper.MapStructConverter;
import com.hok_wiki.repository.HeroRepository;
import com.hok_wiki.service.HeroService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HeroServiceImpl implements HeroService {

	private final HeroRepository heroRepository;

	private final MapStructConverter mapStructConverter;

	private final RoleRepository roleRepository;

	private final LaneRepository laneRepository;

	@Override
	public HeroPage findHeroes(HeroSearchCriteria criteria) {
		Objects.requireNonNull(criteria, "criteria must not be null");
		Page<UUID> heroIds = heroRepository.findPageIds(criteria.role(), criteria.lane(),
				PageRequest.of(criteria.page(), criteria.size()));
		List<HeroView> heroes = heroIds.isEmpty() ? List.of()
				: heroRepository.findAllWithRolesAndLanes(heroIds.getContent()).stream()
						.map(mapStructConverter::toView).toList();
		return new HeroPage(heroes, heroIds.getNumber(), heroIds.getSize(), heroIds.getTotalElements(),
				heroIds.getTotalPages());
	}

	@Override
	public HeroView findBySlug(String slug) {
		return heroRepository.findBySlugWithRolesAndLanes(slug)
				.map(mapStructConverter::toView)
				.orElseThrow(() -> new BusinessException(HeroErrorCodeEnum.NOT_FOUND));
	}

	@Override
	public HeroView findById(UUID id) {
		return mapStructConverter.toView(findEntity(id));
	}

	@Override
	@Transactional
	public HeroView create(HeroRequest request) {
		ensureSlugAvailable(request.slug(), null);
		Hero hero = mapStructConverter.toEntity(request);
		setClassifications(hero, request);
		return mapStructConverter.toView(heroRepository.saveAndFlush(hero));
	}

	@Override
	@Transactional
	public HeroView update(UUID id, HeroRequest request) {
		Hero hero = findEntity(id);
		ensureSlugAvailable(request.slug(), id);
		mapStructConverter.update(request, hero);
		setClassifications(hero, request);
		return mapStructConverter.toView(heroRepository.saveAndFlush(hero));
	}

	@Override
	@Transactional
	public void delete(UUID id) {
		Hero hero = findEntity(id);
		heroRepository.delete(hero);
		heroRepository.flush();
	}

	private Hero findEntity(UUID id) {
		return heroRepository.findByIdWithRolesAndLanes(id)
				.orElseThrow(() -> new BusinessException(HeroErrorCodeEnum.NOT_FOUND));
	}

	private void ensureSlugAvailable(String slug, UUID id) {
		boolean exists = id == null ? heroRepository.existsBySlug(slug)
				: heroRepository.existsBySlugAndIdNot(slug, id);
		if (exists) {
			throw new BusinessException(HeroErrorCodeEnum.SLUG_ALREADY_EXISTS);
		}
	}

	private void setClassifications(Hero hero, HeroRequest request) {
		Set<Role> roles = new HashSet<>(roleRepository.findAllById(request.roleIds()));
		Set<Lane> lanes = new HashSet<>(laneRepository.findAllById(request.laneIds()));
		if (roles.size() != request.roleIds().size()) {
			throw new BusinessException(HeroErrorCodeEnum.ROLE_NOT_FOUND);
		}
		if (lanes.size() != request.laneIds().size()) {
			throw new BusinessException(HeroErrorCodeEnum.LANE_NOT_FOUND);
		}
		hero.getRoles().clear();
		hero.getRoles().addAll(roles);
		hero.getLanes().clear();
		hero.getLanes().addAll(lanes);
	}

}
