package com.hok_wiki.controller.admin;

import java.net.URI;
import java.util.UUID;

import com.hok_wiki.dto.request.LaneRequest;
import com.hok_wiki.dto.response.LaneView;
import com.hok_wiki.dto.request.PageRequest;
import com.hok_wiki.dto.response.PageView;
import com.hok_wiki.security.AdminAuthentication;
import com.hok_wiki.service.LaneService;
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

@Tag(name = "05-lanes-admin")
@RestController
@RequestMapping("/api/admin/lanes")
@RequiredArgsConstructor
@Validated
@AdminAuthentication
public class AdminLaneController {

	private final LaneService laneService;

	@GetMapping
	public ResponseEntity<PageView<LaneView>> findAll(@Valid @ModelAttribute PageRequest request) {
		return ResponseEntity.ok(laneService.findAll(request));
	}

	@GetMapping("/{id}")
	public ResponseEntity<LaneView> findById(@PathVariable("id") UUID id) {
		return ResponseEntity.ok(laneService.findById(id));
	}

	@PostMapping
	public ResponseEntity<LaneView> create(@Valid @RequestBody LaneRequest request) {
		LaneView created = laneService.create(request);
		return ResponseEntity.created(URI.create("/api/admin/lanes/" + created.id())).body(created);
	}

	@PutMapping("/{id}")
	public ResponseEntity<LaneView> update(@PathVariable("id") UUID id,
			@Valid @RequestBody LaneRequest request) {
		return ResponseEntity.ok(laneService.update(id, request));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") UUID id) {
		laneService.delete(id);
		return ResponseEntity.noContent().build();
	}

}
