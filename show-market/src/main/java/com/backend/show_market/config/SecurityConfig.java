package com.backend.show_market.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    String[] PROTECTED_URLS = {"localhost:8080/*", "/api-test/**", "/api-jwt/**", "api-user/**"};

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
            .allowedOrigins("http://localhost:3000") // your React dev server origin
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
        }
        };
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf((csrf) -> csrf.disable())
            .authorizeHttpRequests((authorize) -> {
                authorize
                .requestMatchers("/api/**", "/swagger-ui/**", "/swagger-ui/index.html", "/v3/api-docs/**").permitAll()
                .requestMatchers(PROTECTED_URLS).permitAll();
            });

        return http.build();
    }

    // @Bean
    // public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    //     http
    //     .csrf(csrf -> csrf.disable())
    //     .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
    //     return http.build();
    // }
}
