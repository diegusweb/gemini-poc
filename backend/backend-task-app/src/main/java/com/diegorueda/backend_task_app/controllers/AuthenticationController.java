package com.diegorueda.backend_task_app.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diegorueda.backend_task_app.dtos.LoginUserDto;
import com.diegorueda.backend_task_app.dtos.RegisterUserDto;
import com.diegorueda.backend_task_app.model.LoginResponse;
import com.diegorueda.backend_task_app.model.RevokedToken;
import com.diegorueda.backend_task_app.model.User;
import com.diegorueda.backend_task_app.repository.RevokedTokenRepository;
import com.diegorueda.backend_task_app.service.AuthenticationService;
import com.diegorueda.backend_task_app.service.JwtService;

import jakarta.servlet.http.HttpServletRequest;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    
    private final AuthenticationService authenticationService;

    private final RevokedTokenRepository revokedTokenRepository;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService, RevokedTokenRepository revokedTokenRepository) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.revokedTokenRepository = revokedTokenRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        try {
            User authenticatedUser = authenticationService.authenticate(loginUserDto);
    
            String jwtToken = jwtService.generateToken(authenticatedUser);
            String userId = authenticatedUser.getId();
    
            LoginResponse loginResponse = new LoginResponse()
            .setToken(jwtToken)
            .setExpiresIn(jwtService.getExpirationTime())
            .setUserId(userId);
    
            return ResponseEntity.ok(loginResponse);
        } catch (Exception e) { // Catch any exception during authentication
            return ResponseEntity.badRequest().body(null); 
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        // String token = jwtService.getTokenFromRequest(request);
        // if (token != null) {
        //     revokedTokenRepository.save(new RevokedToken(token, token));
        //     return ResponseEntity.ok().build();
        // } else {
        //     return ResponseEntity.badRequest().build();
        // }
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logout successful");
    }
    
}
