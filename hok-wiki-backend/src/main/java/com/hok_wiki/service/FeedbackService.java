package com.hok_wiki.service;

import com.hok_wiki.dto.request.FeedbackRequest;
import com.hok_wiki.dto.response.MessageResponse;

public interface FeedbackService {

	MessageResponse create(FeedbackRequest request);

}
