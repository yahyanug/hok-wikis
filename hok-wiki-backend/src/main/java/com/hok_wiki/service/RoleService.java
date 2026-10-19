package com.hok_wiki.service;

import java.util.UUID;

import com.hok_wiki.dto.request.RoleRequest;

import com.hok_wiki.dto.response.RoleView;
import com.hok_wiki.dto.request.PageRequest;
import com.hok_wiki.dto.response.PageView;

public interface RoleService {

	PageView<RoleView> findAll(PageRequest request);

	RoleView findBySlug(String slug);

	RoleView findById(UUID id);

	RoleView create(RoleRequest request);

	RoleView update(UUID id, RoleRequest request);

	void delete(UUID id);

}
