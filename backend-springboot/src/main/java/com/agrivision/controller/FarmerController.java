package com.agrivision.controller;

import com.agrivision.dto.ApiResponse;
import com.agrivision.entity.Farmer;
import com.agrivision.repository.FarmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/farmers")
@CrossOrigin(origins = "*")
public class FarmerController {

    @Autowired
    private FarmerRepository farmerRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Farmer>>> getAllFarmers() {
        List<Farmer> farmers = farmerRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success("Farmers retrieved successfully", farmers));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Farmer>> getFarmerById(@PathVariable Long id) {
        return farmerRepository.findById(id)
                .map(farmer -> ResponseEntity.ok(ApiResponse.success("Farmer found", farmer)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Farmer>> loginFarmer(@RequestParam String phone, @RequestParam String pin) {
        if (!"1234".equals(pin)) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Invalid security PIN. Expected demo PIN: 1234"));
        }
        Farmer farmer = farmerRepository.findByPhone(phone)
                .orElseGet(() -> farmerRepository.findAll().stream().findFirst().orElse(null));

        return ResponseEntity.ok(ApiResponse.success("Login successful", farmer));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Farmer>> registerFarmer(@RequestBody Farmer farmer) {
        Farmer saved = farmerRepository.save(farmer);
        return ResponseEntity.ok(ApiResponse.success("Farmer registered successfully", saved));
    }
}
