package com.example.ClinicalOps.Repositories;

import com.example.ClinicalOps.Models.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer>{
}
