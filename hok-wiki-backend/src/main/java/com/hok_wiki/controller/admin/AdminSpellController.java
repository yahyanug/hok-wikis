package com.hok_wiki.controller.admin;

import java.net.URI;
import java.util.UUID;

import com.hok_wiki.dto.request.PageRequest;
import com.hok_wiki.dto.response.PageView;
import com.hok_wiki.dto.request.SpellRequest;
import com.hok_wiki.dto.response.SpellView;
import com.hok_wiki.security.AdminAuthentication;
import com.hok_wiki.service.SpellService;
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

@Tag(name = "04-spells-admin")
@RestController
@RequestMapping("/api/admin/spells")
@RequiredArgsConstructor
@Validated
@AdminAuthentication
public class AdminSpellController {

	private final SpellService spellService;

	@GetMapping
	public ResponseEntity<PageView<SpellView>> findAll(@Valid @ModelAttribute PageRequest request) {
		return ResponseEntity.ok(spellService.findAll(request));
	}

	@GetMapping("/{id}")
	public ResponseEntity<SpellView> findById(@PathVariable("id") UUID id) {
		return ResponseEntity.ok(spellService.findById(id));
	}

	@PostMapping
	public ResponseEntity<SpellView> create(@Valid @RequestBody SpellRequest request) {
		SpellView created = spellService.create(request);
		return ResponseEntity.created(URI.create("/api/admin/spells/" + created.id())).body(created);
	}

	@PutMapping("/{id}")
	public ResponseEntity<SpellView> update(@PathVariable("id") UUID id,
			@Valid @RequestBody SpellRequest request) {
		return ResponseEntity.ok(spellService.update(id, request));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") UUID id) {
		spellService.delete(id);
		return ResponseEntity.noContent().build();
	}

}
