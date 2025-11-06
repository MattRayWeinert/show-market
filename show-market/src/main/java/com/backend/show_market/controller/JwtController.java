package com.backend.show_market.controller;

import com.backend.show_market.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api-jwt")
public class JwtController {

    @Autowired
    public JwtService jwtService;

    public JwtController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @GetMapping("/jwt")
    public String getJwt() {
        String res = this.jwtService.generateToken("Matt");
        return res;
    }
}