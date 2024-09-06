package com.diegorueda.backend_task_app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "revoked_tokens")
@AllArgsConstructor
@NoArgsConstructor
public class RevokedToken {
    @Id
    private String id;
    private String token;
}
