package com.hok_wiki.dto.response;

import java.util.UUID;

public record ArcanaView(UUID id, String name, String slug, String color, Integer level, String stats, String imageUrl) {
}
