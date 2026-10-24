package com.hok_wiki.domain;

import com.hok_wiki.domain.utilities.AuditSection;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
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
@Table(name = "arcana", uniqueConstraints = {@UniqueConstraint(columnNames = {"slug"})})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Arcana extends AuditSection implements Serializable {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "slug", nullable = false, unique = true, length = 128)
    private String slug;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "stats", nullable = false, columnDefinition = "jsonb")
    private List<ResourceEffect> stats = new ArrayList<>();

    @Column(name = "image_url", columnDefinition = "text")
    private String imageUrl;

}
