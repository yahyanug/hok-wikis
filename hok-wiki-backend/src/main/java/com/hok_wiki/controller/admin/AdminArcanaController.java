package com.hok_wiki.controller.admin;

import com.hok_wiki.dto.request.ArcanaRequest;
import com.hok_wiki.dto.response.ArcanaView;
import com.hok_wiki.security.AdminAuthentication;
import com.hok_wiki.service.ArcanaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@Tag(name = "03-arcana-admin")
@RestController
@RequestMapping("/api/admin/arcana")
@RequiredArgsConstructor
@Validated
@AdminAuthentication
public class AdminArcanaController {

    private final ArcanaService arcanaService;

    @PostMapping
    public ResponseEntity<ArcanaView> create(@Valid @RequestBody ArcanaRequest request) {
        ArcanaView created = arcanaService.create(request);
        return ResponseEntity.created(URI.create("/api/admin/arcana/" + created.id())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArcanaView> update(@PathVariable("id") UUID id,
                                             @Valid @RequestBody ArcanaRequest request) {
        return ResponseEntity.ok(arcanaService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") UUID id) {
        arcanaService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
