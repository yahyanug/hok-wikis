package com.hok_wiki.domain;

import com.hok_wiki.constant.UserType;
import com.hok_wiki.domain.utilities.AuditSection;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.Instant;
import java.util.Locale;

@Entity
@Table(name = "user_accounts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserAccount extends AuditSection implements Serializable {

    @Column(name = "full_name", nullable = false)
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

    public void setEmail(String email) {
        this.email = email == null ? null : email.strip().toLowerCase(Locale.ROOT);
    }

}
