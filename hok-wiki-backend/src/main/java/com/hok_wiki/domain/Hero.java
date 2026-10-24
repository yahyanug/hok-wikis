package com.hok_wiki.domain;

import com.hok_wiki.constant.HeroLane;
import com.hok_wiki.constant.HeroRole;
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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "hero", uniqueConstraints = {@UniqueConstraint(columnNames = {"slug"})})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Hero extends AuditSection implements Serializable {

    @Column(name = "name", nullable = false)
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
            foreignKey = @ForeignKey(name = "fk_hero_roles_hero"),
            uniqueConstraints = @UniqueConstraint(name = "uk_hero_roles", columnNames = {"hero_id", "role"})
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 32)
    private Set<HeroRole> roles = new HashSet<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "hero_lanes",
            joinColumns = @JoinColumn(name = "hero_id", nullable = false),
            foreignKey = @ForeignKey(name = "fk_hero_lanes_hero"),
            uniqueConstraints = @UniqueConstraint(name = "uk_hero_lanes", columnNames = {"hero_id", "lane"})
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "lane", nullable = false, length = 32)
    private Set<HeroLane> lanes = new HashSet<>();

}
