package com.taskmanagerment.taskmanagement.repositpory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanagerment.taskmanagement.entity.Notification;

@Repository
public interface NotificationRepo extends JpaRepository<Notification,Long> {
    

}
