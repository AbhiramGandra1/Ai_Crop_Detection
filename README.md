# AgriVision AI - Crop Disease Detection & Intelligent Fertilizer Recommendation System

> **Accenture AgriTech | Industry X Agriculture Platform**
> AI-based leaf pathology vision classifier, soil stoichiometric nutrient optimizer (NPK & pH), and simulated national certified seed database.

---

## 🚀 Quick Start in VS Code

### 1. Open in Visual Studio Code
1. Unzip the project folder `agrivision-project.zip`.
2. Open VS Code: `File` -> `Open Folder...` -> select the unzipped directory.
3. Open the integrated terminal (`Ctrl + ~` or `Cmd + ~`).

### 2. Run the Frontend Web Portal
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```
Open **http://localhost:3000** in your browser.

---

## 📦 Pushing to GitHub / GitLab from VS Code

Open the VS Code Terminal and run:

```bash
# Initialize git repository (if not already done)
git init

# Stage all files
git add .

# Create initial commit
git commit -m "feat: complete AgriVision AI crop disease & fertilizer recommendation platform"

# Rename branch to main
git branch -M main

# Add your GitHub repository remote
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git

# Push code to GitHub
git push -u origin main
```

---

## 🐳 Running Full Stack with Docker Compose

To spin up all microservices (Spring Boot, Node.js AI, PostgreSQL, and React):

```bash
docker compose up --build
```

### Active Services & Ports:
| Service | Technology | Port | Role |
| :--- | :--- | :--- | :--- |
| **`frontend-web`** | React + Tailwind CSS | `:3000` | Farmer Web Portal & Diagnostic Interface |
| **`springboot-backend`** | Java 21 Spring Boot 3.2 | `:8080` | Core Agronomy Engine & REST APIs |
| **`node-ai-service`** | Node.js + ONNX Runtime | `:5000` | Deep Learning Leaf Computer Vision Inference |
| **`postgres-db`** | PostgreSQL 16 Alpine | `:5432` | Farmer, Soil Test, Crop & Recommendation DB |

---

## 🗄️ Relational Database Schema (PostgreSQL)
The database structure implements the exact **Entity Relationship Diagram (ERD)** from the project abstract:
- `FARMER` (farmer_id, name, phone, location, farm_size_acres)
- `CROP` (crop_id, crop_name, variety, optimum_n, optimum_p, optimum_k, optimum_ph_min/max)
- `IMAGE_ANALYSIS` (analysis_id, farmer_id, crop_id, image_path, confidence)
- `ANALYSIS_RESULT` (result_id, analysis_id, disease_id, severity_level, result_date)
- `SOIL_TEST` (soil_id, farmer_id, n_value, p_value, k_value, ph, soil_type, organic_carbon)
- `FERTILIZER` (fertilizer_id, fertilizer_name, nutrients, application_method)
- `RECOMMENDATION` (recommendation_id, farmer_id, soil_id, crop_id, fertilizer_id, dosage_kg_per_acre)

Check `/schema.sql` for the complete DDL script.

---

## 🔑 Demo Credentials
- **Farmer Mobile**: `9876543210`
- **Security PIN**: `1234`
- You can also register any new farmer or switch profiles in 1 click!

---

## 🌾 Core Modules Implemented
1. **Module 1 – Farmer Management**: Profiles, land acreage, regional dialect guidance.
2. **Module 2 – Crop Leaf Disease Detection**: Node.js vision classifier with Grad-CAM heatmap visualization and lesion localization.
3. **Module 3 – Soil Nutrient Analysis**: Interactive NPK, pH, pedology, and organic carbon analysis.
4. **Module 4 – Intelligent Fertilizer Recommendation**: Stoichiometric calculations for DAP, Urea splits, MOP, organic remedies, and soil amendments.
5. **Module 5 – Official Agronomy Decision Dossier**: Printable PDF certificate with QR verification code and voice guidance.
6. **Simulated Seed Database**: Certified seed registry with AI cultivar match advisor.
