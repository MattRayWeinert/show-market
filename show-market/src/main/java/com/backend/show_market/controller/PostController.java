package com.backend.show_market.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.show_market.dao.PostRepository;
import com.backend.show_market.model.Post;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api-post")
public class PostController {

    private final PostRepository postRepository;

    public PostController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @PostMapping("/create-post")
    public ResponseEntity<Object> createPost(
            @RequestParam("title") String title,
            @RequestParam("price") double price,
            @RequestParam("category") String category,
            @RequestParam("condition") String condition,
            @RequestParam("description") String description,
            @RequestParam(value = "images", required = false) MultipartFile[] images) {

        List<String> imagePaths = new ArrayList<>();
        if (images != null) {
            Path uploadDir = Paths.get("src/main/resources/static/images");
            try {
                Files.createDirectories(uploadDir);
                for (MultipartFile image : images) {
                    if (!image.isEmpty()) {
                        String filename = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
                        Path filePath = uploadDir.resolve(filename);
                        Files.write(filePath, image.getBytes());
                        imagePaths.add("/images/" + filename);
                    }
                }
            } catch (IOException e) {
                return ResponseEntity.status(500).body("Error saving images: " + e.getMessage());
            }
        }

        Post post = new Post();
        post.setTitle(title);
        post.setPrice(price);
        post.setCategory(category);
        post.setCondition(condition);
        post.setDescription(description);
        post.setImagePaths(imagePaths);

        this.postRepository.insert(post);
        return ResponseEntity.ok(post);
    }
}
