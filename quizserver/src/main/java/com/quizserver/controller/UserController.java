package com.quizserver.controller;

import com.quizserver.dto.LoginRequest;
import com.quizserver.dto.LoginResponse;
import com.quizserver.entity.User;
import com.quizserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signupUser(@RequestBody User user) {
        if (userService.hasUserWithEmail(user.getEmail())) {
            return new ResponseEntity<>("User Already Exists", HttpStatus.NOT_ACCEPTABLE);
        }

        User createdUser = userService.createUser(user);
        if (createdUser == null) {
            return new ResponseEntity<>("User Not Created, Come Again Later", HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userService.login(loginRequest.getEmail(), loginRequest.getPassword());

        if (user == null) {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }

        LoginResponse response = new LoginResponse();
        response.setUserId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}