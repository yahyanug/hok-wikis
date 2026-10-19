package com.hok_wiki.controller.admin;

import java.net.URI;
import java.util.UUID;

import com.hok_wiki.dto.request.HeroListRequest;
import com.hok_wiki.dto.response.HeroPage;
import com.hok_wiki.dto.request.HeroRequest;
import com.hok_wiki.dto.response.HeroView;
import com.hok_wiki.security.AdminAuthentication;
import com.hok_wiki.service.HeroService;
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

@Tag(name = "01-heroes-admin")
@RestController
@RequestMapping("/api/admin/heroes")
@RequiredArgsConstructor
@Validated
@AdminAuthentication
public class AdminHeroController {

	private final HeroService heroService;

	@GetMapping
	public ResponseEntity<HeroPage> findAll(@Valid @ModelAttribute HeroListRequest request) {
		return ResponseEntity.ok(heroService.findHeroes(request.toCriteria()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<HeroView> findById(@PathVariable("id") UUID id) {
		return ResponseEntity.ok(heroService.findById(id));
	}

	@PostMapping
	public ResponseEntity<HeroView> create(@Valid @RequestBody HeroRequest request) {
		HeroView created = heroService.create(request);
		return ResponseEntity.created(URI.create("/api/admin/heroes/" + created.id())).body(created);
	}

	@PutMapping("/{id}")
	public ResponseEntity<HeroView> update(@PathVariable("id") UUID id,
			@Valid @RequestBody HeroRequest request) {
		return ResponseEntity.ok(heroService.update(id, request));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") UUID id) {
		heroService.delete(id);
		return ResponseEntity.noContent().build();
	}

}
