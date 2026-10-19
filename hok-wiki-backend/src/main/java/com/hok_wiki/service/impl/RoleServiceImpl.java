package com.hok_wiki.service.impl;

import java.util.UUID;

import com.hok_wiki.domain.Role;
import com.hok_wiki.constant.ErrorCodeGlobalEnum;
import com.hok_wiki.dto.response.RoleView;
import com.hok_wiki.dto.request.RoleRequest;
import com.hok_wiki.dto.request.PageRequest;
import com.hok_wiki.dto.response.PageView;
import com.hok_wiki.exception.BusinessException;
import com.hok_wiki.mapper.MapStructConverter;
import com.hok_wiki.repository.RoleRepository;
import com.hok_wiki.repository.HeroRepository;
import com.hok_wiki.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RoleServiceImpl implements RoleService {

	private final RoleRepository roleRepository;

	private final MapStructConverter mapStructConverter;

	private final HeroRepository heroRepository;

	@Override
	public PageView<RoleView> findAll(PageRequest request) {
		Page<Role> page = roleRepository.findAll(request.toPageable());
		return new PageView<>(page.getContent().stream().map(mapStructConverter::toView).toList(),
				page.getNumber(), page.getSize(), page.getTotalElements(), page.getTotalPages());
	}

	@Override
	public RoleView findBySlug(String slug) {
		return roleRepository.findBySlug(slug)
				.map(mapStructConverter::toView)
				.orElseThrow(() -> new BusinessException(ErrorCodeGlobalEnum.ENTITY_NOT_FOUND, "Role"));
	}

	@Override
	public RoleView findById(UUID id) {
		return mapStructConverter.toView(findEntity(id));
	}

	@Override
	@Transactional
	public RoleView create(RoleRequest request) {
		ensureSlugAvailable(request.slug(), null);
		Role role = mapStructConverter.toEntity(request);
		return mapStructConverter.toView(roleRepository.saveAndFlush(role));
	}

	@Override
	@Transactional
	public RoleView update(UUID id, RoleRequest request) {
		Role role = findEntity(id);
		ensureSlugAvailable(request.slug(), id);
		mapStructConverter.update(request, role);
		return mapStructConverter.toView(roleRepository.saveAndFlush(role));
	}

	@Override
	@Transactional
	public void delete(UUID id) {
		Role role = findEntity(id);
		if (heroRepository.existsByRoles_Id(id)) {
			throw new BusinessException(ErrorCodeGlobalEnum.RESOURCE_IN_USE, "Role");
		}
		roleRepository.delete(role);
		roleRepository.flush();
	}

	private Role findEntity(UUID id) {
		return roleRepository.findById(id)
				.orElseThrow(() -> new BusinessException(ErrorCodeGlobalEnum.ENTITY_NOT_FOUND, "Role"));
	}

	private void ensureSlugAvailable(String slug, UUID id) {
		boolean exists = id == null ? roleRepository.existsBySlug(slug)
				: roleRepository.existsBySlugAndIdNot(slug, id);
		if (exists) {
			throw new BusinessException(ErrorCodeGlobalEnum.SLUG_ALREADY_EXISTS, "Role");
		}
	}

}
