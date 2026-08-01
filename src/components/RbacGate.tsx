import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, 
  Lock, 
  UserCheck, 
  KeyRound, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Building2,
  FileSpreadsheet,
  Smartphone,
  Layers
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { ROLE_INFO_MAP, DEMO_USERS } from '../data/demoUsers';

interface RbacGateProps {
  requiredRole: UserRole;
  requiredRoleTitle: string;
  tabName: string;
  currentUser: UserProfile | null;
  onOpenAuthModal: (role?: UserRole) => void;
  onSwitchToAllowedTab: (tab: string) => void;
}

export const RbacGate: React.FC<RbacGateProps> = ({
  requiredRole,
  requiredRoleTitle,
  tabName,
  currentUser,
  onOpenAuthModal,
  onSwitchToAllowedTab,
}) => {
  const currentRoleInfo = currentUser ? ROLE_INFO_MAP[currentUser.role] : ROLE_INFO_MAP['guest'];
  const targetRoleInfo = ROLE_INFO_MAP[requiredRole];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="p-8 sm:p-10 rounded-[32px] bg-[#0A1E14]/90 border border-red-500/30 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-center space-y-6 relative overflow-hidden"
      >
        {/* Ambient warning background glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#F59E0B]/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="w-16 h-16 mx-auto rounded-3xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-xl">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-extrabold uppercase font-mono tracking-widest">
            <Lock className="w-3.5 h-3.5" />
            <span>RBAC Protected Area</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Role Permission Required: {requiredRoleTitle}
          </h2>

          <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
            You are attempting to access <strong className="text-white font-bold">{tabName}</strong>. This module is protected under SEL Role-Based Access Control policies and requires active <strong className="text-[#10B981] font-bold">{requiredRoleTitle}</strong> credentials.
          </p>
        </div>

        {/* Current Identity vs Target Identity comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
          {/* Current Status */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/40 block">Your Current Status</span>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold">
                {currentUser ? currentUser.name[0] : 'G'}
              </div>
              <div>
                <div className="text-sm font-bold text-white">{currentUser ? currentUser.name : 'Public Visitor (Guest)'}</div>
                <div className="text-xs text-white/60 font-mono">Role: {currentUser ? currentUser.role.toUpperCase() : 'GUEST'}</div>
              </div>
            </div>
          </div>

          {/* Required Status */}
          <div className="p-4 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#10B981] block">Required Access Level</span>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 flex items-center justify-center text-[#10B981] font-bold">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">{targetRoleInfo.title}</div>
                <div className="text-xs text-[#10B981] font-mono">Role: {requiredRole.toUpperCase()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpenAuthModal(requiredRole)}
            className="px-6 py-3.5 rounded-full bg-[#10B981] hover:bg-[#12d292] text-[#05110B] text-xs font-extrabold flex items-center space-x-2 shadow-lg transition-all cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>Sign In as {requiredRoleTitle}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <button
            onClick={() => onSwitchToAllowedTab('home')}
            className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-bold transition-all cursor-pointer"
          >
            Return to Solutions Home
          </button>
        </div>

        {/* RBAC Capabilities list for target role */}
        <div className="pt-6 border-t border-white/10 text-xs text-left max-w-xl mx-auto space-y-2">
          <span className="text-white/50 font-bold uppercase tracking-widest text-[10px] block">
            Capabilities unlocked with {requiredRoleTitle} credentials:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white/80">
            {targetRoleInfo.keyCapabilities.map((cap, i) => (
              <div key={i} className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
