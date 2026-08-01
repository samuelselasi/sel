import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  Lock,
  LogOut,
  User,
  BadgeCheck,
  Mail,
  KeyRound,
  Check
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { DEMO_USERS, ROLE_INFO_MAP } from '../data/demoUsers';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  initialRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  initialRole = 'buyer',
}) => {
  const [selectedRoleTab, setSelectedRoleTab] = useState<Exclude<UserRole, 'guest' | 'architect'>>(
    initialRole === 'guest' || initialRole === 'architect' ? 'buyer' : initialRole
  );
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authMode, setAuthMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');

  if (!isOpen) return null;

  const currentRoleInfo = ROLE_INFO_MAP[selectedRoleTab];
  const demoProfile = DEMO_USERS[selectedRoleTab];

  const handleCustomLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;

    const customUser: UserProfile = {
      id: `user_custom_${Date.now()}`,
      name: emailInput.split('@')[0].replace('.', ' ').toUpperCase(),
      email: emailInput,
      role: selectedRoleTab,
      organization: `${selectedRoleTab.toUpperCase()} Enterprise`,
      avatarUrl: '',
      verifiedBadge: true,
      country: 'Global',
      permissions: demoProfile.permissions,
    };

    onLogin(customUser);
    onClose();
  };

  const handleQuickDemoLogin = (roleKey: Exclude<UserRole, 'guest'>) => {
    onLogin(DEMO_USERS[roleKey]);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#05110B]/80 backdrop-blur-xl"
        />

        {/* Main Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#0A1E14] border border-white/15 rounded-[32px] shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden z-10 text-white"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/10 bg-white/5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  <span>Enterprise Portal Sign In</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] text-[10px] uppercase font-mono tracking-widest font-bold">
                    Encrypted
                  </span>
                </h2>
                <p className="text-xs text-white/60">
                  Authentication & Account Access Portal
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {currentUser ? (
              /* Already Signed In View */
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border-2 border-[#10B981] flex items-center justify-center text-[#10B981]">
                      <User className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-bold text-white">{currentUser.name}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${ROLE_INFO_MAP[currentUser.role]?.badgeColor || 'border-white/20'}`}>
                          {currentUser.role}
                        </span>
                      </div>
                      <p className="text-xs text-white/60">{currentUser.email}</p>
                      <p className="text-xs text-[#10B981] font-semibold mt-0.5">{currentUser.organization}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onLogout();
                    }}
                    className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>

                {/* Permissions Breakdown */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-white/50 block font-mono">
                    Granted Account Capabilities
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    {Object.entries(currentUser.permissions).map(([key, val]) => (
                      <div
                        key={key}
                        className={`p-2.5 rounded-xl border flex items-center justify-between ${
                          val 
                            ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981]' 
                            : 'bg-white/5 border-white/10 text-white/40'
                        }`}
                      >
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        {val ? <CheckCircle2 className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Authentication Login Form */
              <div className="space-y-6">
                {/* Account Persona Selector */}
                <div className="space-y-3">
                  <label className="text-xs font-extrabold text-white/90 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#10B981]" />
                    <span>Select Persona / Access Level:</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {(['buyer', 'supplier', 'agent'] as const).map((roleKey) => {
                      const info = ROLE_INFO_MAP[roleKey];
                      const isSelected = selectedRoleTab === roleKey;
                      return (
                        <button
                          key={roleKey}
                          type="button"
                          onClick={() => setSelectedRoleTab(roleKey)}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                            isSelected 
                              ? 'bg-[#10B981]/20 border-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                              : 'bg-white/5 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className={`text-[10px] font-extrabold font-mono uppercase px-2 py-0.5 rounded-md border ${info.badgeColor}`}>
                              {roleKey}
                            </span>
                            {isSelected && <Check className="w-4 h-4 text-[#10B981]" />}
                          </div>
                          <div className="text-xs font-bold text-white">{info.title.split('&')[0]}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Account Type Features Summary */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase block">
                    {currentRoleInfo.title} Scope:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-medium">
                    {currentRoleInfo.keyCapabilities.map((cap, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Login Credentials Form */}
                <form onSubmit={handleCustomLoginSubmit} className="space-y-4">
                  <div className="space-y-3">
                    <div className="relative">
                      <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Enter work email address (e.g., user@company.com)"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#10B981] transition-all"
                      />
                    </div>
                    
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                      <input
                        type="password"
                        required
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="Enter password"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#10B981] transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                    <button
                      type="submit"
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#10B981] hover:bg-[#12d292] text-[#05110B] text-xs font-extrabold flex items-center justify-center space-x-2 shadow-lg transition-all cursor-pointer"
                    >
                      <span>Sign In with Credentials</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin(selectedRoleTab)}
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      <span>Instant Access ({selectedRoleTab})</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
