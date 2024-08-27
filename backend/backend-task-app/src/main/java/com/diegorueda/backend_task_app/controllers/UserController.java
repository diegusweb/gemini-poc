package com.diegorueda.backend_task_app.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diegorueda.backend_task_app.model.User;
import com.diegorueda.backend_task_app.service.UserService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/users")
    public void save(@RequestBody User user) {
       userService.save(user);
    }
    
    @GetMapping("/users")
    public List<User> findAll(){
        return userService.findAll();
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
