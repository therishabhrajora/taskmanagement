package com.taskmanagerment.taskmanagement.repositpory;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanagerment.taskmanagement.entity.Board;
import com.taskmanagerment.taskmanagement.entity.BoardColumn;

@Repository
public interface BoardRepo extends JpaRepository<Board,Long>{
    Optional<Board> findByProjectKey(String projectKey);

}
