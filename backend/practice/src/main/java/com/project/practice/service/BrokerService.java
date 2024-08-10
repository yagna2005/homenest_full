package com.project.practice.service;

import com.project.practice.model.Broker;
import com.project.practice.repository.BrokerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrokerService {

    @Autowired
    private BrokerRepository brokerRepository;

    public boolean usernameExists(String username) {
        return brokerRepository.existsByUsername(username);
    }

    public boolean aadhaarExists(String aadhaar) {
        return brokerRepository.existsByAadhaar(aadhaar);
    }

    public Broker createBroker(Broker broker) {
        return brokerRepository.save(broker);
    }

    public List<Broker> getAllBrokers() {
        return brokerRepository.findAll();
    }

    public Optional<Broker> getBrokerById(Long id) {
        return brokerRepository.findById(id);
    }

    public void deleteBroker(Long id) {
        brokerRepository.deleteById(id);
    }

    public Broker updateBroker(Broker broker) {
        return brokerRepository.save(broker);
    }

    public Broker findByUsername(String username) {
        return brokerRepository.findByUsername(username);
    }
}
