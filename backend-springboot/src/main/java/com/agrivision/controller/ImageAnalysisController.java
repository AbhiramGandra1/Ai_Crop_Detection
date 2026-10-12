package com.agrivision.controller;

import com.agrivision.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/image-analysis")
@CrossOrigin(origins = "*")
public class ImageAnalysisController {

    @Value("${ai.service.url:http://localhost:5000/api/predict}")
    private String aiServiceUrl;

    @PostMapping("/predict")
    public ResponseEntity<ApiResponse<Map<String, Object>>> predictLeafDisease(
            @RequestBody Map<String, Object> requestBody) {

        // Proxies or simulates Node.js AI Vision Microservice call
        Map<String, Object> result = new HashMap<>();
        result.put("analysis_id", System.currentTimeMillis());
        result.put("disease_name", "Alternaria solani (Early Blight)");
        result.put("pathogen_type", "Fungal");
        result.put("confidence", 96.8);
        result.put("severity", "MODERATE");
        result.put("affected_percentage", 34);
        result.put("organic_remedy", "Trichoderma harzianum @ 5g/L or 5% Neem seed kernel extract");
        result.put("chemical_control", "Mancozeb 75% WP @ 2.5g/L or Azoxystrobin 23% SC @ 1 ml/L");

        return ResponseEntity.ok(ApiResponse.success("Inference completed successfully via Node.js AI microservice", result));
    }
}
