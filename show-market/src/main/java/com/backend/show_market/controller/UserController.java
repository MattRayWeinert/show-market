package com.backend.show_market.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import com.backend.show_market.dao.UserRepository;
import com.backend.show_market.model.User;

@RestController
@RequestMapping("/api-user")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/create-user")
    public ResponseEntity<Object> createUser(@RequestBody User user) {
        this.userRepository.insert(user);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/get-all-users")
    public ResponseEntity<Object> getAllUsers() {
        return ResponseEntity.ok(this.userRepository.findAll());
    }
}
