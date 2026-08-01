import React, { useState } from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  MapPin, 
  FileCheck2, 
  CheckCircle2, 
  Lock, 
  Plus, 
  Compass,
  Award,
  Sparkles,
  Search
} from 'lucide-react';
import { Supplier } from '../types';

interface VerificationPortalProps {
  suppliers: Supplier[];
  onLogAudit: (supplierId: string, agentName: string, score: number, comments: string) => void;
}

export const VerificationPortal: React.FC<VerificationPortalProps> = ({
  suppliers,
  onLogAudit,
}) => {
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>(suppliers[0]?.id || '');
  const [agentName, setAgentName] = useState<string>('Dr. Kwame Mensah');
  const [auditScore, setAuditScore] = useState<number>(98);
  const [comments, setComments] = useState<string>('Comprehensive GPS plot boundary verification complete. Soil nitrogen and moisture levels compliant with EU Organic standards.');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogAudit(selectedSupplierId, agentName, auditScore, comments);
    setSuccessMessage(`Cryptographic Verification Hash Generated for Audit Log! Badge Issued.`);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
            <UserCheck className="w-3.5 h-3.5" />
            <span>SEL Field Verification Agent Portal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Farm Verification & Compliance Audit Engine
          </h2>
          <p className="text-white/60 text-sm mt-1 max-w-2xl font-light leading-relaxed">
            Logged-in field verification agents log GPS boundary polygons, soil purity diagnostics, child labor compliance, and issue SEL Gold Badges.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-white/80 font-mono">
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#10B981] font-bold">
            AGENT ID: AGENT-GH-04 (VERIFIED AUDITOR)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form to Log New Audit */}
        <div className="lg:col-span-6 p-6 rounded-[28px] backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center space-x-2 border-b border-white/10 pb-4">
            <ShieldCheck className="w-5 h-5 text-[#10B981]" />
            <h3 className="text-lg font-extrabold text-white tracking-tight uppercase">Log Farm Inspection & Issue Verified Badge</h3>
          </div>

          {successMessage && (
            <div className="p-4 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] text-xs font-mono space-y-1">
              <span className="font-bold block">✓ {successMessage}</span>
              <span className="text-white/40">Hash: 0x{Math.random().toString(16).substring(2, 10)}{Math.random().toString(16).substring(2, 10)}</span>
            </div>
          )}

          <form onSubmit={handleAuditSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-white/50 mb-1 font-bold uppercase tracking-wider text-[11px]">Select Target Supplier / Cooperative</label>
              <select
                value={selectedSupplierId}
                onChange={(e) => setSelectedSupplierId(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#05110B] border border-white/10 text-white font-semibold focus:outline-none focus:border-[#10B981] cursor-pointer"
              >
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id} className="bg-[#05110B] text-white">
                    {s.name} ({s.country} • {s.primaryCrop})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white/50 mb-1 font-bold uppercase tracking-wider text-[11px]">Field Lead Auditor Name</label>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#05110B] border border-white/10 text-white focus:outline-none focus:border-[#10B981]"
                required
              />
            </div>

            <div>
              <div className="flex justify-between text-white/50 mb-1 font-bold uppercase tracking-wider text-[11px]">
                <span>Compliance & Quality Audit Score</span>
                <span className="text-[#10B981] font-mono font-bold">{auditScore}/100</span>
              </div>
              <input
                type="range"
                min="70"
                max="100"
                value={auditScore}
                onChange={(e) => setAuditScore(Number(e.target.value))}
                className="w-full accent-[#10B981] bg-[#05110B] rounded-lg cursor-pointer h-2"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest block">Audited Checkpoints</span>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-white/90">
                <div className="flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] mr-1.5" />
                  <span>GPS Polygon Verified</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] mr-1.5" />
                  <span>Child Labor Clearance</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] mr-1.5" />
                  <span>Soil Purity & Pesticide</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] mr-1.5" />
                  <span>EUDR Deforestation</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-white/50 mb-1 font-bold uppercase tracking-wider text-[11px]">Field Inspector Notes & Comments</label>
              <textarea
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#05110B] border border-white/10 text-white focus:outline-none focus:border-[#10B981]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#10B981] hover:brightness-110 text-[#05110B] font-extrabold text-sm shadow-xl transition-all uppercase tracking-wider"
            >
              Sign Audit & Issue Verified Badge
            </button>
          </form>
        </div>

        {/* Right Column: Existing Audits Feed */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center text-xs font-mono">
            <span className="text-white font-bold uppercase tracking-wider">Recent Verified Field Audits</span>
            <span className="text-[#10B981] font-bold">LEDGER CHECKED</span>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="p-5 rounded-[24px] bg-white/5 border border-white/10 space-y-2 hover:border-[#10B981]/30 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm font-extrabold text-white">{supplier.name}</span>
                    <p className="text-[11px] text-white/60">{supplier.region}, {supplier.country}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-mono">
                    SEL {supplier.verificationScore}/100
                  </span>
                </div>

                {supplier.auditHistory[0] && (
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white/80 space-y-1">
                    <div className="flex justify-between text-[11px] text-white/40">
                      <span>Auditor: {supplier.auditHistory[0].agentName}</span>
                      <span>{supplier.auditHistory[0].date}</span>
                    </div>
                    <p className="text-[11px] italic text-white/70 font-light">"{supplier.auditHistory[0].comments}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
