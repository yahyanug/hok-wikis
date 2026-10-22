package com.hok_wiki.service.impl;

import java.math.BigDecimal;
import java.net.URI;
import java.util.Base64;
import java.util.List;

import com.hok_wiki.domain.Feedback;
import com.hok_wiki.dto.request.FeedbackAttachmentRequest;
import com.hok_wiki.dto.request.FeedbackRequest;
import com.hok_wiki.dto.response.MessageResponse;
import com.hok_wiki.exception.ApiError;
import com.hok_wiki.exception.BusinessException;
import com.hok_wiki.exception.GlobalErrorCodeEnum;
import com.hok_wiki.repository.FeedbackRepository;
import com.hok_wiki.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {

	private static final int MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

	private static final int MAX_BASE64_LENGTH = ((MAX_ATTACHMENT_BYTES + 2) / 3) * 4;

	private final FeedbackRepository feedbackRepository;

	@Override
	@Transactional
	public MessageResponse create(FeedbackRequest request) {
		if (request.pageUrl() != null && !isPageUrl(request.pageUrl())) {
			throw invalid("Use a page path or a valid HTTP/HTTPS URL");
		}
		Feedback feedback = new Feedback();
		feedback.setType(request.type());
		feedback.setTitle(request.title());
		feedback.setDetail(request.detail());
		feedback.setPageUrl(request.pageUrl());
		feedback.setEmail(request.email());
		if (request.attachment() != null) {
			FeedbackAttachmentRequest attachment = request.attachment();
			byte[] image = decodeAttachment(attachment);
			feedback.setAttachmentName(attachment.name());
			feedback.setAttachmentMimeType(attachment.mimeType());
			feedback.setAttachmentSize(image.length);
			feedback.setAttachmentData(image);
		}
		feedbackRepository.saveAndFlush(feedback);
		return new MessageResponse("Thank you! Your feedback has been submitted");
	}

	private byte[] decodeAttachment(FeedbackAttachmentRequest attachment) {
		if (attachment.size().stripTrailingZeros().scale() > 0) {
			throw invalid("Attachment size must be a whole number of bytes");
		}
		if (attachment.size().compareTo(BigDecimal.valueOf(MAX_ATTACHMENT_BYTES)) > 0
				|| attachment.data().length() > MAX_BASE64_LENGTH) {
			throw new BusinessException(new ApiError(HttpStatus.CONTENT_TOO_LARGE,
					GlobalErrorCodeEnum.HTTP_ERROR, "Attachment must not exceed 5 MB", List.of()));
		}
		if (attachment.data().length() % 4 != 0) {
			throw invalid("Attachment data must be valid base64");
		}
		byte[] image;
		try {
			image = Base64.getDecoder().decode(attachment.data());
		}
		catch (IllegalArgumentException exception) {
			throw invalid("Attachment data must be valid base64");
		}
		if (image.length != attachment.size().intValueExact()
				|| !Base64.getEncoder().encodeToString(image).equals(attachment.data())) {
			throw invalid("Attachment data does not match its declared size");
		}
		boolean png = image.length >= 8 && (image[0] & 0xff) == 0x89
				&& image[1] == 0x50 && image[2] == 0x4e && image[3] == 0x47
				&& image[4] == 0x0d && image[5] == 0x0a && image[6] == 0x1a && image[7] == 0x0a;
		boolean jpeg = image.length >= 3 && (image[0] & 0xff) == 0xff
				&& (image[1] & 0xff) == 0xd8 && (image[2] & 0xff) == 0xff;
		if (("image/png".equals(attachment.mimeType()) && !png)
				|| ("image/jpeg".equals(attachment.mimeType()) && !jpeg)) {
			throw invalid("Attachment content does not match its image format");
		}
		return image;
	}

	private boolean isPageUrl(String value) {
		if (value.startsWith("//") || value.codePoints().anyMatch(character ->
				character <= 32 || character == 127 || character == '\\'
						|| Character.isWhitespace(character) || Character.isSpaceChar(character))) {
			return false;
		}
		if (value.startsWith("/")) {
			return true;
		}
		try {
			URI uri = URI.create(value);
			return ("http".equalsIgnoreCase(uri.getScheme()) || "https".equalsIgnoreCase(uri.getScheme()))
					&& uri.getHost() != null;
		}
		catch (IllegalArgumentException exception) {
			return false;
		}
	}

	private BusinessException invalid(String message) {
		return new BusinessException(new ApiError(HttpStatus.BAD_REQUEST,
				GlobalErrorCodeEnum.VALIDATION_ERROR, message, List.of()));
	}

}
