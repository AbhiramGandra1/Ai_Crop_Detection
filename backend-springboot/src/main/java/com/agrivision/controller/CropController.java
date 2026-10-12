package com.agrivision.controller;

import com.agrivision.dto.ApiResponse;
import com.agrivision.entity.Crop;
import com.agrivision.repository.CropRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/crops")
@CrossOrigin(origins = "*")
public class CropController {

    @Autowired
    private CropRepository cropRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Crop>>> getAllCrops() {
        List<Crop> crops = cropRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success("Supported agronomy cultivars retrieved", crops));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Crop>> getCropById(@PathVariable Long id) {
        return cropRepository.findById(id)
                .map(crop -> ResponseEntity.ok(ApiResponse.success("Crop details retrieved", crop)))
                .orElse(ResponseEntity.notFound().build());
    }
}
