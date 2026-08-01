import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Filter, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  SlidersHorizontal,
  Building2,
  Calendar,
  Award
} from 'lucide-react';
import { Supplier, CropCategory } from '../types';

interface SupplierDiscoveryPreviewProps {
  suppliers: Supplier[];
  onSelectSupplier: (supplier: Supplier) => void;
  onRequestQuote: (supplier: Supplier) => void;
  onExploreAll: () => void;
}

export const SupplierDiscoveryPreview: React.FC<SupplierDiscoveryPreviewProps> = ({
  suppliers,
  onSelectSupplier,
  onRequestQuote,
  onExploreAll,
}) => {
  const [cropFilter, setCropFilter] = useState<string>('ALL');
  const [locationFilter, setLocationFilter] = useState<string>('ALL');
  const [minQuantity, setMinQuantity] = useState<string>('');
  const [certificationFilter, setCertificationFilter] = useState<string>('ALL');

  const locations = Array.from(new Set(suppliers.map(s => s.country)));

  const filteredSuppliers = suppliers.filter(s => {
    if (cropFilter !== 'ALL' && s.primaryCrop !== cropFilter) return false;
    if (locationFilter !== 'ALL' && s.country !== locationFilter) return false;
    if (minQuantity && s.availableStockMT < parseInt(minQuantity, 10)) return false;
    if (certificationFilter !== 'ALL' && !s.certifications.includes(certificationFilter)) return false;
    return true;
  });

  return (
    <section className="relative py-20 bg-[#05110B] text-white overflow-hidden border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#10B981]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-[11px] font-bold tracking-[0.2em] uppercase">
            <Search className="w-3.5 h-3.5" />
            <span>INSTANT SUPPLIER MATCHING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase">
            Supplier Discovery <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#10B981] to-[#F59E0B]">Engine</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed">
            Filter through ground-truth verified African agricultural cooperatives by crop, origin country, minimum volume capacity, and international certifications.
          </p>
        </div>

        {/* Glass Search Interface Box */}
        <div className="p-6 sm:p-8 rounded-[32px] bg-white/5 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-[#10B981]" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">Sourcing Query Parameters</span>
            </div>
            <span className="text-[11px] text-[#10B981] font-mono font-semibold">
              {filteredSuppliers.length} Verified Co-ops Matching
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Crop */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">Search Crop</label>
              <div className="relative">
                <select
                  value={cropFilter}
                  onChange={(e) => setCropFilter(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-[#05110B]/90 border border-white/10 text-xs text-white focus:outline-none focus:border-[#10B981] cursor-pointer appearance-none font-medium"
                >
                  <option value="ALL">All Agricultural Crops</option>
                  <option value="Cocoa">Cocoa Beans</option>
                  <option value="Coffee">Arabica & Robusta Coffee</option>
                  <option value="Cashew">Raw Cashew Nuts (RCN)</option>
                  <option value="Sesame">Organic Sesame Seeds</option>
                  <option value="Avocado">Hass Avocado</option>
                  <option value="Tea">Black & CTC Tea</option>
                  <option value="Spices">Dry Ginger & Spices</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-xs">▼</div>
              </div>
            </div>

            {/* Search Location */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">Search Location</label>
              <div className="relative">
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-[#05110B]/90 border border-white/10 text-xs text-white focus:outline-none focus:border-[#10B981] cursor-pointer appearance-none font-medium"
                >
                  <option value="ALL">All African Export Origins</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-xs">▼</div>
              </div>
            </div>

            {/* Required Quantity */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">Required Quantity (MT)</label>
              <input
                type="number"
                placeholder="e.g. 50"
                value={minQuantity}
                onChange={(e) => setMinQuantity(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-[#05110B]/90 border border-white/10 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#10B981] font-mono"
              />
            </div>

            {/* Certification */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">Certification</label>
              <div className="relative">
                <select
                  value={certificationFilter}
                  onChange={(e) => setCertificationFilter(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-[#05110B]/90 border border-white/10 text-xs text-white focus:outline-none focus:border-[#10B981] cursor-pointer appearance-none font-medium"
                >
                  <option value="ALL">Any Certification</option>
                  <option value="Rainforest Alliance">Rainforest Alliance</option>
                  <option value="Fairtrade">Fairtrade Certified</option>
                  <option value="USDA Organic">USDA Organic</option>
                  <option value="EU Organic">EU Organic</option>
                  <option value="GlobalGAP">GlobalGAP</option>
                  <option value="ISO 22000">ISO 22000 Food Safety</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-xs">▼</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Filter Result Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.slice(0, 3).map((supplier) => (
            <div
              key={supplier.id}
              className="p-6 rounded-[28px] bg-white/5 border border-white/10 hover:border-[#10B981]/40 backdrop-blur-xl transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{supplier.flagEmoji}</span>
                    <div>
                      <h3 className="text-base font-extrabold text-white tracking-tight group-hover:text-[#10B981] transition-colors">
                        {supplier.name}
                      </h3>
                      <p className="text-xs text-white/50 flex items-center mt-0.5">
                        <MapPin className="w-3 h-3 mr-1 text-[#10B981]" />
                        {supplier.region}, {supplier.country}
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                    SEL {supplier.verificationScore}
                  </span>
                </div>

                {/* Specs Pill Matrix */}
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono space-y-2">
                  <div className="flex justify-between text-white/80">
                    <span className="text-white/40 uppercase text-[10px] font-bold">Crop Spec:</span>
                    <span className="text-white font-bold">{supplier.primaryCrop}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span className="text-white/40 uppercase text-[10px] font-bold">Stock Capacity:</span>
                    <span className="text-[#10B981] font-bold">{supplier.availableStockMT.toLocaleString()} MT</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span className="text-white/40 uppercase text-[10px] font-bold">FOB Price Range:</span>
                    <span className="text-[#F59E0B] font-bold">${supplier.pricePerTonUSD.min} - ${supplier.pricePerTonUSD.max}/MT</span>
                  </div>
                </div>

                {/* Certifications Badges */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-white/40 block">Verified Compliance</span>
                  <div className="flex flex-wrap gap-1.5">
                    {supplier.certifications.map((c) => (
                      <span key={c} className="px-2.5 py-0.5 rounded-full text-[10px] bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 font-medium">
                        ✓ {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-4 border-t border-white/10 flex items-center gap-3">
                <button
                  onClick={() => onSelectSupplier(supplier)}
                  className="flex-1 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/10 text-center"
                >
                  Audit Details
                </button>
                <button
                  onClick={() => onRequestQuote(supplier)}
                  className="flex-1 py-2.5 rounded-full bg-[#10B981] hover:brightness-110 text-[#05110B] text-xs font-extrabold transition-all text-center shadow-lg"
                >
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Explore All Callout */}
        <div className="text-center pt-4">
          <button
            onClick={onExploreAll}
            className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/20 font-bold text-sm inline-flex items-center space-x-3 transition-all backdrop-blur-md group shadow-xl"
          >
            <span>View All {suppliers.length} Verified Cooperatives</span>
            <ArrowRight className="w-4 h-4 text-[#10B981] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
