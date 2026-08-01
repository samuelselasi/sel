import React from 'react';
import { 
  ShieldCheck, 
  Leaf, 
  HeartHandshake, 
  Globe2, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Scale, 
  Sparkles,
  TreePine,
  DollarSign
} from 'lucide-react';

export const SustainabilitySection: React.FC = () => {
  const pillars = [
    {
      icon: Leaf,
      title: 'Full Traceability & EUDR Compliance',
      badge: '100% Polygon GPS Verified',
      color: '#10B981',
      description: 'Every farm plot is mapped via satellite polygons to guarantee zero deforestation under EU Regulation 2023/1115. Buyers get complete proof hashes down to individual trees.',
      stats: '100% Boundary GPS Mapped'
    },
    {
      icon: HeartHandshake,
      title: 'Ethical Sourcing & Fair Pay',
      badge: 'Direct Farmer Premiums',
      color: '#F59E0B',
      description: 'SEL connects buyers directly to smallholder farmer co-ops, eliminating predatory middlemen and ensuring 15-25% higher farm-gate income for rural communities.',
      stats: '+22% Higher Farm Gate Income'
    },
    {
      icon: Users,
      title: 'Farmer Empowerment & Training',
      badge: 'Regenerative Agriculture',
      color: '#3B82F6',
      description: 'Cooperative members receive continuous agronomic training in organic soil rejuvenation, shade-grown cocoa techniques, and water conservation practices.',
      stats: '1,480+ Co-ops Trained'
    },
    {
      icon: Scale,
      title: 'Export Transparency & Audit',
      badge: 'Immutable Verification',
      color: '#10B981',
      description: 'Independent field auditors verify quality specs, phytosanitary certificates, child-labor compliance, and soil health before export bids are issued.',
      stats: '0 Tolerance Child Labor'
    }
  ];

  return (
    <section className="relative py-24 bg-[#05110B] text-white overflow-hidden border-t border-white/10">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-[#10B981]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-[11px] font-bold tracking-[0.2em] uppercase">
            <TreePine className="w-3.5 h-3.5" />
            <span>SUSTAINABILITY & CLIMATE-TECH CHARTER</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#10B981] to-[#F59E0B]">Ethical Trade</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg font-light leading-relaxed">
            Pioneering a transparent, sustainable agricultural export infrastructure for Africa that protects ecosystems, empowers rural farmers, and complies with international ESG regulations.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:border-[#10B981]/40 backdrop-blur-2xl transition-all duration-300 shadow-2xl flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-7 h-7 text-[#10B981]" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-mono">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-[#10B981] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-white/70 text-sm leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                  <span className="text-white/40 uppercase font-bold text-[10px]">Impact Metric:</span>
                  <span className="text-[#F59E0B] font-bold">{pillar.stats}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight ESG Impact Metrics Bar */}
        <div className="p-8 sm:p-10 rounded-[32px] bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/20 backdrop-blur-2xl shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono font-bold text-[#10B981] uppercase tracking-widest block">ESG COMPLIANCE DASHBOARD</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-1">
                Verifiable Positive Environmental & Social Impact
              </h3>
            </div>
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#10B981] text-[#05110B] font-extrabold text-xs shadow-lg">
              <ShieldCheck className="w-4 h-4" />
              <span>Independent Auditor Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <div className="text-3xl font-extrabold text-[#10B981]">0.0%</div>
              <div className="text-[11px] uppercase tracking-wider text-white/50 font-bold">Deforestation Rate</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <div className="text-3xl font-extrabold text-[#F59E0B]">$12.4M</div>
              <div className="text-[11px] uppercase tracking-wider text-white/50 font-bold">Direct Farmer Premiums Paid</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <div className="text-3xl font-extrabold text-white">42,000+</div>
              <div className="text-[11px] uppercase tracking-wider text-white/50 font-bold">Smallholder Farmers Enrolled</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <div className="text-3xl font-extrabold text-[#10B981]">100%</div>
              <div className="text-[11px] uppercase tracking-wider text-white/50 font-bold">Child Labor Clearance</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
