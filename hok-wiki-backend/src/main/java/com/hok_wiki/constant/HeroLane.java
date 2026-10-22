package com.hok_wiki.constant;

import java.util.Locale;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum HeroLane {

	CLASH,
	JUNGLE,
	MID,
	FARM,
	ROAM;

	@JsonCreator
	public static HeroLane fromValue(String value) {
		String normalized = value.strip().toUpperCase(Locale.ROOT);
		return valueOf("ROAMING".equals(normalized) ? "ROAM" : normalized);
	}

	@JsonValue
	public String getCode() {
		return this == ROAM ? "ROAMING" : name();
	}

	public String getSlug() {
		return getCode().toLowerCase(Locale.ROOT);
	}

	public String getImageUrl() {
		return "/images/lane/" + getSlug() + ".png";
	}

}
