package com.hok_wiki.controller;

import java.util.UUID;
import java.util.List;

import com.hok_wiki.dto.request.PageRequest;
import com.hok_wiki.dto.response.PageView;
import com.hok_wiki.dto.response.SpellView;
import com.hok_wiki.service.SpellService;
import com.hok_wiki.service.CatalogService;
import com.hok_wiki.dto.response.CatalogSpellView;
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

@Tag(name = "04-spells")
@RestController
@RequestMapping("/api/spells")
@RequiredArgsConstructor
@Validated
public class SpellController {

	private final SpellService spellService;

	private final CatalogService catalogService;

	@GetMapping("/catalog")
	public ResponseEntity<List<CatalogSpellView>> catalog() {
		return ResponseEntity.ok(catalogService.findSpells());
	}

	@GetMapping
	public ResponseEntity<PageView<SpellView>> findAll(@Valid @ModelAttribute PageRequest request) {
		return ResponseEntity.ok(spellService.findAll(request));
	}

	@GetMapping("/{slug}")
	public ResponseEntity<SpellView> findBySlug(@PathVariable("slug") @Size(min = 1, max = 128) String slug) {
		return ResponseEntity.ok(spellService.findBySlug(slug));
	}

	@GetMapping("/id/{id}")
	public ResponseEntity<SpellView> findById(@PathVariable("id") UUID id) {
		return ResponseEntity.ok(spellService.findById(id));
	}

}
