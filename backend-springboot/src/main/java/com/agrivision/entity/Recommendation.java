package com.agrivision.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "recommendation")
public class Recommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recommendation_id")
    private Long recommendationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private Farmer farmer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "soil_id", nullable = false)
    private SoilTest soilTest;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fertilizer_id")
    private Fertilizer fertilizer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "analysis_id")
    private ImageAnalysis imageAnalysis;

    @Column(name = "dosage_kg_per_acre", precision = 6, scale = 2)
    private BigDecimal dosageKgPerAcre;

    @Column(name = "schedule_notes", columnDefinition = "TEXT")
    private String scheduleNotes;

    @Column(name = "organic_suggestion", columnDefinition = "TEXT")
    private String organicSuggestion;

    @Column(name = "date")
    private LocalDateTime date = LocalDateTime.now();

    public Recommendation() {}

    public Long getRecommendationId() { return recommendationId; }
    public void setRecommendationId(Long recommendationId) { this.recommendationId = recommendationId; }
    public Farmer getFarmer() { return farmer; }
    public void setFarmer(Farmer farmer) { this.farmer = farmer; }
    public SoilTest getSoilTest() { return soilTest; }
    public void setSoilTest(SoilTest soilTest) { this.soilTest = soilTest; }
    public Crop getCrop() { return crop; }
    public void setCrop(Crop crop) { this.crop = crop; }
    public Fertilizer getFertilizer() { return fertilizer; }
    public void setFertilizer(Fertilizer fertilizer) { this.fertilizer = fertilizer; }
    public ImageAnalysis getImageAnalysis() { return imageAnalysis; }
    public void setImageAnalysis(ImageAnalysis imageAnalysis) { this.imageAnalysis = imageAnalysis; }
    public BigDecimal getDosageKgPerAcre() { return dosageKgPerAcre; }
    public void setDosageKgPerAcre(BigDecimal dosageKgPerAcre) { this.dosageKgPerAcre = dosageKgPerAcre; }
    public String getScheduleNotes() { return scheduleNotes; }
    public void setScheduleNotes(String scheduleNotes) { this.scheduleNotes = scheduleNotes; }
    public String getOrganicSuggestion() { return organicSuggestion; }
    public void setOrganicSuggestion(String organicSuggestion) { this.organicSuggestion = organicSuggestion; }
    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }
}
