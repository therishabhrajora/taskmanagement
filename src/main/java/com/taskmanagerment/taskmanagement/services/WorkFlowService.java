package com.taskmanagerment.taskmanagement.services;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanagerment.taskmanagement.entity.WorkFLow;
import com.taskmanagerment.taskmanagement.entity.WorkFlowTransaction;
import com.taskmanagerment.taskmanagement.enums.Role;
import com.taskmanagerment.taskmanagement.repositpory.WorkFlowRepo;
import com.taskmanagerment.taskmanagement.repositpory.WorkFlowTransactionRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WorkFlowService {
      @Autowired
      private WorkFlowRepo workFlowRepo;

      @Autowired
      private WorkFlowTransactionRepo workFlowTransactionRepo;
     

      @Transactional
      public WorkFLow createWorkFlow(WorkFLow wf){
            for(WorkFlowTransaction tans: wf.getTransaction())    tans.setWorkFlow(wf);
            return workFlowRepo.save(wf);
      }

      public List<WorkFLow> listAll(){
            return workFlowRepo.findAll();
      }

      public WorkFLow getById(Long id){
            return workFlowRepo.getById(id);
      }

      public Optional<WorkFLow> findByWorkFlowName(String workFlowName){
            return workFlowRepo.findByWorkflowName(workFlowName);
      }



      @Transactional
      public WorkFLow updateWorkFlowStatus(Long id, WorkFLow updated) {
            WorkFLow wf = workFlowRepo.getById(id);
            wf.setId(id);
            wf.setWorkflowName(updated.getWorkflowName());
            wf.setWorkFlowDescription(updated.getWorkFlowDescription());
            wf.getTransaction().clear();
            
            if(updated.getTransaction()!=null){
                  for( WorkFlowTransaction trans:updated.getTransaction()){
                        trans.setWorkFlow(wf);
                        wf.getTransaction().add(trans);
                  }
            }

            return workFlowRepo.save(wf);
      }

      public void deleteWorkFlow(Long id){
            workFlowRepo.deleteById(id);
      }

      public List<WorkFlowTransaction>  allowedTransactions(Long workFlowId,String fromStatus){
            return workFlowTransactionRepo.findByWorkFlowIdAndFromStatus(workFlowId, fromStatus);
      }

      public boolean isTransactionAllowed(Long workFlowId, String fromStatus,String toStatus, Set<String> userRole){
             List<WorkFlowTransaction> list=workFlowTransactionRepo.findByWorkFlowIdAndFromStatus(workFlowId, fromStatus);
             for(WorkFlowTransaction trans:list){
                  if(trans.getToStatus().equals(list)){
                        String allowed=trans.getAllowedRole();
                        if(allowed==null || allowed.isEmpty()){
                              return true;
                        }
                        Set<String> allowedSet=Arrays.stream(allowed.split(",")).map(String::trim).collect(Collectors.toSet());
                        for(String r:userRole) if(allowedSet.contains(r)) return true;
                        return false;
                  }

            }
            return false;
      }

      




}
