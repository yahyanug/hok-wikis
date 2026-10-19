package com.hok_wiki.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.hok_wiki.constant.HeroLane;
import com.hok_wiki.constant.HeroRole;
import com.hok_wiki.domain.Hero;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface HeroRepository extends JpaRepository<Hero, UUID> {

	boolean existsBySlug(String slug);

	boolean existsBySlugAndIdNot(String slug, UUID id);

	String FILTERS = """
			where (:role is null or exists (
				select 1 from Hero roleHero join roleHero.roles heroRole
				where roleHero.id = hero.id
				and heroRole = :role
			))
			and (:lane is null or exists (
				select 1 from Hero laneHero join laneHero.lanes heroLane
				where laneHero.id = hero.id
				and heroLane = :lane
			))
			""";

	@Query(value = "select hero.id from Hero hero " + FILTERS + " order by hero.name, hero.slug",
			countQuery = "select count(hero) from Hero hero " + FILTERS)
	Page<UUID> findPageIds(@Param("role") HeroRole role, @Param("lane") HeroLane lane, Pageable pageable);

	@Query("""
			select distinct hero from Hero hero
			left join fetch hero.roles
			left join fetch hero.lanes
			where hero.id in :ids
			order by hero.name, hero.slug
			""")
	List<Hero> findAllWithRolesAndLanes(@Param("ids") Collection<UUID> ids);

	@Query("""
			select distinct hero from Hero hero
			left join fetch hero.roles
			left join fetch hero.lanes
			where hero.slug = :slug
			""")
	Optional<Hero> findBySlugWithRolesAndLanes(@Param("slug") String slug);

	@Query("""
			select distinct hero from Hero hero
			left join fetch hero.roles
			left join fetch hero.lanes
			where hero.id = :id
			""")
	Optional<Hero> findByIdWithRolesAndLanes(@Param("id") UUID id);

}
