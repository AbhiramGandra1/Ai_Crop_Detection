package com.agrivision.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "soil_test")
public class SoilTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "soil_id")
    private Long soilId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private Farmer farmer;

    @Column(name = "n_value", nullable = false, precision = 6, scale = 2)
    private BigDecimal nValue;

    @Column(name = "p_value", nullable = false, precision = 6, scale = 2)
    private BigDecimal pValue;

    @Column(name = "k_value", nullable = false, precision = 6, scale = 2)
    private BigDecimal kValue;

    @Column(name = "ph", nullable = false, precision = 3, scale = 1)
    private BigDecimal ph;

    @Column(name = "soil_type", nullable = false, length = 50)
    private String soilType;

    @Column(name = "moisture_percentage", precision = 5, scale = 2)
    private BigDecimal moisturePercentage;

    @Column(name = "organic_carbon_percentage", precision = 4, scale = 2)
    private BigDecimal organicCarbonPercentage;

    @Column(name = "tested_at")
    private LocalDateTime testedAt = LocalDateTime.now();

    public SoilTest() {}

    public Long getSoilId() { return soilId; }
    public void setSoilId(Long soilId) { this.soilId = soilId; }
    public Farmer getFarmer() { return farmer; }
    public void setFarmer(Farmer farmer) { this.farmer = farmer; }
    public BigDecimal getnValue() { return nValue; }
    public void setnValue(BigDecimal nValue) { this.nValue = nValue; }
    public BigDecimal getpValue() { return pValue; }
    public void setpValue(BigDecimal pValue) { this.pValue = pValue; }
    public BigDecimal getkValue() { return kValue; }
    public void setkValue(BigDecimal kValue) { this.kValue = kValue; }
    public BigDecimal getPh() { return ph; }
    public void setPh(BigDecimal ph) { this.ph = ph; }
    public String getSoilType() { return soilType; }
    public void setSoilType(String soilType) { this.soilType = soilType; }
    public BigDecimal getMoisturePercentage() { return moisturePercentage; }
    public void setMoisturePercentage(BigDecimal moisturePercentage) { this.moisturePercentage = moisturePercentage; }
    public BigDecimal getOrganicCarbonPercentage() { return organicCarbonPercentage; }
    public void setOrganicCarbonPercentage(BigDecimal organicCarbonPercentage) { this.organicCarbonPercentage = organicCarbonPercentage; }
    public LocalDateTime getTestedAt() { return testedAt; }
    public void setTestedAt(LocalDateTime testedAt) { this.testedAt = testedAt; }
}
