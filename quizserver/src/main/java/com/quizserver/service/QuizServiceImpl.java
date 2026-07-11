package com.quizserver.service;

import com.quizserver.entity.Question;
import com.quizserver.entity.Quiz;
import com.quizserver.repo.QuestionRepository;
import com.quizserver.repo.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Override
    public Quiz updateQuiz(Long id, Quiz quiz) {
        Quiz existingQuiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        existingQuiz.setTitle(quiz.getTitle());
        existingQuiz.setDescription(quiz.getDescription());
        existingQuiz.setTimeLimit(quiz.getTimeLimit());
        existingQuiz.setTotalMarks(quiz.getTotalMarks());
        existingQuiz.setIsActive(quiz.getIsActive());

        return quizRepository.save(existingQuiz);
    }

    @Override
    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }

    @Override
    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
    }

    @Override
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    @Override
    public List<Quiz> getActiveQuizzes() {
        return quizRepository.findByIsActiveTrue();
    }

    @Override
    public Question addQuestion(Long quizId, Question question) {
        Quiz quiz = getQuizById(quizId);
        question.setQuiz(quiz);
        return questionRepository.save(question);
    }

    @Override
    public void deleteQuestion(Long questionId) {
        questionRepository.deleteById(questionId);
    }

    @Override
    public List<Question> getQuestionsByQuizId(Long quizId) {
        return questionRepository.findByQuizId(quizId);
    }
}