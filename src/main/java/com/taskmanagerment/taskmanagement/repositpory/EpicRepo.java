package com.taskmanagerment.taskmanagement.repositpory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanagerment.taskmanagement.entity.Epic;

@Repository
public interface EpicRepo  extends JpaRepository<Epic,Long>{
    
}
