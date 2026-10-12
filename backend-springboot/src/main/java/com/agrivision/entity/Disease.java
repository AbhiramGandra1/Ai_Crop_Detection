package com.agrivision.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "disease")
public class Disease {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "disease_id")
    private Long diseaseId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id")
    private Crop crop;

    @Column(name = "common_name", nullable = false, length = 150)
    private String commonName;

    @Column(name = "scientific_name", length = 150)
    private String scientificName;

    @Column(name = "pathogen_type", length = 50)
    private String pathogenType;

    @Column(name = "symptoms", columnDefinition = "TEXT")
    private String symptoms;

    @Column(name = "recommended_treatment", columnDefinition = "TEXT")
    private String recommendedTreatment;

    @Column(name = "organic_remedy", columnDefinition = "TEXT")
    private String organicRemedy;

    public Disease() {}

    public Long getDiseaseId() { return diseaseId; }
    public void setDiseaseId(Long diseaseId) { this.diseaseId = diseaseId; }
    public Crop getCrop() { return crop; }
    public void setCrop(Crop crop) { this.crop = crop; }
    public String getCommonName() { return commonName; }
    public void setCommonName(String commonName) { this.commonName = commonName; }
    public String getScientificName() { return scientificName; }
    public void setScientificName(String scientificName) { this.scientificName = scientificName; }
    public String getPathogenType() { return pathogenType; }
    public void setPathogenType(String pathogenType) { this.pathogenType = pathogenType; }
    public String getSymptoms() { return symptoms; }
    public void setSymptoms(String symptoms) { this.symptoms = symptoms; }
    public String getRecommendedTreatment() { return recommendedTreatment; }
    public void setRecommendedTreatment(String recommendedTreatment) { this.recommendedTreatment = recommendedTreatment; }
    public String getOrganicRemedy() { return organicRemedy; }
    public void setOrganicRemedy(String organicRemedy) { this.organicRemedy = organicRemedy; }
}
