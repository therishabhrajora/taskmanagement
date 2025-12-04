package com.taskmanagerment.taskmanagement.repositpory;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanagerment.taskmanagement.entity.Issue;
import com.taskmanagerment.taskmanagement.enums.IssueStatus;

@Repository
public interface IssueRepo extends JpaRepository<Issue,Long> {
    Optional<Issue> findByIssueKey(String issueKey);
    List<Issue> findBySprintId(Long sprintId);
    List<Issue> findByAssigneeEmail(String assigneeEmail);
    List<Issue> findByIssueStatus(IssueStatus issueStatus);
}
