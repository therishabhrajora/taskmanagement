package com.taskmanagerment.taskmanagement.security;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;


@Configuration
public class CloudinaryConfig {

    @Value("${cloudinary.cloud-name}")
    private String cloudName;

    @Value("${cloudinary.api-key}")
    private String apiKey;

    @Value("${cloudinary.api-secret}")
    private String apiSecret;

    @Bean
    public Cloudinary cloudinary(){
        Map<String,Object> config=new HashMap<>();
        config.put("cloud-name",cloudName);
        config.put("api-key",apiKey);
        config.put("api-secret",apiSecret);
        return new Cloudinary(config);
        
    }
    

}
