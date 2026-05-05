package com.taskmanagerment.taskmanagement.DTO;
import lombok.*;

@Data
@NoArgsConstructor
@Builder
public class AuthResponseDTO {
    private String token;
    private String message;
    private Object profile;
    public AuthResponseDTO(String token, String message, Object profile) {
        this.token = token;
        this.message = message;
        this.profile = profile;
    }   
}
