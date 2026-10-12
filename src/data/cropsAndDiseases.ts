import { Crop, Disease } from '../types';

export const CROPS_DATA: Crop[] = [
  {
    crop_id: 1,
    crop_name: 'Tomato',
    scientific_name: 'Solanum lycopersicum',
    variety: 'Arka Rakshak / Pusa Ruby',
    optimum_n: 120, // kg/ha
    optimum_p: 60,
    optimum_k: 80,
    optimum_ph_min: 6.0,
    optimum_ph_max: 7.0,
    growth_duration_days: 110,
    season: 'All-season',
    icon: '🍅',
    category: 'Vegetable',
    soil_preference: 'Well-drained sandy loam rich in organic matter',
  },
  {
    crop_id: 2,
    crop_name: 'Rice (Paddy)',
    scientific_name: 'Oryza sativa',
    variety: 'BPT 5204 (Samba Mahsuri) / IR-64',
    optimum_n: 100,
    optimum_p: 50,
    optimum_k: 50,
    optimum_ph_min: 5.5,
    optimum_ph_max: 6.5,
    growth_duration_days: 135,
    season: 'Kharif',
    icon: '🌾',
    category: 'Cereal',
    soil_preference: 'Clayey loam or alluvial soils with high water retention',
  },
  {
    crop_id: 3,
    crop_name: 'Wheat',
    scientific_name: 'Triticum aestivum',
    variety: 'HD-2967 / HD-3086',
    optimum_n: 120,
    optimum_p: 60,
    optimum_k: 40,
    optimum_ph_min: 6.0,
    optimum_ph_max: 7.5,
    growth_duration_days: 120,
    season: 'Rabi',
    icon: '🌾',
    category: 'Cereal',
    soil_preference: 'Fertile, well-aerated loam or clay-loam soils',
  },
  {
    crop_id: 4,
    crop_name: 'Potato',
    scientific_name: 'Solanum tuberosum',
    variety: 'Kufri Jyoti / Kufri Pukhraj',
    optimum_n: 150,
    optimum_p: 80,
    optimum_k: 100,
    optimum_ph_min: 5.2,
    optimum_ph_max: 6.4,
    growth_duration_days: 90,
    season: 'Rabi',
    icon: '🥔',
    category: 'Vegetable',
    soil_preference: 'Loose, friable sandy loam with good drainage',
  },
  {
    crop_id: 5,
    crop_name: 'Maize (Corn)',
    scientific_name: 'Zea mays',
    variety: 'Pioneer P3396 / DKC 9108',
    optimum_n: 140,
    optimum_p: 60,
    optimum_k: 60,
    optimum_ph_min: 5.8,
    optimum_ph_max: 7.2,
    growth_duration_days: 105,
    season: 'Kharif',
    icon: '🌽',
    category: 'Cereal',
    soil_preference: 'Deep, rich alluvial or black soils with pH 6-7.5',
  },
  {
    crop_id: 6,
    crop_name: 'Cotton',
    scientific_name: 'Gossypium hirsutum',
    variety: 'RCH 659 BG-II / Kaveri Jaadoo',
    optimum_n: 120,
    optimum_p: 60,
    optimum_k: 60,
    optimum_ph_min: 6.0,
    optimum_ph_max: 8.0,
    growth_duration_days: 160,
    season: 'Kharif',
    icon: '☁️',
    category: 'Commercial',
    soil_preference: 'Deep black cotton soil (Regur) with good aeration',
  },
  {
    crop_id: 7,
    crop_name: 'Sugarcane',
    scientific_name: 'Saccharum officinarum',
    variety: 'Co 0238 / Co 86032',
    optimum_n: 250,
    optimum_p: 100,
    optimum_k: 120,
    optimum_ph_min: 6.5,
    optimum_ph_max: 7.5,
    growth_duration_days: 360,
    season: 'All-season',
    icon: '🎋',
    category: 'Commercial',
    soil_preference: 'Deep rich loam, black soil with good drainage',
  },
  {
    crop_id: 8,
    crop_name: 'Soybean',
    scientific_name: 'Glycine max',
    variety: 'JS 335 / NRC 37',
    optimum_n: 30, // Legume fixes nitrogen
    optimum_p: 60,
    optimum_k: 40,
    optimum_ph_min: 6.0,
    optimum_ph_max: 7.0,
    growth_duration_days: 95,
    season: 'Kharif',
    icon: '🌱',
    category: 'Pulse',
    soil_preference: 'Well-drained fertile loam with good organic matter',
  }
];

export interface LeafSamplePreset {
  id: string;
  crop_id: number;
  crop_name: string;
  disease_name: string;
  scientific_pathogen: string;
  thumbnail: string;
  tag: string;
  is_healthy: boolean;
  severity: 'MILD' | 'MODERATE' | 'SEVERE';
  damage_percentage: number;
  confidence: number;
  disease_details: Disease;
  lesions: Array<{ x: number; y: number; width: number; height: number; label: string }>;
  hotspots: Array<{ x: number; y: number; radius: number; intensity: number }>;
}

export const LEAF_SAMPLE_PRESETS: LeafSamplePreset[] = [
  {
    id: 'sample-tom-early-blight',
    crop_id: 1,
    crop_name: 'Tomato',
    disease_name: 'Tomato Early Blight',
    scientific_pathogen: 'Alternaria solani',
    thumbnail: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=600&q=80',
    tag: 'Fungal Infection',
    is_healthy: false,
    severity: 'MODERATE',
    damage_percentage: 34,
    confidence: 96.8,
    disease_details: {
      disease_id: 101,
      crop_id: 1,
      common_name: 'Tomato Early Blight',
      scientific_name: 'Alternaria solani',
      pathogen_type: 'Fungal',
      symptoms: [
        'Dark brown to black necrotic spots with concentric bullseye rings on older lower leaves',
        'Yellow chlorotic halos surrounding expanding necrotic lesions',
        'Premature leaf senescence and defoliation from ground upwards',
        'Collar rot lesions forming at soil line on stem stems'
      ],
      causes: 'Warm temperatures (24-29°C) combined with prolonged leaf wetness or high humidity (>80%). Overwinters in infected crop debris.',
      recommended_treatment: [
        'Prune lower infected leaves up to 12 inches from ground to improve canopy air circulation',
        'Apply drip irrigation or water root zone only; avoid sprinkler overhead irrigation',
        'Rotate with non-solanaceous crops (avoid potatoes/eggplants for 3 years)'
      ],
      organic_remedy: [
        'Foliar spray with Trichoderma harzianum @ 5g/L or Pseudomonas fluorescens',
        'Apply 5% Neem seed kernel extract (NSKE) at 10-day intervals',
        'Copper oxychloride 50% WP organic certifiable spray @ 2.5g/L'
      ],
      chemical_control: [
        'Spray Mancozeb 75% WP @ 2.5g/L water at first appearance of spots',
        'Alternate with Azoxystrobin 23% SC @ 1 ml/L or Difenoconazole 25% EC @ 0.5 ml/L'
      ],
      prevention_tips: [
        'Stake and trellis tomato plants to keep foliage dry',
        'Use certified disease-free seeds treated with Trichoderma',
        'Mulch soil bed with straw to prevent soil splash onto lower foliage'
      ],
      urgency: 'High'
    },
    lesions: [
      { x: 32, y: 28, width: 24, height: 26, label: 'Alternaria concentric ring (bullseye)' },
      { x: 62, y: 55, width: 22, height: 20, label: 'Chlorotic yellow halo' },
      { x: 44, y: 70, width: 18, height: 16, label: 'Necrotic lesion' }
    ],
    hotspots: [
      { x: 44, y: 41, radius: 45, intensity: 0.95 },
      { x: 73, y: 65, radius: 35, intensity: 0.82 },
      { x: 53, y: 78, radius: 28, intensity: 0.76 }
    ]
  },
  {
    id: 'sample-rice-bacterial-blight',
    crop_id: 2,
    crop_name: 'Rice (Paddy)',
    disease_name: 'Bacterial Leaf Blight (BLB)',
    scientific_pathogen: 'Xanthomonas oryzae pv. oryzae',
    thumbnail: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
    tag: 'Bacterial Disease',
    is_healthy: false,
    severity: 'SEVERE',
    damage_percentage: 48,
    confidence: 97.4,
    disease_details: {
      disease_id: 201,
      crop_id: 2,
      common_name: 'Bacterial Leaf Blight (BLB)',
      scientific_name: 'Xanthomonas oryzae pv. oryzae',
      pathogen_type: 'Bacterial',
      symptoms: [
        'Water-soaked to yellowish translucent stripes initiating along leaf margins',
        'Lesions enlarge with undulating or wavy margins turning straw-yellow then bleached white',
        'Bacterial ooze droplets (milky white beads) visible on young lesions in morning dew',
        'Cresec (wilting of young seedlings) leading to 30-50% yield reduction'
      ],
      causes: 'High nitrogen fertilization, warm temperatures (25-34°C), strong winds with rain splashing bacterial exudates.',
      recommended_treatment: [
        'Drain standing water from paddy field for 3-4 days to arrest bacterial proliferation',
        'Strictly halt top-dressing of Urea/Nitrogen during active disease expansion',
        'Apply balanced Potassium (MOP) to enhance host plant cell wall resistance'
      ],
      organic_remedy: [
        'Spray fresh cow dung filtrate (20% slurry) mixed with 1% lime suspension',
        'Foliar spray of Pseudomonas fluorescens @ 10g/L during early vegetative phase'
      ],
      chemical_control: [
        'Spray Copper Oxychloride 50 WP @ 2.5 g/L mixed with Streptocycline @ 0.1 g/L (1g per 10L)',
        'Repeat second spray after 10-12 days if wet weather persists'
      ],
      prevention_tips: [
        'Grow BLB resistant varieties (e.g. Samba Mahsuri BPT 5204 with Xa21 gene, Improved Pusa Basmati 1)',
        'Treat seed with Streptocycline (100 ppm) for 30 minutes before sowing',
        'Avoid clipping seedlings tops at transplanting'
      ],
      urgency: 'Critical'
    },
    lesions: [
      { x: 18, y: 15, width: 35, height: 70, label: 'Wavy translucent bacterial margin' },
      { x: 50, y: 35, width: 28, height: 45, label: 'Straw-yellow blighted tissue' }
    ],
    hotspots: [
      { x: 35, y: 50, radius: 55, intensity: 0.98 },
      { x: 64, y: 58, radius: 38, intensity: 0.85 }
    ]
  },
  {
    id: 'sample-wheat-yellow-rust',
    crop_id: 3,
    crop_name: 'Wheat',
    disease_name: 'Stripe / Yellow Rust',
    scientific_pathogen: 'Puccinia striiformis f. sp. tritici',
    thumbnail: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    tag: 'Fungal Infection',
    is_healthy: false,
    severity: 'MODERATE',
    damage_percentage: 29,
    confidence: 95.3,
    disease_details: {
      disease_id: 301,
      crop_id: 3,
      common_name: 'Stripe / Yellow Rust',
      scientific_name: 'Puccinia striiformis',
      pathogen_type: 'Fungal',
      symptoms: [
        'Bright yellow-orange linear pustules arranged in parallel stripes along leaf veins',
        'Powdery yellow urediniospores rubbing off onto fingers upon touch',
        'Severe chlorosis followed by tissue necrosis and shriveled grain formation'
      ],
      causes: 'Cool humid conditions (10-15°C with night dew), prevalent during December-February in Northern plains.',
      recommended_treatment: [
        'Immediate scouting of northern slopes and shaded field sections',
        'Apply systemic triazole fungicide at first notice of yellow pustule focus centers'
      ],
      organic_remedy: [
        'Application of bio-agent Trichoderma viride seed treatment',
        'Foliar spray with sour buttermilk (Khatta chhachh) @ 5% with neem oil'
      ],
      chemical_control: [
        'Spray Propiconazole 25% EC (Tilt) @ 1 ml/L (200 ml in 200 L water per acre)',
        'Alternative: Tebuconazole 25.9% EC @ 1 ml/L'
      ],
      prevention_tips: [
        'Sow rust-resistant wheat varieties such as HD-2967, HD-3086, DBW-187',
        'Avoid late sowing; complete seeding by mid-November'
      ],
      urgency: 'High'
    },
    lesions: [
      { x: 28, y: 20, width: 44, height: 60, label: 'Parallel yellow rust pustule stripes' }
    ],
    hotspots: [
      { x: 50, y: 48, radius: 50, intensity: 0.94 }
    ]
  },
  {
    id: 'sample-potato-late-blight',
    crop_id: 4,
    crop_name: 'Potato',
    disease_name: 'Late Blight',
    scientific_pathogen: 'Phytophthora infestans',
    thumbnail: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    tag: 'Oomycete Blight',
    is_healthy: false,
    severity: 'SEVERE',
    damage_percentage: 52,
    confidence: 98.2,
    disease_details: {
      disease_id: 401,
      crop_id: 4,
      common_name: 'Potato Late Blight',
      scientific_name: 'Phytophthora infestans',
      pathogen_type: 'Fungal',
      symptoms: [
        'Water-soaked dark green to black irregularly shaped lesions starting at leaf margins and tips',
        'Delicate white fungal-like mildew on underside of leaves in humid mornings',
        'Rapid rotting of entire foliage within 4-7 days causing foul odor',
        'Tuber infection producing brown, dry-granular rot beneath skin'
      ],
      causes: 'Cloudy, overcast skies with high humidity (>90%) and cool nights (10-15°C) and mild days (18-22°C).',
      recommended_treatment: [
        'De-haulm (cut and destroy haulms/vines) 10-14 days before harvest if late blight strikes',
        'Earth-up ridges well to prevent zoospore runoff into developing underground tubers'
      ],
      organic_remedy: [
        'Prophylactic copper hydroxide spray @ 2g/L',
        'Fermented Panchagavya foliar application @ 3%'
      ],
      chemical_control: [
        'Curative spray: Metalaxyl 8% + Mancozeb 64% WP (Ridomil Gold) @ 2.5g/L',
        'Follow-up with Cymoxanil 8% + Mancozeb 64% WP @ 3g/L'
      ],
      prevention_tips: [
        'Plant certified disease-free seed tubers (e.g. Kufri Jyoti, Kufri Girdhari)',
        'Apply prophylactic spray of Mancozeb @ 2.5g/L before canopy closes'
      ],
      urgency: 'Critical'
    },
    lesions: [
      { x: 25, y: 15, width: 45, height: 40, label: 'Water-soaked expanding late blight necrosis' },
      { x: 55, y: 50, width: 30, height: 35, label: 'White downy sporulation zone' }
    ],
    hotspots: [
      { x: 48, y: 35, radius: 50, intensity: 0.98 },
      { x: 70, y: 68, radius: 36, intensity: 0.89 }
    ]
  },
  {
    id: 'sample-corn-armyworm',
    crop_id: 5,
    crop_name: 'Maize (Corn)',
    disease_name: 'Fall Armyworm & Northern Leaf Blight',
    scientific_pathogen: 'Spodoptera frugiperda & Exserohilum turcicum',
    thumbnail: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    tag: 'Pest & Fungal Complex',
    is_healthy: false,
    severity: 'MODERATE',
    damage_percentage: 26,
    confidence: 94.7,
    disease_details: {
      disease_id: 501,
      crop_id: 5,
      common_name: 'Fall Armyworm (FAW) & Leaf Blight',
      scientific_name: 'Spodoptera frugiperda',
      pathogen_type: 'Pest Infestation',
      symptoms: [
        'Characteristic window-paning (semi-transparent paper-thin patches) on leaves',
        'Shot-hole perforations and ragged leaf margins caused by caterpillar feeding',
        'Prominent sawdust-like moist frass accumulated inside plant whorl',
        'Elongated cigar-shaped grayish tan leaf lesions'
      ],
      causes: 'Warm tropical conditions with intermittent rains, continuous corn cultivation without trap crops.',
      recommended_treatment: [
        'Whorl application of clean sand or dry soil mixed with neem cake (9:1 ratio)',
        'Pheromone trap installation @ 5 traps per acre for male moth monitoring'
      ],
      organic_remedy: [
        'Apply Bacillus thuringiensis (Bt) kurstaki @ 2 g/L into central whorl',
        'Spray Metarhizium rileyi or Beauveria bassiana @ 5 ml/L'
      ],
      chemical_control: [
        'Apply Chlorantraniliprole 18.5% SC (Coragen) @ 0.4 ml/L directly into whorl',
        'Alternative: Emamectin Benzoate 5% SG @ 0.4 g/L'
      ],
      prevention_tips: [
        'Intercrop maize with cowpea, pigeonpea, or marigold',
        'Deep summer ploughing to expose pupae to predatory birds'
      ],
      urgency: 'High'
    },
    lesions: [
      { x: 30, y: 35, width: 40, height: 35, label: 'FAW whorl damage & window panes' }
    ],
    hotspots: [
      { x: 50, y: 52, radius: 46, intensity: 0.93 }
    ]
  },
  {
    id: 'sample-cotton-bacterial-blight',
    crop_id: 6,
    crop_name: 'Cotton',
    disease_name: 'Bacterial Blight / Angular Leaf Spot',
    scientific_pathogen: 'Xanthomonas citri pv. malvacearum',
    thumbnail: 'https://images.unsplash.com/photo-1595188892120-cfc6a236082c?auto=format&fit=crop&w=600&q=80',
    tag: 'Bacterial Blight',
    is_healthy: false,
    severity: 'MILD',
    damage_percentage: 16,
    confidence: 93.9,
    disease_details: {
      disease_id: 601,
      crop_id: 6,
      common_name: 'Bacterial Blight / Black Arm',
      scientific_name: 'Xanthomonas citri pv. malvacearum',
      pathogen_type: 'Bacterial',
      symptoms: [
        'Small, dark green water-soaked spots bounded by leaf veinlets (angular leaf spots)',
        'Lesions coalesce and turn dark brown to blackish on upper leaf surface',
        'Black arm symptoms on stems causing lodging under heavy boll weight'
      ],
      causes: 'Seed-borne bacteria, disseminated through wind-blown rain and overhead water splashing.',
      recommended_treatment: [
        'Roguing and burning of infected initial seedlings',
        'Ensure balanced nutrition with foliar potash spray'
      ],
      organic_remedy: [
        'Seed acid-delinting followed by Pseudomonas fluorescens slurry',
        'Spray 5% neem seed kernel extract (NSKE)'
      ],
      chemical_control: [
        'Spray Copper Oxychloride 50 WP @ 2.5 g/L + Streptocycline @ 100 mg/L (1g in 10L)',
        'Repeat after 15 days if cloudy humid weather continues'
      ],
      prevention_tips: [
        'Use acid-delinted certified seeds treated with Carboxin + Thiram',
        'Maintain proper row spacing (90 x 60 cm) to avoid leaf microclimate moisture'
      ],
      urgency: 'Medium'
    },
    lesions: [
      { x: 35, y: 25, width: 30, height: 30, label: 'Angular vein-delimited water-soaked lesion' }
    ],
    hotspots: [
      { x: 50, y: 40, radius: 40, intensity: 0.88 }
    ]
  },
  {
    id: 'sample-healthy-crop',
    crop_id: 1,
    crop_name: 'Tomato',
    disease_name: 'Optimal Healthy Foliage',
    scientific_pathogen: 'No Pathogen Detected (Normal Physiology)',
    thumbnail: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80',
    tag: 'Clean Baseline',
    is_healthy: true,
    severity: 'MILD',
    damage_percentage: 0,
    confidence: 99.4,
    disease_details: {
      disease_id: 999,
      crop_id: 1,
      common_name: 'Optimal Healthy Plant Leaf',
      scientific_name: 'Physiologically Normal & Vigorous',
      pathogen_type: 'Healthy Crop',
      symptoms: [
        'Lush vibrant deep green pigmentation with uniform chlorophyll distribution',
        'Intact leaf margin architecture without necrotic rings or chlorosis',
        'Healthy turgor pressure and crisp cuticle barrier'
      ],
      causes: 'Balanced soil nutrient availability, adequate moisture, and excellent plant immunity.',
      recommended_treatment: [
        'Continue standard maintenance irrigation and nutrient supply',
        'Conduct periodic scouting once every 7 days'
      ],
      organic_remedy: [
        'Apply Vermiwash @ 5% as prophylactic tonic',
        'Jeevamrutha spray once every 15 days to foster phyllosphere microflora'
      ],
      chemical_control: [
        'No chemical fungicides or bactericides required at this stage'
      ],
      prevention_tips: [
        'Keep weed-free perimeter around crops',
        'Maintain balanced NPK ratio to prevent lush succulent tissue vulnerability'
      ],
      urgency: 'Low'
    },
    lesions: [],
    hotspots: []
  }
];
