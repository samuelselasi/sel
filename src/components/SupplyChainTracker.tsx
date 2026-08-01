import React from 'react';
import { 
  Truck, 
  MapPin, 
  ShieldCheck, 
  Thermometer, 
  Droplets, 
  CheckCircle2, 
  Clock, 
  Anchor,
  FileCheck,
  Compass,
  ArrowRight
} from 'lucide-react';
import { Shipment, UserProfile, UserRole } from '../types';
import { Lock, UserCheck } from 'lucide-react';

interface SupplyChainTrackerProps {
  shipments: Shipment[];
  currentUser?: UserProfile | null;
  onOpenAuthModal?: (role?: UserRole) => void;
}

export const SupplyChainTracker: React.FC<SupplyChainTrackerProps> = ({
  shipments,
  currentUser,
  onOpenAuthModal,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
            <Truck className="w-3.5 h-3.5" />
            <span>End-to-End Supply Chain Visibility & IoT Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Live Container Track & Trace
          </h2>
          <p className="text-white/60 text-sm mt-1 max-w-2xl font-light leading-relaxed">
            Realtime container vessel positioning, temperature & humidity reefer telemetry, and phytosanitary clearance verification.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-white/80 font-mono">
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#10B981] font-bold">
            {shipments.length} Active Export Shipments
          </span>
        </div>
      </div>

      {/* Shipments List with Paywall Overlay */}
      <div className="relative space-y-6">
        {!currentUser && (
          <div className="absolute inset-0 z-30 flex items-center justify-center p-6 bg-[#05110B]/75 backdrop-blur-md rounded-3xl">
            <div className="max-w-md w-full p-8 rounded-[32px] bg-[#0A1E14] border-2 border-[#10B981]/50 shadow-[0_25px_70px_rgba(0,0,0,0.9)] text-center space-y-5 text-white">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center text-[#10B981] shadow-xl">
                <Lock className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] text-[10px] font-mono font-bold uppercase tracking-widest border border-[#10B981]/30">
                  Logistics Telemetry Paywall
                </span>
                <h3 className="text-xl font-extrabold text-white">Sign In for Live Container Tracking</h3>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  Realtime vessel position tracking, IoT temperature/humidity reefer telemetry, and phytosanitary bill of lading documents are accessible to signed-in platform users.
                </p>
              </div>

              <button
                onClick={() => onOpenAuthModal && onOpenAuthModal('buyer')}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#10B981] hover:bg-[#12d292] text-[#05110B] text-xs font-extrabold flex items-center justify-center space-x-2 shadow-xl transition-all cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>Sign In to Access Container Telemetry</span>
              </button>
            </div>
          </div>
        )}

        <div className={!currentUser ? 'filter blur-[3px] pointer-events-none space-y-6' : 'space-y-6'}>
        {shipments.map((shipment) => (
          <div
            key={shipment.id}
            className="rounded-[28px] backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl p-6 space-y-6 hover:border-[#10B981]/40 transition-all"
          >
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl font-extrabold text-white tracking-tight">{shipment.trackingNumber}</span>
                  <span className="px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-xs font-mono font-bold uppercase">
                    ● {shipment.currentStatus.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs text-white/60 mt-1 font-light">
                  Commodity: <strong className="text-[#10B981] font-semibold">{shipment.quantityMT} MT {shipment.crop}</strong> • Buyer: <strong className="text-white font-semibold">{shipment.buyerCompany}</strong>
                </p>
              </div>

              <div className="text-xs font-mono text-white/80 sm:text-right space-y-1">
                <div>Vessel: <strong className="text-white">{shipment.vesselName}</strong></div>
                <div>Container ID: <strong className="text-[#F59E0B] font-bold">{shipment.containerId}</strong></div>
              </div>
            </div>

            {/* Origin to Destination Route Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-white/90">
                <span className="flex items-center text-[#10B981] font-bold">
                  <Anchor className="w-4 h-4 mr-1" />
                  Origin: {shipment.originPort}
                </span>
                <span className="flex items-center text-[#F59E0B] font-bold">
                  Destination: {shipment.destinationPort}
                  <MapPin className="w-4 h-4 ml-1" />
                </span>
              </div>

              {/* Progress Line */}
              <div className="relative w-full h-3 bg-black/40 rounded-full border border-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#10B981] to-[#F59E0B] rounded-full transition-all duration-1000" 
                  style={{ width: shipment.currentStatus === 'IN_TRANSIT' ? '65%' : '88%' }} 
                />
              </div>

              <div className="flex justify-between text-[11px] font-mono text-white/40">
                <span>ETD: {shipment.etd}</span>
                <span>ETA: {shipment.eta}</span>
              </div>
            </div>

            {/* IoT Reefer Sensor Telemetry Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center shrink-0">
                  <Thermometer className="w-5 h-5 text-[#10B981]" />
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase font-mono block font-bold">Reefer Temp</span>
                  <span className="text-base font-bold text-[#10B981] font-mono">{shipment.temperatureCelsius}°C</span>
                  <span className="text-[10px] text-white/40 block">Target: 18.0°C - 20.0°C</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Droplets className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase font-mono block font-bold">Container Humidity</span>
                  <span className="text-base font-bold text-blue-400 font-mono">{shipment.humidityPercent}%</span>
                  <span className="text-[10px] text-white/40 block">Target: &lt;65.0%</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center shrink-0">
                  <FileCheck className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase font-mono block font-bold">Customs Clearance</span>
                  <span className="text-xs font-bold text-[#F59E0B] font-mono">Bill of Lading Verified</span>
                  <span className="text-[10px] text-white/40 block">Phytosanitary Attached</span>
                </div>
              </div>
            </div>

          </div>
        ))}
        </div>
      </div>
    </div>
  );
};
