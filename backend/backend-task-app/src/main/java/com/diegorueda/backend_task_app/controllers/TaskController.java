package com.diegorueda.backend_task_app.controllers;

import java.time.LocalDate;
import java.util.List;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators.Log;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.diegorueda.backend_task_app.model.Task;
import com.diegorueda.backend_task_app.model.User;
import com.diegorueda.backend_task_app.service.TaskService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/")
    public List<Task> getTasks(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return taskService.getTasksByUser(user.getId());
    }

    @PostMapping()
    @ResponseBody// Add @ResponseBody to indicate a JSON response
    public ResponseEntity<Task> createTask(@RequestBody Task task, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        task.setUser(user); 
        Task createdTask = taskService.createTask(task); // Assuming createTask returns the saved task
        return ResponseEntity.ok(createdTask); // Return the created task with 200 OK
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable String id, @RequestBody Task updatedTask, Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        Optional<Task> taskOptional = taskService.findTaskById(id);
        
        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            
            // Verifica que la tarea pertenece al usuario autenticado
            if (!task.getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(403).build(); // Forbidden
            }

            // Actualiza los campos de la tarea
            task.setTitle(updatedTask.getTitle());
            task.setDescription(updatedTask.getDescription());
            task.setDueDate(updatedTask.getDueDate());
            task.setStatus(updatedTask.getStatus());

            // Guarda la tarea actualizada
            Task savedTask = taskService.updateTask(task);
            return ResponseEntity.ok(savedTask);
        }else{
            return ResponseEntity.notFound().build(); // Tarea no encontrada
        }

        //Task existingTask = taskOptional.get();

       // task.setUser(user);
       // return taskService.updateTask(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable String id, Authentication authentication) {
        taskService.deleteTask(id);
    }

    @GetMapping("/filter")
    public List<Task> filterTasksByStatus(@RequestParam String status, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return taskService.filterTasksByStatus(user.getId(), status);
    }

    @GetMapping("/filter-by-date")
    public List<Task> filterTasksByDueDate(@RequestParam String startDate, @RequestParam String endDate, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return taskService.filterTasksByDueDate(user.getId(), LocalDate.parse(startDate), LocalDate.parse(endDate));
    }
}
