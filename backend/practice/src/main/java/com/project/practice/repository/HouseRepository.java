package com.project.practice.repository;

import com.project.practice.model.House;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HouseRepository extends JpaRepository<House, Long> {
    List<House> findByBusername(String busername);

}
