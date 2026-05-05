package com.taskmanagerment.taskmanagement.repositpory;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanagerment.taskmanagement.entity.Board;
import com.taskmanagerment.taskmanagement.entity.BoardColumn;

@Repository
public interface BoardColumnRepo extends JpaRepository<BoardColumn,Long> {
    List<Board> findByboardIdOrderByPosition(Long boardId);
}
