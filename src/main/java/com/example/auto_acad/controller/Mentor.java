package com.example.auto_acad.controller;

import com.example.auto_acad.entity.Users;
import com.example.auto_acad.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3200") // Allow CORS from frontend URL
public class Mentor {

    @Autowired
    private UsersService usersService;

    // Health check endpoint
    @GetMapping("/health-check")
    public String healthCheck() {
        return "Ok";
    }

    // Create user endpoint
    @PostMapping("/add-mentor")
    public ResponseEntity<String> createUser(@RequestBody Users user) {
        try {
            usersService.saveUser(user);
            return ResponseEntity.ok("User created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating user: " + e.getMessage());
        }
    }

    // Get user by ID
    @GetMapping("id/{myId}")
    public ResponseEntity<Users> getUserById(@PathVariable Integer myId) {
        return usersService.findById(myId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
