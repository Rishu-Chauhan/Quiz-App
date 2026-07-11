package com.quizserver.service;

import com.quizserver.entity.User;
import com.quizserver.enums.UserRole;
import com.quizserver.repo.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    private void createAdminUser() {
        User optionalUser = userRepository.findByRole(UserRole.ADMIN);
        if (optionalUser == null) {
            User user = new User();
            user.setName("Admin");
            user.setEmail("admin@gmail.com");
            user.setRole(UserRole.ADMIN);
            user.setPassword("admin");
            userRepository.save(user);
        }
    }

    public Boolean hasUserWithEmail(String email) {
        return userRepository.findFirstByEmail(email) != null;
    }

    public User createUser(User user) {
        user.setRole(UserRole.USER);
        return userRepository.save(user);
    }

    @Override
    public User login(String email, String password) {
        User user = userRepository.findFirstByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
}