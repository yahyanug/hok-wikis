package com.hok_wiki.security;

import com.hok_wiki.repository.UserAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true, noRollbackFor = UsernameNotFoundException.class)
public class AccountUserDetailsService implements UserDetailsService {

	private final UserAccountRepository userAccountRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		if (username == null || username.isBlank()) {
			throw new UsernameNotFoundException("Invalid credentials");
		}
		String identifier = username.strip().toLowerCase(Locale.ROOT);
		return userAccountRepository.findByEmailOrPhoneNumber(identifier, identifier)
				.map(AccountPrincipal::new)
				.orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));
	}

}
