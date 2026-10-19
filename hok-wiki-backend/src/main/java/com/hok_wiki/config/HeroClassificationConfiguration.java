package com.hok_wiki.config;

import java.util.Locale;

import com.hok_wiki.constant.HeroLane;
import com.hok_wiki.constant.HeroRole;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class HeroClassificationConfiguration implements WebMvcConfigurer {

	@Override
	public void addFormatters(FormatterRegistry registry) {
		registry.addConverter(String.class, HeroRole.class,
				value -> HeroRole.valueOf(value.strip().toUpperCase(Locale.ROOT)));
		registry.addConverter(String.class, HeroLane.class,
				value -> HeroLane.valueOf(value.strip().toUpperCase(Locale.ROOT)));
	}

}
