package com.hok_wiki.dto.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record FeedbackAttachmentRequest(
		@NotBlank @Size(max = 255) String name,
		@NotBlank @Pattern(regexp = "image/(png|jpeg)") String mimeType,
		@NotNull @Positive BigDecimal size,
		@NotBlank String data) {

	public FeedbackAttachmentRequest {
		name = name == null ? null : name.strip();
	}

}
