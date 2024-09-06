package com.diegorueda.backend_task_app.controllers;

import com.diegorueda.backend_task_app.dtos.LoginUserDto;
import com.diegorueda.backend_task_app.dtos.RegisterUserDto;
import com.diegorueda.backend_task_app.model.User;
import com.diegorueda.backend_task_app.repository.RevokedTokenRepository;
import com.diegorueda.backend_task_app.service.AuthenticationService;
import com.diegorueda.backend_task_app.service.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.security.core.Authentication;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import java.net.http.HttpHeaders; 

@SpringBootTest 
@AutoConfigureMockMvc 
public class AuthenticationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthenticationService authenticationService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private RevokedTokenRepository revokedTokenRepository;

    @Test
    public void testRegister() throws Exception {
        // Prepare test data
        RegisterUserDto registerUserDto = new RegisterUserDto();
        registerUserDto.setFirstName("Test User");
        registerUserDto.setLastName("User");
        registerUserDto.setEmail("test@example.com");
        registerUserDto.setPassword("password");

        User registeredUser = new User();
      
        registeredUser.setFirstName("Test User");
        registeredUser.setLastName("User");
        registeredUser.setEmail("test@example.com");

        // Mock dependencies
        when(authenticationService.signup(any(RegisterUserDto.class))).thenReturn(registeredUser);

        // Perform request
        mockMvc.perform(MockMvcRequestBuilders.post("/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(registerUserDto)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value("Test User"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("test@example.com"));
    }

    @Test
    public void testAuthenticate() throws Exception {
        // Prepare test data
        LoginUserDto loginUserDto = new LoginUserDto();
        loginUserDto.setEmail("test@example.com");
        loginUserDto.setPassword("password");

        User authenticatedUser = new User();
        authenticatedUser.setId("123");
        authenticatedUser.setEmail("test@example.com");

        String jwtToken = "testJwtToken";

        // Mock dependencies
        when(authenticationService.authenticate(any(LoginUserDto.class))).thenReturn(authenticatedUser);
        when(jwtService.generateToken(any(User.class))).thenReturn(jwtToken);
        when(jwtService.getExpirationTime()).thenReturn(3600L);

        // Perform request
        mockMvc.perform(MockMvcRequestBuilders.post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(loginUserDto)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.token").value(jwtToken))
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId").value("123"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.expiresIn").value(3600L));
    }

    @Test
    public void testAuthenticate_InvalidCredentials() throws Exception {
        // Prepare test data
        LoginUserDto loginUserDto = new LoginUserDto();
        loginUserDto.setEmail("test@example.com");
        loginUserDto.setPassword("wrongPassword");

        // Mock dependencies
        when(authenticationService.authenticate(any(LoginUserDto.class))).thenThrow(new RuntimeException("Invalid username or password"));

        // Perform request
        mockMvc.perform(MockMvcRequestBuilders.post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(loginUserDto)))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andDo(print());
    }

    @Test
    public void testLogout() throws Exception {
        // Mock authenticated user
        SecurityContext securityContext = mock(SecurityContext.class);
        Authentication authentication = new UsernamePasswordAuthenticationToken("diego.rueda2@gmail.com", "12345");
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        // Perform request
        mockMvc.perform(MockMvcRequestBuilders.post("/auth/logout"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("Logout successful"));

        // Verify that SecurityContextHolder is cleared
        //verify(securityContext, times(1)).setAuthentication(null);
    }
}
