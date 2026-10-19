package com.hok_wiki.repository;

import java.util.Optional;
import java.util.UUID;

import com.hok_wiki.domain.Lane;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LaneRepository extends JpaRepository<Lane, UUID> {

	boolean existsBySlug(String slug);

	boolean existsBySlugAndIdNot(String slug, UUID id);

	Page<Lane> findAll(Pageable pageable);

	Optional<Lane> findBySlug(String slug);

}
