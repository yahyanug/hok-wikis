package com.hok_wiki.service;

import com.hok_wiki.constant.HeroLane;
import com.hok_wiki.constant.HeroRole;
import com.hok_wiki.dto.request.HeroRequest;
import com.hok_wiki.dto.response.HeroPage;
import com.hok_wiki.dto.response.HeroView;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface HeroService {

    HeroPage findHeroes(HeroRole heroRole, HeroLane heroLane, Pageable pageable);

    HeroView findBySlug(String slug);

    HeroView findById(UUID id);

    HeroView create(HeroRequest request);

    HeroView update(UUID id, HeroRequest request);

    void delete(UUID id);
}
