package com.backend.show_market.dao;

import com.backend.show_market.model.Post;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

@Repository
public class PostRepository {

    private final JdbcTemplate jdbcTemplate;

    public PostRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Post> postRowMapper = new RowMapper<>() {
        @Override
        public Post mapRow(ResultSet rs, int rowNum) throws SQLException {
            Post post = new Post();
            post.setId(rs.getInt("post_id"));
            post.setTitle(rs.getString("title"));
            post.setPrice(rs.getDouble("price"));
            post.setCategory(rs.getString("category"));
            post.setCondition(rs.getString("condition"));
            post.setDescription(rs.getString("description"));
            String imagePathsStr = rs.getString("image_paths");
            if (imagePathsStr != null && !imagePathsStr.isEmpty()) {
                post.setImagePaths(Arrays.asList(imagePathsStr.split(",")));
            }
            return post;
        }
    };

    public List<Post> findAll() {
        String sql = "SELECT * FROM Posts";
        return jdbcTemplate.query(sql, postRowMapper);
    }

    public Post findById(Long id) {
        String sql = "SELECT * FROM posts WHERE post_id = ?";
        return jdbcTemplate.queryForObject(sql, postRowMapper, id);
    }

    public int insert(Post post) {
        String imagePathsStr = post.getImagePaths() != null ? String.join(",", post.getImagePaths()) : "";
        String sql = "INSERT INTO posts (title, price, category, condition, description, image_paths) VALUES (?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, post.getTitle(), post.getPrice(), post.getCategory(), post.getCondition(), post.getDescription(), imagePathsStr);
    }

    public int delete(Long id) {
        String sql = "DELETE FROM posts WHERE post_id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
