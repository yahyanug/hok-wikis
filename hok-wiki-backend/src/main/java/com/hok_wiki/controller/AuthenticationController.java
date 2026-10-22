package com.hok_wiki.controller;

import com.hok_wiki.dto.request.ChangePasswordRequest;
import com.hok_wiki.dto.request.ForgotPasswordRequest;
import com.hok_wiki.dto.request.LoginRequest;
import com.hok_wiki.dto.request.RefreshTokenRequest;
import com.hok_wiki.dto.request.RegisterRequest;
import com.hok_wiki.dto.request.ResetPasswordRequest;
import com.hok_wiki.dto.response.AccountView;
import com.hok_wiki.dto.response.AuthenticationResponse;
import com.hok_wiki.dto.response.MessageResponse;
import com.hok_wiki.security.AccountPrincipal;
import com.hok_wiki.service.AuthenticationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "00-authentication")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

	private final AuthenticationService authenticationService;

	@GetMapping("/me")
	@SecurityRequirement(name = "bearerAuth")
	public ResponseEntity<AccountView> currentAccount(@AuthenticationPrincipal AccountPrincipal principal) {
		return ResponseEntity.ok().cacheControl(CacheControl.noStore())
				.body(authenticationService.getCurrentAccount(principal.getId()));
	}

	@PostMapping("/logout")
	@SecurityRequirement(name = "bearerAuth")
	public ResponseEntity<MessageResponse> logout(@AuthenticationPrincipal AccountPrincipal principal) {
		return ResponseEntity.ok().cacheControl(CacheControl.noStore())
				.body(authenticationService.logout(principal.getId(), principal.getTokenId()));
	}

	@PostMapping("/register")
	public ResponseEntity<AccountView> register(@Valid @RequestBody RegisterRequest request) {
		return ResponseEntity.status(HttpStatus.CREATED).cacheControl(CacheControl.noStore())
				.body(authenticationService.register(request));
	}

	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody LoginRequest request) {
		return ResponseEntity.ok().cacheControl(CacheControl.noStore())
				.body(authenticationService.login(request));
	}

	@PostMapping("/refresh-token")
	public ResponseEntity<AuthenticationResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
		return ResponseEntity.ok().cacheControl(CacheControl.noStore())
				.body(authenticationService.refreshToken(request));
	}

	@PostMapping("/forgot-password")
	public ResponseEntity<MessageResponse> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
		return ResponseEntity.ok().cacheControl(CacheControl.noStore())
				.body(authenticationService.forgotPassword(request));
	}

	@PostMapping("/reset-password")
	public ResponseEntity<MessageResponse> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
		return ResponseEntity.ok().cacheControl(CacheControl.noStore())
				.body(authenticationService.resetPassword(request));
	}

	@PostMapping("/change-password")
	@SecurityRequirement(name = "bearerAuth")
	public ResponseEntity<MessageResponse> changePassword(@AuthenticationPrincipal AccountPrincipal principal,
			@Valid @RequestBody ChangePasswordRequest request) {
		return ResponseEntity.ok().cacheControl(CacheControl.noStore())
				.body(authenticationService.changePassword(principal.getId(), request));
	}

}
