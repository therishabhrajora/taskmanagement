package com.taskmanagerment.taskmanagement.services;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.netflix.discovery.converters.Auto;
import com.taskmanagerment.taskmanagement.client.IssueClient;
import com.taskmanagerment.taskmanagement.enums.IssueStatus;

@Service
public class IntegrationService {

    @Autowired
    private IssueClient issueClient;

    public void commitMessage(String msg, String author){
        String regex="([A-Z]+-\\d)";

        var matcher=Pattern.compile(regex).matcher(msg);  
        if(matcher.find()){
            Long issueId=Long.parseLong(matcher.group(1).split("-")[1]);
            issueClient.updateIssueStatus(issueId, IssueStatus.DONE, author);

            issueClient.addCommentToIssue(issueId, author, "Code committed with message: "+msg);
        }
    }


    public void handlePullRequest(String title, String author){
        String regex="([A-Z]+-\\d)";

        Matcher matcher=Pattern.compile(regex).matcher(title);  
        if(matcher.find()){
            Long issueId=Long.parseLong(matcher.group(1).split("-")[1]);
            issueClient.updateIssueStatus(issueId, IssueStatus.IN_PROGRESS, author);
            issueClient.addCommentToIssue(issueId, author, "Pull Request opened with title: "+title);
        }
    }



    
}
