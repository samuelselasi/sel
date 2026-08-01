import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Globe, 
  MapPin, 
  TrendingUp, 
  FileCheck2, 
  Truck, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Smartphone,
  Lock,
  BarChart3,
  BadgeCheck,
  Zap,
  Scale
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface PlatformOverviewSectionProps {
  currentUser: UserProfile | null;
  onOpenAuthModal: (role?: UserRole) => void;
  onNavigateTab: (tab: string) => void;
}

export const PlatformOverviewSection: React.FC<PlatformOverviewSectionProps> = ({
  currentUser,
  onOpenAuthModal,
  onNavigateTab,
}) => {
  const activeRole = currentUser ? currentUser.role : 'guest';

  const coreOfferings = [
    {
      id: 'coop-sourcing',
      icon: Building2,
      tag: 'DIRECT TRADE',
      title: 'Direct Cooperative Sourcing',
      description: 'Connect directly with 50+ audited African farming cooperatives across Ghana, Kenya, Tanzania, Ivory Coast, and Uganda. Eliminate opaque intermediary markups.',
      highlights: [
        'Ethical cocoa, coffee, cashew & sesame',
        'Transparent cooperative farm gate prices',
        'Direct farmer community revenue sharing'
      ],
      color: 'from-[#10B981]/20 to-[#10B981]/5',
      borderColor: 'border-[#10B981]/30',
      iconColor: 'text-[#10B981]',
      roleTarget: 'buyer' as UserRole,
      actionTab: 'home',
      actionLabel: 'Browse Verified Directory'
    },
    {
      id: 'eudr-compliance',
      icon: ShieldCheck,
      tag: 'EU COMPLIANT',
      title: 'EUDR & Satellite Polygon Audit',
      description: '100% European Union Deforestation Regulation (EUDR) compliance engine. Farm polygons captured with high-resolution GPS telemetry and satellite deforestation analysis.',
      highlights: [
        'Cryptographic GPS farm boundary data',
        'Zero-deforestation satellite overlap checks',
        'Instant EUDR PDF compliance dossiers'
      ],
      color: 'from-[#3B82F6]/20 to-[#3B82F6]/5',
      borderColor: 'border-[#3B82F6]/30',
      iconColor: 'text-[#3B82F6]',
      roleTarget: 'agent' as UserRole,
      actionTab: 'map',
      actionLabel: 'Explore Interactive Map'
    },
    {
      id: 'market-intel',
      icon: TrendingUp,
      tag: 'SPOT PRICING',
      title: 'Real-Time Commodity Intelligence',
      description: 'Live FOB and CIF price telemetry sourced directly from primary African export hubs (Accra, Nairobi, Dar es Salaam, Lagos) with harvest forecasts.',
      highlights: [
        'Live spot market pricing feeds',
        'Quality grade differentials (Grade 1 vs Grade 2)',
        'Historical price trend charts'
      ],
      color: 'from-[#F59E0B]/20 to-[#F59E0B]/5',
      borderColor: 'border-[#F59E0B]/30',
      iconColor: 'text-[#F59E0B]',
      roleTarget: 'buyer' as UserRole,
      actionTab: 'market',
      actionLabel: 'View Spot Intelligence'
    },
    {
      id: 'rfq-escrow',
      icon: FileCheck2,
      tag: 'B2B COMMERCE',
      title: 'Digital RFQ & Escrow Trade Desk',
      description: 'Structured commercial tender creation, competitive cooperative bidding, milestone escrow payment security, and automated trade contract generation.',
      highlights: [
        'Standardized international trade contracts',
        'Milestone escrow payment protection',
        'Digital Bill of Lading (BoL) verification'
      ],
      color: 'from-[#8B5CF6]/20 to-[#8B5CF6]/5',
      borderColor: 'border-[#8B5CF6]/30',
      iconColor: 'text-[#8B5CF6]',
      roleTarget: 'buyer' as UserRole,
      actionTab: 'rfq',
      actionLabel: 'Launch Buyer RFQ Desk'
    },
    {
      id: 'field-auditor',
      icon: Smartphone,
      tag: 'ON-GROUND VERIFICATION',
      title: 'Field Auditor Telemetry App',
      description: 'Mobile-first tool for accredited field inspectors to map farm boundaries offline, verify child-labor-free practices, and log soil health metrics.',
      highlights: [
        'Offline sync queue for remote farm regions',
        'Multi-point polygon GPS boundary capture',
        'Fairtrade & Rainforest Alliance audit logging'
      ],
      color: 'from-[#EC4899]/20 to-[#EC4899]/5',
      borderColor: 'border-[#EC4899]/30',
      iconColor: 'text-[#EC4899]',
      roleTarget: 'agent' as UserRole,
      actionTab: 'field-agent',
      actionLabel: 'Access Auditor App'
    },
    {
      id: 'logistics-tracker',
      icon: Truck,
      tag: 'CONTAINER TELEMETRY',
      title: 'Container Vessel & Cargo Tracking',
      description: 'End-to-end container tracking from African ports to global discharge destinations with IoT temperature & humidity sensor monitoring.',
      highlights: [
        'Live vessel AIS tracking & ETA updates',
        'Container temperature/humidity logging',
        'Port customs clearance documentation'
      ],
      color: 'from-[#10B981]/20 to-[#10B981]/5',
      borderColor: 'border-[#10B981]/30',
      iconColor: 'text-[#10B981]',
      roleTarget: 'buyer' as UserRole,
      actionTab: 'tracker',
      actionLabel: 'Track Active Shipments'
    }
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-[11px] font-extrabold uppercase font-mono tracking-widest"
        >
          <Zap className="w-3.5 h-3.5 text-[#10B981]" />
          <span>WHAT SEL OFFERS</span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
          Comprehensive African Agri-Supply <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#10B981] to-[#F59E0B]">
            Infrastructure & Verification
          </span>
        </h2>

        <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
          Sustainable Export Link (SEL) bridges the gap between verified African smallholder farming cooperatives and global commodity buyers through transparent data, EUDR compliance, and secure B2B trading workflows.
        </p>
      </div>

      {/* Role Context Bar if Logged In */}
      {currentUser && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 sm:p-5 rounded-2xl bg-[#0A1E14] border border-[#10B981]/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
        >
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full border border-[#10B981] object-cover shrink-0" />
            <div>
              <div className="text-xs font-extrabold text-white flex items-center gap-2 justify-center sm:justify-start">
                <span>Active Session: {currentUser.name}</span>
                <span className="px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] text-[10px] font-mono uppercase font-bold border border-[#10B981]/40">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-white/60 mt-0.5">
                Your account is configured with specialized permissions. Role-restricted modules are unlocked in your top navigation menu.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenAuthModal()}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-bold transition-all cursor-pointer shrink-0"
          >
            Switch Role / Persona
          </button>
        </motion.div>
      )}

      {/* Core Offerings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {coreOfferings.map((item, index) => {
          const Icon = item.icon;
          const isRoleUnlocked = activeRole === 'architect' || activeRole === item.roleTarget || item.actionTab === 'home' || item.actionTab === 'map' || item.actionTab === 'market';

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-b ${item.color} border ${item.borderColor} backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group`}
            >
              <div className="space-y-4">
                {/* Header Icon + Tag */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center ${item.iconColor} shadow-inner`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/15 tracking-wider">
                    {item.tag}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-lg font-extrabold text-white tracking-tight group-hover:text-[#10B981] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mt-2">
                    {item.description}
                  </p>
                </div>

                {/* Key Bullet Highlights */}
                <ul className="space-y-2 pt-2 border-t border-white/10 text-xs text-white/80">
                  {item.highlights.map((hl, hIdx) => (
                    <li key={hIdx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dynamic Action Trigger */}
              <div className="pt-4 border-t border-white/10">
                {isRoleUnlocked ? (
                  <button
                    onClick={() => {
                      onNavigateTab(item.actionTab);
                      if (item.actionTab === 'home') {
                        setTimeout(() => {
                          const el = document.getElementById('coop-directory');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-[#10B981] hover:text-[#05110B] text-white border border-white/20 text-xs font-extrabold flex items-center justify-between transition-all cursor-pointer group/btn"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={() => onOpenAuthModal(item.roleTarget)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 border border-white/15 text-xs font-semibold flex items-center justify-between transition-all cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>Unlock with {item.roleTarget.toUpperCase()} Role</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
