package com.diegorueda.backend_task_app.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.diegorueda.backend_task_app.model.Task;
import com.diegorueda.backend_task_app.repository.TaskRepository;
import java.util.Optional;
@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getTasksByUser(String userId) {
        return taskRepository.findByUserId(userId);
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }

    public void deleteTask(String taskId) {
        taskRepository.deleteById(taskId);
    }

    // Filtrar y ordenar tareas
    public List<Task> filterTasksByStatus(String userId, String status) {
        return taskRepository.findByUserIdAndStatus(userId, status);
    }

    public List<Task> filterTasksByDueDate(String userId, LocalDate startDate, LocalDate endDate) {
        return taskRepository.findByUserIdAndDueDateBetween(userId, startDate, endDate);
    }

    public Optional<Task> findTaskById(String id) {
        return taskRepository.findById(id);
    }

}
