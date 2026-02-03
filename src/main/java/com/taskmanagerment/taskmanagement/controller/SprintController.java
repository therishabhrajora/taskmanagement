package com.taskmanagerment.taskmanagement.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanagerment.taskmanagement.entity.Issue;
import com.taskmanagerment.taskmanagement.entity.Sprint;
import com.taskmanagerment.taskmanagement.repositpory.SprintRepo;
import com.taskmanagerment.taskmanagement.services.SprintService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/sprints")
@RequiredArgsConstructor
public class SprintController {
    @Autowired
    private SprintService sprintService;


    @GetMapping("/create")
    public ResponseEntity<Sprint> createSprint(@RequestBody Sprint sprint){
        return ResponseEntity.ok(sprintService.createSprint(sprint));
    }

    @PutMapping("/assign/{sprintId}/{issueId}")
    public ResponseEntity<Issue> assignIssueToSprint(@PathVariable Long sprintId,@PathVariable Long issueId){
        return ResponseEntity.ok(sprintService.assignIssueToSprint(sprintId, issueId));
    }



    @PutMapping("/{sprintId}/start")
    public ResponseEntity<Sprint> startSprint(@PathVariable Long sprintId){
        return ResponseEntity.ok(sprintService.startSprint(sprintId));
    }
    @PutMapping("/{sprintId}/close")
    public ResponseEntity<Sprint> closeSprint(@PathVariable Long sprintId){
        return ResponseEntity.ok(sprintService.closeSprint(sprintId));
    }
    @GetMapping("/{sprintId}/burnDown")
    public ResponseEntity<Map<String, Object>> getBurnDown(@PathVariable Long sprintId){
        return ResponseEntity.ok(sprintService.getBurnDownDate(sprintId));
    }

    

    



    


    
}
