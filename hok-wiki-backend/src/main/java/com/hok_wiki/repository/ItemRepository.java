package com.hok_wiki.repository;

import java.util.Optional;
import java.util.UUID;

import com.hok_wiki.domain.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, UUID> {

	boolean existsBySlug(String slug);

	boolean existsBySlugAndIdNot(String slug, UUID id);

	Page<Item> findAll(Pageable pageable);

	Optional<Item> findBySlug(String slug);

}
