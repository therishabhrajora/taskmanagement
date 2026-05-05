package com.taskmanagerment.taskmanagement.controller;

import java.io.InputStream;
import java.net.URL;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.taskmanagerment.taskmanagement.entity.Attachment;
import com.taskmanagerment.taskmanagement.services.AttachmentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/attachments")
@RequiredArgsConstructor
public class AttachmentController {

    @Autowired
    private AttachmentService attachmentService;

    // ---- UPLOAD FILE ----
    @PostMapping("/upload/{issueId}")
    public ResponseEntity<Attachment> uploadFile(
            @PathVariable Long issueId,
            @RequestParam MultipartFile file,
            @RequestParam String uploadBy) {

        return ResponseEntity.ok(attachmentService.uploadFile(issueId, file, uploadBy));
    }

    // ---- REDIRECT TO CLOUDINARY URL ----
    @GetMapping("/download/{id}")
    public ResponseEntity<Object> downloadFile(@PathVariable Long id) {
        Attachment attach = attachmentService.getFindById(id);

        return ResponseEntity.status(302) // HTTP 302 Found
                .header(HttpHeaders.LOCATION, attach.getStoragePath()) // Redirect to Cloudinary URL
                .build();
    }

    // ---- DOWNLOAD FILE STREAM FOR SYSTEM ----
    @GetMapping("/download/stream/{id}")
    public ResponseEntity<Resource> downloadFileStream(@PathVariable Long id) throws Exception {

        Attachment attach = attachmentService.getFindById(id);

        URL url = new URL(attach.getStoragePath());
        InputStream inputStream = url.openStream();
        InputStreamResource resource = new InputStreamResource(inputStream);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + attach.getFilename() + "\"")
                .contentType(MediaType.parseMediaType(attach.getContentType()))
                .body(resource);
    }

    // ---- DELETE FILE ----
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFile(@PathVariable Long id) throws Exception {
        attachmentService.deleteFile(id);
        return ResponseEntity.ok("File deleted successfully");
    }
}
