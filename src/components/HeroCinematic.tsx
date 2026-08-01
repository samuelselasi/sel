import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  ArrowRight, 
  MapPin, 
  CheckCircle, 
  FileCheck2, 
  Sparkles,
  TrendingUp,
  Award,
  Lock,
  Compass,
  Building2,
  Globe2,
  Zap
} from 'lucide-react';

interface HeroCinematicProps {
  onExploreSuppliers: () => void;
  onSubmitRfq: () => void;
  onOpenMap: () => void;
  onViewArchitecture: () => void;
}

export const HeroCinematic: React.FC<HeroCinematicProps> = ({
  onExploreSuppliers,
  onSubmitRfq,
  onOpenMap,
  onViewArchitecture,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const backgroundSlides = [
    {
      title: 'Sustainable Cocoa & Coffee Canopy',
      region: 'Ashanti Belt, Ghana & Rift Valley, Kenya',
      url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=1920&auto=format&fit=crop'
    },
    {
      title: 'Single-Origin Coffee Highland Harvest',
      region: 'Nyeri County, Kenya & Oromia, Ethiopia',
      url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1920&auto=format&fit=crop'
    },
    {
      title: 'High-Yield Organic Cashew & Sesame Belts',
      region: 'Mtwara, Tanzania & Kano, Nigeria',
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1920&auto=format&fit=crop'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % backgroundSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Floating ambient light particles generator
  const particles = Array.from({ length: 18 });

  return (
    <div className="relative min-h-[70vh] lg:min-h-[76vh] flex flex-col justify-center overflow-hidden bg-[#05110B] text-white">
      {/* Dynamic Animated Background Image Slider with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={backgroundSlides[activeSlideIndex].url}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.3, scale: 1.02 }}
          exit={{ opacity: 0, scale: 1.0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={backgroundSlides[activeSlideIndex].url}
            alt={backgroundSlides[activeSlideIndex].title}
            className="w-full h-full object-cover filter brightness-90 contrast-110"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      {/* Floating Kinetic Ambient Glowing Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[550px] h-[550px] bg-[#103D27] rounded-full blur-[140px] opacity-60 pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1.1, 1, 1.1],
          x: [0, -40, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-[#0E5431] rounded-full blur-[120px] opacity-60 pointer-events-none" 
      />

      {/* Animated Glowing Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * 800,
              opacity: Math.random() * 0.5 + 0.2,
              scale: Math.random() * 0.8 + 0.5
            }}
            animate={{
              y: [null, Math.random() * -300],
              x: [null, (i % 2 === 0 ? 1 : -1) * Math.random() * 100],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 10 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]"
          />
        ))}
      </div>

      {/* Glass Dark Overlay Matrix */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05110B] via-[#05110B]/60 to-[#05110B]/30 pointer-events-none z-[1]" />

      {/* Main Hero Content Frame */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Action */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-5 text-left"
          >
            {/* Category Pill */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#10B981]/15 border border-[#10B981]/30 rounded-full text-[#10B981] text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              </motion.div>
              <span>SUSTAINABLE EXPORT LINK</span>
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping ml-1" />
            </motion.div>

            {/* Compact Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05] uppercase"
            >
              Connecting Africa's <br className="hidden sm:inline" />
              <motion.span 
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-white via-[#10B981] to-[#F59E0B]"
              >
                Agri-Supply
              </motion.span> Globally.
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm sm:text-base lg:text-lg text-white/70 max-w-xl leading-relaxed font-light"
            >
              SEL connects verified African cooperatives to global importers with EUDR-compliant GPS tracking, spot price feeds, and direct RFQ trading.
            </motion.p>

            {/* Interactive Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <motion.button
                onClick={onExploreSuppliers}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 sm:px-7 py-3.5 rounded-full bg-[#10B981] text-[#05110B] font-extrabold text-xs sm:text-sm flex items-center space-x-2.5 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:bg-[#12d292] transition-all uppercase tracking-wider cursor-pointer group"
              >
                <span>Explore Suppliers</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={onSubmitRfq}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="px-5 sm:px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-extrabold text-xs sm:text-sm flex items-center space-x-2 transition-all uppercase tracking-wider cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4 text-[#F59E0B]" />
                <span>Verify Co-op</span>
              </motion.button>

              <motion.button
                onClick={onOpenMap}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="px-4 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 border border-white/15 backdrop-blur-md font-semibold text-xs flex items-center space-x-2 transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#10B981]" />
                <span>Map</span>
              </motion.button>
            </motion.div>

            {/* Quick Metrics Banner */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10"
            >
              <motion.div whileHover={{ scale: 1.03 }} className="space-y-0.5">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#F59E0B]">50+</div>
                <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Verified Co-ops</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} className="space-y-0.5">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#10B981]">20+</div>
                <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Crops & Commodities</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} className="space-y-0.5">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">10+</div>
                <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Export Nations</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} className="space-y-0.5">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#10B981]">$42M+</div>
                <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Audited Volume</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Kinetic Vision Glass Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4"
          >
            
            {/* Live Verification Glass Card with Floating Parallax */}
            <motion.div 
              whileHover={{ y: -6, borderColor: 'rgba(16, 185, 129, 0.5)' }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-6 sm:p-8 rounded-[32px] backdrop-blur-2xl bg-white/5 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6 relative overflow-hidden group"
            >
              {/* Subtle animated shine line effect */}
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">SEL Verification Standard</h3>
                    <p className="text-[11px] text-white/50">Ground-truth audit + Satellite GPS hash</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                  98.6% VERIFIED
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-xs space-y-2.5 font-mono relative">
                <div className="flex justify-between text-white/80">
                  <span>Purity / Moisture:</span>
                  <span className="text-[#10B981] font-bold">&lt;7.8% (Grade 1 Export)</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>EUDR Satellite Check:</span>
                  <span className="text-[#10B981] font-bold">100% Zero Deforestation</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Proof Hash:</span>
                  <span className="text-[#F59E0B] truncate max-w-[140px]">0x8f9c7a2e4b11...</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-white/50 pt-1">
                <span className="flex items-center text-[#10B981] font-medium">
                  <CheckCircle className="w-3.5 h-3.5 mr-1" />
                  GlobalGAP & Organic Certified
                </span>
                <motion.button
                  onClick={onViewArchitecture}
                  whileHover={{ scale: 1.08, x: 2 }}
                  className="text-[#F59E0B] hover:underline text-xs flex items-center font-bold cursor-pointer"
                >
                  <span>Specs</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </motion.button>
              </div>
            </motion.div>

            {/* Drone Aerial Location Preview Glass Card with Kinetic Crossfade */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-5 rounded-[28px] backdrop-blur-xl bg-white/5 border border-white/15 shadow-xl flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#10B981]/40 shrink-0 relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={backgroundSlides[activeSlideIndex].url}
                      initial={{ opacity: 0, scale: 1.2 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      src={backgroundSlides[activeSlideIndex].url}
                      alt="Active Region Preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                </div>
                <div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Live Drone Focus</div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={backgroundSlides[activeSlideIndex].title}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="text-xs font-bold text-white truncate max-w-[200px]"
                    >
                      {backgroundSlides[activeSlideIndex].title}
                    </motion.div>
                  </AnimatePresence>
                  <div className="text-[11px] text-[#10B981] flex items-center mt-0.5">
                    <Compass className="w-3 h-3 mr-1 animate-spin" style={{ animationDuration: '8s' }} />
                    {backgroundSlides[activeSlideIndex].region}
                  </div>
                </div>
              </div>

              <div className="flex space-x-1.5">
                {backgroundSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlideIndex(i)}
                    className="relative p-1 cursor-pointer"
                  >
                    <span className={`block rounded-full transition-all duration-300 ${
                      i === activeSlideIndex 
                        ? 'bg-[#10B981] w-5 h-2 shadow-[0_0_8px_#10B981]' 
                        : 'bg-white/30 hover:bg-white/60 w-2 h-2'
                    }`} />
                  </button>
                ))}
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </div>
  );
};

