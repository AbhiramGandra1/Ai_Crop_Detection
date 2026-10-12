import React, { useState } from 'react';
import { 
  Server, 
  Database, 
  Cpu, 
  Code2, 
  Terminal, 
  Download, 
  Copy, 
  Check, 
  Layers, 
  Activity, 
  Play, 
  CheckCircle2, 
  X,
  FileCode,
  Network
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'docker' | 'erd' | 'endpoints' | 'logs' | 'vscode' | 'java'>('vscode');
  const [selectedJavaFile, setSelectedJavaFile] = useState<string>('engine');
  const [copied, setCopied] = useState(false);
  const [gitCopied, setGitCopied] = useState(false);
  const [testEndpoint, setTestEndpoint] = useState<string>('recommend');
  const [testLoading, setTestLoading] = useState(false);

  if (!isOpen) return null;

  const dockerComposeContent = `# Docker Compose for AI-Based Crop Disease Detection & Intelligent Fertilizer Recommendation System
# Architecture:
# - springboot-backend: Java 21 Spring Boot REST API (Port 8080)
# - node-ai-service: Node.js / TensorFlow / ONNX Leaf Computer Vision Service (Port 5000)
# - postgres-db: PostgreSQL 16 Database for Farmer, Soil, Crop & Recommendation Records (Port 5432)
# - frontend-web: React + Tailwind CSS Farmer Web Portal (Port 3000)

version: '3.8'

services:
  postgres-db:
    image: postgres:16-alpine
    container_name: agrivision-postgres
    restart: always
    environment:
      POSTGRES_DB: agrivision_db
      POSTGRES_USER: agri_admin
      POSTGRES_PASSWORD: AgriSecurePassword123!
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - agrivision-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U agri_admin -d agrivision_db"]
      interval: 10s
      timeout: 5s
      retries: 5

  springboot-backend:
    build:
      context: ./backend-springboot
      dockerfile: Dockerfile
    container_name: agrivision-springboot-api
    restart: on-failure
    depends_on:
      postgres-db:
        condition: service_healthy
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres-db:5432/agrivision_db
      SPRING_DATASOURCE_USERNAME: agri_admin
      SPRING_DATASOURCE_PASSWORD: AgriSecurePassword123!
      SPRING_JPA_HIBERNATE_DDL_AUTO: update
      AI_SERVICE_URL: http://node-ai-service:5000/api/predict
      SERVER_PORT: 8080
    networks:
      - agrivision-network

  node-ai-service:
    build:
      context: ./ai-service-nodejs
      dockerfile: Dockerfile
    container_name: agrivision-ai-vision
    restart: on-failure
    ports:
      - "5000:5000"
    environment:
      PORT: 5000
      MODEL_PATH: ./models/crop_disease_model.onnx
      CONFIDENCE_THRESHOLD: 0.75
    networks:
      - agrivision-network

  frontend-web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: agrivision-web-ui
    restart: always
    ports:
      - "3000:3000"
    environment:
      VITE_SPRINGBOOT_API_URL: http://localhost:8080/api/v1
      VITE_AI_SERVICE_URL: http://localhost:5000/api
    depends_on:
      - springboot-backend
      - node-ai-service
    networks:
      - agrivision-network

volumes:
  pgdata:
    driver: local

networks:
  agrivision-network:
    driver: bridge`;

  const handleCopyDocker = () => {
    navigator.clipboard.writeText(dockerComposeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDocker = () => {
    const blob = new Blob([dockerComposeContent], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'docker-compose.yml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col text-slate-100">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-purple-950/40 via-slate-900 to-emerald-950/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">System Architecture &amp; Spring Boot Engine</h3>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-mono">
                  Microservices Online
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Java Spring Boot 3.2 • Node.js ONNX Vision AI • PostgreSQL 16 • Docker Compose Specification
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-4 text-xs font-medium gap-1 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('vscode')}
            className={`py-3 px-3 transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'vscode'
                ? 'border-emerald-500 text-emerald-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Download ZIP &amp; VS Code Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('java')}
            className={`py-3 px-3 transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'java'
                ? 'border-amber-500 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4 text-amber-400" />
            <span>Java Spring Boot Code (26 Files)</span>
          </button>

          <button
            onClick={() => setActiveTab('docker')}
            className={`py-3 px-3 transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'docker'
                ? 'border-purple-500 text-purple-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>docker-compose.yml</span>
          </button>

          <button
            onClick={() => setActiveTab('erd')}
            className={`py-3 px-3 transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'erd'
                ? 'border-purple-500 text-purple-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-400" />
            <span>PostgreSQL Relational ERD (Page 3)</span>
          </button>

          <button
            onClick={() => setActiveTab('endpoints')}
            className={`py-3 px-3 transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'endpoints'
                ? 'border-purple-500 text-purple-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Network className="w-4 h-4 text-purple-400" />
            <span>Spring Boot REST Controller Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`py-3 px-3 transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'logs'
                ? 'border-purple-500 text-purple-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4 text-amber-400" />
            <span>Docker Health &amp; Runtime Logs</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* 0. VS Code & Push to GitHub Tab */}
          {activeTab === 'vscode' && (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-purple-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    Ready for Local Development &amp; GitHub
                  </span>
                  <h4 className="text-xl font-bold text-white mt-1.5">
                    Download AgriVision AI Project (.ZIP)
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    Complete bundle containing React UI, Java Spring Boot structure, Node.js AI vision service, PostgreSQL schema, Docker Compose, and setup guide.
                  </p>
                </div>

                <a
                  href="/agrivision-project.zip"
                  download="agrivision-project.zip"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/25 flex items-center gap-2 shrink-0 transition active:scale-[0.98]"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Project (.ZIP)</span>
                </a>
              </div>

              {/* Step by Step VS Code Setup */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Step 1: Open in VS Code */}
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs">1</span>
                    <span>Open in VS Code</span>
                  </div>
                  <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
                    <li>Extract <code className="bg-slate-900 px-1 py-0.5 rounded text-emerald-400 font-mono">agrivision-project.zip</code> on your computer.</li>
                    <li>Open Visual Studio Code.</li>
                    <li>Click <strong className="text-white">File &gt; Open Folder...</strong> and choose the extracted folder.</li>
                    <li>Open integrated terminal (<kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-[11px] font-mono">Ctrl + `</kbd> or <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-[11px] font-mono">Cmd + `</kbd>).</li>
                  </ol>
                  <div className="rounded-lg bg-slate-900 p-2.5 font-mono text-[11px] text-slate-300 space-y-1">
                    <div className="text-slate-500"># Install &amp; Start Development Server</div>
                    <div className="text-emerald-400 font-bold">npm install</div>
                    <div className="text-emerald-400 font-bold">npm run dev</div>
                  </div>
                </div>

                {/* Step 2: Push to GitHub */}
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs">2</span>
                      <span>Push to GitHub / GitLab</span>
                    </div>

                    <button
                      onClick={() => {
                        const cmds = `git init\ngit add .\ngit commit -m "feat: complete AgriVision AI crop disease & fertilizer recommendation system"\ngit branch -M main\ngit remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git\ngit push -u origin main`;
                        navigator.clipboard.writeText(cmds);
                        setGitCopied(true);
                        setTimeout(() => setGitCopied(false), 2000);
                      }}
                      className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 font-mono flex items-center gap-1 transition"
                    >
                      {gitCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{gitCopied ? 'Copied' : 'Copy Commands'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-300">
                    Run these commands in your VS Code terminal to initialize Git and push:
                  </p>

                  <div className="rounded-lg bg-slate-900 p-2.5 font-mono text-[11px] text-slate-300 space-y-1">
                    <div>git init</div>
                    <div>git add .</div>
                    <div>git commit -m "feat: AgriVision AI platform"</div>
                    <div>git branch -M main</div>
                    <div className="text-amber-400">git remote add origin https://github.com/YOUR_USER/REPO.git</div>
                    <div className="text-emerald-400 font-bold">git push -u origin main</div>
                  </div>
                </div>

              </div>

              {/* Step 3: Run Full Stack Docker Containers */}
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-xs">3</span>
                  <span>Deploy with Docker Compose</span>
                </div>
                <p className="text-xs text-slate-300">
                  If Docker Desktop is installed, you can boot all 4 microservices (Spring Boot on 8080, Node.js on 5000, PostgreSQL on 5432, and React on 3000) simultaneously with a single command:
                </p>
                <div className="rounded-lg bg-slate-900 p-2.5 font-mono text-xs text-emerald-400 font-bold">
                  docker compose up --build
                </div>
              </div>
            </div>
          )}

          {/* Java Spring Boot Source Code Inspector Tab */}
          {activeTab === 'java' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <span className="text-amber-400 font-mono">26 Java Source Files</span>
                    <span>• Spring Boot 3.2 Enterprise Structure</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Includes Entities, Spring Data JPA Repositories, REST Controllers, Agronomy Service, and Maven POM.
                  </p>
                </div>

                <a
                  href="/agrivision-project.zip"
                  download="agrivision-project.zip"
                  className="px-3.5 py-1.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Full .java Project</span>
                </a>
              </div>

              {/* File selector pill bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                {[
                  { id: 'engine', label: 'AgronomyEngineService.java', type: 'Service' },
                  { id: 'controller', label: 'FertilizerRecommendationController.java', type: 'Controller' },
                  { id: 'farmer', label: 'Farmer.java', type: 'Entity' },
                  { id: 'soil', label: 'SoilTest.java', type: 'Entity' },
                  { id: 'repo', label: 'RecommendationRepository.java', type: 'Repository' },
                  { id: 'pom', label: 'pom.xml', type: 'Maven' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedJavaFile(f.id)}
                    className={`px-3 py-1.5 rounded-lg border text-left whitespace-nowrap transition flex items-center gap-1.5 ${
                      selectedJavaFile === f.id
                        ? 'border-amber-500 bg-amber-950/40 text-amber-300 font-bold'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-[10px] opacity-75 font-mono">[{f.type}]</span>
                    <span>{f.label}</span>
                  </button>
                ))}
              </div>

              {/* Code viewer box */}
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-amber-200/90 overflow-x-auto shadow-inner max-h-96 leading-relaxed">
                {selectedJavaFile === 'engine' && (
                  <pre>{`package com.agrivision.service;

import com.agrivision.entity.Crop;
import com.agrivision.entity.Farmer;
import com.agrivision.entity.SoilTest;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

@Service
public class AgronomyEngineService {

    private static final BigDecimal HA_TO_ACRE = BigDecimal.valueOf(0.4047);

    public Map<String, Object> calculateNutrientRecommendation(Farmer farmer, Crop crop, SoilTest soil) {
        BigDecimal farmAcres = farmer.getFarmSizeAcres() != null ? farmer.getFarmSizeAcres() : BigDecimal.valueOf(1.0);

        // Stoichiometric Crop targets (kg/ha)
        BigDecimal optN = crop.getOptimumN();
        BigDecimal optP = crop.getOptimumP();
        BigDecimal optK = crop.getOptimumK();

        // Available soil test
        BigDecimal actN = soil.getnValue();
        BigDecimal actP = soil.getpValue();
        BigDecimal actK = soil.getkValue();

        // Deficits in kg/ha
        BigDecimal nDeficitHa = optN.subtract(actN).max(BigDecimal.ZERO);
        BigDecimal pDeficitHa = optP.subtract(actP).max(BigDecimal.ZERO);
        BigDecimal kDeficitHa = optK.subtract(actK).max(BigDecimal.ZERO);

        // Convert to per-acre pure nutrient deficit
        BigDecimal nDeficitAcre = nDeficitHa.multiply(HA_TO_ACRE).setScale(2, RoundingMode.HALF_UP);
        BigDecimal pDeficitAcre = pDeficitHa.multiply(HA_TO_ACRE).setScale(2, RoundingMode.HALF_UP);
        BigDecimal kDeficitAcre = kDeficitHa.multiply(HA_TO_ACRE).setScale(2, RoundingMode.HALF_UP);

        // DAP (18-46-0) Calculation
        BigDecimal dapKgAcre = pDeficitAcre.divide(BigDecimal.valueOf(0.46), 0, RoundingMode.CEILING);
        BigDecimal nSuppliedByDap = dapKgAcre.multiply(BigDecimal.valueOf(0.18));

        // Urea (46% N) Calculation for remaining N
        BigDecimal remNAcre = nDeficitAcre.subtract(nSuppliedByDap).max(BigDecimal.ZERO);
        BigDecimal ureaKgAcre = remNAcre.divide(BigDecimal.valueOf(0.46), 0, RoundingMode.CEILING);

        // MOP (60% K2O) Calculation
        BigDecimal mopKgAcre = kDeficitAcre.divide(BigDecimal.valueOf(0.60), 0, RoundingMode.CEILING);

        Map<String, Object> response = new HashMap<>();
        response.put("recommendation_id", System.currentTimeMillis());
        response.put("farmer_id", farmer.getFarmerId());
        response.put("n_deficit_acre", nDeficitAcre);
        response.put("p_deficit_acre", pDeficitAcre);
        response.put("k_deficit_acre", kDeficitAcre);
        response.put("dap_kg_per_acre", dapKgAcre);
        response.put("urea_kg_per_acre", ureaKgAcre);
        response.put("mop_kg_per_acre", mopKgAcre);
        return response;
    }
}`}</pre>
                )}

                {selectedJavaFile === 'controller' && (
                  <pre>{`package com.agrivision.controller;

import com.agrivision.dto.ApiResponse;
import com.agrivision.dto.SoilTestRequestDto;
import com.agrivision.entity.Crop;
import com.agrivision.entity.Farmer;
import com.agrivision.entity.SoilTest;
import com.agrivision.repository.*;
import com.agrivision.service.AgronomyEngineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/fertilizer-recommendations")
@CrossOrigin(origins = "*")
public class FertilizerRecommendationController {

    @Autowired
    private AgronomyEngineService agronomyEngineService;

    @Autowired
    private FarmerRepository farmerRepository;

    @Autowired
    private CropRepository cropRepository;

    @PostMapping("/calculate")
    public ResponseEntity<ApiResponse<Map<String, Object>>> calculateRecommendation(
            @RequestBody SoilTestRequestDto request) {

        Farmer farmer = farmerRepository.findById(request.getFarmerId()).orElseThrow();
        Crop crop = cropRepository.findById(request.getCropId()).orElseThrow();

        SoilTest soilTest = new SoilTest();
        soilTest.setFarmer(farmer);
        soilTest.setnValue(request.getnValue());
        soilTest.setpValue(request.getpValue());
        soilTest.setkValue(request.getkValue());
        soilTest.setPh(request.getPh());
        soilTest.setSoilType(request.getSoilType());

        Map<String, Object> result = agronomyEngineService.calculateNutrientRecommendation(farmer, crop, soilTest);
        return ResponseEntity.ok(ApiResponse.success("Recommendation generated", result));
    }
}`}</pre>
                )}

                {selectedJavaFile === 'farmer' && (
                  <pre>{`package com.agrivision.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "farmer")
public class Farmer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "farmer_id")
    private Long farmerId;

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "phone", nullable = false, unique = true, length = 20)
    private String phone;

    @Column(name = "location", nullable = false, length = 200)
    private String location;

    @Column(name = "farm_size_acres", precision = 6, scale = 2)
    private BigDecimal farmSizeAcres = BigDecimal.valueOf(2.50);

    @Column(name = "preferred_language", length = 20)
    private String preferredLanguage = "en";

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // Standard Getters & Setters
}`}</pre>
                )}

                {selectedJavaFile === 'soil' && (
                  <pre>{`package com.agrivision.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "soil_test")
public class SoilTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "soil_id")
    private Long soilId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private Farmer farmer;

    @Column(name = "n_value", nullable = false, precision = 6, scale = 2)
    private BigDecimal nValue;

    @Column(name = "p_value", nullable = false, precision = 6, scale = 2)
    private BigDecimal pValue;

    @Column(name = "k_value", nullable = false, precision = 6, scale = 2)
    private BigDecimal kValue;

    @Column(name = "ph", nullable = false, precision = 3, scale = 1)
    private BigDecimal ph;

    @Column(name = "soil_type", nullable = false, length = 50)
    private String soilType;

    @Column(name = "tested_at")
    private LocalDateTime testedAt = LocalDateTime.now();
}`}</pre>
                )}

                {selectedJavaFile === 'repo' && (
                  <pre>{`package com.agrivision.repository;

import com.agrivision.entity.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    List<Recommendation> findByFarmerFarmerIdOrderByDateDesc(Long farmerId);
}`}</pre>
                )}

                {selectedJavaFile === 'pom' && (
                  <pre>{`<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.4</version>
    </parent>
    <groupId>com.agrivision</groupId>
    <artifactId>agrivision-backend</artifactId>
    <version>1.0.0</version>
    <properties>
        <java.version>21</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
        </dependency>
    </dependencies>
</project>`}</pre>
                )}
              </div>
            </div>
          )}

          {/* 1. Docker Compose Tab */}
          {activeTab === 'docker' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white">Full Stack Multi-Container Orchestration</h4>
                  <p className="text-xs text-slate-400">Includes Spring Boot backend, Node.js AI vision inference, PostgreSQL, and React frontend</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyDocker}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy YAML'}</span>
                  </button>

                  <button
                    onClick={handleDownloadDocker}
                    className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-purple-600/25 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download docker-compose.yml</span>
                  </button>
                </div>
              </div>

              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-emerald-300 overflow-x-auto shadow-inner leading-relaxed">
                <pre>{dockerComposeContent}</pre>
              </div>
            </div>
          )}

          {/* 2. ERD Tab (Matches Page 3 of Project PDF) */}
          {activeTab === 'erd' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs text-purple-200 flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-400 shrink-0" />
                <span>
                  <strong>ERD Design Specification:</strong> Directly mirrors Page 3 of the project document (Farmer 1:M Soil Test, Farmer 1:M Image Analysis, Image Analysis 1:1 Analysis Result, Fertilizer 1:M Recommendation).
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* FARMER Table */}
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-xs space-y-2">
                  <div className="font-bold text-sm text-purple-400 border-b border-slate-800 pb-1.5 flex items-center justify-between">
                    <span>FARMER</span>
                    <span className="text-[10px] text-slate-500 font-mono">1:M parent</span>
                  </div>
                  <ul className="space-y-1 font-mono text-slate-300 text-[11px]">
                    <li className="text-amber-400 font-bold">🔑 PK farmer_id (SERIAL)</li>
                    <li>name (VARCHAR)</li>
                    <li>phone (VARCHAR UNIQUE)</li>
                    <li>location (VARCHAR)</li>
                    <li className="text-slate-500">farm_size_acres (DECIMAL)</li>
                  </ul>
                </div>

                {/* CROP Table */}
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-xs space-y-2">
                  <div className="font-bold text-sm text-emerald-400 border-b border-slate-800 pb-1.5 flex items-center justify-between">
                    <span>CROP</span>
                    <span className="text-[10px] text-slate-500 font-mono">1:M parent</span>
                  </div>
                  <ul className="space-y-1 font-mono text-slate-300 text-[11px]">
                    <li className="text-amber-400 font-bold">🔑 PK crop_id (SERIAL)</li>
                    <li>crop_name (VARCHAR)</li>
                    <li>variety (VARCHAR)</li>
                    <li>optimum_n, optimum_p, optimum_k</li>
                    <li className="text-slate-500">optimum_ph_min / max</li>
                  </ul>
                </div>

                {/* IMAGE_ANALYSIS Table */}
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-xs space-y-2">
                  <div className="font-bold text-sm text-blue-400 border-b border-slate-800 pb-1.5 flex items-center justify-between">
                    <span>IMAGE_ANALYSIS</span>
                    <span className="text-[10px] text-slate-500 font-mono">1:1 result</span>
                  </div>
                  <ul className="space-y-1 font-mono text-slate-300 text-[11px]">
                    <li className="text-amber-400 font-bold">🔑 PK analysis_id (SERIAL)</li>
                    <li className="text-purple-300">🔗 FK farmer_id (INT)</li>
                    <li className="text-emerald-300">🔗 FK crop_id (INT)</li>
                    <li>image_path (VARCHAR)</li>
                    <li className="text-slate-400">confidence (DECIMAL)</li>
                  </ul>
                </div>

                {/* ANALYSIS_RESULT Table */}
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-xs space-y-2">
                  <div className="font-bold text-sm text-pink-400 border-b border-slate-800 pb-1.5 flex items-center justify-between">
                    <span>ANALYSIS_RESULT</span>
                    <span className="text-[10px] text-slate-500 font-mono">1:1 link</span>
                  </div>
                  <ul className="space-y-1 font-mono text-slate-300 text-[11px]">
                    <li className="text-amber-400 font-bold">🔑 PK result_id (SERIAL)</li>
                    <li className="text-blue-300">🔗 FK analysis_id (INT UNIQUE)</li>
                    <li>FK disease_id (INT)</li>
                    <li>severity_level (VARCHAR)</li>
                    <li className="text-slate-500">result_date (TIMESTAMP)</li>
                  </ul>
                </div>

                {/* SOIL_TEST Table */}
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-xs space-y-2">
                  <div className="font-bold text-sm text-amber-400 border-b border-slate-800 pb-1.5 flex items-center justify-between">
                    <span>SOIL_TEST</span>
                    <span className="text-[10px] text-slate-500 font-mono">1:M child</span>
                  </div>
                  <ul className="space-y-1 font-mono text-slate-300 text-[11px]">
                    <li className="text-amber-400 font-bold">🔑 PK soil_id (SERIAL)</li>
                    <li className="text-purple-300">🔗 FK farmer_id (INT)</li>
                    <li>N_value, P_value, K_value</li>
                    <li>pH (DECIMAL)</li>
                    <li className="text-slate-400">soil_type (VARCHAR)</li>
                  </ul>
                </div>

                {/* RECOMMENDATION Table */}
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-xs space-y-2">
                  <div className="font-bold text-sm text-emerald-400 border-b border-slate-800 pb-1.5 flex items-center justify-between">
                    <span>RECOMMENDATION</span>
                    <span className="text-[10px] text-slate-500 font-mono">Aggregator</span>
                  </div>
                  <ul className="space-y-1 font-mono text-slate-300 text-[11px]">
                    <li className="text-amber-400 font-bold">🔑 PK recommendation_id</li>
                    <li className="text-purple-300">🔗 FK farmer_id</li>
                    <li className="text-amber-300">🔗 FK soil_id</li>
                    <li className="text-emerald-300">🔗 FK crop_id</li>
                    <li className="text-slate-400">FK fertilizer_id, date</li>
                  </ul>
                </div>

              </div>
            </div>
          )}

          {/* 3. Spring Boot REST Endpoints Simulator */}
          {activeTab === 'endpoints' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white">Spring Boot REST Controllers: </span>
                  <span className="text-slate-400 font-mono">http://localhost:8080/api/v1</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  HTTP 200 OK • Latency: 42ms
                </span>
              </div>

              {/* Endpoint list */}
              <div className="space-y-2">
                {[
                  {
                    id: 'crops',
                    method: 'GET',
                    path: '/api/v1/crops',
                    desc: 'Fetch agricultural cultivars and standard stoichiometric NPK parameters',
                    response: {
                      status: 'SUCCESS',
                      total_crops: 8,
                      sample: { crop_id: 1, crop_name: 'Tomato', optimum_n: 120, optimum_p: 60, optimum_k: 80, ph_range: '6.0 - 7.0' }
                    }
                  },
                  {
                    id: 'vision',
                    method: 'POST',
                    path: '/api/v1/image-analysis/predict',
                    desc: 'Spring Boot proxies leaf image payload to Node.js ONNX inference microservice (Port 5000)',
                    response: {
                      analysis_id: 994201,
                      predicted_disease: 'Tomato Early Blight',
                      pathogen: 'Alternaria solani',
                      confidence: 96.8,
                      severity: 'MODERATE',
                      gradcam_hotspots_detected: 3
                    }
                  },
                  {
                    id: 'recommend',
                    method: 'POST',
                    path: '/api/v1/fertilizer-recommendations/calculate',
                    desc: 'Calculates nutrient deficit and compiles split commercial and bio-fertilizer prescription',
                    response: {
                      recommendation_id: 551982,
                      soil_health_score: 84,
                      commercial_doses: [
                        { name: 'DAP 18-46-0', dose_per_acre: 45, stage: 'Basal (Land Prep)' },
                        { name: 'Neem Coated Urea', dose_per_acre: 32, stage: 'Vegetative Tillering' }
                      ],
                      organic_remedy: 'Vermicompost + Neem cake application'
                    }
                  }
                ].map((ep) => (
                  <div key={ep.id} className="rounded-xl bg-slate-950 border border-slate-800 p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className={`px-2 py-0.5 rounded font-bold ${
                          ep.method === 'GET' ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40' : 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                        }`}>
                          {ep.method}
                        </span>
                        <span className="text-white font-bold">{ep.path}</span>
                      </div>
                      <span className="text-[11px] text-slate-500">{ep.desc}</span>
                    </div>

                    <div className="rounded-lg bg-slate-900 p-2 font-mono text-[11px] text-slate-300 overflow-x-auto">
                      <pre>{JSON.stringify(ep.response, null, 2)}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Container Health & Logs */}
          {activeTab === 'logs' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: 'agrivision-springboot-api', port: '8080', status: 'HEALTHY', up: 'Up 4 hours' },
                  { name: 'agrivision-ai-vision', port: '5000', status: 'HEALTHY', up: 'Up 4 hours' },
                  { name: 'agrivision-postgres', port: '5432', status: 'HEALTHY', up: 'Up 4 hours' },
                  { name: 'agrivision-web-ui', port: '3000', status: 'HEALTHY', up: 'Up 4 hours' }
                ].map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <div className="font-mono text-purple-300 font-bold truncate">{c.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Port: {c.port}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                        {c.status}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">{c.up}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Simulated Docker Logs Console */}
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 space-y-1 overflow-x-auto shadow-inner">
                <div className="text-slate-500">[2026-10-12 09:15:01] [springboot-api] INFO  c.a.AgriVisionApplication : Starting AgriVisionApplication v3.2.0 using Java 21</div>
                <div className="text-slate-500">[2026-10-12 09:15:03] [springboot-api] INFO  o.h.e.t.j.p.i.JpaMySQLDialect : HHH000400: Using dialect: PostgreSQLDialect</div>
                <div className="text-emerald-400">[2026-10-12 09:15:04] [springboot-api] INFO  c.a.controller.CropController : Initialized 8 verified cultivar benchmark records</div>
                <div className="text-slate-500">[2026-10-12 09:15:05] [node-ai-service] INFO  node: Server started on port 5000 (ONNX Runtime Ready)</div>
                <div className="text-purple-400">[2026-10-12 09:15:06] [node-ai-service] INFO  node: Loaded crop_disease_model.onnx [Input: Float32 (1, 3, 512, 512)]</div>
                <div className="text-slate-500">[2026-10-12 09:15:08] [frontend-web] INFO  vite: Server running at http://0.0.0.0:3000/</div>
                <div className="text-emerald-400">[2026-10-12 09:15:10] [springboot-api] INFO  c.a.engine.StoichiometryEngine : Fertilizer recommendation pipeline online. Ready for queries.</div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition"
          >
            Close Architecture Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
