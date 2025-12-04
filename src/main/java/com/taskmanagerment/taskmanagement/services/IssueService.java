package com.taskmanagerment.taskmanagement.services;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.taskmanagerment.taskmanagement.DTO.IssueDTO;
import com.taskmanagerment.taskmanagement.entity.Issue;
import com.taskmanagerment.taskmanagement.entity.IssueComment;
import com.taskmanagerment.taskmanagement.enums.IssuePriority;
import com.taskmanagerment.taskmanagement.enums.IssueStatus;
import com.taskmanagerment.taskmanagement.enums.IssueTypes;
import com.taskmanagerment.taskmanagement.repositpory.EpicRepo;
import com.taskmanagerment.taskmanagement.repositpory.IssueCommentRepo;
import com.taskmanagerment.taskmanagement.repositpory.IssueRepo;
import com.taskmanagerment.taskmanagement.repositpory.SprintRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IssueService {
    @Autowired
    private IssueRepo issueRepo;
    @Autowired
    private SprintRepo sprintRepo;

    @Autowired
    private IssueCommentRepo issueCommentRepo;

    @Autowired
    private EpicRepo epicRepo;

    private String generatedKey(Long id) {
        return "PROJECT-" + id;
    }

    @Transactional
    public IssueDTO createIssue(IssueDTO dto) {
        Issue issue = new Issue();
        issue.setIssueTitle(dto.getIssueTitle());
        issue.setIssueDescription(dto.getIssueDescription());
        issue.setIssueType(dto.getIssueType());
        issue.setIssueKey("PROJECT-" + issue.getId());
        issue.setIssuePriority(IssuePriority.LOW);
        issue.setIssueStatus(IssueStatus.OPEN);
        issue.setAssigneeEmail(dto.getAssigneeEmail());
        issue.setCreatedAt(dto.getCreatedAt());
        issue.setDueDate(dto.getDueDate());
        issue.setEpicId(dto.getEpicId());
        issue.setReporterEmail(dto.getReporterEmail());
        issue.setSprintId(dto.getSprintId());

        if (dto.getEpicId() != null) {
            epicRepo.findById(dto.getEpicId())
                    .orElseThrow(() -> new RuntimeException("Epic not found"));
            issue.setEpicId(dto.getEpicId());
        }

        if (dto.getSprintId() != null) {
            sprintRepo.findById(dto.getSprintId())
                    .orElseThrow(() -> new RuntimeException("Sprint not found"));
            issue.setSprintId(dto.getSprintId());
        }

        issueRepo.save(issue);

        return toDTO(issue);
    }

    public IssueDTO getById(Long id) {
        Issue issue = issueRepo.findById(id).orElseThrow(() -> new RuntimeException("Issue not found"));
        return toDTO(issue);
    }

    @Transactional
    public IssueDTO updateIssueStatus(Long id, IssueStatus status, String performBy) {
        Issue issue = issueRepo.findById(id).orElseThrow(() -> new RuntimeException("Issue not found"));
        IssueStatus newStatus;
        try {
            newStatus = IssueStatus.valueOf(String.valueOf(status).toLowerCase());
        } catch (Exception e) {
            throw new RuntimeException("Failed to update issue status: " + status);
        }

        issue.setIssueStatus(newStatus);
        issueRepo.save(issue);

        IssueComment comment = new IssueComment();
        comment.setIssueId(issue.getId());
        comment.setAuthorEmail(performBy);
        comment.setBody("Issue status changed to " + newStatus);
        issueCommentRepo.save(comment);

        return toDTO(issue);
    }

    @Transactional
    public IssueComment addComment(Long issueId, String authorEmail, String body) {
        {
            Issue issue = issueRepo.findById(issueId).orElseThrow(() -> new RuntimeException("Issue not found"));

            IssueComment comment = new IssueComment();
            comment.setIssueId(issue.getId());
            comment.setAuthorEmail(authorEmail);
            comment.setBody(body);
            issueCommentRepo.save(comment);

            return comment;
        }

    }

    public List<IssueDTO> search(Map<String, String> filter) {
        if (filter.containsKey("assignee")) {
            return issueRepo.findByAssigneeEmail(filter.get("assignee")).stream().map(this::toDTO)
                    .collect(Collectors.toList());
        }

        if (filter.containsKey("status")) {
            String statusStr = filter.get("status");
            IssueStatus status;
            try {
                status = IssueStatus.valueOf(statusStr.toUpperCase().trim());
            } catch (Exception e) {
                throw new RuntimeException(
                        "Invalid issue status: " + statusStr + "| Allowed" + Arrays.toString(IssueStatus.values()));
            }

            return issueRepo.findByIssueStatus(status).stream().map(this::toDTO).collect(Collectors.toList());

        }

        if(filter.containsKey("sprint")){
            Long sprintId=Long.valueOf(filter.get("sprint"));
            return issueRepo.findBySprintId(sprintId).stream().map(this::toDTO).collect(Collectors.toList());
        }

        return issueRepo.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    private IssueDTO toDTO(Issue issue) {
        return IssueDTO.builder()
                .issueKey(issue.getIssueKey())
                .issueTitle(issue.getIssueTitle())
                .issueDescription(issue.getIssueDescription())
                .issueType(issue.getIssueType())
                .issuePriority(issue.getIssuePriority())
                .issueStatus(issue.getIssueStatus())
                .assigneeEmail(issue.getAssigneeEmail())
                .reporterEmail(issue.getReporterEmail())
                .dueDate(issue.getDueDate())
                .sprintId(issue.getSprintId())
                .epicId(issue.getEpicId())
                .createdAt(issue.getCreatedAt())
                .updatedAt(issue.getUpdatedAt())
                .build();
    }
}
