package com.project.practice.controller;

import com.project.practice.model.BrokerAdd;
import com.project.practice.service.BrokerAddService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brokers")
@CrossOrigin(origins = "http://localhost:3000")
public class BrokerAddController {

    @Autowired
    private BrokerAddService brokerAddService;

    @PostMapping("/addbroker")
    public ResponseEntity<?> addNewBroker(@RequestBody BrokerAdd brokerAdd) {
        try {
            BrokerAdd newBroker = brokerAddService.saveBrokerAdd(brokerAdd);
            return ResponseEntity.ok(newBroker);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<?> getAllBrokers() {
        try {
            List<BrokerAdd> brokerList = brokerAddService.getAllBrokers();
            return ResponseEntity.ok(brokerList);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBroker(@PathVariable Long id) {
        try {
            brokerAddService.deleteBroker(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
