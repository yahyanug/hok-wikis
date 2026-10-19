package com.hok_wiki.service.impl;

import java.net.URI;
import java.time.Instant;

import com.hok_wiki.config.AuthProperties;
import com.hok_wiki.exception.AuthErrorCodeEnum;
import com.hok_wiki.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@Service
@RequiredArgsConstructor
public class PasswordResetMailService {

	private final ObjectProvider<JavaMailSender> mailSender;

	private final AuthProperties properties;

	private final Environment environment;

	public void ensureConfigured() {
		String host = environment.getProperty("spring.mail.host");
		if (mailSender.getIfAvailable() == null || host == null || host.isBlank()
				|| properties.getMailFrom().isBlank() || properties.getResetPasswordUrl().isBlank()) {
			throw new BusinessException(AuthErrorCodeEnum.PASSWORD_RESET_UNAVAILABLE);
		}
		try {
			URI uri = URI.create(properties.getResetPasswordUrl());
			if (uri.getHost() == null || uri.getUserInfo() != null || uri.getFragment() != null
					|| !("https".equalsIgnoreCase(uri.getScheme()) || "http".equalsIgnoreCase(uri.getScheme()))) {
				throw new IllegalArgumentException("Invalid password reset URL");
			}
		}
		catch (IllegalArgumentException exception) {
			throw new BusinessException(AuthErrorCodeEnum.PASSWORD_RESET_UNAVAILABLE);
		}
	}

	public void send(String email, String token, Instant expiresAt) {
		String resetUrl = UriComponentsBuilder.fromUriString(properties.getResetPasswordUrl())
				.queryParam("token", token).build().encode().toUriString();
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(properties.getMailFrom());
		message.setTo(email);
		message.setSubject("Reset your HoK Wiki password");
		message.setText("A password reset was requested for your HoK Wiki account.\n\n"
				+ "Open this link to choose a new password:\n" + resetUrl
				+ "\n\nThis link expires at " + expiresAt
				+ ". If you did not request this, you can ignore this email.");
		try {
			mailSender.getObject().send(message);
		}
		catch (MailException exception) {
			// Keep recovery responses identical for existing and unknown accounts.
			log.error("Password recovery email delivery failed ({})", exception.getClass().getSimpleName());
		}
	}

}
