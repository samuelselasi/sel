import { Supplier, MarketPricePoint, RfqItem, Shipment } from '../types';

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'sup-gh-01',
    name: 'Ashanti Gold Cocoa Farmers Cooperative',
    tagline: 'Premium Grade 1 Fermented Sun-Dried Cocoa Beans',
    country: 'Ghana',
    region: 'Ashanti & Western North Region',
    flagEmoji: '',
    locationCoordinates: { lat: 6.6885, lng: -1.6244 },
    gpsBoundaries: [
      { latitude: 6.691, longitude: -1.628 },
      { latitude: 6.695, longitude: -1.620 },
      { latitude: 6.684, longitude: -1.618 },
      { latitude: 6.680, longitude: -1.625 }
    ],
    farmSizeHectares: 4850,
    cooperativeMembers: 1420,
    primaryCrop: 'Cocoa',
    secondaryCrops: [],
    annualCapacityMT: 12500,
    availableStockMT: 3400,
    harvestWindow: 'Oct - Mar (Main Crop) & Jun - Aug (Light Crop)',
    minimumOrderQuantityMT: 25,
    pricePerTonUSD: { min: 3850, max: 4200 },
    verificationStatus: 'VERIFIED_GOLD',
    verificationScore: 98,
    certifications: ['GlobalGAP', 'Organic USDA/EU', 'Fairtrade', 'Rainforest Alliance', 'Euro1 Certificate', 'Phytosanitary Clean'],
    yearsInExport: 14,
    pastDestinations: ['Netherlands (Rotterdam)', 'Germany (Hamburg)', 'Switzerland', 'USA (Baltimore)'],
    coverImageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=1200&auto=format&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=200&auto=format&fit=crop',
    documents: [
      {
        id: 'doc-gh-01',
        name: 'COCOBOD Grade 1 Quality Certificate',
        type: 'Government Quality Assurance',
        issuedBy: 'Ghana Cocoa Board (COCOBOD)',
        expiryDate: '2027-11-30',
        verifiedHash: '0x8f9c7a2e1d04b3f8e5c1a4b9d2e7f3a1',
        downloadUrl: '#'
      },
      {
        id: 'doc-gh-02',
        name: 'EU Organic Compliance Certificate',
        type: 'Organic Certification',
        issuedBy: 'Control Union Certifications B.V.',
        expiryDate: '2027-08-15',
        verifiedHash: '0x3b2a1c4d5e6f7a8b9c0d1e2f3a4b5c6d',
        downloadUrl: '#'
      },
      {
        id: 'doc-gh-03',
        name: 'Phytosanitary Inspection Report',
        type: 'Plant Health Clearance',
        issuedBy: 'PPRSD Ministry of Food & Agriculture Ghana',
        expiryDate: '2027-06-20',
        verifiedHash: '0x7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
        downloadUrl: '#'
      }
    ],
    auditHistory: [
      {
        id: 'aud-01',
        agentName: 'Dr. Kwame Mensah (Lead Auditor)',
        agentId: 'AGENT-GH-04',
        date: '2026-06-12',
        score: 98,
        soilPurityScore: 97,
        childLaborAudit: 'PASSED',
        waterManagementScore: 96,
        comments: 'Outstanding fermentation technique and zero pesticide residue. 100% boundary mapping completed via GPS drone audit.',
        gpsBoundariesConfirmed: true
      }
    ],
    contactPerson: {
      name: 'Emmanuel Osei-Tutul',
      role: 'Export Director',
      email: 'e.osei@ashanticocoa.org',
      phone: '+233 24 456 7890'
    }
  },
  {
    id: 'sup-ke-02',
    name: 'Mount Kenya Highland Coffee Specialty Union',
    tagline: 'Single-Origin AA & AB Washed Arabica Coffee (SL28 & SL34)',
    country: 'Kenya',
    region: 'Nyeri & Kirinyaga Counties',
    flagEmoji: '',
    locationCoordinates: { lat: -0.4201, lng: 36.9476 },
    gpsBoundaries: [
      { latitude: -0.415, longitude: 36.940 },
      { latitude: -0.410, longitude: 36.955 },
      { latitude: -0.428, longitude: 36.950 },
      { latitude: -0.430, longitude: 36.938 }
    ],
    farmSizeHectares: 3200,
    cooperativeMembers: 2100,
    primaryCrop: 'Coffee',
    secondaryCrops: [],
    annualCapacityMT: 4500,
    availableStockMT: 1200,
    harvestWindow: 'Oct - Jan (Fly crop: May - Jul)',
    minimumOrderQuantityMT: 10,
    pricePerTonUSD: { min: 6200, max: 7800 },
    verificationStatus: 'VERIFIED_GOLD',
    verificationScore: 99,
    certifications: ['GlobalGAP', 'Organic USDA/EU', 'Fairtrade', 'Rainforest Alliance', 'ISO 22000'],
    yearsInExport: 18,
    pastDestinations: ['USA (Seattle, NY)', 'Japan (Yokohama)', 'Germany (Bremen)', 'UK (London)'],
    coverImageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=200&auto=format&fit=crop',
    documents: [
      {
        id: 'doc-ke-01',
        name: 'Coffee Directorate Export Grade Certificate AA',
        type: 'Export Grade',
        issuedBy: 'Kenya Agriculture and Food Authority (AFA)',
        expiryDate: '2027-12-31',
        verifiedHash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d',
        downloadUrl: '#'
      },
      {
        id: 'doc-ke-02',
        name: 'Rainforest Alliance Traceability Audit',
        type: 'Sustainability',
        issuedBy: 'RA Certification Services',
        expiryDate: '2027-09-20',
        verifiedHash: '0x1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c',
        downloadUrl: '#'
      }
    ],
    auditHistory: [
      {
        id: 'aud-ke-01',
        agentName: 'Amina Kiprop',
        agentId: 'AGENT-KE-02',
        date: '2026-05-18',
        score: 99,
        soilPurityScore: 99,
        childLaborAudit: 'PASSED',
        waterManagementScore: 98,
        comments: 'State-of-the-art wet mill water recycling system. Cupping score consistently 87.5+ SCA.',
        gpsBoundariesConfirmed: true
      }
    ],
    contactPerson: {
      name: 'Wanjiku Mwangi',
      role: 'Head of Global Sales',
      email: 'w.mwangi@mtkenyacoffee.co.ke',
      phone: '+254 712 345 678'
    }
  },
  {
    id: 'sup-tz-03',
    name: 'Morogoro Cashew Producers Alliance',
    tagline: 'Raw Cashew Nuts (RCN) Nut Count 180-190 / Outturn 48-52 lbs',
    country: 'Tanzania',
    region: 'Mtwara & Lindi Regions',
    flagEmoji: '',
    locationCoordinates: { lat: -10.2736, lng: 40.1828 },
    gpsBoundaries: [
      { latitude: -10.260, longitude: 40.170 },
      { latitude: -10.250, longitude: 40.190 },
      { latitude: -10.280, longitude: 40.195 },
      { latitude: -10.285, longitude: 40.175 }
    ],
    farmSizeHectares: 6400,
    cooperativeMembers: 1850,
    primaryCrop: 'Cashew',
    secondaryCrops: [],
    annualCapacityMT: 18000,
    availableStockMT: 5200,
    harvestWindow: 'Oct - Jan',
    minimumOrderQuantityMT: 50,
    pricePerTonUSD: { min: 1450, max: 1750 },
    verificationStatus: 'VERIFIED_GOLD',
    verificationScore: 96,
    certifications: ['GlobalGAP', 'Organic USDA/EU', 'Fairtrade', 'Phytosanitary Clean'],
    yearsInExport: 9,
    pastDestinations: ['India (Kollam, Mangalore)', 'Vietnam (Ho Chi Minh)', 'UAE (Dubai)', 'Netherlands'],
    coverImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=200&auto=format&fit=crop',
    documents: [
      {
        id: 'doc-tz-01',
        name: 'CBT Raw Cashew Nut Quality Spec Sheet',
        type: 'Quality Grade',
        issuedBy: 'Cashewnut Board of Tanzania (CBT)',
        expiryDate: '2027-11-15',
        verifiedHash: '0x4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f',
        downloadUrl: '#'
      }
    ],
    auditHistory: [
      {
        id: 'aud-tz-01',
        agentName: 'Josephat Masawe',
        agentId: 'AGENT-TZ-01',
        date: '2026-04-10',
        score: 96,
        soilPurityScore: 95,
        childLaborAudit: 'PASSED',
        waterManagementScore: 94,
        comments: 'Superb moisture content control (<8%). Full traceability down to village level.',
        gpsBoundariesConfirmed: true
      }
    ],
    contactPerson: {
      name: 'Hussein Hassan',
      role: 'Commercial Manager',
      email: 'h.hassan@morogorocashew.co.tz',
      phone: '+255 754 998 877'
    }
  },
  {
    id: 'sup-ng-04',
    name: 'Kano Golden Sesame Aggregators',
    tagline: 'High Oil Content Humera-Style White Sesame Seeds (Purity 99.9%)',
    country: 'Nigeria',
    region: 'Kano & Jigawa Belt',
    flagEmoji: '',
    locationCoordinates: { lat: 12.0022, lng: 8.592 },
    gpsBoundaries: [
      { latitude: 12.010, longitude: 8.580 },
      { latitude: 12.020, longitude: 8.605 },
      { latitude: 11.990, longitude: 8.610 },
      { latitude: 11.985, longitude: 8.585 }
    ],
    farmSizeHectares: 8900,
    cooperativeMembers: 3400,
    primaryCrop: 'Sesame',
    secondaryCrops: [],
    annualCapacityMT: 22000,
    availableStockMT: 6800,
    harvestWindow: 'Oct - Dec',
    minimumOrderQuantityMT: 40,
    pricePerTonUSD: { min: 1380, max: 1580 },
    verificationStatus: 'VERIFIED_GOLD',
    verificationScore: 97,
    certifications: ['GlobalGAP', 'Organic USDA/EU', 'Euro1 Certificate', 'Phytosanitary Clean', 'ISO 22000'],
    yearsInExport: 12,
    pastDestinations: ['China (Qingdao)', 'Japan (Kobe)', 'Turkey (Istanbul)', 'Israel (Haifa)'],
    coverImageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=1200&auto=format&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=200&auto=format&fit=crop',
    documents: [
      {
        id: 'doc-ng-01',
        name: 'NAQS Phytosanitary & Purity Certificate',
        type: 'Export License',
        issuedBy: 'Nigeria Agricultural Quarantine Service (NAQS)',
        expiryDate: '2027-10-30',
        verifiedHash: '0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b',
        downloadUrl: '#'
      }
    ],
    auditHistory: [
      {
        id: 'aud-ng-01',
        agentName: 'Zainab Abubakar',
        agentId: 'AGENT-NG-03',
        date: '2026-06-02',
        score: 97,
        soilPurityScore: 96,
        childLaborAudit: 'PASSED',
        waterManagementScore: 95,
        comments: 'Laser sorting equipment installed. Oil content verified at 52.4%.',
        gpsBoundariesConfirmed: true
      }
    ],
    contactPerson: {
      name: 'Ibrahim Danlami',
      role: 'Chief Operations Officer',
      email: 'i.danlami@kanosesame.com.ng',
      phone: '+234 803 123 4567'
    }
  },
  {
    id: 'sup-ke-05',
    name: 'Eldoret Rift Valley Hass Avocado Exporters',
    tagline: 'Export Grade Hass & Fuerte Avocados (Dry Matter > 23%)',
    country: 'Kenya',
    region: 'Uasin Gishu & Murang’a Counties',
    flagEmoji: '',
    locationCoordinates: { lat: 0.5143, lng: 35.2698 },
    gpsBoundaries: [
      { latitude: 0.510, longitude: 35.260 },
      { latitude: 0.525, longitude: 35.280 },
      { latitude: 0.505, longitude: 35.285 },
      { latitude: 0.498, longitude: 35.265 }
    ],
    farmSizeHectares: 2900,
    cooperativeMembers: 1120,
    primaryCrop: 'Avocado',
    secondaryCrops: [],
    annualCapacityMT: 8500,
    availableStockMT: 2100,
    harvestWindow: 'Mar - Aug (Hass Peak)',
    minimumOrderQuantityMT: 20,
    pricePerTonUSD: { min: 1800, max: 2200 },
    verificationStatus: 'VERIFIED_GOLD',
    verificationScore: 98,
    certifications: ['GlobalGAP', 'Organic USDA/EU', 'Euro1 Certificate', 'Phytosanitary Clean'],
    yearsInExport: 7,
    pastDestinations: ['Netherlands (Rotterdam)', 'Spain (Algeciras)', 'UAE (Dubai)', 'China (Shanghai)'],
    coverImageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=1200&auto=format&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?q=80&w=200&auto=format&fit=crop',
    documents: [
      {
        id: 'doc-ke-av-01',
        name: 'KEPHIS Fresh Produce Phytosanitary Clearance',
        type: 'Phytosanitary',
        issuedBy: 'Kenya Plant Health Inspectorate Service (KEPHIS)',
        expiryDate: '2027-09-15',
        verifiedHash: '0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
        downloadUrl: '#'
      }
    ],
    auditHistory: [
      {
        id: 'aud-ke-02',
        agentName: 'David Njoroge',
        agentId: 'AGENT-KE-05',
        date: '2026-05-29',
        score: 98,
        soilPurityScore: 98,
        childLaborAudit: 'PASSED',
        waterManagementScore: 97,
        comments: 'Cold chain integrity verified from packhouse to Mombasa port reefer containers.',
        gpsBoundariesConfirmed: true
      }
    ],
    contactPerson: {
      name: 'Grace Chebet',
      role: 'Quality & Compliance Lead',
      email: 'g.chebet@eldoretavocados.co.ke',
      phone: '+254 722 987 654'
    }
  },
  {
    id: 'sup-et-06',
    name: 'Oromia Forest Specialty Coffee Union',
    tagline: 'Shade-Grown Yirgacheffe & Sidama Heirloom Organic Coffee',
    country: 'Ethiopia',
    region: 'Oromia & SNNPR Highlands',
    flagEmoji: '',
    locationCoordinates: { lat: 6.1627, lng: 38.2058 },
    gpsBoundaries: [
      { latitude: 6.160, longitude: 38.200 },
      { latitude: 6.175, longitude: 38.220 },
      { latitude: 6.150, longitude: 38.215 },
      { latitude: 6.145, longitude: 38.195 }
    ],
    farmSizeHectares: 14500,
    cooperativeMembers: 5200,
    primaryCrop: 'Coffee',
    secondaryCrops: [],
    annualCapacityMT: 11000,
    availableStockMT: 2800,
    harvestWindow: 'Nov - Feb',
    minimumOrderQuantityMT: 18,
    pricePerTonUSD: { min: 7500, max: 9200 },
    verificationStatus: 'VERIFIED_GOLD',
    verificationScore: 99,
    certifications: ['GlobalGAP', 'Organic USDA/EU', 'Fairtrade', 'Rainforest Alliance'],
    yearsInExport: 22,
    pastDestinations: ['USA (Oakland, NY)', 'Japan (Tokyo)', 'South Korea (Busan)', 'Germany (Bremen)'],
    coverImageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=200&auto=format&fit=crop',
    documents: [
      {
        id: 'doc-et-01',
        name: 'Ethiopian Coffee Authority Export License & Specialty Certificate',
        type: 'Specialty Certification',
        issuedBy: 'Ethiopian Coffee and Tea Authority',
        expiryDate: '2027-12-15',
        verifiedHash: '0x7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c',
        downloadUrl: '#'
      }
    ],
    auditHistory: [
      {
        id: 'aud-et-01',
        agentName: 'Tewodros Bekele',
        agentId: 'AGENT-ET-01',
        date: '2026-03-22',
        score: 99,
        soilPurityScore: 100,
        childLaborAudit: 'PASSED',
        waterManagementScore: 98,
        comments: 'Zero synthetic inputs ever used. Ancient wild forest garden canopy verified.',
        gpsBoundariesConfirmed: true
      }
    ],
    contactPerson: {
      name: 'Tadesse Meskel',
      role: 'General Director',
      email: 't.meskel@oromiacoffee.org',
      phone: '+251 11 551 2345'
    }
  },
  {
    id: 'sup-ci-07',
    name: 'San Pédro Sustainable Cocoa Exporters (SASSAP)',
    tagline: 'Direct Trade EUDR Compliant Cocoa Beans with 100% Polygon Traceability',
    country: "Côte d'Ivoire",
    region: 'Bas-Sassandra Region',
    flagEmoji: '',
    locationCoordinates: { lat: 4.7485, lng: -6.6363 },
    gpsBoundaries: [
      { latitude: 4.755, longitude: -6.640 },
      { latitude: 4.760, longitude: -6.620 },
      { latitude: 4.740, longitude: -6.625 },
      { latitude: 4.735, longitude: -6.645 }
    ],
    farmSizeHectares: 9800,
    cooperativeMembers: 3100,
    primaryCrop: 'Cocoa',
    secondaryCrops: [],
    annualCapacityMT: 28000,
    availableStockMT: 7400,
    harvestWindow: 'Oct - Mar (Grande Récolte)',
    minimumOrderQuantityMT: 50,
    pricePerTonUSD: { min: 3900, max: 4350 },
    verificationStatus: 'VERIFIED_GOLD',
    verificationScore: 97,
    certifications: ['GlobalGAP', 'Organic USDA/EU', 'Fairtrade', 'Rainforest Alliance', 'Euro1 Certificate', 'Phytosanitary Clean'],
    yearsInExport: 16,
    pastDestinations: ['France (Le Havre)', 'Belgium (Antwerp)', 'Netherlands (Amsterdam)', 'Italy (Genoa)'],
    coverImageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=1200&auto=format&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=200&auto=format&fit=crop',
    documents: [
      {
        id: 'doc-ci-01',
        name: 'CCC EU Deforestation Regulation (EUDR) Conformance Certificate',
        type: 'EUDR Traceability',
        issuedBy: 'Conseil du Café-Cacao (CCC)',
        expiryDate: '2027-12-31',
        verifiedHash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e',
        downloadUrl: '#'
      }
    ],
    auditHistory: [
      {
        id: 'aud-ci-01',
        agentName: 'Jean-Pierre Kouassi',
        agentId: 'AGENT-CI-01',
        date: '2026-06-19',
        score: 97,
        soilPurityScore: 96,
        childLaborAudit: 'PASSED',
        waterManagementScore: 96,
        comments: '100% farm polygon plots cross-referenced against satellite forest cover maps.',
        gpsBoundariesConfirmed: true
      }
    ],
    contactPerson: {
      name: 'Koffi Yao',
      role: 'Export Manager',
      email: 'k.yao@sassapcocoa.ci',
      phone: '+225 07 08 12 34 56'
    }
  },
  {
    id: 'sup-ug-08',
    name: 'Northern Nile Organic Shea Butter Co-op',
    tagline: 'Cold-Pressed Raw Nilotica Shea Butter (Unrefined Grade A)',
    country: 'Uganda',
    region: 'Gulu & Kitgum Districts',
    flagEmoji: '',
    locationCoordinates: { lat: 2.7747, lng: 32.299 },
    gpsBoundaries: [
      { latitude: 2.780, longitude: 32.290 },
      { latitude: 2.790, longitude: 32.310 },
      { latitude: 2.765, longitude: 32.315 },
      { latitude: 2.760, longitude: 32.295 }
    ],
    farmSizeHectares: 5100,
    cooperativeMembers: 1650,
    primaryCrop: 'Shea Butter',
    secondaryCrops: [],
    annualCapacityMT: 1800,
    availableStockMT: 450,
    harvestWindow: 'May - Aug',
    minimumOrderQuantityMT: 2,
    pricePerTonUSD: { min: 4200, max: 5400 },
    verificationStatus: 'VERIFIED_GOLD',
    verificationScore: 98,
    certifications: ['GlobalGAP', 'Organic USDA/EU', 'Fairtrade', 'Phytosanitary Clean'],
    yearsInExport: 8,
    pastDestinations: ['USA (Los Angeles)', 'France (Marseille)', 'UK (Manchester)', 'Japan (Osaka)'],
    coverImageUrl: 'https://images.unsplash.com/photo-1608248597260-15102573a48e?q=80&w=1200&auto=format&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=200&auto=format&fit=crop',
    documents: [
      {
        id: 'doc-ug-01',
        name: 'UNBS Grade A Cosmetic Pure Shea Analysis',
        type: 'Chemical Purity Analysis',
        issuedBy: 'Uganda National Bureau of Standards (UNBS)',
        expiryDate: '2027-10-15',
        verifiedHash: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
        downloadUrl: '#'
      }
    ],
    auditHistory: [
      {
        id: 'aud-ug-01',
        agentName: 'Florence Akello',
        agentId: 'AGENT-UG-01',
        date: '2026-05-14',
        score: 98,
        soilPurityScore: 99,
        childLaborAudit: 'PASSED',
        waterManagementScore: 97,
        comments: 'Women empowerment cooperative with zero solvent extraction. Pure mechanical cold press.',
        gpsBoundariesConfirmed: true
      }
    ],
    contactPerson: {
      name: 'Harriet Adong',
      role: 'Chairperson & Sales Lead',
      email: 'h.adong@nileshea.org',
      phone: '+256 772 456 789'
    }
  }
];

export const HISTORICAL_MARKET_PRICES: MarketPricePoint[] = [
  { date: '2026-01', cocoaPrice: 3450, coffeePrice: 6100, cashewPrice: 1420, sesamePrice: 1350, avocadoPrice: 1750 },
  { date: '2026-02', cocoaPrice: 3600, coffeePrice: 6300, cashewPrice: 1450, sesamePrice: 1380, avocadoPrice: 1800 },
  { date: '2026-03', cocoaPrice: 3750, coffeePrice: 6500, cashewPrice: 1490, sesamePrice: 1400, avocadoPrice: 1850 },
  { date: '2026-04', cocoaPrice: 3900, coffeePrice: 6800, cashewPrice: 1520, sesamePrice: 1420, avocadoPrice: 1920 },
  { date: '2026-05', cocoaPrice: 4100, coffeePrice: 7100, cashewPrice: 1560, sesamePrice: 1450, avocadoPrice: 2000 },
  { date: '2026-06', cocoaPrice: 4050, coffeePrice: 7400, cashewPrice: 1590, sesamePrice: 1470, avocadoPrice: 2050 },
  { date: '2026-07', cocoaPrice: 4200, coffeePrice: 7600, cashewPrice: 1610, sesamePrice: 1490, avocadoPrice: 2100 }
];

export const INITIAL_RFQS: RfqItem[] = [
  {
    id: 'rfq-2026-001',
    buyerName: 'Dr. Klaus Weber',
    buyerCompany: 'Nordic Agro Imports GmbH',
    buyerCountry: 'Germany',
    crop: 'Cocoa',
    quantityMT: 250,
    targetPricePerTonUSD: 4100,
    destinationPort: 'Port of Hamburg, Germany',
    incoterm: 'CIF',
    requiredCertifications: ['Organic USDA/EU', 'Fairtrade', 'Euro1 Certificate'],
    targetDeliveryDate: '2026-10-15',
    status: 'BIDDING',
    createdDate: '2026-07-20',
    bidsCount: 3
  },
  {
    id: 'rfq-2026-002',
    buyerName: 'Sarah Jenkins',
    buyerCompany: 'Artisan Roast Holdings',
    buyerCountry: 'USA',
    crop: 'Coffee',
    quantityMT: 36,
    targetPricePerTonUSD: 7200,
    destinationPort: 'Port of New York / New Jersey',
    incoterm: 'FOB',
    requiredCertifications: ['Rainforest Alliance', 'Organic USDA/EU'],
    targetDeliveryDate: '2026-11-01',
    status: 'OPEN',
    createdDate: '2026-07-28',
    bidsCount: 1
  },
  {
    id: 'rfq-2026-003',
    buyerName: 'Kenji Sato',
    buyerCompany: 'Nippon Oilseed & Grains Trading',
    buyerCountry: 'Japan',
    crop: 'Sesame',
    quantityMT: 500,
    targetPricePerTonUSD: 1480,
    destinationPort: 'Port of Kobe, Japan',
    incoterm: 'CIF',
    requiredCertifications: ['GlobalGAP', 'Phytosanitary Clean'],
    targetDeliveryDate: '2026-09-30',
    status: 'BIDDING',
    createdDate: '2026-07-15',
    bidsCount: 4
  }
];

export const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: 'ship-001',
    trackingNumber: 'SEL-TRK-982314-GH',
    buyerCompany: 'Chocolatier De Paris',
    supplierName: 'Ashanti Gold Cocoa Farmers Cooperative',
    crop: 'Cocoa',
    quantityMT: 100,
    originPort: 'Port of Takoradi, Ghana',
    destinationPort: 'Port of Le Havre, France',
    currentStatus: 'IN_TRANSIT',
    etd: '2026-07-20',
    eta: '2026-08-08',
    vesselName: 'CMA CGM Africa Express',
    containerId: 'CMAU-8849201',
    temperatureCelsius: 18.5,
    humidityPercent: 58.2,
    documentsVerified: true
  },
  {
    id: 'ship-002',
    trackingNumber: 'SEL-TRK-442109-KE',
    buyerCompany: 'Blue Mountain Coffee Roasters UK',
    supplierName: 'Mount Kenya Highland Coffee Specialty Union',
    crop: 'Coffee',
    quantityMT: 19,
    originPort: 'Port of Mombasa, Kenya',
    destinationPort: 'Port of Felixstowe, UK',
    currentStatus: 'CUSTOMS',
    etd: '2026-07-10',
    eta: '2026-08-01',
    vesselName: 'Maersk Nairobi',
    containerId: 'MSKU-3392810',
    temperatureCelsius: 21.0,
    humidityPercent: 62.0,
    documentsVerified: true
  }
];

export const SYSTEM_ARCHITECTURE_SPEC = {
  title: 'Sustainable Export Link (SEL) - Technical Blueprint & Architecture Specs',
  version: '2.4.0-PROD',
  layers: [
    {
      name: 'Frontend & Mobile Layer',
      tech: ['Next.js 15 (React 19)', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Three.js', 'Flutter (Dart mobile)'],
      description: 'Role-customized Web & Mobile client apps. Includes offline-first mobile app for field verification agents with GPS polygon mapping & photo hashing.'
    },
    {
      name: 'Backend API Gateway & Core Microservices',
      tech: ['Python FastAPI', 'Uvicorn / Gunicorn', 'Pydantic v2', 'Celery + Redis Queue'],
      description: 'High-throughput REST & WebSocket APIs for RFQ bidding, realtime price ticker, cryptographic document verification, and satellite deforestation audits.'
    },
    {
      name: 'Geospatial & Spatial Database Engine',
      tech: ['PostgreSQL 16', 'PostGIS Extension', 'SQLAlchemy / Drizzle ORM'],
      description: 'Stores cooperative boundaries, farm plot polygons, soil spectral metadata, and EUDR deforestation compliance data with spatial index bounding queries.'
    },
    {
      name: 'Document & Asset Storage',
      tech: ['Cloudflare R2 / AWS S3', 'SHA-256 Ledger Hashing'],
      description: 'Encrypted document vault for Phytosanitary certificates, Certificates of Origin, Organic inspection PDFs, and drone aerial photos.'
    },
    {
      name: 'Search & Market Intelligence Engine',
      tech: ['Elasticsearch / OpenSearch', 'Postgres Full-Text Search'],
      description: 'Instant multi-faceted search indexing across crop grades, seasonal availability, certification standards, and location distance radius.'
    },
    {
      name: 'Security & Auth Infrastructure',
      tech: ['Firebase Auth / Supabase Auth', 'JWT Bearer Tokens', 'RBAC (Buyer, Supplier, Agent, Admin)'],
      description: 'Enterprise OAuth 2.0 / SAML single sign-on with multi-factor authentication for high-value B2B trade contract execution.'
    }
  ],
  roadmap: [
    { phase: 'Phase 1: Core Marketplace & Verification', timeline: 'Q3 2026', status: 'Completed', detail: 'Supplier onboarding, GPS polygon verification, basic RFQ engine, and document vault.' },
    { phase: 'Phase 2: Geospatial Heatmaps & Realtime Ticker', timeline: 'Q4 2026', status: 'In Progress', detail: 'Integration of Sentinel-2 satellite forest cover checks, live pricing tickers, and automated trade contract generator.' },
    { phase: 'Phase 3: Escrow Trade Settlement & Logistics', timeline: 'Q1 2027', status: 'Planned', detail: 'Integration with Letter of Credit (LC) banking APIs, IoT reefer telemetry integration, and automated phytosanitary clearance.' },
    { phase: 'Phase 4: Global Commodity Exchange API', timeline: 'Q2 2027', status: 'Planned', detail: 'Public API for commodity traders, ERP plugins (SAP, Oracle Agro), and automated carbon credit origin verification.' }
  ]
};
