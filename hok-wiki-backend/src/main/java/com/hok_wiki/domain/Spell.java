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

import java.io.Serializable;

@Entity
@Table(name = "spells", uniqueConstraints = {@UniqueConstraint(columnNames = {"slug"})})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Spell extends AuditSection implements Serializable {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "slug", nullable = false, unique = true, length = 128)
    private String slug;

    @Column(name = "description", nullable = false, columnDefinition = "text")
    private String description;

    @Column(name = "image_url", columnDefinition = "text")
    private String imageUrl;

    @Column(name = "usage_tip", nullable = false, columnDefinition = "text")
    private String usageTip = "";

}
