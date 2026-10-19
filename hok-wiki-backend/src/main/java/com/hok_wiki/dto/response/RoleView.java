package com.hok_wiki.dto.response;

import com.hok_wiki.constant.HeroRole;

public record RoleView(HeroRole name, String slug, String imageUrl) {
}
