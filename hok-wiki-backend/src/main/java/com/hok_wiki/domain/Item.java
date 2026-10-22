package com.hok_wiki.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.hok_wiki.constant.ItemCategory;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "item")
@Getter
@Setter
@NoArgsConstructor
public class Item {

	@Id
	@Setter(AccessLevel.NONE)
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "id", nullable = false, updatable = false)
	private UUID id;

	@Column(name = "name", nullable = false, length = 255)
	private String name;

	@Column(name = "slug", nullable = false, unique = true, length = 128)
	private String slug;

	@Column(name = "price_gold", nullable = false)
	private Integer priceGold;

	@Column(name = "image_url", columnDefinition = "text")
	private String imageUrl;

	@Enumerated(EnumType.STRING)
	@Column(name = "category", length = 32)
	private ItemCategory category;

	@Column(name = "description", nullable = false, columnDefinition = "text")
	private String description = "";

	@JdbcTypeCode(SqlTypes.JSON)
	@Column(name = "attributes", nullable = false, columnDefinition = "jsonb")
	private List<ResourceAttribute> attributes = new ArrayList<>();

	@JdbcTypeCode(SqlTypes.JSON)
	@Column(name = "effects", nullable = false, columnDefinition = "jsonb")
	private List<ResourceEffect> effects = new ArrayList<>();

	@JdbcTypeCode(SqlTypes.JSON)
	@Column(name = "builds_from", nullable = false, columnDefinition = "jsonb")
	private List<String> buildsFrom = new ArrayList<>();

	@JdbcTypeCode(SqlTypes.JSON)
	@Column(name = "tips", nullable = false, columnDefinition = "jsonb")
	private List<String> tips = new ArrayList<>();

}
