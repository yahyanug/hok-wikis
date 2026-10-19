package com.hok_wiki.controller;

import java.util.UUID;

import com.hok_wiki.dto.response.LaneView;
import com.hok_wiki.dto.request.PageRequest;
import com.hok_wiki.dto.response.PageView;
import com.hok_wiki.service.LaneService;
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

@Tag(name = "05-lanes")
@RestController
@RequestMapping("/api/lanes")
@RequiredArgsConstructor
@Validated
public class LaneController {

	private final LaneService laneService;

	@GetMapping
	public ResponseEntity<PageView<LaneView>> findAll(@Valid @ModelAttribute PageRequest request) {
		return ResponseEntity.ok(laneService.findAll(request));
	}

	@GetMapping("/{slug}")
	public ResponseEntity<LaneView> findBySlug(@PathVariable("slug") @Size(min = 1, max = 128) String slug) {
		return ResponseEntity.ok(laneService.findBySlug(slug));
	}

	@GetMapping("/id/{id}")
	public ResponseEntity<LaneView> findById(@PathVariable("id") UUID id) {
		return ResponseEntity.ok(laneService.findById(id));
	}

}
