package com.diegorueda.backend_task_app.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.diegorueda.backend_task_app.model.Task;

public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findByUserId(String userId);
    List<Task> findByUserIdAndStatus(String userId, String status);
    List<Task> findByUserIdAndDueDateBetween(String userId, LocalDate startDate, LocalDate endDate);
}
