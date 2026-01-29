package com.taskmanagerment.taskmanagement.repositpory;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanagerment.taskmanagement.entity.Sprint;
import java.util.List;
import com.taskmanagerment.taskmanagement.enums.SprintState;



@Repository
public interface SprintRepo  extends JpaRepository<Sprint, Long> {
    List<Sprint> findByProjectId(Long projectId);
    List<Sprint> findByState(SprintState state);
    
}
