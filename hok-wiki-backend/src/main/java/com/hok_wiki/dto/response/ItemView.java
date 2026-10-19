package com.hok_wiki.dto.response;

import java.util.UUID;

public record ItemView(UUID id, String name, String slug, Integer priceGold, String imageUrl) {
}
