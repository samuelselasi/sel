import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Sprout, 
  Globe, 
  FileSpreadsheet, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  SlidersHorizontal, 
  ChevronRight, 
  Plus, 
  Send, 
  Download, 
  Layers, 
  Check, 
  X, 
  Sparkles, 
  Star, 
  Building2, 
  Calendar, 
  DollarSign, 
  Anchor, 
  RefreshCw, 
  Database, 
  Code, 
  Eye, 
  Package, 
  FileText,
  UserCheck
} from 'lucide-react';
import { 
  Supplier, 
  CropCategory, 
  CertificationType, 
  VerificationStatus, 
  RfqItem 
} from '../types';

interface BuyerPortalProps {
  suppliers: Supplier[];
  rfqs: RfqItem[];
  onCreateRfq?: (rfq: Partial<RfqItem>) => void;
  onSelectSupplierForModal?: (supplier: Supplier) => void;
}

export const BuyerPortal: React.FC<BuyerPortalProps> = ({
  suppliers,
  rfqs,
  onCreateRfq,
  onSelectSupplierForModal,
}) => {
  // Main view tab inside Buyer Portal
  const [activeTab, setActiveTab] = useState<'search' | 'rfq-builder' | 'matching-engine' | 'db-api'>('search');

  // Multi-criteria Search & Filter States
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCrop, setSelectedCrop] = useState<string>('ALL');
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [minQuantityMT, setMinQuantityMT] = useState<number>(0);
  const [selectedCertification, setSelectedCertification] = useState<string>('ALL');
  const [minAnnualCapacity, setMinAnnualCapacity] = useState<number>(0);
  const [minVerificationScore, setMinVerificationScore] = useState<number>(80);

  // Selected Supplier Detail View Modal (in-portal)
  const [detailModalSupplier, setDetailModalSupplier] = useState<Supplier | null>(null);

  // RFQ Creation Form States
  const [rfqCrop, setRfqCrop] = useState<CropCategory>('Cocoa');
  const [rfqQuantityMT, setRfqQuantityMT] = useState<string>('2500');
  const [rfqTargetPrice, setRfqTargetPrice] = useState<string>('4200');
  const [rfqDestinationPort, setRfqDestinationPort] = useState<string>('Port of Rotterdam (Netherlands)');
  const [rfqIncoterm, setRfqIncoterm] = useState<'FOB' | 'CIF' | 'CFR' | 'DDP'>('FOB');
  const [rfqTargetDate, setRfqTargetDate] = useState<string>('2026-10-15');
  const [rfqQualityReqs, setRfqQualityReqs] = useState<string>('Grade 1 Export Standard, Moisture < 7.5%, Mold < 1.0%, EUDR 100% Polygon Verified');
  const [rfqCerts, setRfqCerts] = useState<CertificationType[]>(['Organic USDA/EU', 'Euro1 Certificate', 'Rainforest Alliance']);
  const [rfqSuccessToast, setRfqSuccessToast] = useState<boolean>(false);

  // Matching Engine active RFQ focus
  const [selectedRfqForMatching, setSelectedRfqForMatching] = useState<RfqItem>(rfqs[0] || {
    id: 'rfq-demo',
    buyerName: 'Global Importer',
    buyerCompany: 'Cacao Direct Europe B.V.',
    buyerCountry: 'Netherlands',
    crop: 'Cocoa',
    quantityMT: 2500,
    targetPricePerTonUSD: 4250,
    destinationPort: 'Port of Rotterdam',
    incoterm: 'FOB',
    requiredCertifications: ['Organic USDA/EU', 'Euro1 Certificate'],
    targetDeliveryDate: '2026-10-15',
    status: 'OPEN',
    createdDate: '2026-07-28',
    bidsCount: 3
  });

  // Unique lists for filter dropdowns
  const availableCrops = useMemo(() => {
    const crops = new Set<string>();
    suppliers.forEach(s => {
      crops.add(s.primaryCrop);
      s.secondaryCrops?.forEach(c => crops.add(c));
    });
    return Array.from(crops);
  }, [suppliers]);

  const availableCountries = useMemo(() => {
    return Array.from(new Set(suppliers.map(s => s.country)));
  }, [suppliers]);

  // Filtered Suppliers List
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(s => {
      // Text search
      const textMatch = 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.primaryCrop.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!textMatch) return false;

      // Crop filter
      if (selectedCrop !== 'ALL' && s.primaryCrop !== selectedCrop && !s.secondaryCrops?.includes(selectedCrop as CropCategory)) {
        return false;
      }

      // Country filter
      if (selectedCountry !== 'ALL' && s.country !== selectedCountry) {
        return false;
      }

      // Stock Quantity filter
      if (minQuantityMT > 0 && s.availableStockMT < minQuantityMT) {
        return false;
      }

      // Annual Capacity filter
      if (minAnnualCapacity > 0 && s.annualCapacityMT < minAnnualCapacity) {
        return false;
      }

      // Certification filter
      if (selectedCertification !== 'ALL' && !s.certifications.includes(selectedCertification as CertificationType)) {
        return false;
      }

      // Verification score filter
      if (s.verificationScore < minVerificationScore) {
        return false;
      }

      return true;
    });
  }, [suppliers, searchTerm, selectedCrop, selectedCountry, minQuantityMT, selectedCertification, minAnnualCapacity, minVerificationScore]);

  // Automated Algorithmic Supplier Matching Engine Calculations
  const matchedSuppliersWithScores = useMemo(() => {
    if (!selectedRfqForMatching) return [];

    return suppliers.map(s => {
      let score = 0;

      // 1. Crop Match (30 pts)
      if (s.primaryCrop === selectedRfqForMatching.crop) {
        score += 30;
      } else if (s.secondaryCrops?.includes(selectedRfqForMatching.crop)) {
        score += 18;
      }

      // 2. Capacity & Stock Availability (25 pts)
      if (s.availableStockMT >= selectedRfqForMatching.quantityMT) {
        score += 25;
      } else {
        const ratio = Math.min(1, s.availableStockMT / selectedRfqForMatching.quantityMT);
        score += Math.round(ratio * 20);
      }

      // 3. Verification Score & Deforestation Compliance (20 pts)
      score += Math.round((s.verificationScore / 100) * 20);

      // 4. Certification Overlap (15 pts)
      if (selectedRfqForMatching.requiredCertifications.length > 0) {
        const metCount = selectedRfqForMatching.requiredCertifications.filter(reqCert => 
          s.certifications.includes(reqCert)
        ).length;
        const certRatio = metCount / selectedRfqForMatching.requiredCertifications.length;
        score += Math.round(certRatio * 15);
      } else {
        score += 15;
      }

      // 5. Reliability & Export Experience (10 pts)
      const expPoints = Math.min(10, s.yearsInExport * 1.5);
      score += Math.round(expPoints);

      return {
        supplier: s,
        matchPercentage: Math.min(99, Math.max(45, score)),
        stockRatio: Math.round((s.availableStockMT / selectedRfqForMatching.quantityMT) * 100),
        matchingCerts: s.certifications.filter(c => selectedRfqForMatching.requiredCertifications.includes(c))
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [suppliers, selectedRfqForMatching]);

  // Handle Submit New RFQ Form
  const handleCreateRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(rfqQuantityMT) || 1000;
    const price = parseFloat(rfqTargetPrice) || 4000;

    const newRfq: Partial<RfqItem> = {
      buyerName: 'Senior Sourcing Manager',
      buyerCompany: 'Cacao Direct Europe B.V.',
      buyerCountry: 'Netherlands',
      crop: rfqCrop,
      quantityMT: qty,
      targetPricePerTonUSD: price,
      destinationPort: rfqDestinationPort,
      incoterm: rfqIncoterm,
      requiredCertifications: rfqCerts,
      targetDeliveryDate: rfqTargetDate,
      status: 'OPEN',
      createdDate: new Date().toISOString().split('T')[0],
      bidsCount: 0
    };

    if (onCreateRfq) {
      onCreateRfq(newRfq);
    }

    setRfqSuccessToast(true);
    setTimeout(() => {
      setRfqSuccessToast(false);
      setActiveTab('matching-engine');
    }, 2000);
  };

  const toggleRfqCert = (cert: CertificationType) => {
    if (rfqCerts.includes(cert)) {
      setRfqCerts(rfqCerts.filter(c => c !== cert));
    } else {
      setRfqCerts([...rfqCerts, cert]);
    }
  };

  return (
    <div className="min-h-screen bg-[#05110B] text-white p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
      
      {/* Toast Feedback */}
      {rfqSuccessToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#10B981] text-[#05110B] px-6 py-4 rounded-2xl font-extrabold shadow-2xl flex items-center space-x-3 animate-bounce">
          <CheckCircle2 className="w-6 h-6" />
          <span>Sourcing Request Created! Routing to Matching Engine...</span>
        </div>
      )}

      {/* Top Hero Banner & Navigation Tabs */}
      <div className="p-6 sm:p-8 rounded-[32px] bg-white/5 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 uppercase tracking-wider">
                BUYER SOURCING PORTAL
              </span>
              <span className="text-white/40 text-xs font-mono">• EUDR Deforestation Audited</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Discover & Direct-Procure Verified African Harvests
            </h1>
            <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-3xl">
              Connect directly with audited agricultural cooperatives, view satellite-verified farm polygon bounds, issue instant RFQs, and match with reliable African exporters.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setActiveTab('rfq-builder')}
              className="px-5 py-3 rounded-2xl bg-[#10B981] hover:brightness-110 text-[#05110B] font-extrabold text-xs flex items-center space-x-2 shadow-xl transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Issue New RFQ</span>
            </button>
          </div>
        </div>

        {/* Tab Selection Row */}
        <div className="flex items-center space-x-3 border-t border-white/10 pt-4 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center space-x-2 ${
              activeTab === 'search'
                ? 'bg-[#10B981] text-[#05110B] shadow-lg'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Supplier Search & Directory ({filteredSuppliers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('rfq-builder')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center space-x-2 ${
              activeTab === 'rfq-builder'
                ? 'bg-[#10B981] text-[#05110B] shadow-lg'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Create RFQ Request</span>
          </button>

          <button
            onClick={() => setActiveTab('matching-engine')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center space-x-2 ${
              activeTab === 'matching-engine'
                ? 'bg-[#10B981] text-[#05110B] shadow-lg'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span>Algorithmic Matching Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('db-api')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center space-x-2 ${
              activeTab === 'db-api'
                ? 'bg-[#F59E0B] text-[#05110B] shadow-lg'
                : 'bg-white/5 text-[#F59E0B] hover:bg-white/10'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>DB Schema & API Specs</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SUPPLIER SEARCH & FILTERING */}
      {activeTab === 'search' && (
        <div className="space-y-8">
          {/* Glass Search & Multi-Criteria Filter Bar */}
          <div className="p-6 rounded-[28px] bg-white/5 border border-white/10 backdrop-blur-2xl space-y-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search by cooperative name, crop, region, or export port..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-black/50 border border-white/15 text-sm text-white focus:outline-none focus:border-[#10B981] placeholder-white/40"
                />
              </div>

              {/* Quick Reset */}
              {(searchTerm || selectedCrop !== 'ALL' || selectedCountry !== 'ALL' || minQuantityMT > 0 || selectedCertification !== 'ALL' || minVerificationScore > 80) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCrop('ALL');
                    setSelectedCountry('ALL');
                    setMinQuantityMT(0);
                    setSelectedCertification('ALL');
                    setMinAnnualCapacity(0);
                    setMinVerificationScore(80);
                  }}
                  className="px-4 py-3 rounded-2xl bg-white/10 text-white/70 hover:text-white text-xs font-bold flex items-center space-x-2 shrink-0 border border-white/10"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            {/* Filter Controls Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 border-t border-white/10 pt-4">
              {/* Crop Filter */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono font-bold text-white/50 block">Crop Commodity</label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-xs font-bold text-white focus:outline-none focus:border-[#10B981]"
                >
                  <option value="ALL">All Crops ({availableCrops.length})</option>
                  {availableCrops.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Country Filter */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono font-bold text-white/50 block">Country of Origin</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-xs font-bold text-white focus:outline-none focus:border-[#10B981]"
                >
                  <option value="ALL">All Countries ({availableCountries.length})</option>
                  {availableCountries.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Min Stock MT */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono font-bold text-white/50 block">Min Stock (MT)</label>
                <select
                  value={minQuantityMT}
                  onChange={(e) => setMinQuantityMT(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-xs font-bold text-white focus:outline-none focus:border-[#10B981]"
                >
                  <option value={0}>Any Stock Level</option>
                  <option value={500}>≥ 500 MT</option>
                  <option value={1000}>≥ 1,000 MT</option>
                  <option value={2500}>≥ 2,500 MT</option>
                  <option value={5000}>≥ 5,000 MT</option>
                </select>
              </div>

              {/* Certification Filter */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono font-bold text-white/50 block">Required Certification</label>
                <select
                  value={selectedCertification}
                  onChange={(e) => setSelectedCertification(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-xs font-bold text-white focus:outline-none focus:border-[#10B981]"
                >
                  <option value="ALL">Any Certification</option>
                  <option value="Organic USDA/EU">Organic USDA/EU</option>
                  <option value="Fairtrade">Fairtrade</option>
                  <option value="Rainforest Alliance">Rainforest Alliance</option>
                  <option value="GlobalGAP">GlobalGAP</option>
                  <option value="Euro1 Certificate">Euro1 Certificate</option>
                </select>
              </div>

              {/* Annual Production Capacity */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono font-bold text-white/50 block">Annual Capacity</label>
                <select
                  value={minAnnualCapacity}
                  onChange={(e) => setMinAnnualCapacity(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-xs font-bold text-white focus:outline-none focus:border-[#10B981]"
                >
                  <option value={0}>Any Capacity</option>
                  <option value={2000}>≥ 2,000 MT/Yr</option>
                  <option value={5000}>≥ 5,000 MT/Yr</option>
                  <option value={10000}>≥ 10,000 MT/Yr</option>
                </select>
              </div>

              {/* Min Verification Score */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono font-bold text-white/50 block">Verification Score</label>
                <select
                  value={minVerificationScore}
                  onChange={(e) => setMinVerificationScore(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-xs font-bold text-[#10B981] focus:outline-none focus:border-[#10B981]"
                >
                  <option value={80}>≥ 80 / 100 (Standard)</option>
                  <option value={90}>≥ 90 / 100 (High Trust)</option>
                  <option value={95}>≥ 95 / 100 (Gold Tier)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Suppliers Grid Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuppliers.map((supplier) => (
              <div 
                key={supplier.id}
                className="p-6 rounded-[28px] bg-white/5 border border-white/15 backdrop-blur-xl hover:border-[#10B981]/50 transition-all space-y-5 flex flex-col justify-between group shadow-xl"
              >
                <div className="space-y-4">
                  {/* Card Top: Flag, Name, Status Badge */}
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{supplier.flagEmoji}</span>
                      <div>
                        <h3 className="text-lg font-extrabold text-white group-hover:text-[#10B981] transition-colors leading-snug">
                          {supplier.name}
                        </h3>
                        <p className="text-xs text-white/50">{supplier.region}, {supplier.country}</p>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase shrink-0 bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                      {supplier.verificationScore}/100
                    </span>
                  </div>

                  {/* Primary Commodity & Pricing metrics */}
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-white/40 uppercase text-[10px] font-bold">Crop:</span>
                      <span className="text-white font-bold">{supplier.primaryCrop}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40 uppercase text-[10px] font-bold">Available Stock:</span>
                      <span className="text-[#10B981] font-bold">{supplier.availableStockMT.toLocaleString()} MT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40 uppercase text-[10px] font-bold">Annual Capacity:</span>
                      <span className="text-white font-bold">{supplier.annualCapacityMT.toLocaleString()} MT/Yr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40 uppercase text-[10px] font-bold">FOB Price Range:</span>
                      <span className="text-[#F59E0B] font-bold">${supplier.pricePerTonUSD.min} - ${supplier.pricePerTonUSD.max}/MT</span>
                    </div>
                  </div>

                  {/* Certifications Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {supplier.certifications.slice(0, 3).map(c => (
                      <span key={c} className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/10 text-white/80 border border-white/10">
                        ✓ {c}
                      </span>
                    ))}
                    {supplier.certifications.length > 3 && (
                      <span className="px-2 py-1 rounded-full text-[10px] font-mono text-white/40 bg-white/5">
                        +{supplier.certifications.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setDetailModalSupplier(supplier)}
                    className="flex-1 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center justify-center space-x-1.5 border border-white/10"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>View Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      setRfqCrop(supplier.primaryCrop);
                      setActiveTab('rfq-builder');
                    }}
                    className="py-2.5 px-4 rounded-full bg-[#10B981] hover:brightness-110 text-[#05110B] text-xs font-extrabold transition-all flex items-center space-x-1 shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>RFQ</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: RFQ CREATION SYSTEM */}
      {activeTab === 'rfq-builder' && (
        <form onSubmit={handleCreateRfqSubmit} className="p-6 sm:p-8 rounded-[32px] bg-white/5 border border-white/15 backdrop-blur-2xl space-y-8">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#10B981] uppercase">BUYER SOURCING REQUEST BUILDER</span>
              <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight">Create Export Sourcing RFQ</h2>
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-[#10B981] hover:brightness-110 text-[#05110B] text-xs font-extrabold shadow-xl transition-all flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Publish Sourcing Request</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Crop Category */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase font-bold text-white/60 block">Agricultural Crop</label>
              <select
                value={rfqCrop}
                onChange={(e) => setRfqCrop(e.target.value as CropCategory)}
                className="w-full p-3 rounded-2xl bg-black/50 border border-white/15 text-sm font-bold text-white focus:outline-none focus:border-[#10B981]"
              >
                {['Cocoa', 'Coffee', 'Cashew', 'Sesame', 'Avocado', 'Tea', 'Shea Butter', 'Spices', 'Macadamia'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Quantity MT */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase font-bold text-white/60 block">Required Volume (Metric Tons)</label>
              <input
                type="number"
                value={rfqQuantityMT}
                onChange={(e) => setRfqQuantityMT(e.target.value)}
                placeholder="e.g. 2500"
                className="w-full p-3 rounded-2xl bg-black/50 border border-white/15 text-sm font-mono text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>

            {/* Target Price USD/MT */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase font-bold text-white/60 block">Target Price (USD / MT)</label>
              <input
                type="number"
                value={rfqTargetPrice}
                onChange={(e) => setRfqTargetPrice(e.target.value)}
                placeholder="e.g. 4200"
                className="w-full p-3 rounded-2xl bg-black/50 border border-white/15 text-sm font-mono text-[#F59E0B] font-bold focus:outline-none focus:border-[#10B981]"
              />
            </div>

            {/* Destination Port */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase font-bold text-white/60 block">Destination Port</label>
              <input
                type="text"
                value={rfqDestinationPort}
                onChange={(e) => setRfqDestinationPort(e.target.value)}
                placeholder="e.g. Port of Rotterdam, Hamburg, Baltimore"
                className="w-full p-3 rounded-2xl bg-black/50 border border-white/15 text-sm text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>

            {/* Incoterm */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase font-bold text-white/60 block">Shipping Incoterm</label>
              <select
                value={rfqIncoterm}
                onChange={(e) => setRfqIncoterm(e.target.value as any)}
                className="w-full p-3 rounded-2xl bg-black/50 border border-white/15 text-sm font-bold text-white focus:outline-none focus:border-[#10B981]"
              >
                <option value="FOB">FOB (Free On Board - Origin Port)</option>
                <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                <option value="CFR">CFR (Cost & Freight)</option>
                <option value="DDP">DDP (Delivered Duty Paid)</option>
              </select>
            </div>

            {/* Target Delivery Deadline */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase font-bold text-white/60 block">Target Delivery Date</label>
              <input
                type="date"
                value={rfqTargetDate}
                onChange={(e) => setRfqTargetDate(e.target.value)}
                className="w-full p-3 rounded-2xl bg-black/50 border border-white/15 text-sm font-mono text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>
          </div>

          {/* Quality Specifications */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase font-bold text-white/60 block">Quality & Technical Specifications</label>
            <textarea
              rows={3}
              value={rfqQualityReqs}
              onChange={(e) => setRfqQualityReqs(e.target.value)}
              placeholder="Detail moisture levels, grain count, bean size, defect tolerance, and EUDR zero-deforestation polygon verification requirements..."
              className="w-full p-3 rounded-2xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none focus:border-[#10B981]"
            />
          </div>

          {/* Required Certifications Checkbox Selection */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-mono uppercase font-bold text-[#F59E0B] block">Mandatory Export Certifications</label>
            <div className="flex flex-wrap gap-3">
              {[
                'Organic USDA/EU',
                'Fairtrade',
                'Rainforest Alliance',
                'GlobalGAP',
                'Euro1 Certificate',
                'Phytosanitary Clean',
                'ISO 22000'
              ].map((cert) => {
                const isSelected = rfqCerts.includes(cert as CertificationType);
                return (
                  <button
                    key={cert}
                    type="button"
                    onClick={() => toggleRfqCert(cert as CertificationType)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 border ${
                      isSelected
                        ? 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]'
                        : 'bg-black/40 text-white/60 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <span>{isSelected ? '✓' : '+'}</span>
                    <span>{cert}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </form>
      )}

      {/* TAB 3: AUTOMATED ALGORITHMIC MATCHING ENGINE */}
      {activeTab === 'matching-engine' && (
        <div className="space-y-8">
          <div className="p-6 rounded-[28px] bg-white/5 border border-white/10 backdrop-blur-2xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-mono font-bold text-[#F59E0B] uppercase">AUTOMATED MATCHING ALGORITHM</span>
                <h2 className="text-2xl font-extrabold text-white">Recommended Supplier Rankings</h2>
              </div>

              {/* RFQ Selector */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-white/40 font-mono">Active RFQ:</span>
                <select
                  value={selectedRfqForMatching.id}
                  onChange={(e) => {
                    const found = rfqs.find(r => r.id === e.target.value);
                    if (found) setSelectedRfqForMatching(found);
                  }}
                  className="px-4 py-2 rounded-xl bg-black/60 border border-white/20 text-xs font-bold text-[#10B981] focus:outline-none"
                >
                  {rfqs.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.quantityMT} MT {r.crop} → {r.destinationPort}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="text-xs text-white/60">
              Evaluated against 5 key metrics: Crop Capacity (30%), Verification & EUDR Audit (25%), Export Experience (20%), Certification Overlap (15%), and Pricing Alignment (10%).
            </p>
          </div>

          {/* Matches List */}
          <div className="space-y-4">
            {matchedSuppliersWithScores.map((item, index) => (
              <div 
                key={item.supplier.id}
                className="p-6 rounded-[28px] bg-white/5 border border-white/15 backdrop-blur-xl hover:border-[#10B981]/60 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#065F46] flex items-center justify-center font-extrabold text-lg text-white shrink-0">
                    #{index + 1}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{item.supplier.flagEmoji}</span>
                      <h3 className="text-lg font-extrabold text-white">{item.supplier.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
                        {item.matchPercentage}% OPTIMAL MATCH
                      </span>
                    </div>
                    <p className="text-xs text-white/50">
                      {item.supplier.region}, {item.supplier.country} • {item.supplier.availableStockMT.toLocaleString()} MT Stock Available ({item.stockRatio}% of RFQ demand)
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.matchingCerts.map(c => (
                        <span key={c} className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                          ✓ Matched Cert: {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 w-full lg:w-auto justify-end">
                  <button
                    onClick={() => setDetailModalSupplier(item.supplier)}
                    className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/10"
                  >
                    Inspect Audit
                  </button>

                  <button
                    onClick={() => alert(`Contract Quotation Request sent directly to ${item.supplier.name} for RFQ #${selectedRfqForMatching.id}`)}
                    className="px-5 py-2.5 rounded-full bg-[#10B981] hover:brightness-110 text-[#05110B] text-xs font-extrabold transition-all shadow-lg flex items-center space-x-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Issue Purchase Contract</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DATABASE SCHEMAS & API ENDPOINTS SPECIFICATIONS */}
      {activeTab === 'db-api' && (
        <div className="p-8 rounded-[32px] bg-white/5 border border-white/15 backdrop-blur-2xl space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#F59E0B] uppercase">BUYER PORTAL SYSTEM ARCHITECTURE</span>
              <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight">Database Schema & REST API Specifications</h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#10B981]/20 text-[#10B981]">
              OPENAPI v3.0 SPEC
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3 font-mono text-xs">
              <h3 className="text-sm font-bold text-[#10B981] uppercase">PostgreSQL Database Schema (Buyer Engine)</h3>
              <pre className="text-white/80 overflow-x-auto p-4 rounded-xl bg-black/80 border border-white/10">
{`CREATE TABLE buyer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  primary_import_crops TEXT[] NOT NULL,
  verified_eori_number VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE rfqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES buyer_profiles(id),
  crop_category VARCHAR(50) NOT NULL,
  quantity_mt NUMERIC NOT NULL,
  target_price_usd_mt NUMERIC NOT NULL,
  destination_port VARCHAR(150) NOT NULL,
  incoterms VARCHAR(10) DEFAULT 'FOB',
  required_certifications TEXT[] DEFAULT '{}',
  target_delivery_date DATE NOT NULL,
  status VARCHAR(30) DEFAULT 'OPEN'
);

CREATE TABLE rfq_matches (
  id UUID PRIMARY KEY,
  rfq_id UUID REFERENCES rfqs(id),
  supplier_id UUID NOT NULL,
  match_percentage INT NOT NULL,
  algorithmic_rank INT NOT NULL
);`}
              </pre>
            </div>

            <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3 font-mono text-xs">
              <h3 className="text-sm font-bold text-[#F59E0B] uppercase">REST & Matching API Endpoints</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold mr-2">GET</span>
                  <span className="text-white font-bold">/api/v1/buyers/search-suppliers</span>
                  <p className="text-[11px] text-white/50 mt-1">Multi-criteria search filtering by crop, stock, country, & EUDR score.</p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] font-bold mr-2">POST</span>
                  <span className="text-white font-bold">/api/v1/buyers/rfq</span>
                  <p className="text-[11px] text-white/50 mt-1">Creates new buyer sourcing request and broadcasts to matching co-ops.</p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold mr-2">GET</span>
                  <span className="text-white font-bold">/api/v1/matching/recommendations?rfq_id=...</span>
                  <p className="text-[11px] text-white/50 mt-1">Runs weighted ranking algorithm to calculate top supplier matches.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUPPLIER PROFILE DETAIL MODAL */}
      {detailModalSupplier && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-4xl bg-[#081b12] border border-white/20 rounded-[32px] p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setDetailModalSupplier(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-4 border-b border-white/10 pb-4">
              <span className="text-4xl">{detailModalSupplier.flagEmoji}</span>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-extrabold text-white">{detailModalSupplier.name}</h2>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#10B981]/20 text-[#10B981]">
                    {detailModalSupplier.verificationStatus} ({detailModalSupplier.verificationScore}/100)
                  </span>
                </div>
                <p className="text-xs text-white/60">{detailModalSupplier.region}, {detailModalSupplier.country} • {detailModalSupplier.farmSizeHectares} Ha • {detailModalSupplier.cooperativeMembers} Farmers</p>
              </div>
            </div>

            {/* Grid Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                <span className="text-white/40 block uppercase text-[10px]">Primary Crop</span>
                <span className="text-sm font-bold text-white">{detailModalSupplier.primaryCrop}</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                <span className="text-white/40 block uppercase text-[10px]">Stock Available</span>
                <span className="text-sm font-bold text-[#10B981]">{detailModalSupplier.availableStockMT.toLocaleString()} MT</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                <span className="text-white/40 block uppercase text-[10px]">Annual Capacity</span>
                <span className="text-sm font-bold text-white">{detailModalSupplier.annualCapacityMT.toLocaleString()} MT</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                <span className="text-white/40 block uppercase text-[10px]">Export Experience</span>
                <span className="text-sm font-bold text-[#F59E0B]">{detailModalSupplier.yearsInExport} Years</span>
              </div>
            </div>

            {/* Certifications Vault */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Audited Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {detailModalSupplier.certifications.map(c => (
                  <span key={c} className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                    ✓ {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Verification Documents ({detailModalSupplier.documents.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {detailModalSupplier.documents.map(doc => (
                  <div key={doc.id} className="p-3 rounded-xl bg-black/50 border border-white/10 font-mono text-xs space-y-1">
                    <div className="text-white font-bold">{doc.name}</div>
                    <div className="text-white/50 text-[10px]">Issued by: {doc.issuedBy}</div>
                    <div className="text-[#F59E0B] text-[10px] break-all">Hash: {doc.verifiedHash}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Person */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex justify-between items-center text-xs">
              <div>
                <span className="text-white/40 uppercase font-mono block text-[10px]">Export Liaison</span>
                <span className="font-bold text-white">{detailModalSupplier.contactPerson.name} ({detailModalSupplier.contactPerson.role})</span>
              </div>
              <span className="text-[#10B981] font-mono font-bold">{detailModalSupplier.contactPerson.email}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
