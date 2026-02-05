package com.taskmanagerment.taskmanagement.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.taskmanagerment.taskmanagement.entity.Issue;
import com.taskmanagerment.taskmanagement.entity.Sprint;
import com.taskmanagerment.taskmanagement.enums.IssueTypes;
import com.taskmanagerment.taskmanagement.enums.SprintState;
import com.taskmanagerment.taskmanagement.repositpory.IssueRepo;
import com.taskmanagerment.taskmanagement.repositpory.SprintRepo;

@Service
public class BackLogService {
    @Autowired
    private IssueRepo issueRepo;

    @Autowired
    private SprintRepo sprintRepo;

    public List<Issue> getBackLog(Long projectId) {
        if (projectId == null) {
            return issueRepo.findByProjectIdAndSprintIdIsNullOrderByBackLogPosition
(null);
        }

        return issueRepo.findByProjectIdAndSprintIdIsNullOrderByBackLogPosition
(projectId);

    }

    @Transactional
    public void recordBackLog(Long projectId, List<Long> orderIssueId) {
        int pos = 0;
        for (Long issueId : orderIssueId) {
            Issue issue = issueRepo.findById(issueId).orElseThrow(() -> new RuntimeException("Issue not found"));
            issue.setBackLogPosition(pos++);
            issueRepo.save(issue);

        }
    }

    @Transactional
    public Issue addIssueToSprint(Long issueId, Long sprintId){
        Issue issue=issueRepo.findById(issueId).orElseThrow(()->new RuntimeException("issue not found"));
        Sprint sprint= sprintRepo.findById(sprintId).orElseThrow(()->new RuntimeException("sprint not found"));

        SprintState sprintState=sprint.getState();
        if(sprintState!=SprintState.PLANNED && sprintState!=SprintState.ACTIVE){
            throw new RuntimeException("can not issue to sprint"+sprintState);
                
        }

        issue.setSprintId(sprintId);
        issue.setBackLogPosition(null);
        return issueRepo.save(issue);
    }


    public Map<String,Object> getBackLogHierarchy(Long project){
        List<Issue> backLog=getBackLog(project);
        Map<Long, Map<String,Object>> epicMap=new LinkedHashMap<>();

        for(Issue issue:backLog){
            // if(issue.getIssueType()!=null && "EPICS".equalsIgnoreCase(issue.getIssueType().name())){
            if(issue.getIssueType()==IssueTypes.EPICS){
              
                Map<String,Object> data=new LinkedHashMap<>();
                data.put("epic",issue);
                data.put("stories",new ArrayList<Issue>());
                data.put("subtasks",new HashMap<Long,List<Issue>>());
                epicMap.put(issue.getId(),data);
            }
        }


        for(Issue i:backLog){
           if(i.getIssueType()==IssueTypes.STORIES && i.getSprintId()!=null){
                Map<String,Object> epicData=epicMap.get(i.getEpicId());
                if(epicData!=null){
                    List<Issue> stories=(List<Issue>)epicData.get("stories");
                    stories.add(i);
                }
            }
        }

        for(Issue i:backLog){
            if(i.getIssueType()==IssueTypes.SUBTASKS && i.getSourceIssueId()!=null){
                Long sourceIssueId=i.getSourceIssueId();

                for(Map<String,Object> epicData:epicMap.values() ){
                    List<Issue> stories=(List<Issue>)epicData.get("stories");
                    for(Issue story:stories){
                        if(story.getId().equals(sourceIssueId)){
                            Map<Long,List<Issue>> subTasksMap=(  Map<Long,List<Issue>>) epicData.get("subTasks");
                            subTasksMap.computeIfAbsent(sourceIssueId, k->new ArrayList<>()).add(i);
                            break;
                        }
                    }
                } 
            }
        }
        return Collections.singletonMap("epics", epicMap.values());
    }

}