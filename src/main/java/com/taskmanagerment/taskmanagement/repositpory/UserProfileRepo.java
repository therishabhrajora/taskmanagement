package com.taskmanagerment.taskmanagement.repositpory;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanagerment.taskmanagement.entity.UserProfile;

@Repository
public interface UserProfileRepo extends JpaRepository<UserProfile,Long>{
    Optional<UserProfile> findByUserOfficialEmail(String userOfficialEmail);
    List<UserProfile> findByDesignation(String designation);
    List<UserProfile> findByDepartment(String department);
    

}
