package com.hok_wiki.service.impl;

import com.hok_wiki.constant.HeroLane;
import com.hok_wiki.constant.HeroRole;
import com.hok_wiki.domain.Hero;
import com.hok_wiki.dto.request.HeroRequest;
import com.hok_wiki.dto.response.HeroPage;
import com.hok_wiki.dto.response.HeroView;
import com.hok_wiki.exception.BusinessException;
import com.hok_wiki.exception.GlobalErrorCodeEnum;
import com.hok_wiki.mapper.MapStructConverter;
import com.hok_wiki.repository.HeroRepository;
import com.hok_wiki.service.HeroService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HeroServiceImpl implements HeroService {

    private final HeroRepository heroRepository;

    private final MapStructConverter mapStructConverter;

    @Override
    public HeroPage findHeroes(HeroRole heroRole, HeroLane heroLane, Pageable pageable) {
        if (pageable == null || pageable.isUnpaged() || pageable.getPageSize() > 100
                || pageable.getOffset() > Integer.MAX_VALUE
                || pageable.getSort().stream().anyMatch(order -> !Set.of("id", "name", "slug")
                        .contains(order.getProperty()) || order.isIgnoreCase() && "id".equals(order.getProperty()))) {
            throw new BusinessException(GlobalErrorCodeEnum.INVALID_ARGUMENT);
        }
        Page<UUID> heroIds = heroRepository.findPageIds(heroRole, heroLane, pageable);
        Map<UUID, Hero> heroesById = heroIds.isEmpty() ? Map.of()
                : heroRepository.findAllWithRolesAndLanes(heroIds.getContent()).stream()
                        .collect(Collectors.toMap(Hero::getId, Function.identity()));
        List<HeroView> heroes = heroIds.stream().map(heroesById::get).filter(Objects::nonNull)
                .map(mapStructConverter::toView).toList();
        return new HeroPage(heroes, heroIds.getNumber(), heroIds.getSize(), heroIds.getTotalElements(),
                heroIds.getTotalPages());
    }

    @Override
    public HeroView findBySlug(String slug) {
        return heroRepository.findBySlugWithRolesAndLanes(slug)
                .map(mapStructConverter::toView)
                .orElseThrow(() -> new BusinessException(GlobalErrorCodeEnum.ENTITY_NOT_FOUND, "Hero"));
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
                .orElseThrow(() -> new BusinessException(GlobalErrorCodeEnum.ENTITY_NOT_FOUND, "Hero"));
    }

    private void ensureSlugAvailable(String slug, UUID id) {
        boolean exists = id == null ? heroRepository.existsBySlug(slug)
                : heroRepository.existsBySlugAndIdNot(slug, id);
        if (exists) {
            throw new BusinessException(GlobalErrorCodeEnum.SLUG_ALREADY_EXISTS, "Hero");
        }
    }

    private void setClassifications(Hero hero, HeroRequest request) {
        Set<HeroRole> roles = new HashSet<>(request.roles());
        Set<HeroLane> lanes = new HashSet<>(request.lanes());
        hero.getRoles().clear();
        hero.getRoles().addAll(roles);
        hero.getLanes().clear();
        hero.getLanes().addAll(lanes);
    }

}
