package com.hok_wiki.controller.admin;

import com.hok_wiki.dto.request.HeroRequest;
import com.hok_wiki.dto.response.HeroView;
import com.hok_wiki.security.AdminAuthentication;
import com.hok_wiki.service.HeroService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@Tag(name = "01-heroes-admin")
@RestController
@RequestMapping("/api/admin/heroes")
@RequiredArgsConstructor
@Validated
@AdminAuthentication
public class AdminHeroController {

    private final HeroService heroService;

    @PostMapping
    public ResponseEntity<HeroView> create(@Valid @RequestBody HeroRequest request) {
        HeroView created = heroService.create(request);
        return ResponseEntity.created(URI.create("/api/admin/heroes/" + created.id())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HeroView> update(@PathVariable("id") UUID id,
                                           @Valid @RequestBody HeroRequest request) {
        return ResponseEntity.ok(heroService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") UUID id) {
        heroService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
