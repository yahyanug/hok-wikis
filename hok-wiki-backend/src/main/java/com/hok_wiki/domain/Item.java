package com.hok_wiki.domain;

import com.hok_wiki.constant.ItemCategory;
import com.hok_wiki.domain.utilities.AuditSection;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "item", uniqueConstraints = {@UniqueConstraint(columnNames = {"slug"})})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Item extends AuditSection implements Serializable {

    @Enumerated(EnumType.STRING)
    @Column(name = "category", length = 32)
    private ItemCategory category;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "slug", nullable = false, unique = true, length = 128)
    private String slug;

    @Column(name = "price_gold", nullable = false)
    private Integer priceGold;

    @Column(name = "image_url", columnDefinition = "text")
    private String imageUrl;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "stats", nullable = false, columnDefinition = "jsonb")
    private List<ResourceEffect> stats = new ArrayList<>();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "passive", nullable = false, columnDefinition = "jsonb")
    private List<ResourceEffect> passive = new ArrayList<>();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "builds_from", nullable = false, columnDefinition = "jsonb")
    private List<String> buildsFrom = new ArrayList<>();

}
