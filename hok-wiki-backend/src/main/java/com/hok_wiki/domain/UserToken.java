package com.hok_wiki.domain;

import com.hok_wiki.domain.utilities.AuditSection;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.Instant;

@Entity
@Table(name = "user_tokens")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserToken extends AuditSection implements Serializable {

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

}
