import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  ShieldCheck, 
  FileCheck2, 
  MapPin, 
  Layers, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  Lock,
  Globe2,
  Tv,
  BookOpen,
  Info
} from 'lucide-react';

interface VideoTopic {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  keyTakeaways: string[];
  eudrArticle: string;
}

const EDUCATIONAL_VIDEOS: VideoTopic[] = [
  {
    id: 'eudr-mapping',
    title: 'EUDR Farm Boundary GPS Polygon Mapping',
    category: 'DEFORESTATION COMPLIANCE',
    duration: '02:15',
    description: 'Learn how on-ground field agents use satellite-synced mobile apps to walk farm perimeters, recording multi-point GPS coordinates required under EU Regulation 2023/1115 for zero-deforestation proof.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-[#000000]-41544-large.mp4', // sample HTML5 video stream
    posterUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=1200&auto=format&fit=crop',
    keyTakeaways: [
      'Multi-point polygon centroid capture for plots > 4 hectares',
      'Overlay with Copernicus & Landsat forest cover historical datasets (pre-2020 baseline)',
      'Automated Risk Assessment Certificate generation for EU Customs'
    ],
    eudrArticle: 'Article 9 & 10: Polygon Geolocation Requirements'
  },
  {
    id: 'direct-escrow',
    title: 'Direct Cooperative Sourcing & Escrow Settlements',
    category: 'COMMERCIAL TRANSPARENCY',
    duration: '01:45',
    description: 'Discover how global importers bypass intermediary brokers by issuing binding digital RFQs directly to verified African farming unions, securing spot rates with smart contract escrow.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-coffee-beans-falling-in-a-roaster-41527-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop',
    keyTakeaways: [
      'Direct pricing transparency disintermediating 3 to 5 middle brokers',
      'Escrow fund release triggered automatically upon port Bill of Lading emission',
      'Fair Premium guarantees paid directly to farmer mobile wallets'
    ],
    eudrArticle: 'Direct Trade Framework & Sustainable Farm Incomes'
  },
  {
    id: 'container-tracking',
    title: 'End-to-End Container Logistics Telemetry',
    category: 'SUPPLY CHAIN VISIBILITY',
    duration: '02:30',
    description: 'A visual walkthrough of real-time container tracking from African ports (Tema, Mombasa, Abidjan) across the Atlantic to European destination hubs (Rotterdam, Antwerp, Hamburg).',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cargo-ship-sailing-on-the-sea-41551-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop',
    keyTakeaways: [
      'IoT temperature, humidity, and location sensor alerts for sensitive organic shipments',
      'Automated Bill of Lading & Phytosanitary Certificate digital pairing',
      'Customs clearance bottleneck prediction engine'
    ],
    eudrArticle: 'Traceability Telemetry & Due Diligence Statements (DDS)'
  },
  {
    id: 'verification-audits',
    title: 'On-Chain Quality & Social Audit Verification',
    category: 'CERTIFICATION AUDITS',
    duration: '01:55',
    description: 'See how independent verifiers conduct child labor prevention audits, soil quality checks, and Fairtrade compliance validation stored immutably on distributed ledger nodes.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-green-plant-growing-in-soil-41548-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=1200&auto=format&fit=crop',
    keyTakeaways: [
      'Digital proof of Fairtrade, RainForest Alliance & Organic certifications',
      'Zero-tolerance child labor monitoring & remedial education funds',
      'Cryptographic hash verification of physical crop batch samples'
    ],
    eudrArticle: 'Article 4: Mandatory Legal Compliance & Social Rights'
  }
];

export const PlatformVideoExplainer: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoTopic>(EDUCATIONAL_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => setIsPlaying(false));
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-16 bg-[#05110B] text-white border-t border-emerald-500/15 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-950/30 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Tv className="w-3.5 h-3.5" />
            <span>EDUCATIONAL PLATFORM SHOWCASE & VIDEO DEMOS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
            How Sustainable Export Link Works
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Watch interactive video walkthroughs demonstrating how our platform solves EUDR deforestation compliance, connects global importers directly with African farming unions, and guarantees total supply chain integrity.
          </p>
        </div>

        {/* Video Player & Interactive Topic Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Video Screen Container (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-3xl border-2 border-emerald-500/30 overflow-hidden bg-slate-950 shadow-2xl group">
              {/* HTML5 Video Element with Custom Controls */}
              <video
                ref={videoRef}
                poster={activeVideo.posterUrl}
                playsInline
                loop
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-[360px] sm:h-[420px] object-cover"
              >
                {/* Sample HTML5 MP4 URL with smooth playback fallback */}
                <source src={activeVideo.videoUrl} type="video/mp4" />
                Your browser does not support HTML5 video playback.
              </video>

              {/* Video Overlay Info Bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest">
                  {activeVideo.category}
                </span>

                <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-bold">
                  {activeVideo.duration}
                </span>
              </div>

              {/* Play / Pause Big Center Button Overlay */}
              <div 
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-slate-950/30 hover:bg-slate-950/20 transition-all cursor-pointer z-10"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 rounded-full bg-[#10B981] text-[#05110B] flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)] font-bold cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                </motion.button>
              </div>

              {/* Bottom Video Control Strip */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex items-center justify-between z-20 text-xs">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="text-white/80 font-mono text-[11px] truncate max-w-[200px]">
                    {activeVideo.title}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-[10px] font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>HD 1080p DEMO STREAM</span>
                </div>
              </div>
            </div>

            {/* Video Overview Description Box */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/20 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{activeVideo.title}</h3>
                  <span className="text-xs font-mono text-emerald-400 font-semibold block mt-0.5">
                    EUDR Standard: {activeVideo.eudrArticle}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {activeVideo.description}
              </p>

              <div className="pt-3 border-t border-white/10 space-y-2">
                <span className="text-[11px] font-mono uppercase font-bold text-slate-400 block">
                  Core Technical Takeaways:
                </span>
                <div className="space-y-1.5">
                  {activeVideo.keyTakeaways.map((takeaway, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-white/90">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Video Topic Selection List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-between pb-1">
              <span>Select Demonstration Video:</span>
              <span>4 Modules</span>
            </div>

            {EDUCATIONAL_VIDEOS.map((topic, index) => {
              const isSelected = activeVideo.id === topic.id;
              return (
                <motion.div
                  key={topic.id}
                  whileHover={{ x: 4 }}
                  onClick={() => {
                    setActiveVideo(topic);
                    setIsPlaying(false);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex items-center space-x-4 ${
                    isSelected 
                      ? 'bg-emerald-950/80 border-emerald-400 shadow-xl shadow-emerald-950/50' 
                      : 'bg-slate-900/60 border-white/10 hover:border-emerald-500/30 hover:bg-slate-900'
                  }`}
                >
                  {/* Thumbnail Badge */}
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border border-white/20">
                    <img 
                      src={topic.posterUrl} 
                      alt={topic.title} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-[#10B981] text-[#05110B] flex items-center justify-center shadow-md">
                        <Play className="w-3 h-3 fill-current ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-1 right-1 px-1 rounded bg-slate-950/90 text-[9px] font-mono text-white">
                      {topic.duration}
                    </span>
                  </div>

                  {/* Title & Info */}
                  <div className="space-y-1 min-w-0 flex-1">
                    <span className="text-[9px] font-mono font-bold uppercase text-emerald-400 block tracking-wider">
                      Module 0{index + 1} &bull; {topic.category}
                    </span>
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {topic.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 font-light">
                      {topic.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Platform Educational Feature Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 space-y-3 mt-4">
              <div className="flex items-center space-x-2 text-emerald-400">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-bold font-mono uppercase">Platform Knowledge Center</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Our educational portal breaks down complex EUDR 2023/1115 compliance rules, helping importers transition smoothly to verified direct trade without regulatory bottlenecks.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
