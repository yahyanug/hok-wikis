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
@Table(name = "spells")
@Getter
@Setter
@NoArgsConstructor
public class Spell {

	@Id
	@Setter(AccessLevel.NONE)
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "id", nullable = false, updatable = false)
	private UUID id;

	@Column(name = "name", nullable = false, length = 255)
	private String name;

	@Column(name = "slug", nullable = false, unique = true, length = 128)
	private String slug;

	@Column(name = "cooldown_seconds", nullable = false)
	private Integer cooldownSeconds;

	@Column(name = "description", nullable = false, columnDefinition = "text")
	private String description;

	@Column(name = "image_url", columnDefinition = "text")
	private String imageUrl;

}
