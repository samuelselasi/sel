import { UserProfile, UserRole } from '../types';

export const DEMO_USERS: Record<Exclude<UserRole, 'guest'>, UserProfile> = {
  buyer: {
    id: 'user_buyer_01',
    name: 'Importer Representative',
    email: 'importer@sel-trade.com',
    role: 'buyer',
    organization: 'European Sourcing Enterprise',
    avatarUrl: '',
    verifiedBadge: true,
    country: 'Netherlands',
    permissions: {
      canBrowseDirectory: true,
      canSubmitRfq: true,
      canAcceptBids: true,
      canManageInventory: false,
      canSubmitBids: false,
      canConductAudits: false,
      canVerifyGps: true,
      canViewSystemSpecs: true,
    }
  },
  supplier: {
    id: 'user_supplier_01',
    name: 'Cooperative Manager',
    email: 'coop@sel-trade.com',
    role: 'supplier',
    organization: 'African Farmers Cooperative Union',
    avatarUrl: '',
    verifiedBadge: true,
    country: 'Ghana',
    permissions: {
      canBrowseDirectory: true,
      canSubmitRfq: false,
      canAcceptBids: false,
      canManageInventory: true,
      canSubmitBids: true,
      canConductAudits: false,
      canVerifyGps: true,
      canViewSystemSpecs: false,
    }
  },
  agent: {
    id: 'user_agent_01',
    name: 'Field Auditor & Verifier',
    email: 'auditor@sel-trade.com',
    role: 'agent',
    organization: 'EUDR Field Verification Unit',
    avatarUrl: '',
    verifiedBadge: true,
    country: 'Kenya',
    permissions: {
      canBrowseDirectory: true,
      canSubmitRfq: false,
      canAcceptBids: false,
      canManageInventory: false,
      canSubmitBids: false,
      canConductAudits: true,
      canVerifyGps: true,
      canViewSystemSpecs: false,
    }
  },
  architect: {
    id: 'user_architect_01',
    name: 'System Administrator',
    email: 'admin@sel-trade.com',
    role: 'architect',
    organization: 'Platform Infrastructure Operations',
    avatarUrl: '',
    verifiedBadge: true,
    country: 'Switzerland',
    permissions: {
      canBrowseDirectory: true,
      canSubmitRfq: true,
      canAcceptBids: true,
      canManageInventory: true,
      canSubmitBids: true,
      canConductAudits: true,
      canVerifyGps: true,
      canViewSystemSpecs: true,
    }
  }
};

export interface RoleInfo {
  role: UserRole;
  title: string;
  subtitle: string;
  badgeColor: string;
  description: string;
  allowedTabs: string[];
  keyCapabilities: string[];
}

export const ROLE_INFO_MAP: Record<UserRole, RoleInfo> = {
  guest: {
    role: 'guest',
    title: 'Public Visitor',
    subtitle: 'Explore Directory & Market Feeds',
    badgeColor: 'bg-white/10 text-white/80 border-white/20',
    description: 'Unauthenticated public access with preview rights to verified supplier listings, market intelligence feeds, and supply chain visualization.',
    allowedTabs: ['home', 'map', 'market'],
    keyCapabilities: [
      'Browse Verified Supplier Directory',
      'View Real-time Spot Commodity Prices',
      'Inspect Interactive Geospatial Map',
      'Review EUDR Transparency Charter'
    ]
  },
  buyer: {
    role: 'buyer',
    title: 'Importer & Buyer Desk',
    subtitle: 'Commercial Sourcing & Contracts',
    badgeColor: 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40',
    description: 'Commercial procurement access for global importers. Create binding RFQs, receive competitive supplier bids, execute trade contracts, and track live container logistics.',
    allowedTabs: ['home', 'map', 'market', 'rfq', 'tracker', 'buyer-portal'],
    keyCapabilities: [
      'Create Custom RFQs & Tender Packages',
      'Evaluate Supplier Bids & Escrow Terms',
      'Track Container Vessels & Live Cargo Telemetry',
      'Download Verified EUDR & Organic Certificates'
    ]
  },
  supplier: {
    role: 'supplier',
    title: 'Cooperative Supplier Hub',
    subtitle: 'Farms Inventory & Order Bidding',
    badgeColor: 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40',
    description: 'Operational portal for agricultural cooperatives. Manage crop capacity, post spot quotes, respond to global buyer RFQs, and upload field inspection documents.',
    allowedTabs: ['home', 'map', 'market', 'supplier-dashboard'],
    keyCapabilities: [
      'Manage Harvest Inventory & Capacity (MT)',
      'Submit Competitive Bids on Importer RFQs',
      'Upload Soil & Phytosanitary Certificates',
      'Manage Co-op Member Farm Profiles'
    ]
  },
  agent: {
    role: 'agent',
    title: 'Field Auditor & Verifier',
    subtitle: 'On-Ground GPS & Deforestation Audits',
    badgeColor: 'bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]/40',
    description: 'On-the-ground inspection tools for field auditors. Capture satellite-synced farm polygon boundaries, conduct labor standards audits, and queue offline reports.',
    allowedTabs: ['home', 'map', 'verification', 'field-agent'],
    keyCapabilities: [
      'Capture Multi-Point Farm GPS Polygons',
      'Conduct Soil & Child Labor Prevention Audits',
      'Work Offline in Remote Fields with Local Queue',
      'Issue Cryptographic Verified Scores'
    ]
  },
  architect: {
    role: 'architect',
    title: 'System Architect & Admin',
    subtitle: 'Infrastructure & Ledger Telemetry',
    badgeColor: 'bg-[#8B5CF6]/20 text-[#8B5CF6] border-[#8B5CF6]/40',
    description: 'Full administrative and technical access. Monitor distributed ledger node telemetry, system APIs, smart contract execution logs, and RBAC policies.',
    allowedTabs: ['home', 'map', 'market', 'rfq', 'tracker', 'supplier-dashboard', 'field-agent', 'architecture'],
    keyCapabilities: [
      'Inspect Distributed Ledger Consensus',
      'Monitor API Gateway & Node Latency',
      'Manage RBAC Security Policies',
      'Full Administrative Portal Override'
    ]
  }
};
