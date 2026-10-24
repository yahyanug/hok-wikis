package com.hok_wiki.controller;

import com.hok_wiki.dto.response.CatalogItemView;
import com.hok_wiki.dto.response.ItemView;
import com.hok_wiki.service.ItemService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "02-items")
@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
@Validated
public class ItemController {

    private final ItemService itemService;

    @GetMapping("/catalog")
    public ResponseEntity<List<CatalogItemView>> catalog(
            @PageableDefault(size = 20, sort = {"name", "slug"}) Pageable pageable) {
        return ResponseEntity.ok(itemService.findAll(pageable));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ItemView> findBySlug(@PathVariable("slug") @Size(min = 1, max = 128) String slug) {
        return ResponseEntity.ok(itemService.findBySlug(slug));
    }


}
