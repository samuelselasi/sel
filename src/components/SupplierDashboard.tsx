import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Award, 
  Sprout, 
  FileText, 
  Upload, 
  Plus, 
  CheckCircle2, 
  TrendingUp, 
  Eye, 
  MessageSquare, 
  DollarSign, 
  Calendar, 
  Map as MapIcon, 
  Download, 
  Layers, 
  Sliders, 
  Sparkles, 
  ChevronRight, 
  ArrowUpRight, 
  Search, 
  Filter, 
  AlertCircle,
  FileSpreadsheet,
  Globe,
  Database,
  Code,
  Send,
  User,
  Check,
  X,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import { Supplier, CropCategory, CertificationType, InspectionDocument, RfqItem, RfqBid } from '../types';

interface SupplierDashboardProps {
  suppliers: Supplier[];
  currentSupplierId?: string;
  onUpdateSupplier?: (updated: Supplier) => void;
  rfqs: RfqItem[];
  onSubmitBid?: (bid: Partial<RfqBid>) => void;
}

export const SupplierDashboard: React.FC<SupplierDashboardProps> = ({
  suppliers,
  currentSupplierId = 'sup-gh-01',
  onUpdateSupplier,
  rfqs,
  onSubmitBid,
}) => {
  // Selected supplier state
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>(currentSupplierId);
  const activeSupplier = suppliers.find(s => s.id === selectedSupplierId) || suppliers[0];

  // Active sub tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'profile' | 'crops' | 'farms' | 'documents' | 'rfqs' | 'api'
  >('overview');

  // Interactive Form States
  const [profileData, setProfileData] = useState<Supplier>(activeSupplier);
  const [profileSavedToast, setProfileSavedToast] = useState<boolean>(false);

  // Crop Inventory Modal
  const [showAddCropModal, setShowAddCropModal] = useState<boolean>(false);
  const [newCropName, setNewCropName] = useState<string>('');
  const [newCropCategory, setNewCropCategory] = useState<CropCategory>('Cocoa');
  const [newCropStock, setNewCropStock] = useState<string>('');
  const [newCropCapacity, setNewCropCapacity] = useState<string>('');
  const [newCropHarvest, setNewCropHarvest] = useState<string>('');
  const [newCropMinPrice, setNewCropMinPrice] = useState<string>('');
  const [newCropMaxPrice, setNewCropMaxPrice] = useState<string>('');

  // Add Farm Location Modal
  const [showAddFarmModal, setShowAddFarmModal] = useState<boolean>(false);
  const [farmName, setFarmName] = useState<string>('');
  const [farmRegion, setFarmRegion] = useState<string>('');
  const [farmLat, setFarmLat] = useState<string>('');
  const [farmLng, setFarmLng] = useState<string>('');
  const [farmHectares, setFarmHectares] = useState<string>('');
  const [farmGpsPolygonStr, setFarmGpsPolygonStr] = useState<string>('');

  // Document Upload Modal
  const [showUploadDocModal, setShowUploadDocModal] = useState<boolean>(false);
  const [docName, setDocName] = useState<string>('');
  const [docType, setDocType] = useState<string>('Export Certificate');
  const [docIssuer, setDocIssuer] = useState<string>('');
  const [docExpiry, setDocExpiry] = useState<string>('');

  // RFQ Quotation Modal / Drawer
  const [selectedRfq, setSelectedRfq] = useState<RfqItem | null>(null);
  const [bidPrice, setBidPrice] = useState<string>('');
  const [bidQuantity, setBidQuantity] = useState<string>('');
  const [bidShipDate, setBidShipDate] = useState<string>('');
  const [bidIncoterms, setBidIncoterms] = useState<string>('FOB');
  const [bidNotes, setBidNotes] = useState<string>('');
  const [bidSubmittedToast, setBidSubmittedToast] = useState<boolean>(false);

  // Buyer Communication Chat Drawer
  const [activeChatRfq, setActiveChatRfq] = useState<RfqItem | null>(null);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: 'Cacao Direct Europe B.V.', text: 'Hello Ashanti Co-op, can you confirm EUDR compliance hashes for LOT-2026-COCOA?', time: '10:14 AM' },
    { sender: 'You (Supplier)', text: 'Greetings! Yes, all 3,400 MT in Takoradi warehouse have 100% polygon boundary verification.', time: '10:18 AM' }
  ]);

  // Keep profileData updated if active supplier changes
  const handleSupplierSelect = (id: string) => {
    setSelectedSupplierId(id);
    const found = suppliers.find(s => s.id === id);
    if (found) setProfileData(found);
  };

  // Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateSupplier) {
      onUpdateSupplier(profileData);
    }
    setProfileSavedToast(true);
    setTimeout(() => setProfileSavedToast(false), 3000);
  };

  // Handle Add Farm
  const handleAddFarmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const latNum = parseFloat(farmLat) || activeSupplier.locationCoordinates.lat;
    const lngNum = parseFloat(farmLng) || activeSupplier.locationCoordinates.lng;
    
    // Create new boundary point
    const updatedGps = [...profileData.gpsBoundaries, { latitude: latNum, longitude: lngNum }];
    const updatedSupplier: Supplier = {
      ...profileData,
      farmSizeHectares: profileData.farmSizeHectares + (parseInt(farmHectares, 10) || 100),
      gpsBoundaries: updatedGps
    };

    setProfileData(updatedSupplier);
    if (onUpdateSupplier) onUpdateSupplier(updatedSupplier);

    setShowAddFarmModal(false);
    setFarmName('');
    setFarmRegion('');
    setFarmLat('');
    setFarmLng('');
    setFarmHectares('');
    setFarmGpsPolygonStr('');
  };

  // Handle Upload Document
  const handleUploadDocSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: InspectionDocument = {
      id: `doc-${Date.now()}`,
      name: docName || 'Certified Inspection Document',
      type: docType,
      issuedBy: docIssuer || 'Ministry of Agriculture',
      expiryDate: docExpiry || '2028-12-31',
      verifiedHash: `0x${Math.random().toString(16).substr(2, 32)}`,
      downloadUrl: '#'
    };

    const updatedSupplier: Supplier = {
      ...profileData,
      documents: [newDoc, ...profileData.documents]
    };

    setProfileData(updatedSupplier);
    if (onUpdateSupplier) onUpdateSupplier(updatedSupplier);

    setShowUploadDocModal(false);
    setDocName('');
    setDocIssuer('');
    setDocExpiry('');
  };

  // Handle Submit Quote
  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRfq) return;

    if (onSubmitBid) {
      onSubmitBid({
        rfqId: selectedRfq.id,
        supplierId: profileData.id,
        supplierName: profileData.name,
        bidPricePerTonUSD: parseFloat(bidPrice) || selectedRfq.targetPricePerTonUSD,
        offeredQuantityMT: parseFloat(bidQuantity) || selectedRfq.quantityMT,
        estShipmentDate: bidShipDate || '2026-09-15',
        incotermsOffered: bidIncoterms,
        notes: bidNotes || 'EUDR 100% verified lot ready for Takoradi port dispatch.',
        status: 'PENDING'
      });
    }

    setSelectedRfq(null);
    setBidSubmittedToast(true);
    setTimeout(() => setBidSubmittedToast(false), 3500);
  };

  // Send Message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatHistory([...chatHistory, {
      sender: 'You (Supplier)',
      text: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setChatMessage('');
  };

  return (
    <div className="min-h-screen bg-[#05110B] text-white p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
      
      {/* Toast Feedback */}
      {profileSavedToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#10B981] text-[#05110B] px-5 py-3 rounded-2xl font-bold shadow-2xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>Supplier Profile Successfully Updated!</span>
        </div>
      )}

      {bidSubmittedToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#F59E0B] text-[#05110B] px-5 py-3 rounded-2xl font-bold shadow-2xl flex items-center space-x-2 animate-bounce">
          <Send className="w-5 h-5" />
          <span>Export Quotation Submitted to Buyer!</span>
        </div>
      )}

      {/* Top Banner & Cooperative Selection Header */}
      <div className="p-6 sm:p-8 rounded-[32px] bg-white/5 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#065F46] p-0.5 shadow-xl shrink-0 overflow-hidden relative">
              <img 
                src={activeSupplier.logoUrl} 
                alt={activeSupplier.name} 
                className="w-full h-full object-cover rounded-[14px]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-extrabold text-2xl text-white bg-[#10B981]">
                {activeSupplier.name.charAt(0)}
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{activeSupplier.flagEmoji}</span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {activeSupplier.name}
                </h1>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40">
                  SEL {activeSupplier.verificationStatus}
                </span>
              </div>
              <p className="text-white/60 text-xs sm:text-sm mt-1 font-light flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
                {activeSupplier.region}, {activeSupplier.country} • {activeSupplier.farmSizeHectares.toLocaleString()} Hectares • {activeSupplier.cooperativeMembers.toLocaleString()} Cooperative Farmers
              </p>
            </div>
          </div>

          {/* Supplier Switcher & Quick Action */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="relative">
              <select
                value={selectedSupplierId}
                onChange={(e) => handleSupplierSelect(e.target.value)}
                className="px-4 py-2.5 rounded-2xl bg-black/50 border border-white/20 text-xs font-bold text-white focus:outline-none focus:border-[#10B981] cursor-pointer appearance-none pr-8"
              >
                {suppliers.map(s => (
                  <option key={s.id} value={s.id} className="bg-[#05110B] text-white">
                    {s.flagEmoji} {s.name} ({s.country})
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none text-xs">▼</div>
            </div>

            <button
              onClick={() => setShowAddFarmModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-[#10B981] text-[#05110B] text-xs font-extrabold flex items-center space-x-1.5 shadow-lg hover:brightness-110 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Farm Plot</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation Bar Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto border-t border-white/10 pt-4 scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center space-x-2 ${
              activeTab === 'overview'
                ? 'bg-[#10B981] text-[#05110B] shadow-lg'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Overview & Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center space-x-2 ${
              activeTab === 'profile'
                ? 'bg-[#10B981] text-[#05110B] shadow-lg'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Co-op Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('crops')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center space-x-2 ${
              activeTab === 'crops'
                ? 'bg-[#10B981] text-[#05110B] shadow-lg'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>Crop Inventory ({activeSupplier.availableStockMT} MT)</span>
          </button>

          <button
            onClick={() => setActiveTab('farms')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center space-x-2 ${
              activeTab === 'farms'
                ? 'bg-[#10B981] text-[#05110B] shadow-lg'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span>Farm Locations & Map</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center space-x-2 ${
              activeTab === 'documents'
                ? 'bg-[#10B981] text-[#05110B] shadow-lg'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Compliance Vault ({activeSupplier.documents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('rfqs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center space-x-2 ${
              activeTab === 'rfqs'
                ? 'bg-[#10B981] text-[#05110B] shadow-lg'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Buyer Requests ({rfqs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('api')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center space-x-2 ${
              activeTab === 'api'
                ? 'bg-[#F59E0B] text-[#05110B] shadow-lg'
                : 'bg-white/5 text-[#F59E0B] hover:bg-white/10'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>DB & API Specs</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: OVERVIEW & ANALYTICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl space-y-2">
              <div className="flex justify-between items-center text-white/50 text-xs uppercase font-bold tracking-wider">
                <span>Available Crop Stock</span>
                <Sprout className="w-4 h-4 text-[#10B981]" />
              </div>
              <div className="text-3xl font-extrabold text-white font-mono">
                {activeSupplier.availableStockMT.toLocaleString()} <span className="text-sm font-normal text-white/60">MT</span>
              </div>
              <div className="text-[11px] text-[#10B981] font-mono flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                Annual Capacity: {activeSupplier.annualCapacityMT.toLocaleString()} MT
              </div>
            </div>

            <div className="p-6 rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl space-y-2">
              <div className="flex justify-between items-center text-white/50 text-xs uppercase font-bold tracking-wider">
                <span>Profile Views (30 Days)</span>
                <Eye className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-3xl font-extrabold text-white font-mono">
                1,420 <span className="text-sm font-normal text-white/60">Views</span>
              </div>
              <div className="text-[11px] text-blue-400 font-mono flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                +34% European Buyer Traffic
              </div>
            </div>

            <div className="p-6 rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl space-y-2">
              <div className="flex justify-between items-center text-white/50 text-xs uppercase font-bold tracking-wider">
                <span>Buyer RFQ Matches</span>
                <FileSpreadsheet className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <div className="text-3xl font-extrabold text-[#F59E0B] font-mono">
                {rfqs.length} <span className="text-sm font-normal text-white/60">Active</span>
              </div>
              <div className="text-[11px] text-[#F59E0B] font-mono flex items-center">
                <Check className="w-3.5 h-3.5 mr-1" />
                3 Bids Submitted
              </div>
            </div>

            <div className="p-6 rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl space-y-2">
              <div className="flex justify-between items-center text-white/50 text-xs uppercase font-bold tracking-wider">
                <span>Verification Score</span>
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              </div>
              <div className="text-3xl font-extrabold text-[#10B981] font-mono">
                {activeSupplier.verificationScore} / 100
              </div>
              <div className="text-[11px] text-[#10B981] font-mono">
                EUDR Zero Deforestation Passed
              </div>
            </div>
          </div>

          {/* Analytics Visualizers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Graph: Buyer Interest & Profile Traffic */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-2xl space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Global Importer Interest & Views</h3>
                  <p className="text-xs text-white/50">Weekly breakdown of European, US, & Asian buyer queries</p>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                  REAL-TIME TELEMETRY
                </span>
              </div>

              {/* Synthetic Bar Graph */}
              <div className="space-y-4 pt-4">
                {[
                  { label: 'Rotterdam Importers (Netherlands)', views: 580, percent: '85%' },
                  { label: 'Hamburg Trading Houses (Germany)', views: 420, percent: '65%' },
                  { label: 'Geneva Commodity Traders (Switzerland)', views: 290, percent: '45%' },
                  { label: 'Baltimore Agro Buyers (USA)', views: 130, percent: '25%' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-white/80">{item.label}</span>
                      <span className="text-[#10B981] font-bold">{item.views} Views</span>
                    </div>
                    <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/10">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-[#10B981] to-[#F59E0B]"
                        style={{ width: item.percent }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Graph: Demand Index */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-2xl space-y-6">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Crop Market Demand Index</h3>
              <p className="text-xs text-white/50">Current global buyer order density by commodity</p>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-white/40 font-mono uppercase block font-bold">Grade 1 Cocoa</span>
                    <span className="text-sm font-bold text-white">HIGH DEMAND ($4,200/MT)</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
                    +18.4%
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-white/40 font-mono uppercase block font-bold">Washed Arabica AA</span>
                    <span className="text-sm font-bold text-white">VERY HIGH ($7,600/MT)</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
                    +24.1%
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-white/40 font-mono uppercase block font-bold">Raw Cashew Nuts</span>
                    <span className="text-sm font-bold text-white">STABLE ($1,610/MT)</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30">
                    +4.2%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SUPPLIER PROFILE */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="p-6 sm:p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-2xl space-y-8">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">Cooperative Export Profile</h2>
              <p className="text-xs text-white/60">Visible to verified global importers searching for compliant African origins</p>
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#10B981] hover:brightness-110 text-[#05110B] text-xs font-extrabold shadow-lg transition-all"
            >
              Save Profile Changes
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase font-bold text-white/60 block">Organization Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full p-3 rounded-2xl bg-black/50 border border-white/15 text-sm font-bold text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase font-bold text-white/60 block">Export Tagline</label>
              <input
                type="text"
                value={profileData.tagline}
                onChange={(e) => setProfileData({ ...profileData, tagline: e.target.value })}
                className="w-full p-3 rounded-2xl bg-black/50 border border-white/15 text-sm text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase font-bold text-white/60 block">Country of Origin</label>
              <input
                type="text"
                value={profileData.country}
                onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                className="w-full p-3 rounded-2xl bg-black/50 border border-white/15 text-sm text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase font-bold text-white/60 block">Farming Region</label>
              <input
                type="text"
                value={profileData.region}
                onChange={(e) => setProfileData({ ...profileData, region: e.target.value })}
                className="w-full p-3 rounded-2xl bg-black/50 border border-white/15 text-sm text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase font-bold text-white/60 block">Farm Area (Hectares)</label>
              <input
                type="number"
                value={profileData.farmSizeHectares}
                onChange={(e) => setProfileData({ ...profileData, farmSizeHectares: parseInt(e.target.value, 10) || 0 })}
                className="w-full p-3 rounded-2xl bg-black/50 border border-white/15 text-sm font-mono text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase font-bold text-white/60 block">Cooperative Members</label>
              <input
                type="number"
                value={profileData.cooperativeMembers}
                onChange={(e) => setProfileData({ ...profileData, cooperativeMembers: parseInt(e.target.value, 10) || 0 })}
                className="w-full p-3 rounded-2xl bg-black/50 border border-white/15 text-sm font-mono text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase font-bold text-white/60 block">Years Active in International Export</label>
              <input
                type="number"
                value={profileData.yearsInExport}
                onChange={(e) => setProfileData({ ...profileData, yearsInExport: parseInt(e.target.value, 10) || 0 })}
                className="w-full p-3 rounded-2xl bg-black/50 border border-white/15 text-sm font-mono text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase font-bold text-white/60 block">Primary Export Crop</label>
              <input
                type="text"
                value={profileData.primaryCrop}
                readOnly
                className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-[#10B981] cursor-not-allowed"
              />
            </div>
          </div>

          {/* Contact Person Details */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-[#F59E0B] uppercase tracking-wider">Primary Export Officer Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] text-white/40 uppercase font-mono block font-bold">Full Name</span>
                <input
                  type="text"
                  value={profileData.contactPerson.name}
                  onChange={(e) => setProfileData({
                    ...profileData,
                    contactPerson: { ...profileData.contactPerson, name: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-white/40 uppercase font-mono block font-bold">Official Role</span>
                <input
                  type="text"
                  value={profileData.contactPerson.role}
                  onChange={(e) => setProfileData({
                    ...profileData,
                    contactPerson: { ...profileData.contactPerson, role: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-white/40 uppercase font-mono block font-bold">Email Address</span>
                <input
                  type="email"
                  value={profileData.contactPerson.email}
                  onChange={(e) => setProfileData({
                    ...profileData,
                    contactPerson: { ...profileData.contactPerson, email: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-white/40 uppercase font-mono block font-bold">Phone Number</span>
                <input
                  type="text"
                  value={profileData.contactPerson.phone}
                  onChange={(e) => setProfileData({
                    ...profileData,
                    contactPerson: { ...profileData.contactPerson, phone: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white"
                />
              </div>
            </div>
          </div>
        </form>
      )}

      {/* SUB-TAB 3: CROP INVENTORY */}
      {activeTab === 'crops' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">Agricultural Crop Inventory</h2>
              <p className="text-xs text-white/60">Manage harvest volumes, specifications, pricing ranges, and available export lots</p>
            </div>
            <button
              onClick={() => setShowAddCropModal(true)}
              className="px-5 py-2.5 rounded-2xl bg-[#10B981] hover:brightness-110 text-[#05110B] text-xs font-extrabold flex items-center space-x-2 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add Crop Lot</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-[28px] bg-white/5 border border-white/15 backdrop-blur-xl space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold text-[#10B981]">Primary Commodity</span>
                  <h3 className="text-xl font-extrabold text-white">{activeSupplier.primaryCrop}</h3>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                  READY FOR DISPATCH
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-white/40 uppercase text-[10px] font-bold">Available Stock:</span>
                  <span className="text-[#10B981] font-bold">{activeSupplier.availableStockMT.toLocaleString()} MT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40 uppercase text-[10px] font-bold">Annual Production:</span>
                  <span className="text-white font-bold">{activeSupplier.annualCapacityMT.toLocaleString()} MT/Yr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40 uppercase text-[10px] font-bold">FOB Price Range:</span>
                  <span className="text-[#F59E0B] font-bold">${activeSupplier.pricePerTonUSD.min} - ${activeSupplier.pricePerTonUSD.max}/MT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40 uppercase text-[10px] font-bold">Min Order Quantity:</span>
                  <span className="text-white font-bold">{activeSupplier.minimumOrderQuantityMT} MT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40 uppercase text-[10px] font-bold">Harvest Window:</span>
                  <span className="text-white font-bold">{activeSupplier.harvestWindow}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {activeSupplier.certifications.map(c => (
                  <span key={c} className="px-2.5 py-0.5 rounded-full text-[10px] bg-white/10 text-white/80 border border-white/10">
                    ✓ {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: FARM LOCATIONS & MAP */}
      {activeTab === 'farms' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">Geospatial Farm Locations & Polygons</h2>
              <p className="text-xs text-white/60">GPS boundary coordinates audited for EUDR deforestation verification</p>
            </div>
            <button
              onClick={() => setShowAddFarmModal(true)}
              className="px-5 py-2.5 rounded-2xl bg-[#10B981] hover:brightness-110 text-[#05110B] text-xs font-extrabold flex items-center space-x-2 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Register New Farm Plot</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Map Visualizer Card */}
            <div className="lg:col-span-7 p-6 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-2xl space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-[#10B981] uppercase">GPS MAP CANVAS • {activeSupplier.country}</span>
                <span className="text-[11px] text-white/50 font-mono">
                  Center: {activeSupplier.locationCoordinates.lat.toFixed(4)}° N, {activeSupplier.locationCoordinates.lng.toFixed(4)}° W
                </span>
              </div>

              {/* Simulated Map Canvas Box */}
              <div className="relative w-full h-80 rounded-2xl bg-[#091a12] border border-white/15 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Polygon Boundary Visual Overlay */}
                <div className="relative z-10 p-6 rounded-2xl bg-black/70 border border-[#10B981]/40 text-center space-y-2 backdrop-blur-md">
                  <MapPin className="w-8 h-8 text-[#10B981] mx-auto animate-bounce" />
                  <div className="text-sm font-extrabold text-white">{activeSupplier.name} Plot A</div>
                  <div className="text-xs text-[#10B981] font-mono">
                    Polygon Bounds: {activeSupplier.gpsBoundaries.length} Verified GPS Points
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-[#10B981]/20 text-[#10B981]">
                    100% Zero Deforestation Cleared
                  </span>
                </div>
              </div>
            </div>

            {/* Farm Plot List Details */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Registered Farm Plots</h3>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-white">{activeSupplier.name} Central Belt</h4>
                    <p className="text-xs text-white/50">{activeSupplier.region}, {activeSupplier.country}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#10B981]">{activeSupplier.farmSizeHectares} Ha</span>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/10 font-mono text-[11px] space-y-1">
                  <div className="text-white/40 uppercase font-bold text-[9px]">Polygon GPS Hash</div>
                  <div className="text-[#F59E0B] break-all">0x94f2a71b8e4c92a10b8e71f92a4</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: COMPLIANCE DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">Compliance & Export Certificate Vault</h2>
              <p className="text-xs text-white/60">Cryptographically signed quality audits, phytosanitary reports, and organic compliance</p>
            </div>
            <button
              onClick={() => setShowUploadDocModal(true)}
              className="px-5 py-2.5 rounded-2xl bg-[#10B981] hover:brightness-110 text-[#05110B] text-xs font-extrabold flex items-center space-x-2 shadow-lg"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Certificate</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeSupplier.documents.map((doc) => (
              <div key={doc.id} className="p-6 rounded-[28px] bg-white/5 border border-white/15 backdrop-blur-xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#10B981]" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-[#10B981]/20 text-[#10B981]">
                      VERIFIED HASH
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-white">{doc.name}</h3>
                    <p className="text-xs text-white/50">{doc.type}</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono space-y-1.5">
                    <div className="flex justify-between text-white/60">
                      <span>Issued By:</span>
                      <span className="text-white font-bold">{doc.issuedBy}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Expires:</span>
                      <span className="text-[#F59E0B] font-bold">{doc.expiryDate}</span>
                    </div>
                    <div className="pt-1 border-t border-white/5 text-[10px] text-white/40 break-all">
                      Hash: {doc.verifiedHash}
                    </div>
                  </div>
                </div>

                <button className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center justify-center space-x-2 border border-white/10">
                  <Download className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Download Signed Proof</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 6: BUYER RFQS & QUOTATIONS */}
      {activeTab === 'rfqs' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">Active Buyer RFQs & Bidding</h2>
              <p className="text-xs text-white/60">Global importer sourcing requests matched to your crop capacity</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rfqs.map((rfq) => (
              <div key={rfq.id} className="p-6 rounded-[28px] bg-white/5 border border-white/15 backdrop-blur-xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase font-mono font-bold text-[#F59E0B]">Buyer Request</span>
                      <h3 className="text-lg font-extrabold text-white">{rfq.quantityMT} MT {rfq.crop}</h3>
                      <p className="text-xs text-white/50">{rfq.buyerCompany} ({rfq.buyerCountry})</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30">
                      {rfq.status}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/40 uppercase text-[10px] font-bold">Target Price:</span>
                      <span className="text-[#10B981] font-bold">${rfq.targetPricePerTonUSD}/MT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40 uppercase text-[10px] font-bold">Destination Port:</span>
                      <span className="text-white font-bold">{rfq.destinationPort}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40 uppercase text-[10px] font-bold">Incoterm:</span>
                      <span className="text-white font-bold">{rfq.incoterm}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSelectedRfq(rfq);
                      setBidPrice(rfq.targetPricePerTonUSD.toString());
                      setBidQuantity(rfq.quantityMT.toString());
                    }}
                    className="flex-1 py-2.5 rounded-full bg-[#10B981] hover:brightness-110 text-[#05110B] text-xs font-extrabold transition-all"
                  >
                    Submit Quotation
                  </button>

                  <button
                    onClick={() => setActiveChatRfq(rfq)}
                    className="py-2.5 px-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center space-x-1 border border-white/10"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>Message</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 7: DATABASE REQUIREMENTS & API ENDPOINTS */}
      {activeTab === 'api' && (
        <div className="p-8 rounded-[32px] bg-white/5 border border-white/15 backdrop-blur-2xl space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#F59E0B] uppercase">TECHNICAL ARCHITECTURE SPECIFICATION</span>
              <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight">PostgreSQL / Firestore Schema & REST Endpoints</h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#10B981]/20 text-[#10B981]">
              OPENAPI v3.0 COMPLIANT
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3 font-mono text-xs">
              <h3 className="text-sm font-bold text-[#10B981] uppercase">Database Relational Schema</h3>
              <pre className="text-white/80 overflow-x-auto p-4 rounded-xl bg-black/80 border border-white/10">
{`CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  region VARCHAR(100) NOT NULL,
  farm_size_hectares NUMERIC NOT NULL,
  cooperative_members INT NOT NULL,
  primary_crop VARCHAR(50) NOT NULL,
  verification_status VARCHAR(50) DEFAULT 'PENDING_AUDIT',
  verification_score INT DEFAULT 0,
  contact_email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE farm_plots (
  id UUID PRIMARY KEY,
  supplier_id UUID REFERENCES suppliers(id),
  plot_name VARCHAR(100),
  gps_polygon JSONB NOT NULL, -- EUDR Boundary
  eudr_cleared BOOLEAN DEFAULT TRUE
);`}
              </pre>
            </div>

            <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3 font-mono text-xs">
              <h3 className="text-sm font-bold text-[#F59E0B] uppercase">REST & GraphQL Endpoints</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold mr-2">POST</span>
                  <span className="text-white font-bold">/api/v1/supplier/crops</span>
                  <p className="text-[11px] text-white/50 mt-1">Updates available harvest inventory and pricing range.</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold mr-2">POST</span>
                  <span className="text-white font-bold">/api/v1/rfq/bid</span>
                  <p className="text-[11px] text-white/50 mt-1">Submits quotation bid to active buyer procurement request.</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold mr-2">POST</span>
                  <span className="text-white font-bold">/api/v1/documents/upload</span>
                  <p className="text-[11px] text-white/50 mt-1">Generates cryptographic SHA-256 verification hash for export certs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: ADD FARM PLOT */}
      {showAddFarmModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-[32px] bg-[#091f15] border border-white/20 space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white uppercase">Register Farm Location & GPS Polygon</h3>
              <button onClick={() => setShowAddFarmModal(false)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddFarmSubmit} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-white/60 uppercase font-bold">Farm Plot Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ashanti Central Sector B"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-white/60 uppercase font-bold">Latitude</label>
                  <input
                    type="text"
                    placeholder="e.g. 6.6885"
                    value={farmLat}
                    onChange={(e) => setFarmLat(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/60 uppercase font-bold">Longitude</label>
                  <input
                    type="text"
                    placeholder="e.g. -1.6244"
                    value={farmLng}
                    onChange={(e) => setFarmLng(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-white/60 uppercase font-bold">Plot Hectares</label>
                <input
                  type="number"
                  placeholder="e.g. 250"
                  value={farmHectares}
                  onChange={(e) => setFarmHectares(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/60 uppercase font-bold">GPS Polygon Boundary Coordinates (Optional)</label>
                <textarea
                  placeholder="[ { lat: 6.691, lng: -1.628 }, ... ]"
                  value={farmGpsPolygonStr}
                  onChange={(e) => setFarmGpsPolygonStr(e.target.value)}
                  rows={2}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white font-mono text-[11px]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddFarmModal(false)}
                  className="px-5 py-2.5 rounded-full bg-white/10 text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#10B981] text-[#05110B] font-extrabold shadow-lg"
                >
                  Save Farm Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: UPLOAD CERTIFICATE DOCUMENT */}
      {showUploadDocModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-[32px] bg-[#091f15] border border-white/20 space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white uppercase">Upload Compliance Document</h3>
              <button onClick={() => setShowUploadDocModal(false)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadDocSubmit} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-white/60 uppercase font-bold">Document Title</label>
                <input
                  type="text"
                  placeholder="e.g. Phytosanitary Sanitation Clearance"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/60 uppercase font-bold">Issuing Authority</label>
                <input
                  type="text"
                  placeholder="e.g. Ministry of Food & Agriculture"
                  value={docIssuer}
                  onChange={(e) => setDocIssuer(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/60 uppercase font-bold">Expiry Date</label>
                <input
                  type="date"
                  value={docExpiry}
                  onChange={(e) => setDocExpiry(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white"
                />
              </div>

              <div className="p-6 border-2 border-dashed border-white/20 rounded-2xl text-center space-y-2 cursor-pointer hover:border-[#10B981] transition-colors">
                <Upload className="w-6 h-6 text-[#10B981] mx-auto" />
                <span className="text-white/70 block">Drag and drop PDF/ZIP export file or click to browse</span>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadDocModal(false)}
                  className="px-5 py-2.5 rounded-full bg-white/10 text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#10B981] text-[#05110B] font-extrabold shadow-lg"
                >
                  Upload & Sign Hash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: SUBMIT BID QUOTATION */}
      {selectedRfq && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-[32px] bg-[#091f15] border border-white/20 space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] text-[#F59E0B] uppercase font-mono font-bold">Export Quotation Bid</span>
                <h3 className="text-lg font-bold text-white uppercase">{selectedRfq.quantityMT} MT {selectedRfq.crop}</h3>
              </div>
              <button onClick={() => setSelectedRfq(null)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBidSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-white/60 uppercase font-bold">Quoted Price ($/MT)</label>
                  <input
                    type="number"
                    value={bidPrice}
                    onChange={(e) => setBidPrice(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white text-sm font-bold text-[#10B981]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/60 uppercase font-bold">Offered Quantity (MT)</label>
                  <input
                    type="number"
                    value={bidQuantity}
                    onChange={(e) => setBidQuantity(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white text-sm font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-white/60 uppercase font-bold">Estimated Shipment Date</label>
                <input
                  type="date"
                  value={bidShipDate}
                  onChange={(e) => setBidShipDate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/60 uppercase font-bold">Incoterm Offered</label>
                <select
                  value={bidIncoterms}
                  onChange={(e) => setBidIncoterms(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white"
                >
                  <option value="FOB">FOB (Free On Board - Takoradi / Mombasa Port)</option>
                  <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                  <option value="CFR">CFR (Cost & Freight)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-white/60 uppercase font-bold">Notes to Buyer</label>
                <textarea
                  value={bidNotes}
                  onChange={(e) => setBidNotes(e.target.value)}
                  placeholder="e.g. COCOBOD Grade 1 certified. Pre-cleared for EUDR zero-deforestation."
                  rows={2}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRfq(null)}
                  className="px-5 py-2.5 rounded-full bg-white/10 text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#10B981] text-[#05110B] font-extrabold shadow-lg"
                >
                  Transmit Official Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DRAWER / MODAL 4: BUYER CHAT MESSAGING */}
      {activeChatRfq && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl p-6 rounded-[32px] bg-[#091f15] border border-white/20 space-y-4 flex flex-col h-[500px]">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-white">{activeChatRfq.buyerCompany}</h3>
                <p className="text-xs text-[#10B981] font-mono">RFQ #{activeChatRfq.id} • {activeChatRfq.crop}</p>
              </div>
              <button onClick={() => setActiveChatRfq(null)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-black/40 rounded-2xl border border-white/10">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`p-3 rounded-xl text-xs space-y-1 max-w-[85%] ${
                  msg.sender.startsWith('You')
                    ? 'ml-auto bg-[#10B981]/20 border border-[#10B981]/40 text-white'
                    : 'mr-auto bg-white/10 border border-white/10 text-white/90'
                }`}>
                  <div className="flex justify-between text-[10px] text-white/50 font-mono">
                    <span className="font-bold">{msg.sender}</span>
                    <span>{msg.time}</span>
                  </div>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="flex gap-2 pt-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type message to buyer..."
                className="flex-1 p-3 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none focus:border-[#10B981]"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-[#10B981] text-[#05110B] font-extrabold text-xs shadow-lg"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
