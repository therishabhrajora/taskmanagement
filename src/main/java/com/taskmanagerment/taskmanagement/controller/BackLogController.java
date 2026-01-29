package com.taskmanagerment.taskmanagement.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanagerment.taskmanagement.entity.Issue;
import com.taskmanagerment.taskmanagement.services.BackLogService;

@RestController
@RequestMapping("/api/backlogs")
public class BackLogController {
    @Autowired
    private BackLogService backLogService;

    @GetMapping("/{projectId}")
    public ResponseEntity<List<Issue>> getBackLog(@PathVariable Long projectId){
        return ResponseEntity.ok(backLogService.getBackLog(projectId));

    }

    @PostMapping("/{projectId}/record")
    public ResponseEntity<String> recordBackLog(@PathVariable Long projectId, List<Long> orderIssueId){
        backLogService.recordBackLog(projectId, orderIssueId);
        return ResponseEntity.ok("backlog recorded");
    }


    
    @PutMapping("/add_to-sprint/{issueId}/{sprintId}")
    public ResponseEntity<Issue> addIssueToSprint(@PathVariable Long issueId, @PathVariable Long sprintId){
        Issue issue= backLogService.addIssueToSprint(issueId, sprintId);
        return ResponseEntity.ok(issue);
    }


    @GetMapping("/{projectId}/hierarchy")
    public ResponseEntity<Map<String,Object>> getBackLogHierarchy(@PathVariable Long projectId){
        Map<String,Object> hierarchy= backLogService.getBackLogHierarchy(projectId);
        return ResponseEntity.ok(hierarchy);
    }


}
