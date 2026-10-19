package com.hok_wiki.repository;

import java.util.Optional;
import java.util.UUID;

import com.hok_wiki.domain.Spell;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpellRepository extends JpaRepository<Spell, UUID> {

	boolean existsBySlug(String slug);

	boolean existsBySlugAndIdNot(String slug, UUID id);

	Page<Spell> findAll(Pageable pageable);

	Optional<Spell> findBySlug(String slug);

}
