package com.hok_wiki.controller.admin;

import java.net.URI;
import java.util.UUID;

import com.hok_wiki.dto.request.ItemRequest;
import com.hok_wiki.dto.response.ItemView;
import com.hok_wiki.dto.request.PageRequest;
import com.hok_wiki.dto.response.PageView;
import com.hok_wiki.security.AdminAuthentication;
import com.hok_wiki.service.ItemService;
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

@Tag(name = "02-items-admin")
@RestController
@RequestMapping("/api/admin/items")
@RequiredArgsConstructor
@Validated
@AdminAuthentication
public class AdminItemController {

	private final ItemService itemService;

	@GetMapping
	public ResponseEntity<PageView<ItemView>> findAll(@Valid @ModelAttribute PageRequest request) {
		return ResponseEntity.ok(itemService.findAll(request));
	}

	@GetMapping("/{id}")
	public ResponseEntity<ItemView> findById(@PathVariable("id") UUID id) {
		return ResponseEntity.ok(itemService.findById(id));
	}

	@PostMapping
	public ResponseEntity<ItemView> create(@Valid @RequestBody ItemRequest request) {
		ItemView created = itemService.create(request);
		return ResponseEntity.created(URI.create("/api/admin/items/" + created.id())).body(created);
	}

	@PutMapping("/{id}")
	public ResponseEntity<ItemView> update(@PathVariable("id") UUID id,
			@Valid @RequestBody ItemRequest request) {
		return ResponseEntity.ok(itemService.update(id, request));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") UUID id) {
		itemService.delete(id);
		return ResponseEntity.noContent().build();
	}

}
