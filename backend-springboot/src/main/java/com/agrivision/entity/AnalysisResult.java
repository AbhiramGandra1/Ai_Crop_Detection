package com.agrivision.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "analysis_result")
public class AnalysisResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "result_id")
    private Long resultId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "analysis_id", unique = true, nullable = false)
    private ImageAnalysis imageAnalysis;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "disease_id")
    private Disease disease;

    @Column(name = "severity_level", length = 30)
    private String severityLevel = "MODERATE";

    @Column(name = "affected_percentage", precision = 5, scale = 2)
    private BigDecimal affectedPercentage;

    @Column(name = "result_date")
    private LocalDateTime resultDate = LocalDateTime.now();

    public AnalysisResult() {}

    public Long getResultId() { return resultId; }
    public void setResultId(Long resultId) { this.resultId = resultId; }
    public ImageAnalysis getImageAnalysis() { return imageAnalysis; }
    public void setImageAnalysis(ImageAnalysis imageAnalysis) { this.imageAnalysis = imageAnalysis; }
    public Disease getDisease() { return disease; }
    public void setDisease(Disease disease) { this.disease = disease; }
    public String getSeverityLevel() { return severityLevel; }
    public void setSeverityLevel(String severityLevel) { this.severityLevel = severityLevel; }
    public BigDecimal getAffectedPercentage() { return affectedPercentage; }
    public void setAffectedPercentage(BigDecimal affectedPercentage) { this.affectedPercentage = affectedPercentage; }
    public LocalDateTime getResultDate() { return resultDate; }
    public void setResultDate(LocalDateTime resultDate) { this.resultDate = resultDate; }
}
