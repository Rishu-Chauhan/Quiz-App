package com.quizserver.controller;

import com.quizserver.dto.QuizResult;
import com.quizserver.dto.QuizSubmission;
import com.quizserver.entity.QuizAttempt;
import com.quizserver.service.QuizAttemptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attempt")
@CrossOrigin("*")
public class QuizAttemptController {

    @Autowired
    private QuizAttemptService attemptService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitQuiz(@RequestBody QuizSubmission submission) {
        try {
            QuizResult result = attemptService.submitQuiz(submission);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserAttempts(@PathVariable Long userId) {
        List<QuizAttempt> attempts = attemptService.getUserAttempts(userId);
        return new ResponseEntity<>(attempts, HttpStatus.OK);
    }

    @GetMapping("/{attemptId}")
    public ResponseEntity<?> getAttemptById(@PathVariable Long attemptId) {
        try {
            QuizAttempt attempt = attemptService.getAttemptById(attemptId);
            return new ResponseEntity<>(attempt, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<?> getAttemptsByQuizId(@PathVariable Long quizId) {
        List<QuizAttempt> attempts = attemptService.getAttemptsByQuizId(quizId);
        return new ResponseEntity<>(attempts, HttpStatus.OK);
    }
}