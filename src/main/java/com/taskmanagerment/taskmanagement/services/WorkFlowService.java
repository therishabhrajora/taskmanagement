package com.taskmanagerment.taskmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanagerment.taskmanagement.repositpory.WorkFlowRepo;
import com.taskmanagerment.taskmanagement.repositpory.WorkFlowTransactionRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WorkFlowService {
      @Autowired
      private WorkFlowRepo workFlowRepo;

      @Autowired
      private WorkFlowTransactionRepo workFlowTransactionRepo;
      
      
}
