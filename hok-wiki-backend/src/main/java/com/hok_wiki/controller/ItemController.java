package com.hok_wiki.controller;

import java.util.UUID;

import com.hok_wiki.dto.response.ItemView;
import com.hok_wiki.dto.request.PageRequest;
import com.hok_wiki.dto.response.PageView;
import com.hok_wiki.service.ItemService;
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

@Tag(name = "02-items")
@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
@Validated
public class ItemController {

	private final ItemService itemService;

	@GetMapping
	public ResponseEntity<PageView<ItemView>> findAll(@Valid @ModelAttribute PageRequest request) {
		return ResponseEntity.ok(itemService.findAll(request));
	}

	@GetMapping("/{slug}")
	public ResponseEntity<ItemView> findBySlug(@PathVariable("slug") @Size(min = 1, max = 128) String slug) {
		return ResponseEntity.ok(itemService.findBySlug(slug));
	}

	@GetMapping("/id/{id}")
	public ResponseEntity<ItemView> findById(@PathVariable("id") UUID id) {
		return ResponseEntity.ok(itemService.findById(id));
	}

}
