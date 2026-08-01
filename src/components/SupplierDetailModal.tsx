import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  Download, 
  FileText, 
  Building2, 
  UserCheck, 
  Globe2, 
  Send,
  Lock,
  Calendar,
  Layers,
  Check,
  Award
} from 'lucide-react';
import { Supplier } from '../types';

interface SupplierDetailModalProps {
  supplier: Supplier | null;
  onClose: () => void;
  onSubmitRfqForSupplier: (supplier: Supplier, quantityMT: number, targetPrice: number) => void;
}

export const SupplierDetailModal: React.FC<SupplierDetailModalProps> = ({
  supplier,
  onClose,
  onSubmitRfqForSupplier,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'gps' | 'documents' | 'audits' | 'rfq'>('overview');
  const [rfqQuantity, setRfqQuantity] = useState<number>(25);
  const [targetPrice, setTargetPrice] = useState<number>(supplier ? supplier.pricePerTonUSD.min : 4000);
  const [rfqSuccess, setRfqSuccess] = useState<boolean>(false);

  if (!supplier) return null;

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitRfqForSupplier(supplier, rfqQuantity, targetPrice);
    setRfqSuccess(true);
    setTimeout(() => {
      setRfqSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#05110B]/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-[32px] bg-[#05110B] border border-white/20 shadow-2xl overflow-hidden flex flex-col my-8 max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="relative h-44 bg-[#05110B] overflow-hidden shrink-0">
          <img
            src={supplier.coverImageUrl}
            alt={supplier.name}
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05110B] via-[#05110B]/60 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-[#05110B]/80 hover:bg-white/10 text-white border border-white/20 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-[#05110B] border border-[#10B981]/40 p-1 shrink-0 shadow-lg">
                <img
                  src={supplier.logoUrl}
                  alt={supplier.name}
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase">{supplier.name}</span>
                  <span className="text-lg">{supplier.flagEmoji}</span>
                </div>
                <p className="text-xs text-[#10B981] font-mono mt-0.5">{supplier.region}, {supplier.country}</p>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-end">
              <div className="px-3.5 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] text-xs font-bold flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>SEL VERIFIED {supplier.verificationScore}/100</span>
              </div>
              <span className="text-[10px] text-white/40 font-mono mt-1 font-bold uppercase tracking-wider">EUDR & GlobalGAP Audited</span>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center space-x-1 px-6 border-b border-white/10 bg-[#05110B] overflow-x-auto shrink-0 text-xs font-bold tracking-wider uppercase">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 px-4 border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-[#10B981] text-[#10B981] font-extrabold'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            Overview & Specs
          </button>
          <button
            onClick={() => setActiveTab('gps')}
            className={`py-3.5 px-4 border-b-2 transition-all ${
              activeTab === 'gps'
                ? 'border-[#10B981] text-[#10B981] font-extrabold'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            GPS Plots ({supplier.gpsBoundaries.length})
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-3.5 px-4 border-b-2 transition-all ${
              activeTab === 'documents'
                ? 'border-[#10B981] text-[#10B981] font-extrabold'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            Document Vault ({supplier.documents.length})
          </button>
          <button
            onClick={() => setActiveTab('audits')}
            className={`py-3.5 px-4 border-b-2 transition-all ${
              activeTab === 'audits'
                ? 'border-[#10B981] text-[#10B981] font-extrabold'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            Audits ({supplier.auditHistory.length})
          </button>
          <button
            onClick={() => setActiveTab('rfq')}
            className={`py-3.5 px-4 border-b-2 transition-all text-[#F59E0B] font-extrabold ${
              activeTab === 'rfq'
                ? 'border-[#F59E0B] text-[#F59E0B]'
                : 'border-transparent hover:text-[#F59E0B]/80'
            }`}
          >
            Request Quote
          </button>
        </div>

        {/* Modal Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-white text-sm">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs uppercase font-bold tracking-widest text-[#10B981]">Cooperative Statement</span>
                <p className="text-xs text-white/80 leading-relaxed italic font-light">
                  "{supplier.tagline}"
                </p>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 font-mono">
                  <span className="text-[10px] text-white/40 uppercase font-bold block">Farm Size</span>
                  <span className="text-lg font-bold text-white">{supplier.farmSizeHectares.toLocaleString()} Hectares</span>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 font-mono">
                  <span className="text-[10px] text-white/40 uppercase font-bold block">Co-op Farmers</span>
                  <span className="text-lg font-bold text-white">{supplier.cooperativeMembers.toLocaleString()} Members</span>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 font-mono">
                  <span className="text-[10px] text-white/40 uppercase font-bold block">Annual Capacity</span>
                  <span className="text-lg font-bold text-[#10B981]">{supplier.annualCapacityMT.toLocaleString()} MT</span>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 font-mono">
                  <span className="text-[10px] text-white/40 uppercase font-bold block">Export History</span>
                  <span className="text-lg font-bold text-[#F59E0B]">{supplier.yearsInExport} Years</span>
                </div>
              </div>

              {/* Harvest Window & Destinations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center">
                    <Calendar className="w-4 h-4 text-[#10B981] mr-2" />
                    Harvest Calendar
                  </h4>
                  <p className="text-xs text-white/80 font-medium">{supplier.harvestWindow}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center">
                    <Globe2 className="w-4 h-4 text-[#10B981] mr-2" />
                    Past Export Ports
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {supplier.pastDestinations.map((dest) => (
                      <span key={dest} className="px-2.5 py-1 rounded-lg bg-white/10 text-xs text-white/90 font-mono">
                        {dest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct Contact Person */}
              <div className="p-4 rounded-2xl bg-white/5 border border-[#10B981]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#10B981] font-bold">Verified Contact Officer</span>
                  <h5 className="text-sm font-bold text-white">{supplier.contactPerson.name}</h5>
                  <p className="text-xs text-white/60">{supplier.contactPerson.role}</p>
                </div>
                <div className="text-xs font-mono text-white/80 space-y-1">
                  <div>Email: {supplier.contactPerson.email}</div>
                  <div>Phone: {supplier.contactPerson.phone}</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GPS FARM BOUNDARIES */}
          {activeTab === 'gps' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center uppercase tracking-tight">
                    <MapPin className="w-4 h-4 text-[#10B981] mr-2" />
                    EUDR Polygon Coordinates Mapping
                  </h4>
                  <p className="text-xs text-white/60 mt-0.5 font-light">
                    Verified polygon perimeter for satellite EUDR deforestation cross-validation.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-xs font-bold font-mono">
                  ✓ VERIFIED ON-CHAIN
                </span>
              </div>

              {/* Simulated Map Visual Box */}
              <div className="h-64 rounded-2xl bg-black/50 border border-[#10B981]/30 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                <div className="relative text-center space-y-2 p-6 bg-[#05110B]/90 rounded-2xl border border-white/10 max-w-md">
                  <span className="text-xs font-mono text-[#10B981] font-bold block uppercase tracking-widest">GPS CENTROID LOCATION</span>
                  <div className="text-xl font-mono font-extrabold text-white">
                    {supplier.locationCoordinates.lat.toFixed(4)}° N, {supplier.locationCoordinates.lng.toFixed(4)}° E
                  </div>
                  <p className="text-xs text-white/60 font-light">
                    4 Polygon Boundary vertices logged by Field Agent audit on {supplier.auditHistory[0]?.date || '2026-06-12'}.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {supplier.gpsBoundaries.map((vertex, i) => (
                  <div key={i} className="p-3 rounded-xl bg-black/40 border border-white/10 flex justify-between">
                    <span className="text-white/40">Vertex #{i + 1}:</span>
                    <span className="text-[#10B981] font-bold">{vertex.latitude.toFixed(4)}°, {vertex.longitude.toFixed(4)}°</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DOCUMENT VAULT */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/60 font-light">
                All regulatory export certificates are cryptographically verified with SHA-256 ledger checksums.
              </div>

              <div className="space-y-3">
                {supplier.documents.map((doc) => (
                  <div key={doc.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#10B981]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-[#10B981]" />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-white">{doc.name}</h5>
                        <p className="text-xs text-white/60">{doc.type} • Issued by: {doc.issuedBy}</p>
                        <div className="text-[10px] text-[#F59E0B] font-mono mt-1">
                          Hash: {doc.verifiedHash}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-xs font-mono shrink-0">
                      <span className="text-white/50">Exp: {doc.expiryDate}</span>
                      <button
                        onClick={() => alert(`Downloading verified document: ${doc.name}`)}
                        className="px-4 py-1.5 rounded-full bg-[#10B981] text-[#05110B] font-bold flex items-center space-x-1 hover:brightness-110"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FIELD AUDIT HISTORY */}
          {activeTab === 'audits' && (
            <div className="space-y-4">
              {supplier.auditHistory.map((audit) => (
                <div key={audit.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <h5 className="text-sm font-bold text-white">{audit.agentName}</h5>
                      <span className="text-xs text-white/50">Agent ID: {audit.agentId} • Date: {audit.date}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] text-xs font-bold font-mono border border-[#10B981]/30">
                      AUDIT SCORE: {audit.score}/100
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                      <span className="text-white/40 text-[10px] block uppercase font-bold">Soil Purity</span>
                      <span className="text-[#10B981] font-bold">{audit.soilPurityScore}/100</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                      <span className="text-white/40 text-[10px] block uppercase font-bold">Child Labor Audit</span>
                      <span className="text-[#10B981] font-bold">{audit.childLaborAudit}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                      <span className="text-white/40 text-[10px] block uppercase font-bold">Water Mgmt</span>
                      <span className="text-[#10B981] font-bold">{audit.waterManagementScore}/100</span>
                    </div>
                  </div>

                  <p className="text-xs text-white/70 italic font-light">
                    "{audit.comments}"
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: RFQ SUBMISSION */}
          {activeTab === 'rfq' && (
            <form onSubmit={handleRfqSubmit} className="space-y-4 max-w-xl mx-auto py-2">
              {rfqSuccess ? (
                <div className="p-6 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/40 text-center space-y-2">
                  <Check className="w-8 h-8 mx-auto text-[#10B981]" />
                  <h4 className="text-base font-bold text-white uppercase tracking-tight">RFQ Submitted to {supplier.name}</h4>
                  <p className="text-xs text-[#10B981]">
                    The export sales lead will respond with formal trade quotation within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/80 space-y-1">
                    <span className="font-bold text-[#F59E0B] block uppercase tracking-wider">Direct Supplier Quote Request</span>
                    <span className="font-light">Submit your required volume and target price per metric ton.</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-1">Quantity (MT)</label>
                      <input
                        type="number"
                        min={supplier.minimumOrderQuantityMT}
                        max={supplier.availableStockMT}
                        value={rfqQuantity}
                        onChange={(e) => setRfqQuantity(Number(e.target.value))}
                        className="w-full p-3 rounded-xl bg-[#05110B] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-[#10B981]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-1">Target Price ($/MT)</label>
                      <input
                        type="number"
                        value={targetPrice}
                        onChange={(e) => setTargetPrice(Number(e.target.value))}
                        className="w-full p-3 rounded-xl bg-[#05110B] border border-white/10 text-[#F59E0B] font-mono text-sm focus:outline-none focus:border-[#10B981]"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#10B981] hover:brightness-110 text-[#05110B] font-extrabold text-sm flex items-center justify-center space-x-2 shadow-lg transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit RFQ to {supplier.name}</span>
                  </button>
                </>
              )}
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
