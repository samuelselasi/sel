import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroCinematic } from './components/HeroCinematic';
import { SupplierDirectory } from './components/SupplierDirectory';
import { SupplierDetailModal } from './components/SupplierDetailModal';
import { InteractiveMap } from './components/InteractiveMap';
import { MarketIntelligence } from './components/MarketIntelligence';
import { RfqEngine } from './components/RfqEngine';
import { VerificationPortal } from './components/VerificationPortal';
import { SupplyChainTracker } from './components/SupplyChainTracker';
import { AiSourcingAssistant } from './components/AiSourcingAssistant';
import { ArchitectureHub } from './components/ArchitectureHub';
import { SupplierDiscoveryPreview } from './components/SupplierDiscoveryPreview';
import { SupplyChainVisualization } from './components/SupplyChainVisualization';
import { SustainabilitySection } from './components/SustainabilitySection';
import { SupplierDashboard } from './components/SupplierDashboard';
import { BuyerPortal } from './components/BuyerPortal';
import { FieldAgentApp } from './components/FieldAgentApp';
import { AuthModal } from './components/AuthModal';
import { RbacGate } from './components/RbacGate';
import { PlatformOverviewSection } from './components/PlatformOverviewSection';
import { PlatformVideoExplainer } from './components/PlatformVideoExplainer';
import { DEMO_USERS } from './data/demoUsers';
import { 
  INITIAL_SUPPLIERS, 
  INITIAL_RFQS, 
  INITIAL_SHIPMENTS, 
  HISTORICAL_MARKET_PRICES 
} from './data/mockData';
import { Supplier, UserRole, UserProfile, RfqItem, Shipment, MarketPricePoint } from './types';
import { Globe, ShieldCheck, ArrowUpRight, Lock, Sparkles, Building2 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalInitialRole, setAuthModalInitialRole] = useState<UserRole>('buyer');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Main Data States
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [rfqs, setRfqs] = useState<RfqItem[]>(INITIAL_RFQS);
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [marketPrices, setMarketPrices] = useState<MarketPricePoint[]>(HISTORICAL_MARKET_PRICES);

  // Modal & Assistant States
  const [selectedSupplierForModal, setSelectedSupplierForModal] = useState<Supplier | null>(null);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);
  const [aiPrompt, setAiPrompt] = useState<string>('');

  const activeRole: UserRole = currentUser ? currentUser.role : 'guest';

  // Helper to open Auth Modal
  const handleOpenAuthModal = (role?: UserRole) => {
    if (role) setAuthModalInitialRole(role);
    setIsAuthModalOpen(true);
  };

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    // Auto switch tab if appropriate for role
    if (user.role === 'supplier') setCurrentTab('supplier-dashboard');
    if (user.role === 'buyer') setCurrentTab('rfq');
    if (user.role === 'agent') setCurrentTab('field-agent');
    if (user.role === 'architect') setCurrentTab('architecture');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentTab('home');
  };

  // Fetch from backend API on mount if server is running
  useEffect(() => {
    fetch('/api/suppliers')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.suppliers) {
          setSuppliers(data.suppliers);
        }
      })
      .catch(() => {
        // Fallback to local data
      });
  }, []);

  const handleCreateRfq = (newRfqData: Omit<RfqItem, 'id' | 'createdDate' | 'bidsCount' | 'status'>) => {
    fetch('/api/rfqs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRfqData)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.rfq) {
          setRfqs((prev) => [data.rfq, ...prev]);
        }
      })
      .catch(() => {
        const fallbackRfq: RfqItem = {
          id: `rfq-2026-${String(rfqs.length + 1).padStart(3, '0')}`,
          createdDate: new Date().toISOString().split('T')[0],
          bidsCount: 0,
          status: 'OPEN',
          ...newRfqData
        };
        setRfqs((prev) => [fallbackRfq, ...prev]);
      });
  };

  const handleLogAudit = (supplierId: string, agentName: string, score: number, comments: string) => {
    fetch('/api/verification/audits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ supplierId, agentName, score, comments, gpsBoundariesConfirmed: true })
    })
      .then((res) => res.json())
      .then(() => {
        setSuppliers((prev) =>
          prev.map((s) => {
            if (s.id === supplierId) {
              return {
                ...s,
                verificationScore: Math.round((s.verificationScore + score) / 2),
                auditHistory: [
                  {
                    id: `aud-${Date.now()}`,
                    agentName,
                    agentId: 'AGENT-FIELD-01',
                    date: new Date().toISOString().split('T')[0],
                    score,
                    soilPurityScore: 98,
                    childLaborAudit: 'PASSED',
                    waterManagementScore: 97,
                    comments,
                    gpsBoundariesConfirmed: true
                  },
                  ...s.auditHistory
                ]
              };
            }
            return s;
          })
        );
      })
      .catch(() => {
        // Local fallback
      });
  };

  const handleOpenAiWithPrompt = (prompt: string) => {
    setAiPrompt(prompt);
    setIsAiAssistantOpen(true);
  };

  const handleSelectSupplierForModal = (supplier: Supplier) => {
    if (!currentUser) {
      handleOpenAuthModal('buyer');
    } else {
      setSelectedSupplierForModal(supplier);
    }
  };

  const scrollToDirectory = () => {
    if (currentTab !== 'home') {
      setCurrentTab('home');
    }
    setTimeout(() => {
      const el = document.getElementById('coop-directory');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="relative min-h-screen bg-[#05110B] text-white font-sans selection:bg-[#10B981] selection:text-[#05110B] flex flex-col justify-between overflow-x-hidden">
      {/* Background ambient glow spots */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#103D27] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#0E5431] rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)]" />
      </div>

      {/* Top Fixed Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        onOpenAuthModal={handleOpenAuthModal}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          if (q) scrollToDirectory();
        }}
        toggleAiAssistant={() => setIsAiAssistantOpen(!isAiAssistantOpen)}
      />

      {/* Main Body View Switching Router with AnimatePresence */}
      <main className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 12, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.995 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentTab === 'home' && (
              <>
                <HeroCinematic
                  onExploreSuppliers={scrollToDirectory}
                  onSubmitRfq={() => {
                    if (activeRole === 'buyer') {
                      setCurrentTab('rfq');
                    } else {
                      handleOpenAuthModal('buyer');
                    }
                  }}
                  onOpenMap={() => setCurrentTab('map')}
                  onViewArchitecture={() => setCurrentTab('architecture')}
                />

                {/* General Overview & Value Offerings Section */}
                <div className="bg-[#05110B] border-t border-white/10">
                  <PlatformOverviewSection
                    currentUser={currentUser}
                    onOpenAuthModal={handleOpenAuthModal}
                    onNavigateTab={setCurrentTab}
                  />
                </div>

                {/* Educational Video Showcase Section */}
                <PlatformVideoExplainer />

                {/* Interactive Africa Map Section */}
                <div className="bg-[#05110B] border-t border-white/10 py-8">
                  <InteractiveMap
                    suppliers={suppliers}
                    onSelectSupplier={handleSelectSupplierForModal}
                    currentUser={currentUser}
                    onOpenAuthModal={handleOpenAuthModal}
                  />
                </div>

                {/* Supplier Discovery Preview Glass Search Interface */}
                <SupplierDiscoveryPreview
                  suppliers={suppliers}
                  onSelectSupplier={handleSelectSupplierForModal}
                  onRequestQuote={handleSelectSupplierForModal}
                  onExploreAll={scrollToDirectory}
                />

                {/* Supply Chain Visualization Flow */}
                <SupplyChainVisualization />

                {/* Sustainability Charter Section */}
                <SustainabilitySection />

                {/* Complete Directory Explorer section */}
                <div id="coop-directory" className="bg-[#05110B]/90 backdrop-blur-md border-t border-white/10">
                  <SupplierDirectory
                    suppliers={suppliers}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSelectSupplier={handleSelectSupplierForModal}
                    onRequestQuoteForSupplier={handleSelectSupplierForModal}
                    currentUser={currentUser}
                    onOpenAuthModal={handleOpenAuthModal}
                  />
                </div>
              </>
            )}

            {currentTab === 'map' && (
              <InteractiveMap
                suppliers={suppliers}
                onSelectSupplier={handleSelectSupplierForModal}
                currentUser={currentUser}
                onOpenAuthModal={handleOpenAuthModal}
              />
            )}

            {currentTab === 'market' && (
              <MarketIntelligence
                priceData={marketPrices}
                onOpenAiAssistant={handleOpenAiWithPrompt}
                currentUser={currentUser}
                onOpenAuthModal={handleOpenAuthModal}
              />
            )}

            {(currentTab === 'rfq' || currentTab === 'buyer-portal') && (
              activeRole === 'buyer' ? (
                <BuyerPortal
                  suppliers={suppliers}
                  rfqs={rfqs}
                  onCreateRfq={handleCreateRfq}
                  onSelectSupplierForModal={(supplier) => setSelectedSupplierForModal(supplier)}
                />
              ) : (
                <RbacGate
                  requiredRole="buyer"
                  requiredRoleTitle="Buyer & Importer Desk"
                  tabName="Buyer RFQ & Procurement Portal"
                  currentUser={currentUser}
                  onOpenAuthModal={handleOpenAuthModal}
                  onSwitchToAllowedTab={setCurrentTab}
                />
              )
            )}

            {(currentTab === 'verification' || currentTab === 'field-agent') && (
              activeRole === 'agent' ? (
                <FieldAgentApp
                  suppliers={suppliers}
                  onLogAudit={handleLogAudit}
                />
              ) : (
                <RbacGate
                  requiredRole="agent"
                  requiredRoleTitle="Field Auditor & Verifier"
                  tabName="On-Ground GPS Field Auditor App"
                  currentUser={currentUser}
                  onOpenAuthModal={handleOpenAuthModal}
                  onSwitchToAllowedTab={setCurrentTab}
                />
              )
            )}

            {currentTab === 'tracker' && (
              activeRole === 'buyer' ? (
                <SupplyChainTracker 
                  shipments={shipments} 
                  currentUser={currentUser}
                  onOpenAuthModal={handleOpenAuthModal}
                />
              ) : (
                <RbacGate
                  requiredRole="buyer"
                  requiredRoleTitle="Buyer & Importer Desk"
                  tabName="Supply Chain & Container Tracking"
                  currentUser={currentUser}
                  onOpenAuthModal={handleOpenAuthModal}
                  onSwitchToAllowedTab={setCurrentTab}
                />
              )
            )}

            {currentTab === 'supplier-dashboard' && (
              activeRole === 'supplier' ? (
                <SupplierDashboard
                  suppliers={suppliers}
                  onUpdateSupplier={(updated) => {
                    setSuppliers(prev => prev.map(s => s.id === updated.id ? updated : s));
                  }}
                  rfqs={rfqs}
                  onSubmitBid={(bid) => {
                    console.log('Bid submitted:', bid);
                  }}
                />
              ) : (
                <RbacGate
                  requiredRole="supplier"
                  requiredRoleTitle="Cooperative Supplier Hub"
                  tabName="Cooperative Supplier Management Dashboard"
                  currentUser={currentUser}
                  onOpenAuthModal={handleOpenAuthModal}
                  onSwitchToAllowedTab={setCurrentTab}
                />
              )
            )}

            {currentTab === 'architecture' && <ArchitectureHub />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Auth & RBAC Gateway Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        initialRole={authModalInitialRole}
      />

      {/* Supplier Inspection Modal */}
      <SupplierDetailModal
        supplier={selectedSupplierForModal}
        onClose={() => setSelectedSupplierForModal(null)}
        onSubmitRfqForSupplier={(supplier, qty, price) => {
          handleCreateRfq({
            buyerName: 'International Agricultural Buyer',
            buyerCompany: 'Global Commodities Inc.',
            buyerCountry: 'Netherlands',
            crop: supplier.primaryCrop,
            quantityMT: qty,
            targetPricePerTonUSD: price,
            destinationPort: 'Port of Rotterdam, Netherlands',
            incoterm: 'CIF',
            requiredCertifications: supplier.certifications,
            targetDeliveryDate: '2026-11-30'
          });
        }}
      />

      {/* Gemini AI Trade Assistant Floating Modal */}
      <AiSourcingAssistant
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        initialPrompt={aiPrompt}
      />

      {/* Footer */}
      <footer className="relative z-10 bg-[#05110B]/90 border-t border-white/10 text-white/60 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 text-xs backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-9 h-9 bg-gradient-to-br from-[#10B981] to-[#065F46] rounded-xl flex items-center justify-center border border-white/20 shadow-lg shrink-0">
              <span className="text-[#05110B] font-extrabold text-xs tracking-tighter">SEL</span>
            </div>
            <div>
              <span className="text-white font-bold text-sm tracking-tight font-sans">SUSTAINABLE EXPORT LINK<span className="text-[#F59E0B]">.</span></span>
              <p className="text-[11px] text-white/50">Digital Agricultural Supply Chain Infrastructure Layer for Africa</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 text-[11px] font-medium tracking-wide">
            <button onClick={() => setCurrentTab('architecture')} className="hover:text-[#F59E0B] transition-colors cursor-pointer">
              Technical Specs
            </button>
            <button onClick={() => setCurrentTab('map')} className="hover:text-[#10B981] transition-colors cursor-pointer">
              Geospatial Map
            </button>
            <button onClick={() => setCurrentTab('rfq')} className="hover:text-[#10B981] transition-colors cursor-pointer">
              Buyer RFQ Desk
            </button>
            <span className="text-[#10B981] font-mono w-full sm:w-auto text-center sm:text-left mt-1 sm:mt-0">© 2026 SEL B2B Agro Platform</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

