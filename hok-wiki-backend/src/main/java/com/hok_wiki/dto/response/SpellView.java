package com.hok_wiki.dto.response;

import java.util.List;
import java.util.UUID;

public record SpellView(UUID id, String name, String slug, Integer cooldownSeconds, String description, String imageUrl,
		List<ResourceAttributeView> attributes, List<String> tips, String usageTip) {

	public SpellView {
		attributes = attributes == null ? List.of() : List.copyOf(attributes);
		tips = tips == null ? List.of() : List.copyOf(tips);
	}

}
