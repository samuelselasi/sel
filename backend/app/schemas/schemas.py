from typing import Optional, List, Any, Dict
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from app.models.entities import UserRoleEnum, OrganizationTypeEnum, RFQStatusEnum, DocumentTypeEnum, VerificationStatusEnum

# ----------------------------------------------------------------------
# 1. Auth & Token Schemas
# ----------------------------------------------------------------------
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in_seconds: int = 604800
    user_id: UUID
    role: UserRoleEnum
    email: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    role: Optional[str] = None
    exp: Optional[int] = None

class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserRegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    phone_number: Optional[str] = None
    role: UserRoleEnum = UserRoleEnum.BUYER
    organization_name: Optional[str] = None
    organization_type: Optional[OrganizationTypeEnum] = OrganizationTypeEnum.IMPORTER
    country: Optional[str] = "Netherlands"

# ----------------------------------------------------------------------
# 2. User & Organization Schemas
# ----------------------------------------------------------------------
class UserRead(BaseModel):
    id: UUID
    email: EmailStr
    full_name: str
    phone_number: Optional[str]
    role: UserRoleEnum
    is_active: bool
    organization_id: Optional[UUID]
    created_at: datetime

    class Config:
        from_attributes = True

class OrganizationRead(BaseModel):
    id: UUID
    name: str
    org_type: OrganizationTypeEnum
    registration_number: str
    country: str
    website: Optional[str]
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True

# ----------------------------------------------------------------------
# 3. Supplier Schemas
# ----------------------------------------------------------------------
class SupplierCreate(BaseModel):
    organization_id: UUID
    supplier_code: str
    export_license_no: str
    primary_crop: str
    total_acreage_hectares: float
    farmer_count: int

class SupplierRead(BaseModel):
    id: UUID
    organization_id: UUID
    supplier_code: str
    export_license_no: str
    primary_crop: str
    total_acreage_hectares: float
    farmer_count: int
    trust_score: int
    verification_tier: str
    created_at: datetime

    class Config:
        from_attributes = True

# ----------------------------------------------------------------------
# 4. Crop Schemas
# ----------------------------------------------------------------------
class CropCreate(BaseModel):
    common_name: str
    botanical_name: str
    hs_code: str
    category: str
    typical_grade: str = "Grade 1 Premium"

class CropRead(BaseModel):
    id: UUID
    common_name: str
    botanical_name: str
    hs_code: str
    category: str
    typical_grade: str
    harvest_season_start: int
    harvest_season_end: int

    class Config:
        from_attributes = True

# ----------------------------------------------------------------------
# 5. Farm & Spatial PostGIS Schemas
# ----------------------------------------------------------------------
class GeoPoint(BaseModel):
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)

class GeoPolygon(BaseModel):
    coordinates: List[List[List[float]]] # GeoJSON Polygon [[[lon, lat], ...]]

class FarmCreate(BaseModel):
    supplier_id: UUID
    farm_name: str
    village_district: str
    region: str
    country: str
    area_hectares: float
    latitude: float
    longitude: float
    polygon_coordinates: Optional[List[List[List[float]]]] = None

class FarmRead(BaseModel):
    id: UUID
    supplier_id: UUID
    farm_name: str
    village_district: str
    region: str
    country: str
    area_hectares: float
    eudr_deforestation_free: bool
    created_at: datetime

    class Config:
        from_attributes = True

class WarehouseCreate(BaseModel):
    supplier_id: UUID
    warehouse_name: str
    capacity_metric_tons: float
    latitude: float
    longitude: float

class FacilityCreate(BaseModel):
    supplier_id: UUID
    facility_name: str
    processing_type: str
    daily_throughput_mt: float
    latitude: float
    longitude: float

# ----------------------------------------------------------------------
# 6. Verification & Audit Schemas
# ----------------------------------------------------------------------
class VerificationAuditCreate(BaseModel):
    farm_id: UUID
    soil_health_index: float = 96.5
    child_labor_audit_pass: bool = True
    shade_canopy_percentage: float = 45.0
    inspection_notes: Optional[str] = "Field audit passed with zero infractions."

class FieldInspectionRead(BaseModel):
    id: UUID
    farm_id: UUID
    inspector_id: UUID
    status: VerificationStatusEnum
    soil_health_index: float
    child_labor_audit_pass: bool
    shade_canopy_percentage: float
    cryptographic_sha256: str
    created_at: datetime

    class Config:
        from_attributes = True

# ----------------------------------------------------------------------
# 7. Document Vault Schemas
# ----------------------------------------------------------------------
class DocumentUploadRequest(BaseModel):
    title: str
    doc_type: DocumentTypeEnum
    file_url: str
    file_size_bytes: int
    organization_id: UUID

class DocumentRead(BaseModel):
    id: UUID
    title: str
    doc_type: DocumentTypeEnum
    file_url: str
    file_size_bytes: int
    mime_type: str
    sha256_checksum: str
    organization_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

# ----------------------------------------------------------------------
# 8. RFQ & Trade Contract Schemas
# ----------------------------------------------------------------------
class RFQCreate(BaseModel):
    title: str
    crop_type: str
    target_quantity_mt: float
    target_price_per_mt_usd: float
    destination_port: str
    incoterm: str = "CIF"

class RFQBidCreate(BaseModel):
    rfq_id: UUID
    bid_price_per_mt_usd: float
    offered_quantity_mt: float
    lead_time_days: int
    proposal_notes: Optional[str] = None

class RFQRead(BaseModel):
    id: UUID
    buyer_id: UUID
    title: str
    crop_type: str
    target_quantity_mt: float
    target_price_per_mt_usd: float
    destination_port: str
    incoterm: str
    status: RFQStatusEnum
    created_at: datetime

    class Config:
        from_attributes = True

class TradeContractRead(BaseModel):
    id: UUID
    contract_number: str
    rfq_id: UUID
    buyer_id: UUID
    supplier_id: UUID
    agreed_quantity_mt: float
    total_contract_value_usd: float
    is_signed_by_buyer: bool
    is_signed_by_supplier: bool

    class Config:
        from_attributes = True

# ----------------------------------------------------------------------
# 9. Messaging Schemas
# ----------------------------------------------------------------------
class MessageCreate(BaseModel):
    thread_id: UUID
    content: str

class MessageRead(BaseModel):
    id: UUID
    thread_id: UUID
    sender_id: UUID
    content: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True

# ----------------------------------------------------------------------
# 10. Search Schemas
# ----------------------------------------------------------------------
class SearchFilterRequest(BaseModel):
    query: Optional[str] = None
    crop: Optional[str] = None
    country: Optional[str] = None
    min_trust_score: Optional[int] = 80
    max_distance_km: Optional[float] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
