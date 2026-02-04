package com.taskmanagerment.taskmanagement.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.taskmanagerment.taskmanagement.enums.IssueStatus;

@FeignClient(name = "issue-service", url = "${ issue.service.url }")
public interface IssueClient {

    @PutMapping("/api/issues/{id}/status")
    public void updateIssueStatus(@PathVariable Long id,
            @RequestParam IssueStatus status,
            @RequestParam String performBy);

    @PostMapping("/api/issues/{id}/comment")
    public void addCommentToIssue(@PathVariable Long id,
            @RequestParam String author,
            @RequestParam String body);


    

}
