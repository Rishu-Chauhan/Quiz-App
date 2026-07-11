package com.quizserver.service;


import com.quizserver.dto.QuizResult;
import com.quizserver.dto.QuizSubmission;
import com.quizserver.entity.Question;
import com.quizserver.entity.Quiz;
import com.quizserver.entity.QuizAttempt;
import com.quizserver.entity.User;
import com.quizserver.repo.QuestionRepository;
import com.quizserver.repo.QuizAttemptRepository;
import com.quizserver.repo.QuizRepository;
import com.quizserver.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;

@Service
public class QuizAttemptServiceImpl implements QuizAttemptService {

    @Autowired
    private QuizAttemptRepository attemptRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public QuizResult submitQuiz(QuizSubmission submission) {
        try {
            User user = userRepository.findById(submission.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Quiz quiz = quizRepository.findById(submission.getQuizId())
                    .orElseThrow(() -> new RuntimeException("Quiz not found"));

            List<Question> questions = questionRepository.findByQuizId(quiz.getId());

            int correctAnswers = 0;
            int score = 0;

            for (Question question : questions) {
                String userAnswer = submission.getAnswers().get(question.getId());
                if (userAnswer != null && userAnswer.equals(question.getCorrectAnswer())) {
                    correctAnswers++;
                    score += question.getMarks();
                }
            }

            QuizAttempt attempt = new QuizAttempt();
            attempt.setUser(user);
            attempt.setQuiz(quiz);
            attempt.setScore(score);
            attempt.setTotalQuestions(questions.size());
            attempt.setCorrectAnswers(correctAnswers);
            attempt.setWrongAnswers(questions.size() - correctAnswers);

            ObjectMapper mapper = new ObjectMapper();
            attempt.setAnswers(mapper.writeValueAsString(submission.getAnswers()));

            attempt = attemptRepository.save(attempt);

            QuizResult result = new QuizResult();
            result.setAttemptId(attempt.getId());
            result.setScore(score);
            result.setTotalQuestions(questions.size());
            result.setCorrectAnswers(correctAnswers);
            result.setWrongAnswers(questions.size() - correctAnswers);
            result.setTotalMarks(quiz.getTotalMarks());
            result.setPercentage((double) score / quiz.getTotalMarks() * 100);

            return result;
        } catch (Exception e) {
            throw new RuntimeException("Error submitting quiz: " + e.getMessage());
        }
    }

    @Override
    public List<QuizAttempt> getUserAttempts(Long userId) {
        return attemptRepository.findByUserId(userId);
    }

    @Override
    public QuizAttempt getAttemptById(Long attemptId) {
        return attemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Attempt not found"));
    }

    @Override
    public List<QuizAttempt> getAttemptsByQuizId(Long quizId) {
        return attemptRepository.findByQuizId(quizId);
    }
}