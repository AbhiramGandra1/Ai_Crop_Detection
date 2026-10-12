package com.agrivision.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "crop")
public class Crop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crop_id")
    private Long cropId;

    @Column(name = "crop_name", nullable = false, length = 100)
    private String cropName;

    @Column(name = "variety", nullable = false, length = 100)
    private String variety;

    @Column(name = "optimum_n", precision = 6, scale = 2)
    private BigDecimal optimumN;

    @Column(name = "optimum_p", precision = 6, scale = 2)
    private BigDecimal optimumP;

    @Column(name = "optimum_k", precision = 6, scale = 2)
    private BigDecimal optimumK;

    @Column(name = "optimum_ph_min", precision = 3, scale = 1)
    private BigDecimal optimumPhMin;

    @Column(name = "optimum_ph_max", precision = 3, scale = 1)
    private BigDecimal optimumPhMax;

    @Column(name = "growth_duration_days")
    private Integer growthDurationDays;

    public Crop() {}

    public Long getCropId() { return cropId; }
    public void setCropId(Long cropId) { this.cropId = cropId; }
    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }
    public String getVariety() { return variety; }
    public void setVariety(String variety) { this.variety = variety; }
    public BigDecimal getOptimumN() { return optimumN; }
    public void setOptimumN(BigDecimal optimumN) { this.optimumN = optimumN; }
    public BigDecimal getOptimumP() { return optimumP; }
    public void setOptimumP(BigDecimal optimumP) { this.optimumP = optimumP; }
    public BigDecimal getOptimumK() { return optimumK; }
    public void setOptimumK(BigDecimal optimumK) { this.optimumK = optimumK; }
    public BigDecimal getOptimumPhMin() { return optimumPhMin; }
    public void setOptimumPhMin(BigDecimal optimumPhMin) { this.optimumPhMin = optimumPhMin; }
    public BigDecimal getOptimumPhMax() { return optimumPhMax; }
    public void setOptimumPhMax(BigDecimal optimumPhMax) { this.optimumPhMax = optimumPhMax; }
    public Integer getGrowthDurationDays() { return growthDurationDays; }
    public void setGrowthDurationDays(Integer growthDurationDays) { this.growthDurationDays = growthDurationDays; }
}
