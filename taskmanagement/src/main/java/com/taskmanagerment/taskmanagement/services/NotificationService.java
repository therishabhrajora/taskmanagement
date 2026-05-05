package com.taskmanagerment.taskmanagement.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.taskmanagerment.taskmanagement.controller.AttachmentController;
import com.taskmanagerment.taskmanagement.entity.Notification;
import com.taskmanagerment.taskmanagement.entity.NotificationScheme;
import com.taskmanagerment.taskmanagement.enums.NotificationEvent;
import com.taskmanagerment.taskmanagement.repositpory.NotificationRepo;
import com.taskmanagerment.taskmanagement.repositpory.NotificationSchemeRepo;

@Service
public class NotificationService {

    @Autowired
    private EmailService emailService;

    @Autowired
    private NotificationRepo notificationRepo;

    @Autowired
    private NotificationSchemeRepo notificationSchemeRepo;

    public void notify(Long projectId, NotificationEvent eventType, Set<String> emails, String subject, String message,
            Long entityId) {
        Set<String> finalEmails = notificationSchemeRepo
                .findByProjectIdAndEventType(projectId, eventType)
                .map(scheme -> resolveRecepient(scheme, emails))
                .orElse(emails);

        for (String email : finalEmails) {
            emailService.send(email, subject, message);
            Notification notification = new Notification();
            notification.setRecipentEmail(email);
            notification.setSubject(subject);
            notification.setBody(message);
            notification.setEvent(eventType);
            notification.setEntityId(entityId);

            notificationRepo.save(notification);

        }

    }

    private Set<String> resolveRecepient(NotificationScheme scheme, Set<String> fallBack) {
        return (scheme.getReceipient() == null || scheme.getReceipient().isEmpty())
                ? fallBack
                : scheme.getReceipient();

    }
}
