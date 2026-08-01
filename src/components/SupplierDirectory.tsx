import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  Award, 
  FileText, 
  ArrowUpRight, 
  SlidersHorizontal,
  Sparkles,
  Search,
  Check,
  Globe2,
  Calendar,
  Layers,
  Scale
} from 'lucide-react';
import { Supplier, CropCategory, CertificationType, VerificationStatus, UserProfile, UserRole } from '../types';
import { Lock, UserCheck } from 'lucide-react';

interface SupplierDirectoryProps {
  suppliers: Supplier[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectSupplier: (supplier: Supplier) => void;
  onRequestQuoteForSupplier: (supplier: Supplier) => void;
  currentUser?: UserProfile | null;
  onOpenAuthModal?: (role?: UserRole) => void;
}

export const SupplierDirectory: React.FC<SupplierDirectoryProps> = ({
  suppliers,
  searchQuery,
  setSearchQuery,
  onSelectSupplier,
  onRequestQuoteForSupplier,
  currentUser,
  onOpenAuthModal,
}) => {
  const [selectedCrop, setSelectedCrop] = useState<string>('ALL');
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [selectedVerification, setSelectedVerification] = useState<string>('ALL');
  const [maxMoq, setMaxMoq] = useState<number>(100);

  const cropCategories: { label: string; value: string }[] = [
    { label: 'All Crops', value: 'ALL' },
    { label: 'Cocoa', value: 'Cocoa' },
    { label: 'Coffee', value: 'Coffee' },
    { label: 'Cashew', value: 'Cashew' },
    { label: 'Sesame', value: 'Sesame' },
    { label: 'Avocado', value: 'Avocado' },
    { label: 'Tea', value: 'Tea' },
    { label: 'Shea Butter', value: 'Shea Butter' },
  ];

  const countries = [
    { label: 'All Countries', value: 'ALL' },
    { label: 'Ghana 🇬🇭', value: 'Ghana' },
    { label: 'Kenya 🇰🇪', value: 'Kenya' },
    { label: 'Tanzania 🇹🇿', value: 'Tanzania' },
    { label: 'Nigeria 🇳🇬', value: 'Nigeria' },
    { label: 'Ethiopia 🇪🇹', value: 'Ethiopia' },
    { label: "Côte d'Ivoire 🇨🇮", value: "Côte d'Ivoire" },
    { label: 'Uganda 🇺🇬', value: 'Uganda' },
  ];

  const filteredSuppliers = suppliers.filter((supplier) => {
    // Crop filter
    if (selectedCrop !== 'ALL' && supplier.primaryCrop !== selectedCrop && !supplier.secondaryCrops.includes(selectedCrop as CropCategory)) {
      return false;
    }
    // Country filter
    if (selectedCountry !== 'ALL' && supplier.country !== selectedCountry) {
      return false;
    }
    // Verification filter
    if (selectedVerification !== 'ALL' && supplier.verificationStatus !== selectedVerification) {
      return false;
    }
    // MOQ filter
    if (supplier.minimumOrderQuantityMT > maxMoq) {
      return false;
    }
    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = 
        supplier.name.toLowerCase().includes(q) ||
        supplier.tagline.toLowerCase().includes(q) ||
        supplier.region.toLowerCase().includes(q) ||
        supplier.country.toLowerCase().includes(q) ||
        supplier.primaryCrop.toLowerCase().includes(q) ||
        supplier.certifications.some(c => c.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6"
      >
        <div>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Verified Supplier Discovery Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            African Agricultural Cooperatives & Exporters
          </h2>
          <p className="text-white/60 text-sm mt-1 max-w-2xl font-light leading-relaxed">
            Browse fully audited suppliers with field-verified GPS farm plots, certified document vaults, and historical export performance.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs text-white/80 font-mono">
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#10B981] font-bold shadow-lg">
            {filteredSuppliers.length} Verified Suppliers Match
          </span>
        </div>
      </motion.div>

      {/* Filter Control Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="p-6 rounded-[28px] backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl space-y-4"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-widest flex items-center">
            <SlidersHorizontal className="w-4 h-4 mr-2 text-[#10B981]" />
            Smart Filters & Search
          </span>
          {(selectedCrop !== 'ALL' || selectedCountry !== 'ALL' || selectedVerification !== 'ALL' || searchQuery !== '') && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedCrop('ALL');
                setSelectedCountry('ALL');
                setSelectedVerification('ALL');
                setMaxMoq(100);
                setSearchQuery('');
              }}
              className="text-xs text-[#F59E0B] hover:underline font-bold tracking-wide cursor-pointer"
            >
              Reset Filters
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Crop Filter Dropdown */}
          <div>
            <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1">Crop Type</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#05110B] border border-white/10 text-white text-xs focus:outline-none focus:border-[#10B981] cursor-pointer"
            >
              {cropCategories.map((c) => (
                <option key={c.value} value={c.value} className="bg-[#05110B] text-white">
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Country Filter Dropdown */}
          <div>
            <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1">Origin Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#05110B] border border-white/10 text-white text-xs focus:outline-none focus:border-[#10B981] cursor-pointer"
            >
              {countries.map((c) => (
                <option key={c.value} value={c.value} className="bg-[#05110B] text-white">
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Verification Badge Filter */}
          <div>
            <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1">Verification Level</label>
            <select
              value={selectedVerification}
              onChange={(e) => setSelectedVerification(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#05110B] border border-white/10 text-white text-xs focus:outline-none focus:border-[#10B981] cursor-pointer"
            >
              <option value="ALL" className="bg-[#05110B] text-white">All Levels</option>
              <option value="VERIFIED_GOLD" className="bg-[#05110B] text-white">Verified Gold (95%+ Score)</option>
              <option value="VERIFIED_SILVER" className="bg-[#05110B] text-white">Verified Silver (85%+ Score)</option>
            </select>
          </div>

          {/* Max MOQ Slider */}
          <div>
            <div className="flex justify-between items-center text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1">
              <span>Max MOQ (Metric Tons)</span>
              <span className="text-[#10B981] font-mono font-bold">{maxMoq} MT</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={maxMoq}
              onChange={(e) => setMaxMoq(Number(e.target.value))}
              className="w-full accent-[#10B981] bg-[#05110B] rounded-lg cursor-pointer h-2"
            />
          </div>
        </div>
      </motion.div>

      {/* Supplier Cards Grid with Layout Animations or Gated View */}
      {!currentUser ? (
        <div className="relative rounded-[32px] overflow-hidden border border-emerald-500/30 p-8 bg-gradient-to-b from-[#0A1E14]/80 to-[#05110B]/90 backdrop-blur-2xl">
          {/* Blurred Teaser Grid in Background */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 filter blur-md opacity-30 select-none pointer-events-none">
            {filteredSuppliers.slice(0, 3).map((supplier) => (
              <div key={supplier.id} className="p-6 rounded-[28px] bg-white/5 border border-white/10 space-y-4">
                <div className="h-40 bg-white/10 rounded-2xl" />
                <div className="h-6 w-3/4 bg-white/20 rounded-lg" />
                <div className="h-4 w-1/2 bg-white/10 rounded-lg" />
                <div className="h-10 w-full bg-[#10B981]/20 rounded-xl" />
              </div>
            ))}
          </div>

          {/* Centered Login Gate Modal Box */}
          <div className="absolute inset-0 flex items-center justify-center p-6 z-20 bg-[#05110B]/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-md w-full p-8 rounded-[32px] bg-[#0A1E14] border-2 border-[#10B981]/50 shadow-[0_25px_70px_rgba(0,0,0,0.9)] text-center space-y-5"
            >
              <div className="w-16 h-16 mx-auto rounded-3xl bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center text-[#10B981] shadow-xl">
                <Lock className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] text-[10px] font-mono font-bold uppercase tracking-widest border border-[#10B981]/30">
                  Authentication Required
                </span>
                <h3 className="text-xl font-extrabold text-white">Sign In to View Supplier Directory</h3>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  Full cooperative profiles, GPS farm polygon coordinates, harvest volumes, and certified document vaults are protected and restricted to authenticated platform members.
                </p>
              </div>

              <button
                onClick={() => onOpenAuthModal && onOpenAuthModal('buyer')}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#10B981] hover:bg-[#12d292] text-[#05110B] text-xs font-extrabold flex items-center justify-center space-x-2 shadow-xl transition-all cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>Sign In to Access Directory</span>
              </button>
            </motion.div>
          </div>
        </div>
      ) : filteredSuppliers.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-12 text-center rounded-[28px] bg-white/5 border border-white/10 text-white/60 space-y-3"
        >
          <Building2 className="w-10 h-10 mx-auto text-white/40" />
          <h3 className="text-lg font-bold text-white uppercase tracking-tight">No Verified Suppliers Found</h3>
          <p className="text-xs max-w-md mx-auto">
            Try adjusting your search query, crop filter, or minimum order quantity threshold.
          </p>
        </motion.div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredSuppliers.map((supplier) => (
              <motion.div
                key={supplier.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className="group rounded-[28px] backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl overflow-hidden hover:border-[#10B981]/50 hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Cover Image & Header Overlay */}
                <div className="relative h-48 overflow-hidden bg-[#05110B]">
                  <motion.img
                    src={supplier.coverImageUrl}
                    alt={supplier.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05110B] via-[#05110B]/40 to-transparent" />

                  {/* Country Flag & Verification Pill */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                    <span className="px-3 py-1 rounded-full bg-[#05110B]/80 border border-white/20 backdrop-blur-md text-xs font-semibold text-white flex items-center space-x-1.5 shadow-md">
                      <span className="text-base">{supplier.flagEmoji}</span>
                      <span>{supplier.country}</span>
                    </span>

                    <span className="px-3 py-1 rounded-full bg-[#05110B]/90 border border-[#10B981]/50 backdrop-blur-md text-[#10B981] text-xs font-bold flex items-center space-x-1 shadow-lg">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>SEL {supplier.verificationScore}/100</span>
                    </span>
                  </div>

                  {/* Crop Badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-3 py-1 rounded-xl bg-[#10B981] text-[#05110B] font-extrabold text-xs uppercase tracking-wider font-mono shadow-md">
                      {supplier.primaryCrop}
                    </span>
                  </div>
                </div>

                {/* Main Info Body */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-white group-hover:text-[#10B981] transition-colors line-clamp-1">
                      {supplier.name}
                    </h3>
                    <p className="text-xs text-white/60 line-clamp-2 mt-1 italic font-light">
                      "{supplier.tagline}"
                    </p>

                    <div className="mt-3 flex items-center text-xs text-white/80 space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                      <span className="truncate">{supplier.region}</span>
                    </div>
                  </div>

                  {/* Metrics Breakdown */}
                  <div className="grid grid-cols-2 gap-2 p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono">
                    <div>
                      <span className="text-white/40 text-[10px] block font-bold uppercase">Annual Capacity</span>
                      <span className="text-white font-bold">{supplier.annualCapacityMT.toLocaleString()} MT</span>
                    </div>
                    <div>
                      <span className="text-white/40 text-[10px] block font-bold uppercase">Available Stock</span>
                      <span className="text-[#10B981] font-bold">{supplier.availableStockMT.toLocaleString()} MT</span>
                    </div>
                    <div>
                      <span className="text-white/40 text-[10px] block font-bold uppercase">Spot Price</span>
                      <span className="text-[#F59E0B] font-bold">${supplier.pricePerTonUSD.min} - ${supplier.pricePerTonUSD.max}/MT</span>
                    </div>
                    <div>
                      <span className="text-white/40 text-[10px] block font-bold uppercase">Min Order (MOQ)</span>
                      <span className="text-white/90 font-bold">{supplier.minimumOrderQuantityMT} MT</span>
                    </div>
                  </div>

                  {/* Certifications Badges */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Verified Certs:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {supplier.certifications.slice(0, 3).map((cert) => (
                        <span
                          key={cert}
                          className="px-2 py-0.5 rounded-md bg-[#10B981]/10 border border-[#10B981]/20 text-[10px] text-[#10B981] font-semibold"
                        >
                          ✓ {cert}
                        </span>
                      ))}
                      {supplier.certifications.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-white/10 text-[10px] text-white/50 font-bold">
                          +{supplier.certifications.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-2 flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onSelectSupplier(supplier)}
                      className="flex-1 py-2.5 px-3 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-bold flex items-center justify-center space-x-1.5 border border-white/10 transition-all cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Audit & GPS Vault</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onRequestQuoteForSupplier(supplier)}
                      className="py-2.5 px-4 rounded-full bg-[#10B981] hover:brightness-110 text-[#05110B] text-xs font-extrabold flex items-center justify-center space-x-1 shadow-md transition-all cursor-pointer"
                    >
                      <span>Request Quote</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

