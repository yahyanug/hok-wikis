package com.hok_wiki.mapper;

import java.util.List;
import java.util.Set;

import com.hok_wiki.domain.Arcana;
import com.hok_wiki.domain.Hero;
import com.hok_wiki.domain.Item;
import com.hok_wiki.domain.Lane;
import com.hok_wiki.domain.Role;
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
import com.hok_wiki.dto.request.LaneRequest;
import com.hok_wiki.dto.request.RoleRequest;
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

	LaneView toView(Lane lane);

	RoleView toView(Role role);

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

	@Mapping(target = "id", ignore = true)
	Lane toEntity(LaneRequest request);

	@InheritConfiguration(name = "toEntity")
	void update(LaneRequest request, @MappingTarget Lane lane);

	@Mapping(target = "id", ignore = true)
	Role toEntity(RoleRequest request);

	@InheritConfiguration(name = "toEntity")
	void update(RoleRequest request, @MappingTarget Role role);

	@Named("roleNames")
	default List<String> roleNames(Set<Role> roles) {
		return roles == null ? List.of() : roles.stream().map(Role::getName).sorted().toList();
	}

	@Named("laneNames")
	default List<String> laneNames(Set<Lane> lanes) {
		return lanes == null ? List.of() : lanes.stream().map(Lane::getName).sorted().toList();
	}

}
