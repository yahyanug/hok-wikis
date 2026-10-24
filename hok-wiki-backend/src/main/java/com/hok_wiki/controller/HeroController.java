package com.hok_wiki.controller;

import com.hok_wiki.constant.HeroLane;
import com.hok_wiki.constant.HeroRole;
import com.hok_wiki.dto.response.HeroPage;
import com.hok_wiki.dto.response.HeroView;
import com.hok_wiki.service.HeroService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Tag(name = "01-heroes")
@RestController
@RequestMapping("/api/heroes")
@RequiredArgsConstructor
@Validated
public class HeroController {

    private final HeroService heroService;

    @GetMapping("/catalog/by-role-and-lane")
    public ResponseEntity<HeroPage> findByRole(@RequestParam(required = false) HeroRole role,
                                               @RequestParam(required = false) HeroLane lane,
                                               @PageableDefault(size = 20, sort = {"name", "slug"}) Pageable pageable) {
        return ResponseEntity.ok(heroService.findHeroes(role, lane, pageable));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<HeroView> findBySlug(@PathVariable("slug") @Size(min = 1, max = 128) String slug) {
        return ResponseEntity.ok(heroService.findBySlug(slug));
    }



}
