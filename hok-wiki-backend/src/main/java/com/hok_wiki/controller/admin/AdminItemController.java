package com.hok_wiki.controller.admin;

import com.hok_wiki.dto.request.ItemRequest;
import com.hok_wiki.dto.response.ItemView;
import com.hok_wiki.security.AdminAuthentication;
import com.hok_wiki.service.ItemService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@Tag(name = "02-items-admin")
@RestController
@RequestMapping("/api/admin/items")
@RequiredArgsConstructor
@Validated
@AdminAuthentication
public class AdminItemController {

    private final ItemService itemService;

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
