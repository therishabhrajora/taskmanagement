package com.taskmanagerment.taskmanagement.repositpory;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanagerment.taskmanagement.entity.NotificationScheme;
import com.taskmanagerment.taskmanagement.enums.NotificationEvent;

@Repository
public interface NotificationSchemeRepo extends JpaRepository<NotificationScheme,Long>{
Optional<NotificationScheme> findByProjectIdAndEventType(Long projectId, NotificationEvent eventType);


}
