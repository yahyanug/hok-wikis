package com.hok_wiki.controller.admin;

import java.net.URI;
import java.util.UUID;

import com.hok_wiki.dto.request.PageRequest;
import com.hok_wiki.dto.response.PageView;
import com.hok_wiki.dto.request.RoleRequest;
import com.hok_wiki.dto.response.RoleView;
import com.hok_wiki.security.AdminAuthentication;
import com.hok_wiki.service.RoleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "06-roles-admin")
@RestController
@RequestMapping("/api/admin/roles")
@RequiredArgsConstructor
@Validated
@AdminAuthentication
public class AdminRoleController {

	private final RoleService roleService;

	@GetMapping
	public ResponseEntity<PageView<RoleView>> findAll(@Valid @ModelAttribute PageRequest request) {
		return ResponseEntity.ok(roleService.findAll(request));
	}

	@GetMapping("/{id}")
	public ResponseEntity<RoleView> findById(@PathVariable("id") UUID id) {
		return ResponseEntity.ok(roleService.findById(id));
	}

	@PostMapping
	public ResponseEntity<RoleView> create(@Valid @RequestBody RoleRequest request) {
		RoleView created = roleService.create(request);
		return ResponseEntity.created(URI.create("/api/admin/roles/" + created.id())).body(created);
	}

	@PutMapping("/{id}")
	public ResponseEntity<RoleView> update(@PathVariable("id") UUID id,
			@Valid @RequestBody RoleRequest request) {
		return ResponseEntity.ok(roleService.update(id, request));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") UUID id) {
		roleService.delete(id);
		return ResponseEntity.noContent().build();
	}

}
