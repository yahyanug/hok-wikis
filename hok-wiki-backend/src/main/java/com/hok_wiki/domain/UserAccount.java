package com.hok_wiki.domain;

import java.time.Instant;
import java.util.Locale;
import java.util.UUID;

import com.hok_wiki.constant.UserType;
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
@Table(name = "user_accounts")
@Getter
@Setter
@NoArgsConstructor
public class UserAccount {

	@Id
	@Setter(AccessLevel.NONE)
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "id", nullable = false, updatable = false)
	private UUID id;

	@Column(name = "full_name", nullable = false, length = 255)
	private String fullName;

	@Column(name = "email", nullable = false, unique = true, length = 254)
	private String email;

	@Column(name = "phone_number", unique = true, length = 16)
	private String phoneNumber;

	@Column(name = "password_hash", nullable = false, length = 100)
	private String passwordHash;

	@Enumerated(EnumType.STRING)
	@Column(name = "user_type", nullable = false, length = 32)
	private UserType userType;

	@Column(name = "enabled", nullable = false)
	private boolean enabled = true;

	@Column(name = "failed_login_attempts", nullable = false)
	private int failedLoginAttempts;

	@Column(name = "login_blocked_until")
	private Instant loginBlockedUntil;

	@Column(name = "created_at", nullable = false, updatable = false)
	private Instant createdAt = Instant.now();

	public void setEmail(String email) {
		this.email = email == null ? null : email.strip().toLowerCase(Locale.ROOT);
	}

}
