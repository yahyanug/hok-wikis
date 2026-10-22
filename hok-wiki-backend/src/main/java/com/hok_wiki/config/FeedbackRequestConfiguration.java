package com.hok_wiki.config;

import java.util.List;

import com.hok_wiki.security.FeedbackRequestFilter;
import jakarta.servlet.DispatcherType;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.HandlerExceptionResolver;

@Configuration
public class FeedbackRequestConfiguration {

	@Bean
	public FilterRegistrationBean<FeedbackRequestFilter> feedbackRequestFilter(
			@Qualifier("handlerExceptionResolver") HandlerExceptionResolver exceptionResolver) {
		FilterRegistrationBean<FeedbackRequestFilter> registration = new FilterRegistrationBean<>(
				new FeedbackRequestFilter(exceptionResolver));
		registration.setUrlPatterns(List.of("/api/feedback"));
		registration.setDispatcherTypes(DispatcherType.REQUEST);
		registration.setOrder(Ordered.HIGHEST_PRECEDENCE + 10);
		registration.setAsyncSupported(false);
		return registration;
	}

}
