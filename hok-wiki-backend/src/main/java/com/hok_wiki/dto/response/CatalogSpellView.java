package com.hok_wiki.dto.response;

import java.util.UUID;

public record CatalogSpellView(UUID id, String slug, String name, String image, String description,
		String usageTip) {

}
