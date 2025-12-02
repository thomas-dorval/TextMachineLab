package com.textmachinelab.user.controller;

import com.textmachinelab.user.dto.AuthResponse;
import com.textmachinelab.user.dto.LoginRequest;
import com.textmachinelab.user.dto.UserRegistrationRequest;
import com.textmachinelab.user.entity.User;
import com.textmachinelab.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = userService.authenticate(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            // Return error message for debugging
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody UserRegistrationRequest request) {
        try {
            User user = userService.registerUser(request);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<User>> getActiveUsers() {
        List<User> users = userService.getActiveUsers();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, 
                                          @Valid @RequestBody UserRegistrationRequest request) {
        try {
            User user = userService.updateUser(id, request);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateUser(@PathVariable Long id) {
        try {
            userService.deactivateUser(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}/activate")
    public ResponseEntity<Void> activateUser(@PathVariable Long id) {
        try {
            userService.activateUser(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/test-db")
    public ResponseEntity<?> testDatabase() {
        try {
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok("Database connected. Total users: " + users.size() + 
                                   ". Users: " + users.stream().map(User::getUsername).toList());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Database error: " + e.getMessage());
        }
    }
    
    @PostMapping("/reset-admin-password")
    public ResponseEntity<?> resetAdminPassword() {
        try {
            User admin = userService.getUserByUsername("admin")
                    .orElseThrow(() -> new RuntimeException("Admin user not found"));
            
            // Update admin password with correct BCrypt hash
            UserRegistrationRequest updateRequest = new UserRegistrationRequest();
            updateRequest.setUsername("admin");
            updateRequest.setEmail("admin@textmachinelab.com");
            updateRequest.setPassword("admin123");
            updateRequest.setRole(com.textmachinelab.user.entity.Role.ADMIN);
            
            User updatedAdmin = userService.updateUser(admin.getId(), updateRequest);
            return ResponseEntity.ok("Admin password reset successfully. Username: admin, Password: admin123");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error resetting admin password: " + e.getMessage());
        }
    }
}