package com.diegorueda.backend_task_app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.diegorueda.backend_task_app.model.RevokedToken;

public interface RevokedTokenRepository extends MongoRepository<RevokedToken, String> {
    boolean existsByToken(String token);
}
