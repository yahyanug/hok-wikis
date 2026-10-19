package com.hok_wiki.repository;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import com.hok_wiki.domain.PasswordResetToken;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, UUID> {

	Optional<PasswordResetToken> findFirstByAccountIdOrderByCreatedAtDesc(UUID accountId);

	@Query("select token.account.id from PasswordResetToken token where token.tokenHash = :hash")
	Optional<UUID> findAccountIdByTokenHash(@Param("hash") String hash);

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("select token from PasswordResetToken token where token.tokenHash = :hash")
	Optional<PasswordResetToken> findForUpdateByTokenHash(@Param("hash") String hash);

	@Modifying(flushAutomatically = true)
	@Query("""
			update PasswordResetToken token set token.consumedAt = :consumedAt
			where token.account.id = :accountId and token.consumedAt is null
			""")
	int consumeAllByAccountId(@Param("accountId") UUID accountId, @Param("consumedAt") Instant consumedAt);

}
