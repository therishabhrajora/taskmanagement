package com.taskmanagerment.taskmanagement.DTO;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDTO {
    private String username;
    private String userOfficialEmail;
    private String designation;
    private String department;
    private String organization;
    private LocalDateTime createdAt;
    private boolean active;

  
}
