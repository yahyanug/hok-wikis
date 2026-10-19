package com.hok_wiki.domain;

import java.time.Instant;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_tokens")
@Getter
@Setter
@NoArgsConstructor
public class UserToken {

	@Id
	@Setter(AccessLevel.NONE)
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "id", nullable = false, updatable = false)
	private UUID id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "account_id", nullable = false, foreignKey = @ForeignKey(name = "fk_user_tokens_account"))
	private UserAccount account;

	@Column(name = "refresh_token_hash", nullable = false, unique = true, length = 64)
	private String refreshTokenHash;

	@Column(name = "access_expires_at", nullable = false)
	private Instant accessExpiresAt;

	@Column(name = "refresh_expires_at", nullable = false)
	private Instant refreshExpiresAt;

	@Column(name = "revoked_at")
	private Instant revokedAt;

	@Column(name = "remember_me", nullable = false)
	private boolean rememberMe;

	@Column(name = "created_at", nullable = false, updatable = false)
	private Instant createdAt = Instant.now();

}
