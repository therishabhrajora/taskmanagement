package com.taskmanagerment.taskmanagement.repositpory;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanagerment.taskmanagement.entity.BoardCard;

@Repository
public interface BoardCardRepo extends JpaRepository<BoardCard,Long> {
    List<BoardCard> findByboardIdAndColumnIdOrderByPosition(Long boardId,Long columnId);
    long countByBoardIdAndColumnId(Long boardId, Long columnId);
    Optional<BoardCard> findByIssueId(Long issueId);

    
}
