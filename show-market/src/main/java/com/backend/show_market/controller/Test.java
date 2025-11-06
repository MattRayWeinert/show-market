package com.backend.show_market.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.show_market.model.User;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api-test")
public class Test {

    @GetMapping("test-get")
    public String test() throws Exception {
        StringBuilder response = new StringBuilder();
        ExecutorService es = Executors.newFixedThreadPool(1);
        Future<?> fut = es.submit(() -> response.append("Response message 123"));

        try {
            fut.get();
        } catch (Exception e) {
            System.out.println(e);
        }

        return response.toString();
    }

    @PostMapping("test-post")
    public ResponseEntity<Object> testUser(@RequestBody Object request) {
        return ResponseEntity.ok(request);
    }
}
