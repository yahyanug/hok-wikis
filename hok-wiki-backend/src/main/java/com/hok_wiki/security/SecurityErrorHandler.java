package com.hok_wiki.security;

import com.hok_wiki.exception.GlobalErrorCodeEnum;
import com.hok_wiki.exception.AuthErrorCodeEnum;
import com.hok_wiki.exception.BusinessException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;

@Component
public class SecurityErrorHandler implements AuthenticationEntryPoint, AccessDeniedHandler {

	private final HandlerExceptionResolver handlerExceptionResolver;

	public SecurityErrorHandler(
			@Qualifier("handlerExceptionResolver") HandlerExceptionResolver handlerExceptionResolver) {
		this.handlerExceptionResolver = handlerExceptionResolver;
	}

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) {
		unauthorized(request, response);
	}

	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
			AccessDeniedException exception) {
		handlerExceptionResolver.resolveException(request, response, null,
				new BusinessException(GlobalErrorCodeEnum.HTTP_ACCESS_DENIED));
	}

	public void unauthorized(HttpServletRequest request, HttpServletResponse response) {
		handlerExceptionResolver.resolveException(request, response, null,
				new BusinessException(AuthErrorCodeEnum.INVALID_TOKEN));
	}

	public void failure(HttpServletRequest request, HttpServletResponse response, Exception exception) {
		handlerExceptionResolver.resolveException(request, response, null, exception);
	}

}
