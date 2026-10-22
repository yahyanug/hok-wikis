package com.hok_wiki.repository;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

import com.hok_wiki.constant.UserType;
import com.hok_wiki.domain.UserAccount;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserAccountRepository extends JpaRepository<UserAccount, UUID> {

	Optional<UserAccount> findByEmail(String email);

	Optional<UserAccount> findByEmailOrPhoneNumber(String email, String phoneNumber);

	boolean existsByEmail(String email);

	boolean existsByPhoneNumber(String phoneNumber);

	boolean existsByUserTypeIn(Collection<UserType> userTypes);

	@Modifying
	@Query(value = "LOCK TABLE user_accounts IN SHARE ROW EXCLUSIVE MODE", nativeQuery = true)
	void lockForAdminBootstrap();

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("select account from UserAccount account where account.email = :identifier or account.phoneNumber = :identifier")
	Optional<UserAccount> findForUpdateByIdentifier(@Param("identifier") String identifier);

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("select account from UserAccount account where account.id = :id")
	Optional<UserAccount> findForUpdateById(@Param("id") UUID id);

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("select account from UserAccount account where account.email = :email")
	Optional<UserAccount> findForUpdateByEmail(@Param("email") String email);

}
