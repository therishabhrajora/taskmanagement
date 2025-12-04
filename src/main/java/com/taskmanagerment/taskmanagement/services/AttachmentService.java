package com.taskmanagerment.taskmanagement.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.taskmanagerment.taskmanagement.entity.Attachment;
import com.taskmanagerment.taskmanagement.repositpory.AttachmentRepo;

@Service
public class AttachmentService {

    @Autowired
    private AttachmentRepo attachmentRepo;

    @Autowired
    private Cloudinary cloudinary;

    // ------------------ UPLOAD FILE ------------------
    public Attachment uploadFile(Long issueId, MultipartFile file, String uploadBy) {
        try {
            Map<String, Object> uploadParams = new HashMap<>();
            uploadParams.put("resource_type", "auto");   // FIXED

            Map<String, Object> uploadResult =
                    cloudinary.uploader().upload(file.getBytes(), uploadParams);

            Attachment attach = new Attachment();
            attach.setIssueId(issueId);
            attach.setFilename(file.getOriginalFilename());
            attach.setContentType(file.getContentType());
            attach.setFileSize(file.getSize());
            attach.setStoragePath(uploadResult.get("secure_url").toString());  // FIXED
            attach.setCloudId(uploadResult.get("public_id").toString());       // FIXED
            attach.setUploadedBy(uploadBy);

            return attachmentRepo.save(attach);

        } catch (Exception e) {
            throw new RuntimeException("File upload failed: " + e.getMessage());
        }
    }

    // ------------------ GET FILE BY ID ------------------
    public Attachment getFindById(Long id) {
        return attachmentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Attachment not found with id: " + id));
    }

    // ------------------ DELETE FILE ------------------
    public void deleteFile(Long id) {
        try {
            Attachment attach = attachmentRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("File not found"));

            // Delete from Cloudinary
            Map<String, Object> deleteParams = new HashMap<>();
            deleteParams.put("resource_type", "image");  // or auto
            cloudinary.uploader().destroy(attach.getCloudId(), deleteParams);

            // Delete from database
            attachmentRepo.delete(attach);

        } catch (Exception e) {
            throw new RuntimeException("File deletion failed: " + e.getMessage());
        }
    }
}
