package com.taskmanagerment.taskmanagement.services;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.taskmanagerment.taskmanagement.DTO.UserProfileDTO;
import com.taskmanagerment.taskmanagement.entity.UserAuthentication;
import com.taskmanagerment.taskmanagement.entity.UserProfile;
import com.taskmanagerment.taskmanagement.enums.Role;
import com.taskmanagerment.taskmanagement.repositpory.UserAuthenticationRepo;
import com.taskmanagerment.taskmanagement.repositpory.UserProfileRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserProfileService {
    @Autowired
    private UserProfileRepo userProfileRepo;

    @Autowired
    private UserAuthenticationRepo userRepo;

    public UserProfileDTO updateUserProfile(UserProfileDTO dto) {
        UserProfile user = userProfileRepo.findByUserOfficialEmail(dto.getUserOfficialEmail())
                .orElseThrow(() -> new RuntimeException("User profile not found"));

        UserProfile userProfile = new UserProfile();
        userProfile.setUsername(dto.getUsername());
        userProfile.setUserOfficialEmail(dto.getUserOfficialEmail());
        userProfile.setDesignation(dto.getDesignation());
        userProfile.setDepartment(dto.getDepartment());
        userProfile.setOrganization(dto.getOrganization());
        userProfile.setCreatedAt(LocalDateTime.now());
        userProfile.setActive(dto.isActive());
        userProfileRepo.save(userProfile);

        return toDTO(userProfile);
    }

    public List<UserProfileDTO> getAllUserProfiles() {
        return userProfileRepo.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public UserProfileDTO getUserProfileByEmail(String userOfficialEmail) {
        UserProfile userProfile = userProfileRepo.findByUserOfficialEmail(userOfficialEmail)
                .orElseThrow(() -> new RuntimeException("User profile not found"));

        return toDTO(userProfile);
    }

    public UserProfileDTO getUserProfileByDesignation(String designation) {
        UserProfile userProfile = userProfileRepo.findByDesignation(designation)
                .stream().findFirst()
                .orElseThrow(() -> new RuntimeException("User profile not found"));

        return toDTO(userProfile);

    }

    public UserProfileDTO getUserProfileByDepartment(String department) {
        UserProfile userProfile = userProfileRepo.findByDepartment(department)
                .stream().findFirst()
                .orElseThrow(() -> new RuntimeException("User profile not found"));

        return toDTO(userProfile);

    }

    public UserAuthentication uploadRole(Long id,Role role){
        UserAuthentication user= userRepo.findById(id).orElseThrow(()->new RuntimeException("User not found"));
        user.setRole(role);

        return userRepo.save(user);
    }

    private UserProfileDTO toDTO(UserProfile userProfile) {
        return UserProfileDTO.builder()
                .username(userProfile.getUsername())
                .userOfficialEmail(userProfile.getUserOfficialEmail())
                .designation(userProfile.getDesignation())
                .department(userProfile.getDepartment())
                .organization(userProfile.getOrganization())
                .active(userProfile.isActive())
                .createdAt(userProfile.getCreatedAt())
                .build();
    }
}
