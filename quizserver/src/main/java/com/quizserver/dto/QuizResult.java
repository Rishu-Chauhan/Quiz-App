package com.quizserver.dto;

import lombok.Data;

@Data
public class QuizResult {
    private Long attemptId;
    private Integer score;
    private Integer totalQuestions;
    private Integer correctAnswers;
    private Integer wrongAnswers;
    private Integer totalMarks;
    private Double percentage;
}