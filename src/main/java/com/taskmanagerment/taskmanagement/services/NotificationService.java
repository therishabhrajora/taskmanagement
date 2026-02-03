package com.taskmanagerment.taskmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanagerment.taskmanagement.repositpory.NotificationRepo;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepo notificationRepo;

    private void send(String to, String subject, String body){
        
    }
}
