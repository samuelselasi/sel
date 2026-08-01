import uuid
from datetime import datetime
from typing import Optional, List, Any
from sqlalchemy import String, Text, Integer, Float, Boolean, ForeignKey, Enum as SQLEnum, Table, Column, Numeric, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB
from geoalchemy2 import Geometry
import enum

from app.models.base import Base, TimestampMixin

# ----------------------------------------------------------------------
# Enums
# ----------------------------------------------------------------------
class UserRoleEnum(str, enum.Enum):
    ADMIN = "admin"
    BUYER = "buyer"
    SUPPLIER = "supplier"
    FIELD_AGENT = "field_agent"
    ARCHITECT = "architect"

class OrganizationTypeEnum(str, enum.Enum):
    COOPERATIVE = "cooperative"
    IMPORTER = "importer"
    LOGISTICS_PROVIDER = "logistics_provider"
    INSPECTION_BODY = "inspection_body"

class RFQStatusEnum(str, enum.Enum):
    DRAFT = "DRAFT"
    OPEN = "OPEN"
    UNDER_REVIEW = "UNDER_REVIEW"
    AWARDED = "AWARDED"
    FULFILLED = "FULFILLED"
    CANCELLED = "CANCELLED"

class DocumentTypeEnum(str, enum.Enum):
    PHYTOSANITARY = "phytosanitary"
    BILL_OF_LADING = "bill_of_lading"
    EUDR_DEFORESTATION = "eudr_deforestation"
    FAIR_TRADE = "fair_trade"
    ORGANIC_CERT = "organic_cert"

class VerificationStatusEnum(str, enum.Enum):
    PENDING = "PENDING"
    VERIFIED = "VERIFIED"
    REJECTED = "REJECTED"
    EXPIRED = "EXPIRED"

# ----------------------------------------------------------------------
# 1. Auth & Users & Organizations
# ----------------------------------------------------------------------
class Organization(Base, TimestampMixin):
    __tablename__ = "organizations"

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    org_type: Mapped[OrganizationTypeEnum] = mapped_column(SQLEnum(OrganizationTypeEnum), nullable=False)
    registration_number: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    country: Mapped[str] = mapped_column(String(100), nullable=False)
    website: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)

    users: Mapped[List["User"]] = relationship("User", back_populates="organization")
    suppliers: Mapped[List["Supplier"]] = relationship("Supplier", back_populates="organization")


class User(Base, TimestampMixin):
    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    phone_number: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    role: Mapped[UserRoleEnum] = mapped_column(SQLEnum(UserRoleEnum), default=UserRoleEnum.BUYER)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    organization_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("organizations.id"))
    organization: Mapped[Optional[Organization]] = relationship("Organization", back_populates="users")


# ----------------------------------------------------------------------
# 2. Suppliers & Crops
# ----------------------------------------------------------------------
class Supplier(Base, TimestampMixin):
    __tablename__ = "suppliers"

    organization_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    supplier_code: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    export_license_no: Mapped[str] = mapped_column(String(100), nullable=False)
    primary_crop: Mapped[str] = mapped_column(String(100), nullable=False)
    total_acreage_hectares: Mapped[float] = mapped_column(Float, default=0.0)
    farmer_count: Mapped[int] = mapped_column(Integer, default=1)
    trust_score: Mapped[int] = mapped_column(Integer, default=85) # 0 to 100
    verification_tier: Mapped[str] = mapped_column(String(50), default="GOLD_VERIFIED")

    organization: Mapped[Organization] = relationship("Organization", back_populates="suppliers")
    farms: Mapped[List["Farm"]] = relationship("Farm", back_populates="supplier")
    warehouses: Mapped[List["Warehouse"]] = relationship("Warehouse", back_populates="supplier")
    processing_facilities: Mapped[List["ProcessingFacility"]] = relationship("ProcessingFacility", back_populates="supplier")


class Crop(Base, TimestampMixin):
    __tablename__ = "crops"

    common_name: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    botanical_name: Mapped[str] = mapped_column(String(150), nullable=False)
    hs_code: Mapped[str] = mapped_column(String(20), nullable=False) # Harmonized System Code for International Trade
    category: Mapped[str] = mapped_column(String(100), nullable=False)
    typical_grade: Mapped[str] = mapped_column(String(50), default="Grade 1 Premium")
    harvest_season_start: Mapped[int] = mapped_column(Integer, default=1) # Month (1-12)
    harvest_season_end: Mapped[int] = mapped_column(Integer, default=12)


# ----------------------------------------------------------------------
# 3. PostGIS Entities: Farms, Warehouses, Processing Facilities
# ----------------------------------------------------------------------
class Farm(Base, TimestampMixin):
    __tablename__ = "farms"

    supplier_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("suppliers.id"), nullable=False)
    farm_name: Mapped[str] = mapped_column(String(255), nullable=False)
    village_district: Mapped[str] = mapped_column(String(150), nullable=False)
    region: Mapped[str] = mapped_column(String(150), nullable=False)
    country: Mapped[str] = mapped_column(String(100), nullable=False)
    area_hectares: Mapped[float] = mapped_column(Float, nullable=False)
    eudr_deforestation_free: Mapped[bool] = mapped_column(Boolean, default=True)

    # PostGIS Spatial Data: Polygon perimeter of the farm plot
    boundary_polygon: Mapped[Optional[Any]] = mapped_column(
        Geometry(geometry_type="POLYGON", srid=4326),
        nullable=True
    )
    # PostGIS Point centroid
    centroid_location: Mapped[Optional[Any]] = mapped_column(
        Geometry(geometry_type="POINT", srid=4326),
        nullable=True
    )

    supplier: Mapped[Supplier] = relationship("Supplier", back_populates="farms")
    field_inspections: Mapped[List["FieldInspection"]] = relationship("FieldInspection", back_populates="farm")


class Warehouse(Base, TimestampMixin):
    __tablename__ = "warehouses"

    supplier_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("suppliers.id"), nullable=False)
    warehouse_name: Mapped[str] = mapped_column(String(255), nullable=False)
    capacity_metric_tons: Mapped[float] = mapped_column(Float, nullable=False)
    current_occupancy_mt: Mapped[float] = mapped_column(Float, default=0.0)
    has_climate_control: Mapped[bool] = mapped_column(Boolean, default=True)

    # PostGIS Point Location
    location: Mapped[Optional[Any]] = mapped_column(
        Geometry(geometry_type="POINT", srid=4326),
        nullable=True
    )

    supplier: Mapped[Supplier] = relationship("Supplier", back_populates="warehouses")


class ProcessingFacility(Base, TimestampMixin):
    __tablename__ = "processing_facilities"

    supplier_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("suppliers.id"), nullable=False)
    facility_name: Mapped[str] = mapped_column(String(255), nullable=False)
    processing_type: Mapped[str] = mapped_column(String(100), nullable=False) # e.g. Cocoa Fermentation, Coffee Milling
    daily_throughput_mt: Mapped[float] = mapped_column(Float, nullable=False)
    iso_certified: Mapped[bool] = mapped_column(Boolean, default=True)

    # PostGIS Point Location
    location: Mapped[Optional[Any]] = mapped_column(
        Geometry(geometry_type="POINT", srid=4326),
        nullable=True
    )

    supplier: Mapped[Supplier] = relationship("Supplier", back_populates="processing_facilities")


# ----------------------------------------------------------------------
# 4. Verification & Audits
# ----------------------------------------------------------------------
class FieldInspection(Base, TimestampMixin):
    __tablename__ = "field_inspections"

    farm_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("farms.id"), nullable=False)
    inspector_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    status: Mapped[VerificationStatusEnum] = mapped_column(SQLEnum(VerificationStatusEnum), default=VerificationStatusEnum.PENDING)
    soil_health_index: Mapped[float] = mapped_column(Float, default=95.0)
    child_labor_audit_pass: Mapped[bool] = mapped_column(Boolean, default=True)
    shade_canopy_percentage: Mapped[float] = mapped_column(Float, default=42.0)
    inspection_notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    
    # SHA-256 Digest of immutable audit snapshot
    cryptographic_sha256: Mapped[str] = mapped_column(String(64), nullable=False)

    farm: Mapped[Farm] = relationship("Farm", back_populates="field_inspections")


class Certificate(Base, TimestampMixin):
    __tablename__ = "certificates"

    certificate_number: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    supplier_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("suppliers.id"), nullable=False)
    certificate_type: Mapped[str] = mapped_column(String(100), nullable=False) # EUDR, FairTrade, Organic
    issuing_authority: Mapped[str] = mapped_column(String(200), nullable=False)
    valid_from: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    valid_until: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    status: Mapped[VerificationStatusEnum] = mapped_column(SQLEnum(VerificationStatusEnum), default=VerificationStatusEnum.VERIFIED)


# ----------------------------------------------------------------------
# 5. Documents Vault
# ----------------------------------------------------------------------
class DocumentVault(Base, TimestampMixin):
    __tablename__ = "document_vault"

    title: Mapped[str] = mapped_column(String(255), nullable=False)
    doc_type: Mapped[DocumentTypeEnum] = mapped_column(SQLEnum(DocumentTypeEnum), nullable=False)
    file_url: Mapped[str] = mapped_column(String(500), nullable=False)
    file_size_bytes: Mapped[int] = mapped_column(Integer, nullable=False)
    mime_type: Mapped[str] = mapped_column(String(100), default="application/pdf")
    sha256_checksum: Mapped[str] = mapped_column(String(64), nullable=False)
    organization_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)


# ----------------------------------------------------------------------
# 6. RFQ (Request for Quotation) & Contracts
# ----------------------------------------------------------------------
class RFQ(Base, TimestampMixin):
    __tablename__ = "rfqs"

    buyer_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    crop_type: Mapped[str] = mapped_column(String(100), nullable=False)
    target_quantity_mt: Mapped[float] = mapped_column(Float, nullable=False)
    target_price_per_mt_usd: Mapped[float] = mapped_column(Float, nullable=False)
    destination_port: Mapped[str] = mapped_column(String(150), nullable=False)
    incoterm: Mapped[str] = mapped_column(String(10), default="CIF")
    status: Mapped[RFQStatusEnum] = mapped_column(SQLEnum(RFQStatusEnum), default=RFQStatusEnum.OPEN)

    bids: Mapped[List["RFQBid"]] = relationship("RFQBid", back_populates="rfq")


class RFQBid(Base, TimestampMixin):
    __tablename__ = "rfq_bids"

    rfq_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("rfqs.id"), nullable=False)
    supplier_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("suppliers.id"), nullable=False)
    bid_price_per_mt_usd: Mapped[float] = mapped_column(Float, nullable=False)
    offered_quantity_mt: Mapped[float] = mapped_column(Float, nullable=False)
    lead_time_days: Mapped[int] = mapped_column(Integer, nullable=False)
    proposal_notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    is_winning_bid: Mapped[bool] = mapped_column(Boolean, default=False)

    rfq: Mapped[RFQ] = relationship("RFQ", back_populates="bids")


class TradeContract(Base, TimestampMixin):
    __tablename__ = "trade_contracts"

    contract_number: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    rfq_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("rfqs.id"), nullable=False)
    buyer_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    supplier_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("suppliers.id"), nullable=False)
    agreed_quantity_mt: Mapped[float] = mapped_column(Float, nullable=False)
    total_contract_value_usd: Mapped[float] = mapped_column(Float, nullable=False)
    is_signed_by_buyer: Mapped[bool] = mapped_column(Boolean, default=False)
    is_signed_by_supplier: Mapped[bool] = mapped_column(Boolean, default=False)


# ----------------------------------------------------------------------
# 7. Messaging
# ----------------------------------------------------------------------
class ChatThread(Base, TimestampMixin):
    __tablename__ = "chat_threads"

    topic: Mapped[str] = mapped_column(String(255), nullable=False)
    buyer_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    supplier_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("suppliers.id"), nullable=False)

    messages: Mapped[List["Message"]] = relationship("Message", back_populates="thread")


class Message(Base, TimestampMixin):
    __tablename__ = "messages"

    thread_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("chat_threads.id"), nullable=False)
    sender_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)

    thread: Mapped[ChatThread] = relationship("ChatThread", back_populates="messages")


# ----------------------------------------------------------------------
# 8. Search Logging & Analytics
# ----------------------------------------------------------------------
class SavedSearchQuery(Base, TimestampMixin):
    __tablename__ = "saved_searches"

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    query_name: Mapped[str] = mapped_column(String(150), nullable=False)
    filters_json: Mapped[dict] = mapped_column(JSONB, nullable=False)
