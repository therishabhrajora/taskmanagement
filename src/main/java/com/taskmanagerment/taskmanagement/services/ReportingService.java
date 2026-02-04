package com.taskmanagerment.taskmanagement.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.netflix.discovery.converters.Auto;
import com.taskmanagerment.taskmanagement.entity.Issue;
import com.taskmanagerment.taskmanagement.entity.Sprint;
import com.taskmanagerment.taskmanagement.enums.IssueStatus;
import com.taskmanagerment.taskmanagement.enums.SprintState;
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

    public Map<String,Object>  velocity(Long projectId){
        List<Sprint> completeSprints=sprintRepo.findByProjectId(projectId)
                .stream()
                .filter(sprint -> sprint.getState()==SprintState.COMPLETED).collect(Collectors.toList());



                Map<String,Integer>  velocity=new LinkedHashMap<>();
                for(Sprint sprint:completeSprints){
                    int doneIssues=(int) issueRepo.findBySprintId(sprint.getId()).stream().filter(i->i.getIssueStatus()==IssueStatus.DONE).count();
                    velocity.put(sprint.getSprintName(), doneIssues);
                }

                Map<String,Object> response=new HashMap<>();
                response.put("projectId", projectId);
                response.put("velocity", velocity);


                return response;

    }


    public Map<String,Object>  sprintReport(Long springId){
        List<Issue> issues=issueRepo.findBySprintId(springId);

        long completed=issues.stream().filter(i->i.getIssueStatus()==IssueStatus.DONE).count();

        Map<String,Object> response=new HashMap<>();
        response.put("totalIssues", issues.size());
        response.put("completed", completed);
        response.put("incomplete", issues.size()-completed);

        return response;

    }
    public Map<String,Object>  epicReport(Long epicId){
        List<Issue> stories=issueRepo.findByEpicId(epicId);

        long completed=stories.stream().filter(i->i.getIssueStatus()==IssueStatus.DONE).count();

        int progress=stories.isEmpty() ?0:(int) (completed*100/stories.size());

        Map<String,Object> response=new HashMap<>();
        response.put("epicId", epicId);
        response.put("totalIssues", stories.size());
        response.put("completed", completed);
        response.put("progressPercentage", progress);

        return response;

    }
    public Map<String,Object>  workLoad(Long sprintId){
        List<Issue> issues=issueRepo.findBySprintId(sprintId);
        Map<String, Long> workload = issues.stream().collect(Collectors.groupingBy(Issue::getAssigneeEmail,Collectors.counting()));

        Map<String,Object> response=new HashMap<>();
        
        response.put("workLoad", workload);

        return response;

    }
    public Map<String,Object>  comulativeFlow(Long sprintId){
        List<Issue> issues=issueRepo.findBySprintId(sprintId);
        Map<IssueStatus, Long> cfd = issues.stream().collect(Collectors.groupingBy(Issue::getIssueStatus,Collectors.counting()));

        Map<String,Object> response=new HashMap<>();
        
        response.put("cfd", cfd);
        return response;

    }











    
}
