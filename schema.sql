-- AgriVision AI - Relational Database Schema (PostgreSQL)
-- Implements the exact Entity Relationship Diagram (ERD) from Project Specification

CREATE TABLE IF NOT EXISTS farmer (
    farmer_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    location VARCHAR(200) NOT NULL,
    farm_size_acres DECIMAL(6,2) DEFAULT 2.5,
    preferred_language VARCHAR(20) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS crop (
    crop_id SERIAL PRIMARY KEY,
    crop_name VARCHAR(100) NOT NULL,
    variety VARCHAR(100) NOT NULL,
    optimum_n DECIMAL(6,2),
    optimum_p DECIMAL(6,2),
    optimum_k DECIMAL(6,2),
    optimum_ph_min DECIMAL(3,1),
    optimum_ph_max DECIMAL(3,1),
    growth_duration_days INT
);

CREATE TABLE IF NOT EXISTS disease (
    disease_id SERIAL PRIMARY KEY,
    crop_id INT REFERENCES crop(crop_id) ON DELETE CASCADE,
    common_name VARCHAR(150) NOT NULL,
    scientific_name VARCHAR(150),
    pathogen_type VARCHAR(50), -- Fungal, Bacterial, Viral, Pest
    symptoms TEXT,
    recommended_treatment TEXT,
    organic_remedy TEXT
);

CREATE TABLE IF NOT EXISTS image_analysis (
    analysis_id SERIAL PRIMARY KEY,
    farmer_id INT REFERENCES farmer(farmer_id) ON DELETE CASCADE,
    crop_id INT REFERENCES crop(crop_id) ON DELETE CASCADE,
    image_path VARCHAR(500) NOT NULL,
    confidence DECIMAL(5,2) NOT NULL,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS analysis_result (
    result_id SERIAL PRIMARY KEY,
    analysis_id INT UNIQUE REFERENCES image_analysis(analysis_id) ON DELETE CASCADE,
    disease_id INT REFERENCES disease(disease_id) ON DELETE SET NULL,
    severity_level VARCHAR(30) DEFAULT 'MODERATE', -- MILD, MODERATE, SEVERE
    affected_percentage DECIMAL(5,2),
    result_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS soil_test (
    soil_id SERIAL PRIMARY KEY,
    farmer_id INT REFERENCES farmer(farmer_id) ON DELETE CASCADE,
    n_value DECIMAL(6,2) NOT NULL,
    p_value DECIMAL(6,2) NOT NULL,
    k_value DECIMAL(6,2) NOT NULL,
    ph DECIMAL(3,1) NOT NULL,
    soil_type VARCHAR(50) NOT NULL,
    moisture_percentage DECIMAL(5,2),
    organic_carbon_percentage DECIMAL(4,2),
    tested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fertilizer (
    fertilizer_id SERIAL PRIMARY KEY,
    fertilizer_name VARCHAR(150) NOT NULL,
    nutrients VARCHAR(100) NOT NULL, -- e.g. "46-0-0 (N)" or "18-46-0 (NPK)"
    nitrogen_content DECIMAL(5,2) DEFAULT 0,
    phosphorus_content DECIMAL(5,2) DEFAULT 0,
    potassium_content DECIMAL(5,2) DEFAULT 0,
    application_method VARCHAR(100) -- Soil broadcast, Foliar spray, Fertigation
);

CREATE TABLE IF NOT EXISTS recommendation (
    recommendation_id SERIAL PRIMARY KEY,
    farmer_id INT REFERENCES farmer(farmer_id) ON DELETE CASCADE,
    soil_id INT REFERENCES soil_test(soil_id) ON DELETE CASCADE,
    crop_id INT REFERENCES crop(crop_id) ON DELETE CASCADE,
    fertilizer_id INT REFERENCES fertilizer(fertilizer_id) ON DELETE SET NULL,
    analysis_id INT REFERENCES image_analysis(analysis_id) ON DELETE SET NULL,
    dosage_kg_per_acre DECIMAL(6,2),
    schedule_notes TEXT,
    organic_suggestion TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
