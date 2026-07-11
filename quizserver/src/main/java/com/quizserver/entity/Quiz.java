package com.quizserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private Integer timeLimit; // in minutes
    private Integer totalMarks;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions = new ArrayList<>();

    private LocalDateTime createdAt;
    private Boolean isActive = true;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
}