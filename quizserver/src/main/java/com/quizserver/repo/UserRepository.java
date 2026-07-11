package com.quizserver.repo;

import com.quizserver.entity.User;
import com.quizserver.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    User findByRole(UserRole role);

    User findFirstByEmail(String email);
}
