package com.hok_wiki.controller;

import com.hok_wiki.constant.HeroLane;
import com.hok_wiki.constant.HeroRole;
import com.hok_wiki.dto.response.HeroPage;
import com.hok_wiki.dto.request.HeroSearchCriteria;
import com.hok_wiki.dto.response.HeroView;
import com.hok_wiki.dto.request.PageRequest;
import com.hok_wiki.service.HeroService;
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

@Tag(name="01-heroes")
@RestController
@RequestMapping("/api/heroes")
@RequiredArgsConstructor
@Validated
public class HeroController {

	private final HeroService heroService;

	@GetMapping("/{slug}")
	public ResponseEntity<HeroView> findBySlug(@PathVariable("slug") @Size(min = 1, max = 128) String slug) {
		return ResponseEntity.ok(heroService.findBySlug(slug));
	}

	@GetMapping("/by-role/{role}")
	public ResponseEntity<HeroPage> findByRole(
			@PathVariable("role") HeroRole role,
			@Valid @ModelAttribute PageRequest request) {
		return ResponseEntity.ok(heroService.findHeroes(
				new HeroSearchCriteria(role, null, request.getPage(), request.getSize())));
	}

	@GetMapping("/by-lane/{lane}")
	public ResponseEntity<HeroPage> findByLane(
			@PathVariable("lane") HeroLane lane,
			@Valid @ModelAttribute PageRequest request) {
		return ResponseEntity.ok(heroService.findHeroes(
				new HeroSearchCriteria(null, lane, request.getPage(), request.getSize())));
	}

}
