package com.project.practice.controller;

import com.project.practice.model.House;
import com.project.practice.service.HouseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;



@RestController
@RequestMapping("/api/houses")
@CrossOrigin(origins = "http://localhost:3000")
public class HouseController {

    @Autowired
    private HouseService houseService;

    @PostMapping("/addhouse")
    public ResponseEntity<?> addNewHouse(@RequestBody House house) {
        try {
            House newhouse = houseService.saveHouse(house);
            return ResponseEntity.ok(newhouse);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<?> getall() {
        try {
            List<House> houseList = houseService.getAllHouses();
            return ResponseEntity.ok(houseList);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteHouse(@PathVariable Long id) {
        try {
            houseService.deleteHouse(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
        @GetMapping("/commission/{busername}")
    public ResponseEntity<Double> getBrokerCommission(@PathVariable String busername) {
        try {
            double commission = houseService.getTotalCommissionForBroker(busername);
            return ResponseEntity.ok(commission);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
}
