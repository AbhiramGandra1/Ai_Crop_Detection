package com.agrivision.repository;

import com.agrivision.entity.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CropRepository extends JpaRepository<Crop, Long> {
    List<Crop> findByCropNameContainingIgnoreCase(String cropName);
}
