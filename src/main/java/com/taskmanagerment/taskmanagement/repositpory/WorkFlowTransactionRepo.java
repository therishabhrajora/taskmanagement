package com.taskmanagerment.taskmanagement.repositpory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanagerment.taskmanagement.entity.WorkFlowTransaction;

@Repository
public interface WorkFlowTransactionRepo extends JpaRepository<WorkFlowTransaction,Long> {
List<WorkFlowTransaction> findByWorkFlowId(Long  workFlowId);
   List<WorkFlowTransaction> findByWorkFlowIdAndFromStatus(Long workFlowId, String fromStatus);
}
