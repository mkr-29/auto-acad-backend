package com.example.auto_acad.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SpringSecurity {

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Use BCrypt for password hashing
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // Disable CSRF for simplicity (enable it in production with proper setup)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/add-mentor/**","/id/**").permitAll() // Allow public access to specific endpoints
                        .anyRequest().authenticated() // Require authentication for other endpoints
                )
                .httpBasic(); // Use HTTP Basic Authentication (or configure JWT for production)

        return http.build();
    }
}
