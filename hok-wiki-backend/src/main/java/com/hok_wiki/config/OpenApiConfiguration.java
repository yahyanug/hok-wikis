package com.hok_wiki.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
@OpenAPIDefinition(info = @Info(title = "HoK Wiki API", version = "0.0.1-SNAPSHOT",
		description = "API publik dan admin HoK Wiki. Endpoint admin memerlukan role ADMIN atau SUPER_USER."))
@SecurityScheme(name = "bearerAuth", type = SecuritySchemeType.HTTP, scheme = "bearer", bearerFormat = "JWT",
		description = "Login melalui POST /api/auth/login, lalu masukkan accessToken tanpa awalan Bearer. "
				+ "Jika token kedaluwarsa, gunakan POST /api/auth/refresh-token dan masukkan accessToken yang baru.")
public class OpenApiConfiguration {
}
