package com.taskmanagerment.taskmanagement.repositpory;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanagerment.taskmanagement.entity.UserAuthentication;

@Repository
public interface UserAuthenticationRepo extends JpaRepository<UserAuthentication,Long>{
        Optional<UserAuthentication> findByUserOfficialEmail(String userOfficialEmail);
}
