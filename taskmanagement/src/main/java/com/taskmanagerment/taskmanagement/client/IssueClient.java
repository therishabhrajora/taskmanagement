package com.taskmanagerment.taskmanagement.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.taskmanagerment.taskmanagement.enums.IssueStatus;

@FeignClient(
        name = "issue-service",
        url = "${issue.service.url}"
)
public interface IssueClient {

    @PutMapping("/api/issues/{id}/status")
    void updateIssueStatus(
            @PathVariable("id") Long id,
            @RequestParam("status") IssueStatus status,
            @RequestParam("performBy") String performBy
    );

    @PostMapping("/api/issues/{id}/comment")
    void addCommentToIssue(
            @PathVariable("id") Long id,
            @RequestParam("author") String author,
            @RequestParam("body") String body
    );
}
    