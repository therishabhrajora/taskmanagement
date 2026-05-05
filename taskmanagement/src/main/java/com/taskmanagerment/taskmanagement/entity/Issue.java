package com.taskmanagerment.taskmanagement.entity;

import java.time.LocalDateTime;

import com.taskmanagerment.taskmanagement.enums.IssuePriority;
import com.taskmanagerment.taskmanagement.enums.IssueStatus;
import com.taskmanagerment.taskmanagement.enums.IssueTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "issues")
@Data
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String issueKey;

    @Column(nullable = false)
    private String issueTitle;

    @Column(nullable = false, length = 10000)
    private String issueDescription;

    @Enumerated(EnumType.STRING)
    private IssueTypes issueType;

    @Enumerated(EnumType.STRING)
    private IssuePriority issuePriority;

    @Enumerated(EnumType.STRING)
    private IssueStatus issueStatus;

    private String assigneeEmail;
    private String reporterEmail;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    private LocalDateTime dueDate;

    private Long sprintId;
    private Long epicId;
    private Long projectId;

    private Long sourceIssueId;
    private Integer backLogPosition;

    private Long workFlowId;

    

}
