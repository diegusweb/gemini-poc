package com.diegorueda.backend_task_app.model;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(value = "Tasks")
@Data
public class Task {
    @Id
    private String id;
    private String title;
    private String description;
    private LocalDate dueDate;
    private String status;

    @DBRef
    private User user;
}
