package com.taskmanagerment.taskmanagement.services;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.taskmanagerment.taskmanagement.entity.Board;
import com.taskmanagerment.taskmanagement.entity.BoardCard;
import com.taskmanagerment.taskmanagement.entity.BoardColumn;
import com.taskmanagerment.taskmanagement.entity.Issue;
import com.taskmanagerment.taskmanagement.enums.IssueStatus;
import com.taskmanagerment.taskmanagement.repositpory.BoardCardRepo;
import com.taskmanagerment.taskmanagement.repositpory.BoardColumnRepo;
import com.taskmanagerment.taskmanagement.repositpory.BoardRepo;
import com.taskmanagerment.taskmanagement.repositpory.IssueRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {
    @Autowired
    private BoardRepo boardRepo;
    @Autowired
    private BoardColumnRepo boardColumnRepo;
    @Autowired
    private BoardCardRepo boardCardRepo;

    @Autowired
    private IssueRepo issueRepo;

    public Board createBoard(Board board) {
        return boardRepo.save(board);
    }

    public Optional<Board> findByBoardId(Long id) {
        return boardRepo.findById(id);
    }

    public List<Board> getByColumns(Long boardId) {
        return boardColumnRepo.findByboardIdOrderByPosition(boardId);
    }

    public List<BoardCard> getCardsForColumn(Long boardId, Long columnId) {
        return boardCardRepo.findByboardIdAndColumnIdOrderByPosition(boardId, columnId);
    }

    @Transactional
    public BoardCard addIssueToBoard(Long boardId, Long columnId, Long issueId) {
        Issue issue = issueRepo.findById(issueId).orElseThrow(() -> new RuntimeException("issue not found"));
        boardCardRepo.findByIssueId(issueId).ifPresent(boardCardRepo::delete);

        BoardColumn column = boardColumnRepo.findById(columnId)
                .orElseThrow(() -> new RuntimeException("column not found"));
        if (column.getWipLimit() != null && column.getWipLimit() > 0) {
            long count = boardCardRepo.countByBoardIdAndColumnId(boardId, columnId);
            if (count >= column.getWipLimit()) {
                throw new RuntimeException("WIP limits reached for column" + column.getName());
            }
        }

        List<BoardCard> existing = boardCardRepo.findByboardIdAndColumnIdOrderByPosition(boardId, columnId);
        int post = existing.size();

        BoardCard card = new BoardCard();
        card.setBoardId(boardId);
        card.setColumn(column);
        card.setIssueId(issueId);
        card.setPosition(post);
        card = boardCardRepo.save(card);

        if (column.getStatusKey() != null) {
            issue.setIssueStatus(Enum.valueOf(IssueStatus.class, column.getStatusKey()));
        }

        return card;

    }

    @Transactional
    public void moveCard(Long boardId, Long columnId, Long cardId, int position, String performBy) {
        BoardCard card = boardCardRepo.getById(cardId);

        BoardColumn from = card.getColumn();
        BoardColumn to = boardColumnRepo.findById(cardId).orElseThrow(() -> new RuntimeException("toStatus not found"));

        if (to == null) {
            throw new RuntimeException("Target Not found");
        }

        if (to.getWipLimit() != null && to.getWipLimit() > 0) {
            long count = boardCardRepo.countByBoardIdAndColumnId(boardId, columnId);

            if (!Objects.equals(from.getId(), to.getId()) && count >= to.getWipLimit()) {
                throw new RuntimeException("wip limit exceeded for column" + to.getWipLimit());
            }
        }

        List<BoardCard> fromList = boardCardRepo.findByboardIdAndColumnIdOrderByPosition(boardId, from.getId());
        for (BoardCard bc : fromList) {
            if (bc.getPosition() > card.getPosition()) {
                bc.setPosition(bc.getPosition() - 1);
            }
        }

        List<BoardCard> toList = boardCardRepo.findByboardIdAndColumnIdOrderByPosition(boardId, to.getId());
        for (BoardCard bc : toList) {
            if (bc.getPosition() >= position) {
                bc.setPosition(bc.getPosition() + 1);
                boardCardRepo.save(bc);
            }
        }

        card.setColumn(to);
        card.setPosition(position);
        boardCardRepo.save(card);

        Issue issue = issueRepo.findById(card.getIssueId()).orElseThrow(() -> new RuntimeException("issue not found"));

        if (to.getStatusKey() != null) {
            issue.setIssueStatus(Enum.valueOf(IssueStatus.class, to.getStatusKey()));

            issueRepo.save(issue);
        }
    }

    @Transactional
    public void recordColumn(Long boardId, Long columnId, List<Long> orderCardIds){
        int post=0;

        for(Long cid:orderCardIds){
            BoardCard card=boardCardRepo.findById(cid).orElseThrow(()->new RuntimeException("card not found"));
            card.setPosition(post++);
            boardCardRepo.save(card);
        }
    }

    @Transactional
    public void startSprint(Long sprintId){

    }

    @Transactional 
    public void completeSprint(Long sprintId){

    }

}
