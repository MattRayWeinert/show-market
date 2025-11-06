package com.backend.show_market.model;

import java.util.List;

public class Post {
    private int id;
    private String title;
    private double price;
    private String category;
    private String condition;
    private String description;
    private List<String> imagePaths;

    public Post() {}

    public Post(int id, String title, double price, String category, String condition, String description, List<String> imagePaths) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.category = category;
        this.condition = condition;
        this.description = description;
        this.imagePaths = imagePaths;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public List<String> getImagePaths() { return imagePaths; }
    public void setImagePaths(List<String> imagePaths) { this.imagePaths = imagePaths; }
}
