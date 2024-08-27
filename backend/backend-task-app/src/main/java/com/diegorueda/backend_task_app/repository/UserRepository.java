package com.diegorueda.backend_task_app.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.diegorueda.backend_task_app.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}
