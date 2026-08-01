export type UserRole = 'guest' | 'buyer' | 'supplier' | 'agent' | 'architect';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  avatarUrl: string;
  verifiedBadge: boolean;
  country: string;
  permissions: {
    canBrowseDirectory: boolean;
    canSubmitRfq: boolean;
    canAcceptBids: boolean;
    canManageInventory: boolean;
    canSubmitBids: boolean;
    canConductAudits: boolean;
    canVerifyGps: boolean;
    canViewSystemSpecs: boolean;
  };
}

export type CropCategory = 
  | 'Cocoa'
  | 'Coffee'
  | 'Cashew'
  | 'Sesame'
  | 'Avocado'
  | 'Tea'
  | 'Shea Butter'
  | 'Spices'
  | 'Macadamia';

export type CertificationType = 
  | 'GlobalGAP'
  | 'Organic USDA/EU'
  | 'Fairtrade'
  | 'Rainforest Alliance'
  | 'Euro1 Certificate'
  | 'Phytosanitary Clean'
  | 'ISO 22000';

export type VerificationStatus = 'VERIFIED_GOLD' | 'VERIFIED_SILVER' | 'PENDING_AUDIT';

export interface GpsPolygon {
  latitude: number;
  longitude: number;
}

export interface InspectionDocument {
  id: string;
  name: string;
  type: string;
  issuedBy: string;
  expiryDate: string;
  verifiedHash: string;
  downloadUrl: string;
}

export interface AuditLog {
  id: string;
  agentName: string;
  agentId: string;
  date: string;
  score: number;
  soilPurityScore: number;
  childLaborAudit: 'PASSED' | 'FAILED';
  waterManagementScore: number;
  comments: string;
  gpsBoundariesConfirmed: boolean;
}

export interface Supplier {
  id: string;
  name: string;
  tagline: string;
  country: string;
  region: string;
  flagEmoji: string;
  locationCoordinates: { lat: number; lng: number };
  gpsBoundaries: GpsPolygon[];
  farmSizeHectares: number;
  cooperativeMembers: number;
  primaryCrop: CropCategory;
  secondaryCrops: CropCategory[];
  annualCapacityMT: number;
  availableStockMT: number;
  harvestWindow: string; // e.g. "Oct - Mar (Main Crop)"
  minimumOrderQuantityMT: number;
  pricePerTonUSD: { min: number; max: number };
  verificationStatus: VerificationStatus;
  verificationScore: number; // e.g. 98/100
  certifications: CertificationType[];
  yearsInExport: number;
  pastDestinations: string[]; // e.g. ["Netherlands", "Germany", "USA", "Japan"]
  coverImageUrl: string;
  logoUrl: string;
  documents: InspectionDocument[];
  auditHistory: AuditLog[];
  contactPerson: {
    name: string;
    role: string;
    email: string;
    phone: string;
  };
}

export interface MarketPricePoint {
  date: string;
  cocoaPrice: number;
  coffeePrice: number;
  cashewPrice: number;
  sesamePrice: number;
  avocadoPrice: number;
}

export interface RfqItem {
  id: string;
  buyerName: string;
  buyerCompany: string;
  buyerCountry: string;
  crop: CropCategory;
  quantityMT: number;
  targetPricePerTonUSD: number;
  destinationPort: string;
  incoterm: 'FOB' | 'CIF' | 'CFR' | 'DDP';
  requiredCertifications: CertificationType[];
  targetDeliveryDate: string;
  status: 'OPEN' | 'BIDDING' | 'CONTRACTED' | 'FULFILLED';
  createdDate: string;
  bidsCount: number;
}

export interface RfqBid {
  id: string;
  rfqId: string;
  supplierId: string;
  supplierName: string;
  bidPricePerTonUSD: number;
  offeredQuantityMT: number;
  estShipmentDate: string;
  incotermsOffered: string;
  notes: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  buyerCompany: string;
  supplierName: string;
  crop: CropCategory;
  quantityMT: number;
  originPort: string;
  destinationPort: string;
  currentStatus: 'ORDERED' | 'INSPECTION' | 'AT_PORT' | 'IN_TRANSIT' | 'CUSTOMS' | 'DELIVERED';
  etd: string;
  eta: string;
  vesselName: string;
  containerId: string;
  temperatureCelsius: number;
  humidityPercent: number;
  documentsVerified: boolean;
}

export interface FieldVerificationSubmission {
  supplierId: string;
  farmName: string;
  agentId: string;
  agentName: string;
  gpsPolygon: { lat: number; lng: number }[];
  observedYieldMT: number;
  soilQualityRating: number;
  waterManagementRating: number;
  laborStandardsVerified: boolean;
  notes: string;
  inspectionPhotos: string[];
}

export interface FieldAgentTask {
  id: string;
  supplierId: string;
  farmName: string;
  region: string;
  country: string;
  crop: CropCategory;
  assignedAgentId: string;
  dueDate: string;
  distanceKm: number;
  coordinates: { lat: number; lng: number };
  status: 'ASSIGNED' | 'IN_PROGRESS' | 'PENDING_SYNC' | 'COMPLETED';
  priority: 'HIGH' | 'MEDIUM' | 'URGENT';
}

export interface OfflineQueueItem {
  id: string;
  taskId: string;
  timestamp: string;
  payload: FieldVerificationSubmission;
  status: 'QUEUED' | 'SYNCING' | 'SYNCED' | 'FAILED';
  retryCount: number;
}
