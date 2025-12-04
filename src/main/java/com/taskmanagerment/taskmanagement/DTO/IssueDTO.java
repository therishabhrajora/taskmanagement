package com.taskmanagerment.taskmanagement.DTO;

import java.time.LocalDateTime;

import com.taskmanagerment.taskmanagement.enums.IssuePriority;
import com.taskmanagerment.taskmanagement.enums.IssueStatus;
import com.taskmanagerment.taskmanagement.enums.IssueTypes;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IssueDTO {
    
    private String issueKey;
    private String issueTitle;
    private String issueDescription;
    private IssueTypes issueType;
    private IssuePriority issuePriority;
    private IssueStatus issueStatus;
    private String assigneeEmail;
    private String reporterEmail;
    private LocalDateTime dueDate;
    private Long sprintId;
    private Long epicId;
     private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
