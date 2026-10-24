package com.hok_wiki.controller.admin;

import com.hok_wiki.dto.request.SpellRequest;
import com.hok_wiki.dto.response.SpellView;
import com.hok_wiki.security.AdminAuthentication;
import com.hok_wiki.service.SpellService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@Tag(name = "04-spells-admin")
@RestController
@RequestMapping("/api/admin/spells")
@RequiredArgsConstructor
@Validated
@AdminAuthentication
public class AdminSpellController {

    private final SpellService spellService;

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
