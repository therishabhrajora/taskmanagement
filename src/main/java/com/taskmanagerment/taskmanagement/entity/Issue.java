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
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getIssueKey() {
        return issueKey;
    }
    public void setIssueKey(String issueKey) {
        this.issueKey = issueKey;
    }
    public String getIssueTitle() {
        return issueTitle;
    }
    public void setIssueTitle(String issueTitle) {
        this.issueTitle = issueTitle;
    }
    public String getIssueDescription() {
        return issueDescription;
    }
    public void setIssueDescription(String issueDescription) {
        this.issueDescription = issueDescription;
    }
    public IssueTypes getIssueType() {
        return issueType;
    }
    public void setIssueType(IssueTypes issueType) {
        this.issueType = issueType;
    }
    public IssuePriority getIssuePriority() {
        return issuePriority;
    }
    public void setIssuePriority(IssuePriority issuePriority) {
        this.issuePriority = issuePriority;
    }
    public IssueStatus getIssueStatus() {
        return issueStatus;
    }
    public void setIssueStatus(IssueStatus issueStatus) {
        this.issueStatus = issueStatus;
    }
    public String getAssigneeEmail() {
        return assigneeEmail;
    }
    public void setAssigneeEmail(String assigneeEmail) {
        this.assigneeEmail = assigneeEmail;
    }
    public String getReporterEmail() {
        return reporterEmail;
    }
    public void setReporterEmail(String reporterEmail) {
        this.reporterEmail = reporterEmail;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    public LocalDateTime getDueDate() {
        return dueDate;
    }
    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }
    public Long getSprintId() {
        return sprintId;
    }
    public void setSprintId(Long sprintId) {
        this.sprintId = sprintId;
    }
    public Long getEpicId() {
        return epicId;
    }
    public void setEpicId(Long epicId) {
        this.epicId = epicId;
    }
    


}
