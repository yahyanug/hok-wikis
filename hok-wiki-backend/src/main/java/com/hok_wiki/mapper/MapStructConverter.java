package com.hok_wiki.mapper;

import com.hok_wiki.constant.HeroLane;
import com.hok_wiki.constant.HeroRole;
import com.hok_wiki.domain.*;
import com.hok_wiki.dto.request.*;
import com.hok_wiki.dto.response.*;
import org.mapstruct.*;

import java.util.Comparator;
import java.util.List;
import java.util.Set;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface MapStructConverter {

    AccountView toView(UserAccount account);

    @Mapping(target = "roles", source = "roles", qualifiedByName = "roleNames")
    @Mapping(target = "lanes", source = "lanes", qualifiedByName = "laneNames")
    HeroView toView(Hero hero);

    ItemView toView(Item item);

    ArcanaView toView(Arcana arcana);

    SpellView toView(Spell spell);

    ResourceEffectView toView(ResourceEffect effect);

    ResourceEffect toEntity(ResourceEffectRequest request);

    default CatalogItemView toCatalog(ItemView item) {
        return new CatalogItemView(item.id(), item.slug(), item.name(),
                item.imageUrl() == null ? "" : item.imageUrl(), item.category(), item.priceGold(),
                item.stats(), item.passive(), item.buildsFrom());
    }

    default CatalogArcanaView toCatalog(ArcanaView arcana) {
        return new CatalogArcanaView(arcana.id(), arcana.slug(), arcana.name(),
                arcana.imageUrl() == null ? "" : arcana.imageUrl(), arcana.stats());
    }

    default CatalogSpellView toCatalog(SpellView spell) {
        return new CatalogSpellView(spell.id(), spell.slug(), spell.name(),
                spell.imageUrl() == null ? "" : spell.imageUrl(), spell.description(), spell.usageTip());
    }

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "lanes", ignore = true)
    Hero toEntity(HeroRequest request);

    @InheritConfiguration(name = "toEntity")
    void update(HeroRequest request, @MappingTarget Hero hero);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    Item toEntity(ItemRequest request);

    @InheritConfiguration(name = "toEntity")
    void update(ItemRequest request, @MappingTarget Item item);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    Arcana toEntity(ArcanaRequest request);

    @InheritConfiguration(name = "toEntity")
    void update(ArcanaRequest request, @MappingTarget Arcana arcana);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    Spell toEntity(SpellRequest request);

    @InheritConfiguration(name = "toEntity")
    void update(SpellRequest request, @MappingTarget Spell spell);

    @Named("roleNames")
    default List<HeroRole> roleNames(Set<HeroRole> roles) {
        return roles == null ? List.of()
                : roles.stream().sorted(Comparator.comparing(HeroRole::name)).toList();
    }

    @Named("laneNames")
    default List<HeroLane> laneNames(Set<HeroLane> lanes) {
        return lanes == null ? List.of()
                : lanes.stream().sorted(Comparator.comparing(HeroLane::name)).toList();
    }

}
