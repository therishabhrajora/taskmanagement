package com.taskmanagerment.taskmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableEurekaServer
@SpringBootApplication
@EnableFeignClients(basePackages = "com.taskmanagerment.taskmanagement.client")
public class TaskmanagementApplication {
	public static void main(String[] args) {
		SpringApplication.run(TaskmanagementApplication.class, args);
	}
}
