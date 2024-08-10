package com.project.practice.repository;

import com.project.practice.model.BrokerAdd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrokerAddRepository extends JpaRepository<BrokerAdd, Long> {
}
