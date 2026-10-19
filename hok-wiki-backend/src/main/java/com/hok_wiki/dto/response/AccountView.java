package com.hok_wiki.dto.response;

import java.util.UUID;

import com.hok_wiki.constant.UserType;

public record AccountView(UUID id, String fullName, String email, String phoneNumber, UserType userType) {

}
