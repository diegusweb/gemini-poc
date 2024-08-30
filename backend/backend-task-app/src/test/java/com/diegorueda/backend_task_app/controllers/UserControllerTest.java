package com.diegorueda.backend_task_app.controllers;

import com.diegorueda.backend_task_app.model.User;
import com.diegorueda.backend_task_app.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @Test
    public void testAllUsers() {
        // Mock data
        List<User> users = new ArrayList<>();
        users.add(new User());
        users.add(new User());
        users.add(new User());
        when(userService.findAll()).thenReturn(users);

        // Call the controller method
        ResponseEntity<List<User>> response = userController.allUsers();

        // Assertions
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(3, response.getBody().size());
    }
}
