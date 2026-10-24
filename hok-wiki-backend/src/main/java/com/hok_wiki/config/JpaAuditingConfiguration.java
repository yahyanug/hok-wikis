package com.hok_wiki.config;

import java.util.Optional;

import com.hok_wiki.security.AccountPrincipal;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Configuration(proxyBeanMethods = false)
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class JpaAuditingConfiguration {

	@Bean
	public AuditorAware<String> auditorAware() {
		return () -> {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			if (authentication != null && authentication.isAuthenticated()
					&& authentication.getPrincipal() instanceof AccountPrincipal principal) {
				return Optional.of(principal.getId().toString());
			}
			return Optional.of("sys-admin");
		};
	}

}
