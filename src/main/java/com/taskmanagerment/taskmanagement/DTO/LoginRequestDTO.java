package com.taskmanagerment.taskmanagement.DTO;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginRequestDTO {
    private String userOfficialEmail;
    private String password;
}
