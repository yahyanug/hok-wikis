package com.hok_wiki.domain;

import com.hok_wiki.constant.FeedbackType;
import com.hok_wiki.domain.utilities.AuditSection;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name = "feedback")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Feedback extends AuditSection implements Serializable {

    @Enumerated(EnumType.STRING)
    @Column(name = "feedback_type", nullable = false, length = 32)
    private FeedbackType type;

    @Column(name = "title", nullable = false, length = 120)
    private String title;

    @Column(name = "detail", nullable = false, length = 2000)
    private String detail;

    @Column(name = "page_url", length = 2048)
    private String pageUrl;

    @Column(name = "email", length = 254)
    private String email;

    @Column(name = "attachment_name")
    private String attachmentName;

    @Column(name = "attachment_mime_type", length = 32)
    private String attachmentMimeType;

    @Column(name = "attachment_size")
    private Integer attachmentSize;

    @Column(name = "attachment_data", columnDefinition = "bytea")
    private byte[] attachmentData;

}
