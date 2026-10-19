package com.hok_wiki.dto.response;

import java.util.UUID;

public record SpellView(UUID id, String name, String slug, Integer cooldownSeconds, String description, String imageUrl) {
}
