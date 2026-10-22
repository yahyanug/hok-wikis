package com.hok_wiki.domain;

import java.time.Instant;
import java.util.UUID;

import com.hok_wiki.constant.FeedbackType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "feedback")
@Getter
@Setter
@NoArgsConstructor
public class Feedback {

	@Id
	@Setter(AccessLevel.NONE)
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "id", nullable = false, updatable = false)
	private UUID id;

	@Enumerated(EnumType.STRING)
	@Column(name = "feedback_type", nullable = false, length = 32)
	private FeedbackType type;

	@Column(name = "title", nullable = false, length = 120)
	private String title;

	@Column(name = "detail", nullable = false, length = 2000)
	private String detail;

	@Column(name = "page_url", length = 2048)
	private String pageUrl;

	@Column(name = "email", length = 254)
	private String email;

	@Column(name = "attachment_name", length = 255)
	private String attachmentName;

	@Column(name = "attachment_mime_type", length = 32)
	private String attachmentMimeType;

	@Column(name = "attachment_size")
	private Integer attachmentSize;

	@Column(name = "attachment_data", columnDefinition = "bytea")
	private byte[] attachmentData;

	@Column(name = "created_at", nullable = false, updatable = false)
	private Instant createdAt = Instant.now();

}
