package com.hok_wiki.repository;

import java.util.UUID;

import com.hok_wiki.domain.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, UUID> {

}
