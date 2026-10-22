package com.hok_wiki.domain;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.hok_wiki.constant.HeroLane;
import com.hok_wiki.constant.HeroRole;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.generator.EventType;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "hero")
@Getter
@Setter
@NoArgsConstructor
public class Hero {

	@Id
	@Setter(AccessLevel.NONE)
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "id", nullable = false, updatable = false)
	private UUID id;

	@Setter(AccessLevel.NONE)
	@Generated(event = EventType.INSERT)
	@Column(name = "catalog_id", nullable = false, insertable = false, updatable = false)
	private Long catalogId;

	@Column(name = "name", nullable = false, length = 255)
	private String name;

	@Column(name = "slug", nullable = false, unique = true, length = 128)
	private String slug;

	@Column(name = "image_url", columnDefinition = "text")
	private String imageUrl;

	@Column(name = "description", nullable = false, columnDefinition = "text")
	private String description = "";

	@JdbcTypeCode(SqlTypes.JSON)
	@Column(name = "tags", nullable = false, columnDefinition = "jsonb")
	private List<String> tags = new ArrayList<>();

	@JdbcTypeCode(SqlTypes.JSON)
	@Column(name = "guide", nullable = false, columnDefinition = "jsonb")
	private List<String> guide = new ArrayList<>();

	@ElementCollection(fetch = FetchType.LAZY)
	@CollectionTable(name = "hero_roles",
			joinColumns = @JoinColumn(name = "hero_id", nullable = false),
			foreignKey = @ForeignKey(name = "fk_hero_roles_hero"))
	@Enumerated(EnumType.STRING)
	@Column(name = "role", nullable = false, length = 32)
	private Set<HeroRole> roles = new HashSet<>();

	@ElementCollection(fetch = FetchType.LAZY)
	@CollectionTable(name = "hero_lanes",
			joinColumns = @JoinColumn(name = "hero_id", nullable = false),
			foreignKey = @ForeignKey(name = "fk_hero_lanes_hero"))
	@Enumerated(EnumType.STRING)
	@Column(name = "lane", nullable = false, length = 32)
	private Set<HeroLane> lanes = new HashSet<>();

}
