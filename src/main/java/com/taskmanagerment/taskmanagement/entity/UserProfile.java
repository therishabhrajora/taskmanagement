package com.taskmanagerment.taskmanagement.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="user_profile")
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true,nullable = false)
    private String userOfficialEmail;
    @Column(nullable = false)
    private String username;

    private String designation;
    private String department;
    private String organization;

    private LocalDateTime createdAt;

    private boolean active=true;
}
