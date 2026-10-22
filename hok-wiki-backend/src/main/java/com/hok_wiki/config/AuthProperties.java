package com.hok_wiki.config;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "security.jwt")
public class AuthProperties {

	@NotBlank
	private String base64Secret;

	@NotBlank
	private String issuer = "hok-wiki";

	@Min(60)
	private long tokenValidityInSeconds = 3600;

	@Min(60)
	private long refreshTokenValidityInSeconds = 604800;

	@Min(60)
	private long rememberMeRefreshTokenValidityInSeconds = 2592000;

}
