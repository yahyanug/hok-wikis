package com.hok_wiki.security;

import com.hok_wiki.constant.UserType;
import com.hok_wiki.domain.UserAccount;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

public final class AccountPrincipal implements UserDetails {

	private final UUID id;

	private final String email;

	private final String passwordHash;

	private final UserType userType;

	private final boolean enabled;

	private final Instant loginBlockedUntil;

	public AccountPrincipal(UserAccount account) {
		this.id = account.getId();
		this.email = account.getEmail();
		this.passwordHash = account.getPasswordHash();
		this.userType = account.getUserType();
		this.enabled = account.isEnabled();
		this.loginBlockedUntil = account.getLoginBlockedUntil();
	}

	public UUID getId() {
		return id;
	}

	public UserType getUserType() {
		return userType;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority("ROLE_" + userType.name()));
	}

	@Override
	public String getPassword() {
		return passwordHash;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonLocked() {
		return loginBlockedUntil == null || !loginBlockedUntil.isAfter(Instant.now());
	}

	@Override
	public boolean isEnabled() {
		return enabled;
	}

	@Override
	public String toString() {
		return "AccountPrincipal[id=" + id + ", userType=" + userType + "]";
	}

}
