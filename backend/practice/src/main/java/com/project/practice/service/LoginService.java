package com.project.practice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.practice.model.Login;
import com.project.practice.repository.LoginRepository;

import java.util.List;
import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    // Create a new login
    public Login createLogin(Login login) {
        return loginRepository.save(login);
    }

    // Get all logins
    public List<Login> getAllLogins() {
        return loginRepository.findAll();
    }

    // Get a login by ID
    public Optional<Login> getLoginById(Long id) {
        return loginRepository.findById(id);
    }

    // Delete a login by ID
    public void deleteLogin(Long id) {
        loginRepository.deleteById(id);
    }

    // Find a login by username
    public Login findByUsername(String username) {
        return loginRepository.findByUsername(username);
    }

    // Find a login by email
    public Login findByEmail(String email) {
        return loginRepository.findByEmail(email);
    }

    // Check if a username already exists
    public boolean usernameExists(String username) {
        return loginRepository.findByUsername(username) != null;
    }

    // Check if an email already exists
    public boolean emailExists(String email) {
        return loginRepository.findByEmail(email) != null;
    }

    // Update an existing login
    public Login updateLogin(Login login) {
        // Check if the login exists
        if (!loginRepository.existsById(login.getId())) {
            throw new RuntimeException("User not found");
        }

        // Save the updated login
        return loginRepository.save(login);
    }

    // Validate login credentials and return the role
    public Optional<String> validateLogin(String username, String password) {
        Login existingLogin = loginRepository.findByUsername(username);
        if (existingLogin != null && existingLogin.getPassword().equals(password)) {
            return Optional.of(existingLogin.getRole());
        }
        return Optional.empty();
    }
}
