package com.hok_wiki.config;

import com.hok_wiki.repository.UserTokenRepository;
import com.hok_wiki.security.AccountUserDetailsService;
import com.hok_wiki.security.SecurityErrorHandler;
import com.hok_wiki.security.jwt.JWTFilter;
import com.hok_wiki.security.jwt.TokenProvider;
import jakarta.servlet.DispatcherType;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration(proxyBeanMethods = false)
@EnableWebSecurity
@EnableMethodSecurity
@EnableConfigurationProperties(AuthProperties.class)
public class SecurityConfiguration {

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(12);
	}

	@Bean
	public AuthenticationManager authenticationManager(AccountUserDetailsService userDetailsService,
			PasswordEncoder passwordEncoder) {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
		provider.setPasswordEncoder(passwordEncoder);
		return new ProviderManager(provider);
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http, TokenProvider tokenProvider,
			UserTokenRepository userTokenRepository, SecurityErrorHandler securityErrorHandler) throws Exception {
		http.csrf(AbstractHttpConfigurer::disable)
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.formLogin(AbstractHttpConfigurer::disable)
				.httpBasic(AbstractHttpConfigurer::disable)
				.logout(AbstractHttpConfigurer::disable)
				.exceptionHandling(exceptions -> exceptions.authenticationEntryPoint(securityErrorHandler)
						.accessDeniedHandler(securityErrorHandler))
				.authorizeHttpRequests(authorize -> authorize
						.dispatcherTypeMatchers(DispatcherType.ERROR).permitAll()
						.requestMatchers("/api/admin/**").hasAnyRole("SUPER_USER", "ADMIN")
						.requestMatchers(HttpMethod.POST, "/api/auth/login", "/api/auth/register",
								"/api/auth/forgot-password", "/api/auth/reset-password", "/api/auth/refresh-token",
								"/refresh-token").permitAll()
						.requestMatchers(HttpMethod.POST, "/api/auth/change-password").authenticated()
						.requestMatchers(HttpMethod.GET, "/api/heroes/**", "/api/items/**", "/api/arcana/**",
								"/api/spells/**", "/api/lanes/**", "/api/roles/**", "/actuator/health").permitAll()
						.requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**").permitAll()
						.anyRequest().denyAll())
				.addFilterBefore(new JWTFilter(tokenProvider, userTokenRepository, securityErrorHandler),
						UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

}
