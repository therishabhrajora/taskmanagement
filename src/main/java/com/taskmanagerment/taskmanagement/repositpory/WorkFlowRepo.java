package com.taskmanagerment.taskmanagement.repositpory;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanagerment.taskmanagement.entity.WorkFLow;

@Repository
public interface WorkFlowRepo extends JpaRepository<WorkFLow,Long> {

   Optional<WorkFLow> findByWorkflowName(String workflowName);
   Optional<WorkFLow> findByTransactionName(String transactionName); 

    

}
