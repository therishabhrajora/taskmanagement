package com.taskmanagerment.taskmanagement.services;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.taskmanagerment.taskmanagement.entity.Issue;
import com.taskmanagerment.taskmanagement.entity.Sprint;
import com.taskmanagerment.taskmanagement.enums.IssueStatus;
import com.taskmanagerment.taskmanagement.enums.SprintState;
import com.taskmanagerment.taskmanagement.repositpory.IssueRepo;
import com.taskmanagerment.taskmanagement.repositpory.SprintRepo;

@Service
public class SprintService {
    @Autowired
    private SprintRepo sprintRepo;
    @Autowired
    private IssueRepo issueRepo;

    public Sprint createSprint(Sprint sprint) {
        sprint.setState(SprintState.PLANNED);
        return sprintRepo.save(sprint);
    }

    @Transactional
    public Issue assignIssueToSprint(Long sprintId, Long issueId) {
        Sprint sprint = sprintRepo.findById(sprintId).orElseThrow(() -> new RuntimeException("sprint not found"));
        Issue issue = issueRepo.findById(issueId).orElseThrow(() -> new RuntimeException("issue not found"));
        if (sprint.getState() != SprintState.COMPLETED) {
            throw new RuntimeException("can not add issue to completed sprint");
        }

        issue.setSprintId(sprintId);
        return issueRepo.save(issue);
    }

    @Transactional
    public Sprint startSprint(Long sprintId) {
        Sprint sprint = sprintRepo.findById(sprintId).orElseThrow(() -> new RuntimeException("sprint not found"));
        if (sprint.getState() != SprintState.PLANNED) {
            throw new RuntimeException("only, planned sprint can be start");
        }

        if (sprint.getStartDate() == null) {
            sprint.setStartDate(LocalDateTime.now());
        }

        return sprintRepo.save(sprint);
    }

    @Transactional
    public Sprint closeSprint(Long sprintId) {
        Sprint sprint = sprintRepo.findById(sprintId).orElseThrow(() -> new RuntimeException("sprint not found"));

        sprint.setState(SprintState.COMPLETED);
        if (sprint.getState() == null) {
            sprint.setEndDate(LocalDateTime.now());
        }

        List<Issue> issues = issueRepo.findBySprintId(sprintId);

        for (Issue issue : issues) {
            if (issue.getIssueStatus().name().equals(IssueStatus.DONE)) {
                issue.setSprintId(sprintId);
                issue.setBackLogPosition(0);
                issueRepo.save(issue);
            }

        }

        return sprintRepo.save(sprint);
    }

    public Map<String,Object> getBurnDownDate(Long sprintId) {
        Sprint sprint = sprintRepo.findById(sprintId).orElseThrow(() -> new RuntimeException("Sprint not found"));
        LocalDateTime start = sprint.getStartDate();
        LocalDateTime end = sprint.getEndDate() != null ? 
                            sprint.getEndDate() : LocalDateTime.now();

        List<Issue> issues=issueRepo.findBySprintId(sprintId);
        int totalTask=issues.size();

        Map<String,Object> burnDown=new LinkedHashMap<>();
        LocalDateTime cursor=start;
        while(!cursor.isAfter(end)){
            long completed=issues.stream().filter((i)->"DONE".equals(i.getIssueStatus().name())).count();

            burnDown.put(cursor.toString(),totalTask-(int) completed);

            cursor=cursor.plusDays(1);

        }

        Map<String,Object> respose=new HashMap<>();
        respose.put("sprintId", sprintId);
        respose.put("startDate", start);
        respose.put("endDate", end);
        respose.put("burnDown", burnDown);

        return respose;
    }
}
