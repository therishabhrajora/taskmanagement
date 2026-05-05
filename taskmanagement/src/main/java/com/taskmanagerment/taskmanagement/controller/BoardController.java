package com.taskmanagerment.taskmanagement.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanagerment.taskmanagement.entity.Board;
import com.taskmanagerment.taskmanagement.entity.BoardCard;
import com.taskmanagerment.taskmanagement.entity.BoardColumn;
import com.taskmanagerment.taskmanagement.services.BoardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {
    @Autowired
    private BoardService boardService;

    @PostMapping("/create")
    public ResponseEntity<Board> createBoard(@RequestBody Board board){
        return ResponseEntity.ok(boardService.createBoard(board));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Board>> getBoardId(@PathVariable Long id){
        return ResponseEntity.ok(boardService.findByBoardId(id));
    }


    @GetMapping("/{id}/column")
    public ResponseEntity<List<Board>> getColumn(@PathVariable long id){
        return ResponseEntity.ok(boardService.getByColumns(id));
    }

    @PostMapping("/{id}/columns")
    public ResponseEntity<Board> addColumns(@PathVariable Long id,@RequestBody BoardColumn boardColumn){
        boardColumn.setBoard(boardService.findByBoardId(id).orElseThrow(()->new RuntimeException("column not found")));
        return ResponseEntity.ok(boardService.createBoard(boardColumn.getBoard()));
    }

    @PostMapping("/{id}/cards")
    public ResponseEntity<BoardCard> addCards(@PathVariable Long id,@RequestBody Map<String,Object> body){
        Long columnId=Long.valueOf(String.valueOf(body.get("columnId")));
        Long issueId=Long.valueOf(String.valueOf(body.get("columnId")));

        return ResponseEntity.ok(boardService.addIssueToBoard(id, columnId, issueId));
    }


    @PostMapping("/{id}/cards/{cardId}/move")
    public ResponseEntity<String> moveCard(@PathVariable Long id, @PathVariable Long cardId, @RequestBody Map<String,Object> body, @RequestHeader(value="Ex_user_email",required = false) String user){
        Long toColumnId=Long.valueOf(String.valueOf(body.get("toColumnId")));

        int toPosition=Integer.valueOf(String.valueOf(body.getOrDefault("toPosition", "0")));

        boardService.moveCard(cardId, toColumnId, cardId, toPosition, user==null? "system":user);

        return ResponseEntity.ok("Moved");
    }

    @PostMapping("/{id}/columns/{columnId}/record")
    public ResponseEntity<String> moveCard(@PathVariable Long id, 
                                        @PathVariable Long columnId, 
                                        @RequestBody List<Long> orderCardIds, 
                                        @RequestHeader(value="Ex_user_email",required = false) String user){
            boardService.recordColumn(id, columnId, orderCardIds);
            return ResponseEntity.ok("recorded");
    }

    @PostMapping("/sprint/{sprintId}/start")
    public ResponseEntity<String> startSprint(@PathVariable Long sprintId){
        boardService.startSprint(sprintId);
        return ResponseEntity.ok("sprint start");
    }
    @PostMapping("/sprint/{sprintId}/complete")
    public ResponseEntity<String> completeSprint(@PathVariable Long sprintId){
        boardService.completeSprint(sprintId);
        return ResponseEntity.ok("sprint complete");
    }

    






}
