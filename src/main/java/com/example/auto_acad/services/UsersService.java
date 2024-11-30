package com.example.auto_acad.services;

import com.example.auto_acad.repository.UserRepository;

import com.example.auto_acad.entity.Users;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


import java.util.Optional;

@Component
public class UsersService {
    @Autowired
    public UserRepository userRepository;
    private static final PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
    public void saveUser(Users userEntry){
        userEntry.setPassword(passwordEncoder.encode(userEntry.getPassword()));
        userRepository.save(userEntry);
    }
    public Optional<Users> findById(Integer id){
        return userRepository.findById(id);
    }

}
