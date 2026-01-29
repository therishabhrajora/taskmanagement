package com.taskmanagerment.taskmanagement.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanagerment.taskmanagement.DTO.AuthResponseDTO;
import com.taskmanagerment.taskmanagement.DTO.LoginRequestDTO;
import com.taskmanagerment.taskmanagement.DTO.RegisterRequestDTO;
import com.taskmanagerment.taskmanagement.services.UserAuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserAuthenticateController {
    @Autowired
    private UserAuthenticationService userAuthenticationService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequestDTO request){
        System.out.println("this is     ===="+request);
      
        userAuthenticationService.register(request);
        return ResponseEntity.ok("User register successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginRequestDTO request){
        System.out.println("this is login ======"+request);
        return ResponseEntity.ok( userAuthenticationService.login(request));
    }
}
