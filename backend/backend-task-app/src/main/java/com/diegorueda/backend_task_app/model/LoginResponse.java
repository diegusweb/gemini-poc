package com.diegorueda.backend_task_app.model;

public class LoginResponse {
    private String token;
    private long expiresIn;
    private String userId;

    public String getToken() {
        return token;
    }

    public LoginResponse setToken(String token) {
        this.token = token;
        return this;
    }
    
    public long getExpiresIn() {
        return expiresIn;
    }

    public LoginResponse setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
        return this;
    }

    public String getUserId() {
        return userId;
    }

    public LoginResponse setUserId(String userId) {
        this.userId = userId;
        return this;
    }

    @Override
    public String toString() {
        return "LoginResponse{" +
                "token='" + token + '\'' +
                ", expiresIn=" + expiresIn +
                '}';
    }
    
}
