package com.quizserver.controller;

import com.quizserver.entity.Question;
import com.quizserver.entity.Quiz;
import com.quizserver.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin("*")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping("/create")
    public ResponseEntity<?> createQuiz(@RequestBody Quiz quiz) {
        try {
            Quiz createdQuiz = quizService.createQuiz(quiz);
            return new ResponseEntity<>(createdQuiz, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateQuiz(@PathVariable Long id, @RequestBody Quiz quiz) {
        try {
            Quiz updatedQuiz = quizService.updateQuiz(id, quiz);
            return new ResponseEntity<>(updatedQuiz, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteQuiz(@PathVariable Long id) {
        try {
            quizService.deleteQuiz(id);
            return new ResponseEntity<>("Quiz deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getQuizById(@PathVariable Long id) {
        try {
            Quiz quiz = quizService.getQuizById(id);
            return new ResponseEntity<>(quiz, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllQuizzes() {
        List<Quiz> quizzes = quizService.getAllQuizzes();
        return new ResponseEntity<>(quizzes, HttpStatus.OK);
    }

    @GetMapping("/active")
    public ResponseEntity<?> getActiveQuizzes() {
        List<Quiz> quizzes = quizService.getActiveQuizzes();
        return new ResponseEntity<>(quizzes, HttpStatus.OK);
    }

    @PostMapping("/{quizId}/question")
    public ResponseEntity<?> addQuestion(@PathVariable Long quizId, @RequestBody Question question) {
        try {
            Question addedQuestion = quizService.addQuestion(quizId, question);
            return new ResponseEntity<>(addedQuestion, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/question/{questionId}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long questionId) {
        try {
            quizService.deleteQuestion(questionId);
            return new ResponseEntity<>("Question deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{quizId}/questions")
    public ResponseEntity<?> getQuestionsByQuizId(@PathVariable Long quizId) {
        List<Question> questions = quizService.getQuestionsByQuizId(quizId);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }
}