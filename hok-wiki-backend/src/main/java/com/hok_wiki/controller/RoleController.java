package com.hok_wiki.controller;

import java.util.Arrays;
import java.util.List;

import com.hok_wiki.constant.HeroRole;
import com.hok_wiki.dto.response.RoleView;
import com.hok_wiki.mapper.MapStructConverter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "06-roles")
@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {

	private final MapStructConverter mapStructConverter;

	@GetMapping
	public ResponseEntity<List<RoleView>> findAll() {
		return ResponseEntity.ok(Arrays.stream(HeroRole.values()).map(mapStructConverter::toView).toList());
	}

	@GetMapping("/{slug}")
	public ResponseEntity<RoleView> findBySlug(@PathVariable("slug") HeroRole role) {
		return ResponseEntity.ok(mapStructConverter.toView(role));
	}

}
