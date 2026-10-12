package com.agrivision.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "farmer")
public class Farmer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "farmer_id")
    private Long farmerId;

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "phone", nullable = false, unique = true, length = 20)
    private String phone;

    @Column(name = "location", nullable = false, length = 200)
    private String location;

    @Column(name = "farm_size_acres", precision = 6, scale = 2)
    private BigDecimal farmSizeAcres = BigDecimal.valueOf(2.50);

    @Column(name = "preferred_language", length = 20)
    private String preferredLanguage = "en";

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Farmer() {}

    public Farmer(String name, String phone, String location, BigDecimal farmSizeAcres, String preferredLanguage) {
        this.name = name;
        this.phone = phone;
        this.location = location;
        this.farmSizeAcres = farmSizeAcres;
        this.preferredLanguage = preferredLanguage;
    }

    public Long getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(Long farmerId) {
        this.farmerId = farmerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public BigDecimal getFarmSizeAcres() {
        return farmSizeAcres;
    }

    public void setFarmSizeAcres(BigDecimal farmSizeAcres) {
        this.farmSizeAcres = farmSizeAcres;
    }

    public String getPreferredLanguage() {
        return preferredLanguage;
    }

    public void setPreferredLanguage(String preferredLanguage) {
        this.preferredLanguage = preferredLanguage;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
