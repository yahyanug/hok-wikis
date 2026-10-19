package com.hok_wiki.controller;

import java.util.Arrays;
import java.util.List;

import com.hok_wiki.constant.HeroLane;
import com.hok_wiki.dto.response.LaneView;
import com.hok_wiki.mapper.MapStructConverter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "05-lanes")
@RestController
@RequestMapping("/api/lanes")
@RequiredArgsConstructor
public class LaneController {

	private final MapStructConverter mapStructConverter;

	@GetMapping
	public ResponseEntity<List<LaneView>> findAll() {
		return ResponseEntity.ok(Arrays.stream(HeroLane.values()).map(mapStructConverter::toView).toList());
	}

	@GetMapping("/{slug}")
	public ResponseEntity<LaneView> findBySlug(@PathVariable("slug") HeroLane lane) {
		return ResponseEntity.ok(mapStructConverter.toView(lane));
	}

}
