package com.hok_wiki.dto.response;

import java.util.UUID;

public record LaneView(UUID id, String name, String slug, String imageUrl) {
}
