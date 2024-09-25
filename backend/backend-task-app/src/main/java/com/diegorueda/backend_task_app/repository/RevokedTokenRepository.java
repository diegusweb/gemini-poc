package com.diegorueda.backend_task_app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.diegorueda.backend_task_app.model.RevokedToken;

@Repository
public interface RevokedTokenRepository extends MongoRepository<RevokedToken, String> {
    boolean existsByToken(String token);
}
