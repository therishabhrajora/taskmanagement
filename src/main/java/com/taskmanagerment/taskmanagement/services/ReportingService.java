package com.taskmanagerment.taskmanagement.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.netflix.discovery.converters.Auto;
import com.taskmanagerment.taskmanagement.entity.Issue;
import com.taskmanagerment.taskmanagement.entity.Sprint;
import com.taskmanagerment.taskmanagement.repositpory.IssueRepo;
import com.taskmanagerment.taskmanagement.repositpory.SprintRepo;

import jakarta.ws.rs.core.Link;

@Service
public class ReportingService {

    @Autowired
    private IssueRepo issueRepo;

    @Autowired
    private SprintRepo sprintRepo;

    public Map<String,Object> burnDown(Long sprintId) {
        Sprint sprint = sprintRepo.findById(sprintId).orElseThrow(() -> new RuntimeException("Sprint not found"));

        List<Issue> issues = issueRepo.findBySprintId(sprintId);

        int totalTask = issues.size();
        Map<String, Long> chart = new LinkedHashMap<>();

        LocalDateTime start = sprint.getStartDate();

        LocalDateTime end = sprint.getEndDate() != null ? sprint.getEndDate() : LocalDateTime.now().plusDays(14);

        for (LocalDateTime date = start; !date.isAfter(end); date = date.plusDays(1)) {
            int done = (int) issues.stream().filter(i -> "DONE".equals(i.getIssueStatus().name())).count();
            chart.put(date.toLocalDate().toString(), (long) done);
        }

        Map<String, Object> response = new HashMap<>();

        response.put("chart", chart);
        response.put("totalTasks", totalTask);

        return response;

    }



    
}
