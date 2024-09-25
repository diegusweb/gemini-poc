package com.diegorueda.backend_task_app.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.diegorueda.backend_task_app.model.User;
import com.diegorueda.backend_task_app.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public void save(User user){
        userRepository.save(user);
    }

    public User findById(String id){
        return userRepository.findById(id).get();
    }

    public void delete(String id){
        userRepository.deleteById(id);
    }

    public void update(User user){
        userRepository.save(user);
    }

    public void deleteAll(){
        userRepository.deleteAll();
    }

    public List<User> findAll(){
        return userRepository.findAll();
    }
}
