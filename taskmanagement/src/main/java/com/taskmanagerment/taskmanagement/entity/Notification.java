package com.taskmanagerment.taskmanagement.entity;

import java.time.LocalDateTime;

import com.taskmanagerment.taskmanagement.enums.NotificationEvent;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "notification")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String recipentEmail;
    private String subject;

    @Column(columnDefinition = "TEXT", length = 10000)
    private String body;


    private NotificationEvent event;

    private Long entityId;

    private LocalDateTime localDateTime=LocalDateTime.now();
    
}
