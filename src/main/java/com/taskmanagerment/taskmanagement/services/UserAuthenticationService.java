package com.taskmanagerment.taskmanagement.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.taskmanagerment.taskmanagement.DTO.AuthResponseDTO;
import com.taskmanagerment.taskmanagement.DTO.LoginRequestDTO;
import com.taskmanagerment.taskmanagement.DTO.RegisterRequestDTO;
import com.taskmanagerment.taskmanagement.entity.UserAuthentication;
import com.taskmanagerment.taskmanagement.repositpory.UserAuthenticationRepo;
import com.taskmanagerment.taskmanagement.security.JWTTokenUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserAuthenticationService {

    @Autowired
    private UserAuthenticationRepo userAuthRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    JWTTokenUtil jUtil;

    Logger logger = LoggerFactory.getLogger(UserAuthenticationService.class);

    public String register(RegisterRequestDTO register) {
        if (userAuthRepo.findByUserOfficialEmail(register.getUserOfficialEmail()).isPresent()) {
            throw new RuntimeException("User already exists"+register.getUserOfficialEmail());
        }

        UserAuthentication user = new UserAuthentication();
        user.setUsername(register.getUsername());
        user.setUserOfficialEmail(register.getUserOfficialEmail());
        user.setPassword(passwordEncoder.encode(register.getPassword()));
        user.setRole(register.getRole());
        userAuthRepo.save(user);

        return ResponseEntity.ok("User Registered Successfully").toString();

    }

    public AuthResponseDTO login(LoginRequestDTO login) {
        UserAuthentication user = userAuthRepo.findByUserOfficialEmail(login.getUserOfficialEmail())
                .orElseThrow(()->new RuntimeException("User not found"));

        if(!passwordEncoder.matches(login.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid credentials");
        }

        String token=jUtil.generateToken(user);
        return new AuthResponseDTO(token,"token got generated");
    } 

}
