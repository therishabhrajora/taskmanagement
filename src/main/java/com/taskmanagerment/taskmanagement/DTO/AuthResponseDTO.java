package com.taskmanagerment.taskmanagement.DTO;
import lombok.*;

@Data
@NoArgsConstructor
@Builder
public class AuthResponseDTO {
    private String token;
    private String message;
    public AuthResponseDTO(String token, String message) {
        this.token = token;
        this.message = message;
    }   
}
