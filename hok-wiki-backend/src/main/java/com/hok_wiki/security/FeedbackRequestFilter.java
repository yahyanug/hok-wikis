package com.hok_wiki.security;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import com.hok_wiki.exception.ApiError;
import com.hok_wiki.exception.BusinessException;
import com.hok_wiki.exception.GlobalErrorCodeEnum;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ReadListener;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

public class FeedbackRequestFilter extends OncePerRequestFilter {

	private static final int MAX_REQUEST_BYTES = 7 * 1024 * 1024;

	private static final int MAX_REQUESTS_PER_WINDOW = 30;

	private static final int MAX_TRACKED_ADDRESSES = 1024;

	private static final long WINDOW_NANOS = Duration.ofMinutes(1).toNanos();

	private final Map<String, RequestWindow> requestWindows = new HashMap<>();

	private final HandlerExceptionResolver exceptionResolver;

	public FeedbackRequestFilter(HandlerExceptionResolver exceptionResolver) {
		this.exceptionResolver = exceptionResolver;
	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) {
		return !"POST".equals(request.getMethod());
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
			FilterChain filterChain) throws ServletException, IOException {
		response.setHeader(HttpHeaders.CACHE_CONTROL, "no-store");
		if (request.getContentLengthLong() > MAX_REQUEST_BYTES) {
			reject(request, response, HttpStatus.CONTENT_TOO_LARGE, "Feedback request is too large");
			return;
		}
		if (!allowRequest(request.getRemoteAddr())) {
			response.setHeader(HttpHeaders.RETRY_AFTER, "60");
			reject(request, response, HttpStatus.TOO_MANY_REQUESTS,
					"Too many feedback requests; try again later");
			return;
		}
		if (!isJson(request.getContentType())) {
			reject(request, response, HttpStatus.UNSUPPORTED_MEDIA_TYPE, "Send feedback as JSON");
			return;
		}
		byte[] body;
		try {
			// Read at most the limit plus one byte before handing any content to the JSON parser.
			body = request.getInputStream().readNBytes(MAX_REQUEST_BYTES + 1);
		}
		catch (IOException exception) {
			reject(request, response, HttpStatus.BAD_REQUEST, "Feedback request could not be read");
			return;
		}
		if (body.length > MAX_REQUEST_BYTES) {
			reject(request, response, HttpStatus.CONTENT_TOO_LARGE, "Feedback request is too large");
			return;
		}
		filterChain.doFilter(new BoundedBodyRequest(request, body), response);
	}

	private synchronized boolean allowRequest(String remoteAddress) {
		long now = System.nanoTime();
		requestWindows.entrySet().removeIf(entry -> now - entry.getValue().startedAt >= WINDOW_NANOS);
		RequestWindow window = requestWindows.get(remoteAddress);
		if (window == null) {
			if (requestWindows.size() >= MAX_TRACKED_ADDRESSES) {
				return false;
			}
			window = new RequestWindow(now);
			requestWindows.put(remoteAddress, window);
		}
		if (window.requests >= MAX_REQUESTS_PER_WINDOW) {
			return false;
		}
		window.requests++;
		return true;
	}

	private boolean isJson(String contentType) {
		if (contentType == null) {
			return false;
		}
		try {
			MediaType mediaType = MediaType.parseMediaType(contentType);
			return "application".equalsIgnoreCase(mediaType.getType())
					&& ("json".equalsIgnoreCase(mediaType.getSubtype())
							|| mediaType.getSubtype().toLowerCase(Locale.ROOT).endsWith("+json"));
		}
		catch (IllegalArgumentException exception) {
			return false;
		}
	}

	private void reject(HttpServletRequest request, HttpServletResponse response, HttpStatus status,
			String message) {
		exceptionResolver.resolveException(request, response, null,
				new BusinessException(new ApiError(status, GlobalErrorCodeEnum.HTTP_ERROR, message, List.of())));
	}

	private static final class RequestWindow {

		private final long startedAt;

		private int requests;

		private RequestWindow(long startedAt) {
			this.startedAt = startedAt;
		}

	}

	private static final class BoundedBodyRequest extends HttpServletRequestWrapper {

		private final int bodyLength;

		private final ServletInputStream inputStream;

		private BoundedBodyRequest(HttpServletRequest request, byte[] body) {
			super(request);
			this.bodyLength = body.length;
			this.inputStream = new BodyInputStream(body);
		}

		@Override
		public ServletInputStream getInputStream() {
			return inputStream;
		}

		@Override
		public BufferedReader getReader() {
			return new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
		}

		@Override
		public int getContentLength() {
			return bodyLength;
		}

		@Override
		public long getContentLengthLong() {
			return bodyLength;
		}

	}

	private static final class BodyInputStream extends ServletInputStream {

		private final ByteArrayInputStream source;

		private BodyInputStream(byte[] body) {
			source = new ByteArrayInputStream(body);
		}

		@Override
		public int read() {
			return source.read();
		}

		@Override
		public int read(byte[] buffer, int offset, int length) {
			return source.read(buffer, offset, length);
		}

		@Override
		public boolean isFinished() {
			return source.available() == 0;
		}

		@Override
		public boolean isReady() {
			return true;
		}

		@Override
		public void setReadListener(ReadListener readListener) {
			throw new IllegalStateException("Asynchronous request reads are not supported");
		}

	}

}
