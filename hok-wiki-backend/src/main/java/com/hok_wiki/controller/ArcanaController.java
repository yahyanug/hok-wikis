package com.hok_wiki.controller;

import java.util.UUID;
import java.util.List;

import com.hok_wiki.dto.response.ArcanaView;
import com.hok_wiki.dto.request.PageRequest;
import com.hok_wiki.dto.response.PageView;
import com.hok_wiki.service.ArcanaService;
import com.hok_wiki.service.CatalogService;
import com.hok_wiki.dto.response.CatalogArcanaView;
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

@Tag(name = "03-arcana")
@RestController
@RequestMapping("/api/arcana")
@RequiredArgsConstructor
@Validated
public class ArcanaController {

	private final ArcanaService arcanaService;

	private final CatalogService catalogService;

	@GetMapping("/catalog")
	public ResponseEntity<List<CatalogArcanaView>> catalog() {
		return ResponseEntity.ok(catalogService.findArcana());
	}

	@GetMapping
	public ResponseEntity<PageView<ArcanaView>> findAll(@Valid @ModelAttribute PageRequest request) {
		return ResponseEntity.ok(arcanaService.findAll(request));
	}

	@GetMapping("/{slug}")
	public ResponseEntity<ArcanaView> findBySlug(@PathVariable("slug") @Size(min = 1, max = 128) String slug) {
		return ResponseEntity.ok(arcanaService.findBySlug(slug));
	}

	@GetMapping("/id/{id}")
	public ResponseEntity<ArcanaView> findById(@PathVariable("id") UUID id) {
		return ResponseEntity.ok(arcanaService.findById(id));
	}

}
