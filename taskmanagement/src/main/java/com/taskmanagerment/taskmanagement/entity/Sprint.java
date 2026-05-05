package com.taskmanagerment.taskmanagement.entity;

import java.time.LocalDateTime;

import com.taskmanagerment.taskmanagement.enums.SprintState;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sprints")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Sprint {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String sprintName;

    private LocalDateTime startDate;
    private LocalDateTime endDate;

    @Enumerated(EnumType.STRING)
    private SprintState state;

    private Long projectId;
    private LocalDateTime createdAt=LocalDateTime.now();
    

}
