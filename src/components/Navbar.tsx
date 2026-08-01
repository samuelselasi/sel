import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  MapPin, 
  BarChart3, 
  FileSpreadsheet, 
  Sparkles, 
  Search, 
  Truck, 
  Globe,
  Building2,
  Smartphone,
  Menu,
  X,
  Lock,
  User,
  LogOut,
  ChevronDown,
  BadgeCheck,
  KeyRound
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { ROLE_INFO_MAP } from '../data/demoUsers';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentUser: UserProfile | null;
  onOpenAuthModal: (role?: UserRole) => void;
  onLogout: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  toggleAiAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  onOpenAuthModal,
  onLogout,
  searchQuery,
  setSearchQuery,
  toggleAiAssistant,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const activeRole = currentUser ? currentUser.role : 'guest';
  const roleInfo = ROLE_INFO_MAP[activeRole];

  const allNavItems = [
    { id: 'home', label: 'Solutions' },
    { id: 'map', label: 'Map' },
    { id: 'market', label: 'Intelligence' },
    { id: 'rfq', label: 'Buyer Portal' },
    { id: 'supplier-dashboard', label: 'Supplier Hub' },
    { id: 'field-agent', label: 'Field Auditor' },
    { id: 'tracker', label: 'Logistics' },
  ];

  const roleAllowedTabs: Record<UserRole, string[]> = {
    guest: ['home', 'map', 'market'],
    buyer: ['home', 'map', 'market', 'rfq', 'tracker'],
    supplier: ['home', 'map', 'market', 'supplier-dashboard'],
    agent: ['home', 'map', 'market', 'field-agent'],
    architect: ['home', 'map', 'market', 'rfq', 'supplier-dashboard', 'field-agent', 'tracker'],
  };

  const navItems = allNavItems.filter(item => roleAllowedTabs[activeRole].includes(item.id));

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#05110B]/90 border-b border-white/10 shadow-2xl">
      {/* Top Ticker Bar with Motion Glow */}
      <div className="bg-[#05110B] border-b border-white/10 px-3 sm:px-4 py-1.5 text-xs text-[#10B981] flex items-center justify-between overflow-x-auto no-scrollbar">
        <div className="flex items-center space-x-4 sm:space-x-6 shrink-0">
          <span className="flex items-center text-[#10B981] font-semibold tracking-wide text-[11px] sm:text-xs">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping mr-2 shadow-[0_0_8px_#10B981]" />
            SEL NETWORK: LIVE
          </span>
          <span className="text-white/60 text-[11px] sm:text-xs">GHANA COCOA: <strong className="text-[#F59E0B]">$4,200/MT</strong> (+1.8%)</span>
          <span className="text-white/60 text-[11px] sm:text-xs hidden md:inline">KENYA ARABICA AA: <strong className="text-[#F59E0B]">$7,600/MT</strong> (+2.4%)</span>
          <span className="text-white/60 text-[11px] sm:text-xs hidden lg:inline">TANZANIA CASHEW: <strong className="text-[#F59E0B]">$1,610/MT</strong> (+0.6%)</span>
        </div>
        <div className="flex items-center space-x-4 shrink-0 text-white/80">
          <span className="flex items-center text-[#10B981] text-[10px] sm:text-[11px] font-mono">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#10B981]" />
            100% EUDR AUDITED
          </span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand Logo */}
        <motion.div 
          onClick={() => handleNavClick('home')}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-[#10B981] to-[#065F46] rounded-xl flex items-center justify-center border border-white/20 shadow-lg relative group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300">
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#F59E0B] rounded-full blur-[2px] opacity-80" />
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-white absolute inset-0 m-auto group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-sans">
              SEL<span className="text-[#F59E0B]">.</span>
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-white/50 font-bold hidden xs:block">Sustainable Export Link</span>
          </div>
        </motion.div>

        {/* Desktop Search Bar */}
        <div className="hidden lg:flex items-center relative flex-1 max-w-xs xl:max-w-md mx-2">
          <Search className="w-4 h-4 absolute left-4 text-white/40 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search coffee, cocoa, cashews, cooperatives..."
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] backdrop-blur-md transition-all shadow-inner"
          />
        </div>

        {/* Floating Glass Navigation Bar (XL Screens) */}
        <nav className="hidden xl:flex items-center gap-1 backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-2.5 py-1.5 shadow-xl relative">
          {navItems.map((item) => {
            const isActive = currentTab === item.id || 
              (item.id === 'field-agent' && currentTab === 'verification') ||
              (item.id === 'rfq' && currentTab === 'buyer-portal');

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors flex items-center justify-center cursor-pointer z-10 ${
                  isActive ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbarActivePill"
                    className={`absolute inset-0 rounded-full shadow-md z-[-1] ${
                      item.id === 'supplier-dashboard' || item.id === 'field-agent'
                        ? 'bg-[#10B981] text-[#05110B]'
                        : 'bg-white/20 border border-white/30 backdrop-blur-md'
                    }`}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={isActive && (item.id === 'supplier-dashboard' || item.id === 'field-agent') ? 'text-[#05110B] font-extrabold' : ''}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* User Auth Profile Pill or Login Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 transition-all cursor-pointer"
              >
                {currentUser.avatarUrl ? (
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#10B981]"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center text-[#10B981]">
                    <User className="w-4 h-4" />
                  </div>
                )}
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <span>{currentUser.name.split(' ')[0]}</span>
                    <BadgeCheck className="w-3.5 h-3.5 text-[#10B981]" />
                  </div>
                  <div className="text-[9px] text-[#10B981] font-mono uppercase font-bold leading-none">
                    {currentUser.role}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-white/60" />
              </button>

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 p-4 rounded-2xl bg-[#0A1E14] border border-white/20 shadow-2xl z-50 text-white space-y-3"
                  >
                    <div className="flex items-center space-x-3 pb-3 border-b border-white/10">
                      {currentUser.avatarUrl ? (
                        <img
                          src={currentUser.avatarUrl}
                          alt={currentUser.name}
                          className="w-10 h-10 rounded-xl object-cover border border-[#10B981]"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center text-[#10B981] shrink-0">
                          <User className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <div className="text-xs font-extrabold text-white">{currentUser.name}</div>
                        <div className="text-[10px] text-white/60 truncate max-w-[140px]">{currentUser.email}</div>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${roleInfo.badgeColor}`}>
                          {currentUser.role} Profile
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          onOpenAuthModal();
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-left text-xs text-white font-medium flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <KeyRound className="w-3.5 h-3.5 text-[#10B981]" />
                          <span>Switch Role / Persona</span>
                        </span>
                        <span className="text-[10px] text-[#10B981] font-mono">1-Click</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-left text-xs text-red-400 font-medium flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out Session</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onOpenAuthModal('buyer')}
              className="px-4 py-2 rounded-full bg-[#10B981] hover:bg-[#12d292] text-[#05110B] text-xs font-extrabold flex items-center space-x-1.5 shadow-md transition-all cursor-pointer shrink-0"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In / Access</span>
            </motion.button>
          )}

          {/* AI Advisor Button */}
          <motion.button
            onClick={toggleAiAssistant}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#05110B] px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] animate-spin" style={{ animationDuration: '6s' }} />
            <span className="hidden xs:inline">SEL AI</span>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="xl:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-[#F59E0B]" /> : <Menu className="w-5 h-5 text-[#10B981]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden border-t border-white/10 bg-[#05110B]/95 backdrop-blur-2xl px-4 py-6 space-y-5 overflow-hidden"
          >
            {/* Mobile Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-white/40 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coffee, cocoa, cashews..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#10B981]"
              />
            </div>

            {/* Mobile Role State */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <div>
                <span className="text-white/60 font-semibold block text-[10px]">Active Session:</span>
                <span className="text-white font-bold">{currentUser ? currentUser.name : 'Guest Visitor'}</span>
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuthModal();
                }}
                className="px-3 py-1.5 rounded-lg bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 text-xs font-bold cursor-pointer"
              >
                {currentUser ? 'Switch Role' : 'Sign In'}
              </button>
            </div>

            {/* Mobile Nav Links Grid */}
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`p-3 rounded-xl text-xs font-bold border transition-all text-left ${
                      isActive 
                        ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]' 
                        : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


