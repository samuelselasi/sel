import React, { useState } from 'react';
import { 
  Sprout, 
  ShieldCheck, 
  Factory, 
  Ship, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  FileCheck2, 
  Thermometer, 
  Droplets, 
  Sparkles,
  Lock,
  Globe
} from 'lucide-react';

export const SupplyChainVisualization: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      id: 0,
      title: 'Farm Origin & GPS Polygon',
      subtitle: 'Ground-Truth Polygon Boundary Hash',
      icon: Sprout,
      badge: 'Step 01 • Origin',
      color: '#10B981',
      details: [
        { label: 'GPS Polygon Hash', value: '0x94f2a71b8e4...' },
        { label: 'Farm Location', value: 'Ashanti Belt, Ghana (6.6885° N, 1.6244° W)' },
        { label: 'Farmer Co-op', value: 'Ashanti Gold Farmers Co-operative' },
        { label: 'EUDR Deforestation Check', value: '100% Zero Deforestation Verified' },
      ],
      description: 'Satellite imagery and field agent mobile apps record precise farm boundaries to ensure zero deforestation compliance under EU regulation 2023/1115.'
    },
    {
      id: 1,
      title: 'Field Agent Audit & Verification',
      subtitle: 'SEL Gold Quality & Labor Audit',
      icon: ShieldCheck,
      badge: 'Step 02 • Audit',
      color: '#10B981',
      details: [
        { label: 'Verification Score', value: '98/100 (SEL Certified)' },
        { label: 'Child Labor Audit', value: 'PASSED (0 Compliance Violations)' },
        { label: 'Soil Purity Diagnostics', value: 'Pesticide Free • Heavy Metal Safe' },
        { label: 'Moisture Level', value: '6.8% (Target < 7.5%)' },
      ],
      description: 'Independent SEL auditors inspect harvest lots, test soil purity, conduct fair-labor audits, and sign immutable cryptographic verification hashes.'
    },
    {
      id: 2,
      title: 'Processing & Batch Packaging',
      subtitle: 'Clean Milling & QR Bag Tracking',
      icon: Factory,
      badge: 'Step 03 • Processing',
      color: '#F59E0B',
      details: [
        { label: 'Processing Mill', value: 'Takoradi Central Milling Facility' },
        { label: 'Batch Lot Number', value: 'LOT-2026-COCOA-884' },
        { label: 'Grading Spec', value: 'COCOBOD Grade 1 Premium Export' },
        { label: 'Bag Serialization', value: 'RFID / QR Tagged Jute Bags' },
      ],
      description: 'Raw agricultural output is cleaned, graded according to international commodity standards, packaged in serialized jute bags, and tagged with smart RFID chips.'
    },
    {
      id: 3,
      title: 'Container Reefer Export Logistics',
      subtitle: 'IoT Sensor Reefer Monitoring',
      icon: Ship,
      badge: 'Step 04 • Export',
      color: '#3B82F6',
      details: [
        { label: 'Vessel Name', value: 'Maersk Mc-Kinney Møller' },
        { label: 'Container ID', value: 'MSKU-849201-9 (40ft Reefer)' },
        { label: 'Live Reefer Temp', value: '18.4°C (Telemetry Active)' },
        { label: 'Customs Clearance', value: 'Bill of Lading & Phytosanitary Signed' },
      ],
      description: 'Reefer containers are fitted with real-time IoT sensors tracking temperature, humidity, and GPS coordinates throughout maritime transit to Rotterdam or Hamburg.'
    },
    {
      id: 4,
      title: 'Global Buyer Port Delivery',
      subtitle: 'Smart Contract Escrow Release',
      icon: Building2,
      badge: 'Step 05 • Buyer Receipt',
      color: '#10B981',
      details: [
        { label: 'Buyer Destination', value: 'Port of Rotterdam, Netherlands' },
        { label: 'Importer Entity', value: 'Nordic Agro Importers B.V.' },
        { label: 'Contract Settlement', value: 'Automated Escrow Released' },
        { label: 'Compliance Vault', value: 'Complete Audit Chain Transferred' },
      ],
      description: 'Upon port arrival and quality inspection clearance, smart escrow payments release funds directly to African farmer co-ops while transferring the compliance vault.'
    }
  ];

  return (
    <section className="relative py-20 bg-[#05110B] text-white overflow-hidden border-t border-white/10">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#10B981]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-[11px] font-bold tracking-[0.2em] uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>TRANSPARENT END-TO-END PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase">
            Supply Chain <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#10B981] to-[#F59E0B]">Flow Protocol</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed">
            Every metric ton of agricultural export is tracked from farm origin polygon to final buyer port arrival with immutable cryptographic proofs.
          </p>
        </div>

        {/* Horizontal Flow Stepper Bar */}
        <div className="p-4 sm:p-6 rounded-[32px] bg-white/5 border border-white/15 backdrop-blur-2xl shadow-2xl">
          <div className="grid grid-cols-5 gap-2 relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-[10%] right-[10%] -translate-y-1/2 h-1 bg-white/10 hidden md:block -z-0" />
            <div 
              className="absolute top-1/2 left-[10%] -translate-y-1/2 h-1 bg-[#10B981] transition-all duration-500 hidden md:block -z-0" 
              style={{ width: `${(activeStep / 4) * 80}%` }}
            />

            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              const isActive = activeStep === step.id;
              const isCompleted = activeStep > step.id;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`relative z-10 flex flex-col items-center p-3 sm:p-4 rounded-2xl transition-all ${
                    isActive
                      ? 'bg-white/15 border border-white/30 shadow-lg scale-105'
                      : isCompleted
                      ? 'bg-white/5 border border-white/10 opacity-90'
                      : 'bg-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <div 
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
                      isActive 
                        ? 'bg-[#10B981] border-white text-[#05110B] shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                        : isCompleted
                        ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]'
                        : 'bg-black/40 border-white/10 text-white/50'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider mt-2 text-white/60 hidden sm:block">
                    {step.badge.split('•')[1]}
                  </span>
                  <span className={`text-xs font-bold text-center mt-0.5 line-clamp-1 ${isActive ? 'text-white' : 'text-white/70'}`}>
                    {step.title.split('&')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Details Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column Description */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-xs font-mono font-bold">
              <span>{steps[activeStep].badge}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
              {steps[activeStep].title}
            </h3>

            <p className="text-white/70 text-sm leading-relaxed font-light">
              {steps[activeStep].description}
            </p>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3 font-mono text-xs">
              {steps[activeStep].details.map((detail, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="text-white/40 uppercase text-[10px] font-bold">{detail.label}:</span>
                  <span className="text-[#10B981] font-bold">{detail.value}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2 text-xs text-[#F59E0B] font-mono font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>CRYPTOGRAPHICALLY AUDITED AT EACH STAGE</span>
            </div>
          </div>

          {/* Right Column Diagram/Telemetry Card */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-[32px] bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-2xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#10B981]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Verification Vault Node</h4>
                  <p className="text-[11px] text-white/50 font-mono">Immutable Ledger Record #8892-AGRO</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 font-mono">
                PASSED AUDIT
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-[10px] text-white/40 uppercase font-mono block font-bold">EUDR Status</span>
                <span className="text-sm font-bold text-[#10B981]">100% Deforestation Free</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-[10px] text-white/40 uppercase font-mono block font-bold">Phytosanitary</span>
                <span className="text-sm font-bold text-[#F59E0B]">COCOBOD Certified</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-[10px] text-white/40 uppercase font-mono block font-bold">Sensor Feed</span>
                <span className="text-sm font-bold text-blue-400">IoT Reefer Active</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-[10px] text-white/40 uppercase font-mono block font-bold">Smart Escrow</span>
                <span className="text-sm font-bold text-emerald-400">Automated Release</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/60 space-y-1 font-mono">
              <span className="text-[10px] text-white/40 uppercase block font-bold">Smart Contract Address:</span>
              <span className="text-[#F59E0B] break-all">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
