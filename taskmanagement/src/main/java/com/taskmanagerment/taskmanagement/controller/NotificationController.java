package com.taskmanagerment.taskmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanagerment.taskmanagement.services.NotificationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationController {


    @Autowired
    private NotificationService notificationService;

    @GetMapping("/notify")
    public ResponseEntity<String> getAll() {
        notificationService.notify();
        return ResponseEntity.ok("Notification sent successfully");
    }
}
