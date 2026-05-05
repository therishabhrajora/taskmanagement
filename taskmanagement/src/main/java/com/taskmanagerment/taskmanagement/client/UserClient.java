package com.taskmanagerment.taskmanagement.client;

import java.util.Set;



import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.taskmanagerment.taskmanagement.enums.Role;

@FeignClient( name = "user-service", url = "http://localhost:8081/api/users")
public interface UserClient {


    @GetMapping("/api/users/{email}/roles")
    Set<Role> getRole(@PathVariable String email);


}
