package com.hok_wiki.mapper;

import java.util.Comparator;
import java.util.List;
import java.util.Set;

import com.hok_wiki.constant.HeroLane;
import com.hok_wiki.constant.HeroRole;
import com.hok_wiki.domain.Arcana;
import com.hok_wiki.domain.Hero;
import com.hok_wiki.domain.Item;
import com.hok_wiki.domain.Spell;
import com.hok_wiki.domain.UserAccount;
import com.hok_wiki.dto.response.AccountView;
import com.hok_wiki.dto.response.ArcanaView;
import com.hok_wiki.dto.response.HeroView;
import com.hok_wiki.dto.response.ItemView;
import com.hok_wiki.dto.response.LaneView;
import com.hok_wiki.dto.response.RoleView;
import com.hok_wiki.dto.response.SpellView;
import com.hok_wiki.dto.request.HeroRequest;
import com.hok_wiki.dto.request.ItemRequest;
import com.hok_wiki.dto.request.ArcanaRequest;
import com.hok_wiki.dto.request.SpellRequest;
import org.mapstruct.Mapper;
import org.mapstruct.InheritConfiguration;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface MapStructConverter {

	AccountView toView(UserAccount account);

	@Mapping(target = "roles", source = "roles", qualifiedByName = "roleNames")
	@Mapping(target = "lanes", source = "lanes", qualifiedByName = "laneNames")
	HeroView toView(Hero hero);

	ItemView toView(Item item);

	ArcanaView toView(Arcana arcana);

	SpellView toView(Spell spell);

	default LaneView toView(HeroLane lane) {
		return lane == null ? null : new LaneView(lane, lane.getSlug(), lane.getImageUrl());
	}

	default RoleView toView(HeroRole role) {
		return role == null ? null : new RoleView(role, role.getSlug(), role.getImageUrl());
	}

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "roles", ignore = true)
	@Mapping(target = "lanes", ignore = true)
	Hero toEntity(HeroRequest request);

	@InheritConfiguration(name = "toEntity")
	void update(HeroRequest request, @MappingTarget Hero hero);

	@Mapping(target = "id", ignore = true)
	Item toEntity(ItemRequest request);

	@InheritConfiguration(name = "toEntity")
	void update(ItemRequest request, @MappingTarget Item item);

	@Mapping(target = "id", ignore = true)
	Arcana toEntity(ArcanaRequest request);

	@InheritConfiguration(name = "toEntity")
	void update(ArcanaRequest request, @MappingTarget Arcana arcana);

	@Mapping(target = "id", ignore = true)
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
