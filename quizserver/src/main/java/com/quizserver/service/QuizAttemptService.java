package com.quizserver.service;

import com.quizserver.dto.QuizResult;
import com.quizserver.dto.QuizSubmission;
import com.quizserver.entity.QuizAttempt;
import java.util.List;

public interface QuizAttemptService {
    QuizResult submitQuiz(QuizSubmission submission);
    List<QuizAttempt> getUserAttempts(Long userId);
    QuizAttempt getAttemptById(Long attemptId);
    List<QuizAttempt> getAttemptsByQuizId(Long quizId);
}