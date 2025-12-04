package com.taskmanagerment.taskmanagement.entity;

import java.time.LocalDateTime;

import com.taskmanagerment.taskmanagement.enums.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name="user_auth")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserAuthentication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
     private String username;
    @Column(unique = true,nullable = false)
    private String userOfficialEmail;
    @Column(nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;


    private boolean actice=true;
    private LocalDateTime createdAt=LocalDateTime.now();

}
