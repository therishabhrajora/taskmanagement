package com.taskmanagerment.taskmanagement.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "issue_comments")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IssueComment {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;
    private Long issueId;
    private String authorEmail;
    @Column(length = 5000)
    private String body;

    private LocalDateTime createdAt = LocalDateTime.now();
 
}
