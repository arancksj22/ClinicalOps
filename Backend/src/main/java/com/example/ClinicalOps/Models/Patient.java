package com.example.ClinicalOps.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Patient {

    @Id
    private int patientId;

    private String patientFirstName;
    private String patientLastName;
    private int patientAge;
    private LocalDate patientAdmissionDate;
    private LocalDate patientReleaseDate;

    public Patient() {
    }

    public Patient(int patientId, String patientFirstName, String patientLastName,
                   int patientAge, LocalDate patientAdmissionDate, LocalDate patientReleaseDate) {
        this.patientId = patientId;
        this.patientFirstName = patientFirstName;
        this.patientLastName = patientLastName;
        this.patientAge = patientAge;
        this.patientAdmissionDate = patientAdmissionDate;
        this.patientReleaseDate = patientReleaseDate;
    }

    public int getPatientId() {
        return patientId;
    }

    public String getPatientFirstName() {
        return patientFirstName;
    }

    public String getPatientLastName() {
        return patientLastName;
    }

    public int getPatientAge() {
        return patientAge;
    }

    public LocalDate getPatientAdmissionDate() {
        return patientAdmissionDate;
    }

    public LocalDate getPatientReleaseDate() {
        return patientReleaseDate;
    }

    public void setPatientId(int patientId) {
        this.patientId = patientId;
    }

    public void setPatientFirstName(String patientFirstName) {
        this.patientFirstName = patientFirstName;
    }

    public void setPatientLastName(String patientLastName) {
        this.patientLastName = patientLastName;
    }

    public void setPatientAge(int patientAge) {
        this.patientAge = patientAge;
    }

    public void setPatientAdmissionDate(LocalDate patientAdmissionDate) {
        this.patientAdmissionDate = patientAdmissionDate;
    }

    public void setPatientReleaseDate(LocalDate patientReleaseDate) {
        this.patientReleaseDate = patientReleaseDate;
    }

    @Override
    public String toString() {
        return "Patient{" +
                "patientId=" + patientId +
                ", patientFirstName='" + patientFirstName + '\'' +
                ", patientLastName='" + patientLastName + '\'' +
                ", patientAge=" + patientAge +
                ", patientAdmissionDate=" + patientAdmissionDate +
                ", patientReleaseDate=" + patientReleaseDate +
                '}';
    }
}
