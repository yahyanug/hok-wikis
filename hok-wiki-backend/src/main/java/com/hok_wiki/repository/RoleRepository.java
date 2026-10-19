package com.hok_wiki.repository;

import java.util.Optional;
import java.util.UUID;

import com.hok_wiki.domain.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, UUID> {

	boolean existsBySlug(String slug);

	boolean existsBySlugAndIdNot(String slug, UUID id);

	Page<Role> findAll(Pageable pageable);

	Optional<Role> findBySlug(String slug);

}
