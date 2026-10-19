package com.hok_wiki.controller;

import java.util.UUID;

import com.hok_wiki.dto.request.PageRequest;
import com.hok_wiki.dto.response.PageView;
import com.hok_wiki.dto.response.RoleView;
import com.hok_wiki.service.RoleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "06-roles")
@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
@Validated
public class RoleController {

	private final RoleService roleService;

	@GetMapping
	public ResponseEntity<PageView<RoleView>> findAll(@Valid @ModelAttribute PageRequest request) {
		return ResponseEntity.ok(roleService.findAll(request));
	}

	@GetMapping("/{slug}")
	public ResponseEntity<RoleView> findBySlug(@PathVariable("slug") @Size(min = 1, max = 128) String slug) {
		return ResponseEntity.ok(roleService.findBySlug(slug));
	}

	@GetMapping("/id/{id}")
	public ResponseEntity<RoleView> findById(@PathVariable("id") UUID id) {
		return ResponseEntity.ok(roleService.findById(id));
	}

}
