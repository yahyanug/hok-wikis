package com.hok_wiki.constant;

import java.util.Locale;

public enum HeroRole {

	FIGHTER,
	ASSASSIN,
	MAGE,
	MARKSMAN,
	TANK,
	SUPPORT;

	public String getSlug() {
		return name().toLowerCase(Locale.ROOT);
	}

	public String getImageUrl() {
		return "/images/roles/" + getSlug() + ".png";
	}

}
