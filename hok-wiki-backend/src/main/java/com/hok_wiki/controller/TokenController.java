package com.hok_wiki.controller;

import com.hok_wiki.dto.request.RefreshTokenRequest;
import com.hok_wiki.dto.response.AuthenticationResponse;
import com.hok_wiki.service.AuthenticationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "00-authentication")
@RestController
@RequiredArgsConstructor
public class TokenController {

	private final AuthenticationService authenticationService;

	@PostMapping("/refresh-token")
	public ResponseEntity<AuthenticationResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
		return ResponseEntity.ok().cacheControl(CacheControl.noStore())
				.body(authenticationService.refreshToken(request));
	}

}
