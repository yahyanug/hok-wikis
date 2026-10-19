package com.hok_wiki.constant;

import java.util.Locale;

public enum HeroLane {

	CLASH,
	JUNGLE,
	MID,
	FARM,
	ROAM;

	public String getSlug() {
		return name().toLowerCase(Locale.ROOT);
	}

	public String getImageUrl() {
		return "/images/lanes/" + getSlug() + ".png";
	}

}
