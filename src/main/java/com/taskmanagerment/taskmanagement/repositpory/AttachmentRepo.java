package com.taskmanagerment.taskmanagement.repositpory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanagerment.taskmanagement.entity.Attachment;


@Repository
public interface AttachmentRepo extends JpaRepository<Attachment, Long> {
    List<Attachment> findByIssueId(Long issueId);
    
}
