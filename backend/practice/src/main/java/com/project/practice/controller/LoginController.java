package com.project.practice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.practice.model.Login;
import com.project.practice.service.LoginService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping
    public ResponseEntity<?> createLogin(@RequestBody Login login) {
        if (loginService.usernameExists(login.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", "Username already exists"));
        }
        if (loginService.emailExists(login.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", "Email already exists"));
        }

        Login newLogin = loginService.createLogin(login);
        return ResponseEntity.ok(Map.of("success", true, "message", "Registration successful", "login", newLogin));
    }
    @PostMapping("/check")
public ResponseEntity<?> checkLogin(@RequestBody Login login) {
    Login existingLogin = loginService.findByUsername(login.getUsername());
    if (existingLogin != null && existingLogin.getPassword().equals(login.getPassword())) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Login successful!");
        response.put("role", existingLogin.getRole());

        if ("admin".equals(existingLogin.getUsername().toLowerCase())) {
            response.put("isAdmin", true);
        }
        
        return ResponseEntity.ok(response);
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("success", false, "message", "Invalid username or password"));
    }
}


    @GetMapping("/getuser")
    public List<Login> getAllLogins() {
        return loginService.getAllLogins();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Login> getLoginById(@PathVariable Long id) {
        return loginService.getLoginById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLogin(@PathVariable Long id) {
        if (loginService.getLoginById(id).isPresent()) {
            loginService.deleteLogin(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateLogin(@PathVariable Long id, @RequestBody Login login) {
        if (!loginService.getLoginById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }

        // You can add additional checks or update logic here
        login.setId(id); // Ensure the ID is set for update
        Login updatedLogin = loginService.updateLogin(login);

        return ResponseEntity.ok(Map.of("success", true, "message", "User updated successfully", "login", updatedLogin));
    }
}
