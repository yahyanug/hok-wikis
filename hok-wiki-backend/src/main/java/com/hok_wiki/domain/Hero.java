package com.hok_wiki.domain;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

	@Column(name = "name", nullable = false, length = 255)
	private String name;

	@Column(name = "slug", nullable = false, unique = true, length = 128)
	private String slug;

	@Column(name = "image_url", columnDefinition = "text")
	private String imageUrl;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "hero_roles",
			joinColumns = @JoinColumn(name = "hero_id", nullable = false),
			inverseJoinColumns = @JoinColumn(name = "role_id", nullable = false),
			foreignKey = @ForeignKey(name = "fk_hero_roles_hero"),
			inverseForeignKey = @ForeignKey(name = "fk_hero_roles_role"))
	private Set<Role> roles = new HashSet<>();

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "hero_lanes",
			joinColumns = @JoinColumn(name = "hero_id", nullable = false),
			inverseJoinColumns = @JoinColumn(name = "lane_id", nullable = false),
			foreignKey = @ForeignKey(name = "fk_hero_lanes_hero"),
			inverseForeignKey = @ForeignKey(name = "fk_hero_lanes_lane"))
	private Set<Lane> lanes = new HashSet<>();

}
