package com.hok_wiki.controller;

import com.hok_wiki.dto.response.CatalogSpellView;
import com.hok_wiki.dto.response.SpellView;
import com.hok_wiki.service.SpellService;
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

@Tag(name = "04-spells")
@RestController
@RequestMapping("/api/spells")
@RequiredArgsConstructor
@Validated
public class SpellController {

    private final SpellService spellService;

    @GetMapping("/catalog")
    public ResponseEntity<List<CatalogSpellView>> catalog(
            @PageableDefault(size = 20, sort = {"name", "slug"}) Pageable pageable) {
        return ResponseEntity.ok(spellService.findAll(pageable));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<SpellView> findBySlug(@PathVariable("slug") @Size(min = 1, max = 128) String slug) {
        return ResponseEntity.ok(spellService.findBySlug(slug));
    }

}
