package com.taskmanagerment.taskmanagement.repositpory;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanagerment.taskmanagement.entity.Sprint;

@Repository
public interface SprintRepo  extends JpaRepository<Sprint, Long> {
    

}
