package com.project.practice.repository;

import com.project.practice.model.Broker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrokerRepository extends JpaRepository<Broker, Long> {
    boolean existsByUsername(String username);
    boolean existsByAadhaar(String aadhaar);
    Broker findByUsername(String username);
}
