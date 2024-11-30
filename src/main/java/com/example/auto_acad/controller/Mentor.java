package com.example.auto_acad.controller;

import com.example.auto_acad.entity.Users;
import com.example.auto_acad.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class Mentor {

    @Autowired
    UsersService usersService;
    @GetMapping("/health-check")
    public String healthCheck(){
        return "Ok";
    }
    @PostMapping("/add-mentor")
    public void createUser(@RequestBody Users user){
        usersService.saveUser(user);
    }
    @GetMapping("id/{myId}")
    public ResponseEntity<Users> getUserById(@PathVariable Integer myId) {
        return usersService.findById(myId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
