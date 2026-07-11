package com.quizserver.dto;

import com.quizserver.enums.UserRole;
import lombok.Data;

@Data
public class LoginResponse {
    private Long userId;
    private String name;
    private String email;
    private UserRole role;
}