package com.taskmanagerment.taskmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Table(
    name = "workflow_transaction",
    indexes = {
        @Index(name = "idx_wf_from_to", columnList = "workflowId,fromStatus,toStatus")
    }
)
public class WorkFlowTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="workflowId",nullable = false)
    private WorkFLow workFlow;

    private String fromStatus;
    private String toStatus;

    private String transactionName;
    private String allowedRole;
    

}
