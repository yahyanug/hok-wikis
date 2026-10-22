package com.hok_wiki.dto.request;

import com.hok_wiki.constant.FeedbackType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record FeedbackRequest(
		@NotNull FeedbackType type,
		@NotBlank @Size(max = 120) String title,
		@NotBlank @Size(max = 2000) String detail,
		@Size(max = 2048) String pageUrl,
		@Size(max = 254)
		@Pattern(regexp = "[^\\s@\\x00-\\x1F\\x7F]+@[^\\s@\\x00-\\x1F\\x7F]+\\.[^\\s@\\x00-\\x1F\\x7F]+")
		String email,
		@Valid FeedbackAttachmentRequest attachment) {

	public FeedbackRequest {
		title = title == null ? null : title.strip();
		detail = detail == null ? null : detail.strip();
		pageUrl = optionalValue(pageUrl);
		email = optionalValue(email);
	}

	private static String optionalValue(String value) {
		return value == null || value.isBlank() ? null : value.strip();
	}

}
