package com.project.practice.controller;

import com.project.practice.model.Broker;
import com.project.practice.service.BrokerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/broker")
@CrossOrigin(origins = "http://localhost:3000")
public class BrokerLoginController {

    @Autowired
    private BrokerService brokerService;

    @PostMapping("/signup")
    public ResponseEntity<?> createBroker(@RequestBody Broker broker) {
        if (brokerService.usernameExists(broker.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", "Username already exists"));
        }
        if (brokerService.aadhaarExists(broker.getAadhaar())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", "Aadhaar number already exists"));
        }

        Broker newBroker = brokerService.createBroker(broker);
        return ResponseEntity.ok(Map.of("success", true, "message", "Registration successful", "broker", newBroker));
    }

    @GetMapping("/getbrokers")
    public List<Broker> getAllBrokers() {
        return brokerService.getAllBrokers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Broker> getBrokerById(@PathVariable Long id) {
        return brokerService.getBrokerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBroker(@PathVariable Long id) {
        if (brokerService.getBrokerById(id).isPresent()) {
            brokerService.deleteBroker(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBroker(@PathVariable Long id, @RequestBody Broker broker) {
        if (!brokerService.getBrokerById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }

        broker.setId(id);
        Broker updatedBroker = brokerService.updateBroker(broker);

        return ResponseEntity.ok(Map.of("success", true, "message", "Broker updated successfully", "broker", updatedBroker));
    }

    @PostMapping("/check")
    public ResponseEntity<?> checkBroker(@RequestBody Broker broker) {
        System.out.println("Received login request for username: " + broker.getUsername());
        Broker existingBroker = brokerService.findByUsername(broker.getUsername());
        if (existingBroker != null && existingBroker.getPassword().equals(broker.getPassword())) {
            return ResponseEntity.ok(Map.of("success", true, "message", "Login successful!"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "Invalid username or password"));
        }
    }
}
