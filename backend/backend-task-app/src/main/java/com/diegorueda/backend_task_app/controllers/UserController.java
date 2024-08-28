package com.diegorueda.backend_task_app.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diegorueda.backend_task_app.model.User;
import com.diegorueda.backend_task_app.service.UserService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(currentUser);
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> allUsers() {
        List <User> users = userService.findAll();

        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/user/{id}")
    public User findById(@RequestParam String id){
        return userService.findById(id);
    }
    
    @DeleteMapping("/user/{id}")
    public void delete(@RequestParam String id){
        userService.delete(id);
    }

    @PutMapping("path/{id}")
    public void update(@RequestBody User user){
        userService.update(user);
    }
    
}
