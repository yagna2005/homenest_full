package com.project.practice.service;

import com.project.practice.model.BrokerAdd;
import com.project.practice.repository.BrokerAddRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrokerAddService {

    @Autowired
    private BrokerAddRepository brokerAddRepository;

    public BrokerAdd saveBrokerAdd(BrokerAdd brokerAdd) {
        return brokerAddRepository.save(brokerAdd);
    }

    public List<BrokerAdd> getAllBrokers() {
        return brokerAddRepository.findAll();
    }

    public void deleteBroker(Long id) {
        brokerAddRepository.deleteById(id);
    }
}
