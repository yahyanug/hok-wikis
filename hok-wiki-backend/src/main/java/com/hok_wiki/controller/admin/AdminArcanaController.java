package com.hok_wiki.controller.admin;

import java.net.URI;
import java.util.UUID;

import com.hok_wiki.dto.request.ArcanaRequest;
import com.hok_wiki.dto.response.ArcanaView;
import com.hok_wiki.dto.request.PageRequest;
import com.hok_wiki.dto.response.PageView;
import com.hok_wiki.security.AdminAuthentication;
import com.hok_wiki.service.ArcanaService;
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

@Tag(name = "03-arcana-admin")
@RestController
@RequestMapping("/api/admin/arcana")
@RequiredArgsConstructor
@Validated
@AdminAuthentication
public class AdminArcanaController {

	private final ArcanaService arcanaService;

	@GetMapping
	public ResponseEntity<PageView<ArcanaView>> findAll(@Valid @ModelAttribute PageRequest request) {
		return ResponseEntity.ok(arcanaService.findAll(request));
	}

	@GetMapping("/{id}")
	public ResponseEntity<ArcanaView> findById(@PathVariable("id") UUID id) {
		return ResponseEntity.ok(arcanaService.findById(id));
	}

	@PostMapping
	public ResponseEntity<ArcanaView> create(@Valid @RequestBody ArcanaRequest request) {
		ArcanaView created = arcanaService.create(request);
		return ResponseEntity.created(URI.create("/api/admin/arcana/" + created.id())).body(created);
	}

	@PutMapping("/{id}")
	public ResponseEntity<ArcanaView> update(@PathVariable("id") UUID id,
			@Valid @RequestBody ArcanaRequest request) {
		return ResponseEntity.ok(arcanaService.update(id, request));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") UUID id) {
		arcanaService.delete(id);
		return ResponseEntity.noContent().build();
	}

}
