package com.hok_wiki.repository;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import com.hok_wiki.domain.UserToken;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserTokenRepository extends JpaRepository<UserToken, UUID> {

	@Override
	@EntityGraph(attributePaths = "account")
	Optional<UserToken> findById(UUID id);

	@Query("select token.account.id from UserToken token where token.refreshTokenHash = :hash")
	Optional<UUID> findAccountIdByRefreshTokenHash(@Param("hash") String hash);

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("select token from UserToken token where token.refreshTokenHash = :hash")
	Optional<UserToken> findForUpdateByRefreshTokenHash(@Param("hash") String hash);

	@Modifying(flushAutomatically = true)
	@Query("""
			update UserToken token set token.revokedAt = :revokedAt
			where token.account.id = :accountId and token.revokedAt is null
			""")
	int revokeAllByAccountId(@Param("accountId") UUID accountId, @Param("revokedAt") Instant revokedAt);

}
