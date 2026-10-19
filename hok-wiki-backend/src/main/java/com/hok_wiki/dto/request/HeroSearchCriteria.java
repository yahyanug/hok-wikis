package com.hok_wiki.dto.request;

public record HeroSearchCriteria(String role, String lane, int page, int size) {

	public static final int DEFAULT_PAGE_SIZE = 20;

	public static final int MAX_PAGE_SIZE = 100;

	public static final int MAX_PAGE = Integer.MAX_VALUE / MAX_PAGE_SIZE;

	public static final int MAX_CLASSIFICATION_LENGTH = 255;

	public HeroSearchCriteria {
		role = normalizeClassification(role, "role");
		lane = normalizeClassification(lane, "lane");
		if (page < 0 || page > MAX_PAGE) {
			throw new IllegalArgumentException("page must be between 0 and " + MAX_PAGE);
		}
		if (size < 1 || size > MAX_PAGE_SIZE) {
			throw new IllegalArgumentException("size must be between 1 and " + MAX_PAGE_SIZE);
		}
	}

	private static String normalizeClassification(String value, String field) {
		if (value == null) {
			return null;
		}
		String normalized = value.strip();
		if (normalized.isEmpty() || normalized.length() > MAX_CLASSIFICATION_LENGTH) {
			throw new IllegalArgumentException(field + " must contain between 1 and "
					+ MAX_CLASSIFICATION_LENGTH + " characters");
		}
		return normalized;
	}

}
