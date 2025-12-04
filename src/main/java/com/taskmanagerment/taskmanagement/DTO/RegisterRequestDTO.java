package com.taskmanagerment.taskmanagement.DTO;



import com.taskmanagerment.taskmanagement.enums.Role;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequestDTO {
    private String username;
    private String userOfficialEmail;
    private String password;
    private Role role;
}
