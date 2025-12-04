package com.taskmanagerment.taskmanagement.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="work_flow")
public class WorkFLow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String workflowName;
    @Column(length = 5000)
    private String workFlowDescription;

    private LocalDateTime createdAt=LocalDateTime.now();

    @OneToMany(mappedBy = "workFlow" ,cascade = CascadeType.ALL,orphanRemoval = true)
    private List<WorkFlowTransaction> transaction=new ArrayList<>();


    
    
}
