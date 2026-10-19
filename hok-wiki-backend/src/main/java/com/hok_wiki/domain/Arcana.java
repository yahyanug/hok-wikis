package com.hok_wiki.domain;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "arcana")
@Getter
@Setter
@NoArgsConstructor
public class Arcana {

	@Id
	@Setter(AccessLevel.NONE)
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "id", nullable = false, updatable = false)
	private UUID id;

	@Column(name = "name", nullable = false, length = 255)
	private String name;

	@Column(name = "slug", nullable = false, unique = true, length = 128)
	private String slug;

	@Column(name = "color", nullable = false, length = 16)
	private String color;

	@Column(name = "level", nullable = false)
	private Integer level;

	@Column(name = "stats", nullable = false, columnDefinition = "text")
	private String stats;

	@Column(name = "image_url", columnDefinition = "text")
	private String imageUrl;

}
