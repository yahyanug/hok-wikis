package com.hok_wiki.controller;

import com.hok_wiki.dto.request.FeedbackRequest;
import com.hok_wiki.dto.response.MessageResponse;
import com.hok_wiki.service.FeedbackService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "05-feedback")
@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
public class FeedbackController {

	private final FeedbackService feedbackService;

	@PostMapping(consumes = { "application/json", "application/*+json" })
	public ResponseEntity<MessageResponse> create(@Valid @RequestBody FeedbackRequest request) {
		return ResponseEntity.status(HttpStatus.CREATED).cacheControl(CacheControl.noStore())
				.body(feedbackService.create(request));
	}

//	@GetMapping
//	public ResponseEntity<List<FeedbackPageViewOnlyReturnListAndStatus> getList(Pagination pagination) {
//		return ResponseEntity.ok(feedbackService.getList());
//	}

}
