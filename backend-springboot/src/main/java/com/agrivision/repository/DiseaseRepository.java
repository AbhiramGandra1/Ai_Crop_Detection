package com.agrivision.repository;

import com.agrivision.entity.Disease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DiseaseRepository extends JpaRepository<Disease, Long> {
    List<Disease> findByCropCropId(Long cropId);
    List<Disease> findByPathogenType(String pathogenType);
}
