package com.hok_wiki.config;

import com.hok_wiki.service.impl.AdminBootstrapService;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;

@Configuration(proxyBeanMethods = false)
@Profile({"admin-bootstrap", "local"})
public class BootstrapAdminConfiguration {

	@Bean
	public ApplicationRunner adminBootstrapRunner(AdminBootstrapService adminBootstrapService,
			Environment environment) {
		return arguments -> adminBootstrapService.bootstrap(environment.getProperty("ADMIN_BOOTSTRAP_EMAIL"),
				environment.getProperty("ADMIN_BOOTSTRAP_PASSWORD"), environment.getProperty("ADMIN_BOOTSTRAP_FULL_NAME"));
	}

}
