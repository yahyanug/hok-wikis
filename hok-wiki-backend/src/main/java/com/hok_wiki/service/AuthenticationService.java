package com.hok_wiki.service;

import java.util.UUID;

import com.hok_wiki.dto.request.ChangePasswordRequest;
import com.hok_wiki.dto.request.ForgotPasswordRequest;
import com.hok_wiki.dto.request.LoginRequest;
import com.hok_wiki.dto.request.RefreshTokenRequest;
import com.hok_wiki.dto.request.RegisterRequest;
import com.hok_wiki.dto.request.ResetPasswordRequest;
import com.hok_wiki.dto.response.AccountView;
import com.hok_wiki.dto.response.AuthenticationResponse;
import com.hok_wiki.dto.response.MessageResponse;

public interface AuthenticationService {

	AccountView getCurrentAccount(UUID accountId);

	MessageResponse logout(UUID accountId, UUID tokenId);

	AccountView register(RegisterRequest request);

	AuthenticationResponse login(LoginRequest request);

	AuthenticationResponse refreshToken(RefreshTokenRequest request);

	MessageResponse forgotPassword(ForgotPasswordRequest request);

	MessageResponse resetPassword(ResetPasswordRequest request);

	MessageResponse changePassword(UUID accountId, ChangePasswordRequest request);

}
