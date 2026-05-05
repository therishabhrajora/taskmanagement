package com.taskmanagerment.taskmanagement.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.taskmanagerment.taskmanagement.enums.BoardType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name="boards")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String projectKey;

    @Enumerated(EnumType.STRING)
    private BoardType boardType;
    
    private LocalDateTime createdAt=LocalDateTime.now();

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL,orphanRemoval = true)
    @OrderBy("position")
    private List<BoardColumn> columns=new ArrayList<>();
    
    



}
