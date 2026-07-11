package com.quizserver.service;

import com.quizserver.entity.Question;
import com.quizserver.entity.Quiz;
import java.util.List;

public interface QuizService {
    Quiz createQuiz(Quiz quiz);
    Quiz updateQuiz(Long id, Quiz quiz);
    void deleteQuiz(Long id);
    Quiz getQuizById(Long id);
    List<Quiz> getAllQuizzes();
    List<Quiz> getActiveQuizzes();
    Question addQuestion(Long quizId, Question question);
    void deleteQuestion(Long questionId);
    List<Question> getQuestionsByQuizId(Long quizId);
}