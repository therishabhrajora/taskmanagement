package com.taskmanagerment.taskmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

    @PutMapping("/{email}")
    public ResponseEntity<UserProfileDTO> updateUserProfile(@RequestBody UserProfileDTO dto, @PathVariable String email) {
        return ResponseEntity.ok(userProfileService.updateUserProfile(dto));
    }
    @GetMapping("/all")
        public ResponseEntity<List<UserProfileDTO>> getAllUserProfiles(){
            return ResponseEntity.ok(userProfileService.getAllUserProfiles());
    }
    @GetMapping("/{email}")
        public ResponseEntity<UserProfileDTO> getUserProfileByEmail(@PathVariable String email){
            return ResponseEntity.ok(userProfileService.getUserProfileByEmail(email));
    }
    @GetMapping("/{designation}")
        public ResponseEntity<UserProfileDTO> getUserProfileByDesignation(@PathVariable String designation){
            return ResponseEntity.ok(userProfileService.getUserProfileByDesignation(designation));
    }
    @GetMapping("/{department}")
        public ResponseEntity<UserProfileDTO> getUserProfileByDepartment(@PathVariable String department){
            return ResponseEntity.ok(userProfileService.getUserProfileByDepartment(department));
    }
}
