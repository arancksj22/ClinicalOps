package com.example.ClinicalOps.Controllers;

import com.example.ClinicalOps.Models.Patient;
import com.example.ClinicalOps.Services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PatientController {

    PatientService service;

    @Autowired
    public PatientController(PatientService service){
        this.service = service;
    }

    @GetMapping("/patient")
    public List<Patient> getPatients(){
        return service.getPatients();
    }

    @GetMapping("/patient/{patientId}")
    public Patient getPatientById(@PathVariable int patientId){
        return service.getPatientById(patientId);
    }

    @PostMapping("/patient")
    public void addPatient(@RequestBody Patient patient){
        service.addPatient(patient);
    }

    @PutMapping("/patient")
    public void setPatient(@RequestBody Patient patient){
        service.setPatient(patient);
    }

    @DeleteMapping("/patient/{patientId}")
    public void deletePatient(@PathVariable int patientId){
        service.deletePatient(patientId);
    }







}
