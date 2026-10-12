package com.agrivision.repository;

import com.agrivision.entity.ImageAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ImageAnalysisRepository extends JpaRepository<ImageAnalysis, Long> {
    List<ImageAnalysis> findByFarmerFarmerIdOrderByAnalyzedAtDesc(Long farmerId);
}
