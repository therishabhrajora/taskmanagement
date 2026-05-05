package com.taskmanagerment.taskmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanagerment.taskmanagement.DTO.UserProfileDTO;
import com.taskmanagerment.taskmanagement.services.UserProfileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user-profile")
@RequiredArgsConstructor
public class UserProfileUpdateContoller {
    @Autowired
    private UserProfileService userProfileService;

    @PutMapping
    public ResponseEntity<UserProfileDTO> updateUserProfile ( @RequestBody UserProfileDTO dto,Authentication authentication) {   
        String email = authentication.getUsername();
        return ResponseEntity.ok(
                userProfileService.updateUserProfile(email, dto));
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserProfileDTO>> getAllUserProfiles() {
        List<UserProfileDTO> allUserProfiles = userProfileService.getAllUserProfiles();
        return ResponseEntity.ok(allUserProfiles);
    }

    @GetMapping("/{email}")
    public ResponseEntity<UserProfileDTO> getUserProfileByEmail(@PathVariable String email) {
        return ResponseEntity.ok(userProfileService.getUserProfileByEmail(email));
    }

    @GetMapping("/{designation}")
    public ResponseEntity<UserProfileDTO> getUserProfileByDesignation(@PathVariable String designation) {
        return ResponseEntity.ok(userProfileService.getUserProfileByDesignation(designation));
    }

    @GetMapping("/{department}")
    public ResponseEntity<UserProfileDTO> getUserProfileByDepartment(@PathVariable String department) {
        return ResponseEntity.ok(userProfileService.getUserProfileByDepartment(department));
    }
}
