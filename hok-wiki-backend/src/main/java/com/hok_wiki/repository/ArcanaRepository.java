package com.hok_wiki.repository;

import java.util.Optional;
import java.util.UUID;

import com.hok_wiki.domain.Arcana;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArcanaRepository extends JpaRepository<Arcana, UUID> {

	boolean existsBySlug(String slug);

	boolean existsBySlugAndIdNot(String slug, UUID id);

	Page<Arcana> findAll(Pageable pageable);

	Optional<Arcana> findBySlug(String slug);

}
