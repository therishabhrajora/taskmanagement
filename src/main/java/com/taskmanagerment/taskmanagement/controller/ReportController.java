package com.taskmanagerment.taskmanagement.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanagerment.taskmanagement.services.ReportingService;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportingService reportingService;


    @GetMapping("/burn-down/{sprintId}")
    public ResponseEntity<Map<String, Object>> getBurnDownReport(@PathVariable Long sprintId) {
        return ResponseEntity.ok(reportingService.burnDown(sprintId));
    }

    @GetMapping("/velocity/{projectId}")
    public ResponseEntity<Map<String, Object>> getVelocityReport(@RequestParam Long projectId) {
        return ResponseEntity.ok(reportingService.velocity(projectId));
    }

    @GetMapping("/sprintReport/{sprintId}")
    public ResponseEntity<Map<String, Object>> getSprintReport(@RequestParam Long sprintId) {
        return ResponseEntity.ok(reportingService.sprintReport(sprintId));
    }


    @GetMapping("/epicReport/{epicId}")
    public ResponseEntity<Map<String, Object>> getEpicReport(@RequestParam Long epicId) {
        return ResponseEntity.ok(reportingService.epicReport(epicId));
    }


    @GetMapping("/workLoadReport/{sprintId}")
    public ResponseEntity<Map<String, Object>> getWorkLoadReport(@RequestParam Long sprintId) {
        return ResponseEntity.ok(reportingService.workLoad(sprintId));
    }

    @GetMapping("/comulativeFlow/{sprintId}")
    public ResponseEntity<Map<String, Object>> getComulativeFlowReport(@PathVariable Long sprintId) {
        return ResponseEntity.ok(reportingService.comulativeFlow(sprintId));
    }








}
