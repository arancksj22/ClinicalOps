package com.example.ClinicalOps.Services;

import com.example.ClinicalOps.Models.Patient;
import com.example.ClinicalOps.Repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    PatientRepository repo;

    @Autowired
    public PatientService(PatientRepository repo){
        this.repo = repo;
    }

    public List<Patient> getPatients(){
        return repo.findAll();
    }
    public Patient getPatientById(int patientId){
        return repo.findById(patientId).orElse(null);
    }
    public void addPatient(Patient patient){
        repo.save(patient);
    }
    public void setPatient(Patient patient){
        repo.save(patient);
    }
    public void deletePatient(int patientId){
        repo.deleteById(patientId);
    }
}
