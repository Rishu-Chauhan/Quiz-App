package com.quizserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class QuizAttempt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    private Integer score;
    private Integer totalQuestions;
    private Integer correctAnswers;
    private Integer wrongAnswers;

    @Column(length = 5000)
    private String answers; // JSON string of user answers

    private LocalDateTime attemptedAt;

    @PrePersist
    public void prePersist() {
        attemptedAt = LocalDateTime.now();
    }
}