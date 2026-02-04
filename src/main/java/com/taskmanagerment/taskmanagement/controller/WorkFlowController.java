package com.taskmanagerment.taskmanagement.controller;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.management.relation.Role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.taskmanagerment.taskmanagement.entity.WorkFLow;
import com.taskmanagerment.taskmanagement.entity.WorkFlowTransaction;
import com.taskmanagerment.taskmanagement.services.WorkFlowService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class WorkFlowController {
    @Autowired
    private WorkFlowService workFlowService;

    @PostMapping("/create")
    public ResponseEntity<WorkFLow> create(@RequestBody WorkFLow wf){
        return ResponseEntity.ok(workFlowService.createWorkFlow(wf));
    }

    @GetMapping("/list")
    public ResponseEntity<List<WorkFLow>> allList(){
        return ResponseEntity.ok(workFlowService.listAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkFLow> get(@PathVariable Long id){
        return ResponseEntity.ok(workFlowService.getById(id));
    }

    @GetMapping("/{workFlowName}")
    public ResponseEntity<Optional<WorkFLow>> getByName(@PathVariable String workFlowName){
        return ResponseEntity.ok(workFlowService.findByWorkFlowName(workFlowName));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<WorkFLow> update(@PathVariable Long id, @RequestBody WorkFLow wf){
        return ResponseEntity.ok(workFlowService.updateWorkFlowStatus(id,wf));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        workFlowService.deleteWorkFlow(id);
        return ResponseEntity.ok("Deleted");
    }


    @GetMapping("/{id}/transaction/{from}")
    public ResponseEntity<List<WorkFlowTransaction>> allowed(@PathVariable Long id, @PathVariable String fromStatus) {
        return ResponseEntity.ok(workFlowService.allowedTransactions(id, fromStatus));
    
    }





}
