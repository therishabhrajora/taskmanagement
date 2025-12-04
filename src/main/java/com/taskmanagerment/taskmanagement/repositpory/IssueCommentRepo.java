package com.taskmanagerment.taskmanagement.repositpory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanagerment.taskmanagement.entity.IssueComment;

@Repository
public interface IssueCommentRepo extends JpaRepository<IssueComment, Long> {
    List<IssueComment> findByIssueId(Long issueId);
    
}
