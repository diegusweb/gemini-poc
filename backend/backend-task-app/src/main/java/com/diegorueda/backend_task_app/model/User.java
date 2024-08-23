package com.diegorueda.backend_task_app.model;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Document(value = "User")
@Data
public class User {
    private String id;
    private String username;
    private String password;
    //private PrivateKey privateKey;
    private String email;
}
