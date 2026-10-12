package com.agrivision.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "fertilizer")
public class Fertilizer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fertilizer_id")
    private Long fertilizerId;

    @Column(name = "fertilizer_name", nullable = false, length = 150)
    private String fertilizerName;

    @Column(name = "nutrients", nullable = false, length = 100)
    private String nutrients;

    @Column(name = "nitrogen_content", precision = 5, scale = 2)
    private BigDecimal nitrogenContent = BigDecimal.ZERO;

    @Column(name = "phosphorus_content", precision = 5, scale = 2)
    private BigDecimal phosphorusContent = BigDecimal.ZERO;

    @Column(name = "potassium_content", precision = 5, scale = 2)
    private BigDecimal potassiumContent = BigDecimal.ZERO;

    @Column(name = "application_method", length = 100)
    private String applicationMethod;

    public Fertilizer() {}

    public Long getFertilizerId() { return fertilizerId; }
    public void setFertilizerId(Long fertilizerId) { this.fertilizerId = fertilizerId; }
    public String getFertilizerName() { return fertilizerName; }
    public void setFertilizerName(String fertilizerName) { this.fertilizerName = fertilizerName; }
    public String getNutrients() { return nutrients; }
    public void setNutrients(String nutrients) { this.nutrients = nutrients; }
    public BigDecimal getNitrogenContent() { return nitrogenContent; }
    public void setNitrogenContent(BigDecimal nitrogenContent) { this.nitrogenContent = nitrogenContent; }
    public BigDecimal getPhosphorusContent() { return phosphorusContent; }
    public void setPhosphorusContent(BigDecimal phosphorusContent) { this.phosphorusContent = phosphorusContent; }
    public BigDecimal getPotassiumContent() { return potassiumContent; }
    public void setPotassiumContent(BigDecimal potassiumContent) { this.potassiumContent = potassiumContent; }
    public String getApplicationMethod() { return applicationMethod; }
    public void setApplicationMethod(String applicationMethod) { this.applicationMethod = applicationMethod; }
}
