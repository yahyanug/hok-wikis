package com.hok_wiki.service.impl;

import java.util.UUID;

import com.hok_wiki.domain.Lane;
import com.hok_wiki.constant.ErrorCodeGlobalEnum;
import com.hok_wiki.dto.response.LaneView;
import com.hok_wiki.dto.request.LaneRequest;
import com.hok_wiki.dto.request.PageRequest;
import com.hok_wiki.dto.response.PageView;
import com.hok_wiki.exception.BusinessException;
import com.hok_wiki.mapper.MapStructConverter;
import com.hok_wiki.repository.LaneRepository;
import com.hok_wiki.repository.HeroRepository;
import com.hok_wiki.service.LaneService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LaneServiceImpl implements LaneService {

	private final LaneRepository laneRepository;

	private final MapStructConverter mapStructConverter;

	private final HeroRepository heroRepository;

	@Override
	public PageView<LaneView> findAll(PageRequest request) {
		Page<Lane> page = laneRepository.findAll(request.toPageable());
		return new PageView<>(page.getContent().stream().map(mapStructConverter::toView).toList(),
				page.getNumber(), page.getSize(), page.getTotalElements(), page.getTotalPages());
	}

	@Override
	public LaneView findBySlug(String slug) {
		return laneRepository.findBySlug(slug)
				.map(mapStructConverter::toView)
				.orElseThrow(() -> new BusinessException(ErrorCodeGlobalEnum.ENTITY_NOT_FOUND, "Lane"));
	}

	@Override
	public LaneView findById(UUID id) {
		return mapStructConverter.toView(findEntity(id));
	}

	@Override
	@Transactional
	public LaneView create(LaneRequest request) {
		ensureSlugAvailable(request.slug(), null);
		Lane lane = mapStructConverter.toEntity(request);
		return mapStructConverter.toView(laneRepository.saveAndFlush(lane));
	}

	@Override
	@Transactional
	public LaneView update(UUID id, LaneRequest request) {
		Lane lane = findEntity(id);
		ensureSlugAvailable(request.slug(), id);
		mapStructConverter.update(request, lane);
		return mapStructConverter.toView(laneRepository.saveAndFlush(lane));
	}

	@Override
	@Transactional
	public void delete(UUID id) {
		Lane lane = findEntity(id);
		if (heroRepository.existsByLanes_Id(id)) {
			throw new BusinessException(ErrorCodeGlobalEnum.RESOURCE_IN_USE, "Lane");
		}
		laneRepository.delete(lane);
		laneRepository.flush();
	}

	private Lane findEntity(UUID id) {
		return laneRepository.findById(id)
				.orElseThrow(() -> new BusinessException(ErrorCodeGlobalEnum.ENTITY_NOT_FOUND, "Lane"));
	}

	private void ensureSlugAvailable(String slug, UUID id) {
		boolean exists = id == null ? laneRepository.existsBySlug(slug)
				: laneRepository.existsBySlugAndIdNot(slug, id);
		if (exists) {
			throw new BusinessException(ErrorCodeGlobalEnum.SLUG_ALREADY_EXISTS, "Lane");
		}
	}

}
