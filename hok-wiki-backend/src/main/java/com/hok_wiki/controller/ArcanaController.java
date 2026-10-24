package com.hok_wiki.controller;

import com.hok_wiki.dto.response.ArcanaView;
import com.hok_wiki.dto.response.CatalogArcanaView;
import com.hok_wiki.service.ArcanaService;
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

@Tag(name = "03-arcana")
@RestController
@RequestMapping("/api/arcana")
@RequiredArgsConstructor
@Validated
public class ArcanaController {

    private final ArcanaService arcanaService;

    @GetMapping("/catalog")
    public ResponseEntity<List<CatalogArcanaView>> catalog(
            @PageableDefault(size = 20, sort = {"name", "slug"}) Pageable pageable) {
        return ResponseEntity.ok(arcanaService.findAll(pageable));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ArcanaView> findBySlug(@PathVariable("slug") @Size(min = 1, max = 128) String slug) {
        return ResponseEntity.ok(arcanaService.findBySlug(slug));
    }

}
