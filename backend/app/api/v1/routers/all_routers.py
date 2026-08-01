from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.dependencies import get_current_user_claims, RoleChecker
from app.schemas.schemas import (
    UserRead, OrganizationRead, SupplierRead, SupplierCreate,
    CropRead, CropCreate, VerificationAuditCreate, FieldInspectionRead,
    DocumentRead, DocumentUploadRequest, RFQCreate, RFQRead, RFQBidCreate,
    MessageCreate, MessageRead, SearchFilterRequest
)
from app.models.entities import (
    User, Organization, Supplier, Crop, FieldInspection,
    DocumentVault, RFQ, RFQBid, ChatThread, Message, VerificationStatusEnum
)
from app.services.verification_service import VerificationService

# ----------------------------------------------------------------------
# Users Router
# ----------------------------------------------------------------------
users_router = APIRouter(prefix="/users", tags=["2. Users"])

@users_router.get("/", response_model=List[UserRead])
async def list_users(
    skip: int = 0, 
    limit: int = 50, 
    db: AsyncSession = Depends(get_db),
    claims: dict = Depends(get_current_user_claims)
):
    stmt = select(User).offset(skip).limit(limit)
    res = await db.execute(stmt)
    return [UserRead.model_validate(u) for u in res.scalars().all()]

# ----------------------------------------------------------------------
# Organizations Router
# ----------------------------------------------------------------------
orgs_router = APIRouter(prefix="/organizations", tags=["3. Organizations"])

@orgs_router.get("/", response_model=List[OrganizationRead])
async def list_organizations(db: AsyncSession = Depends(get_db)):
    stmt = select(Organization).limit(100)
    res = await db.execute(stmt)
    return [OrganizationRead.model_validate(o) for o in res.scalars().all()]

# ----------------------------------------------------------------------
# Suppliers Router
# ----------------------------------------------------------------------
suppliers_router = APIRouter(prefix="/suppliers", tags=["4. Suppliers"])

@suppliers_router.get("/", response_model=List[SupplierRead])
async def list_suppliers(
    crop: Optional[str] = None,
    min_trust_score: Optional[int] = Query(70, ge=0, le=100),
    db: AsyncSession = Depends(get_db)
):
    stmt = select(Supplier).where(Supplier.trust_score >= min_trust_score)
    if crop:
        stmt = stmt.where(Supplier.primary_crop.ilike(f"%{crop}%"))
    res = await db.execute(stmt)
    return [SupplierRead.model_validate(s) for s in res.scalars().all()]

@suppliers_router.post("/", response_model=SupplierRead)
async def create_supplier(
    req: SupplierCreate,
    db: AsyncSession = Depends(get_db),
    claims: dict = Depends(get_current_user_claims)
):
    sup = Supplier(**req.model_dump())
    db.add(sup)
    await db.commit()
    await db.refresh(sup)
    return SupplierRead.model_validate(sup)

# ----------------------------------------------------------------------
# Crops Router
# ----------------------------------------------------------------------
crops_router = APIRouter(prefix="/crops", tags=["5. Crops"])

@crops_router.get("/", response_model=List[CropRead])
async def list_crops(db: AsyncSession = Depends(get_db)):
    stmt = select(Crop).limit(100)
    res = await db.execute(stmt)
    return [CropRead.model_validate(c) for c in res.scalars().all()]

# ----------------------------------------------------------------------
# Verification Router
# ----------------------------------------------------------------------
verification_router = APIRouter(prefix="/verification", tags=["7. Verification & Audits"])

@verification_router.post("/inspections", response_model=FieldInspectionRead)
async def log_inspection(
    req: VerificationAuditCreate,
    db: AsyncSession = Depends(get_db),
    claims: dict = Depends(get_current_user_claims)
):
    inspector_id = UUID(claims["sub"])
    service = VerificationService(db)
    return await service.log_field_inspection(inspector_id, req)

# ----------------------------------------------------------------------
# Documents Router
# ----------------------------------------------------------------------
documents_router = APIRouter(prefix="/documents", tags=["8. Documents Vault"])

@documents_router.get("/", response_model=List[DocumentRead])
async def list_documents(db: AsyncSession = Depends(get_db)):
    stmt = select(DocumentVault).limit(100)
    res = await db.execute(stmt)
    return [DocumentRead.model_validate(d) for d in res.scalars().all()]

# ----------------------------------------------------------------------
# RFQ Router
# ----------------------------------------------------------------------
rfq_router = APIRouter(prefix="/rfqs", tags=["9. Request for Quotation (RFQ)"])

@rfq_router.get("/", response_model=List[RFQRead])
async def list_rfqs(db: AsyncSession = Depends(get_db)):
    stmt = select(RFQ).limit(100)
    res = await db.execute(stmt)
    return [RFQRead.model_validate(r) for r in res.scalars().all()]

@rfq_router.post("/", response_model=RFQRead)
async def create_rfq(
    req: RFQCreate,
    db: AsyncSession = Depends(get_db),
    claims: dict = Depends(get_current_user_claims)
):
    buyer_id = UUID(claims["sub"])
    rfq = RFQ(
        buyer_id=buyer_id,
        title=req.title,
        crop_type=req.crop_type,
        target_quantity_mt=req.target_quantity_mt,
        target_price_per_mt_usd=req.target_price_per_mt_usd,
        destination_port=req.destination_port,
        incoterm=req.incoterm
    )
    db.add(rfq)
    await db.commit()
    await db.refresh(rfq)
    return RFQRead.model_validate(rfq)

# ----------------------------------------------------------------------
# Messaging Router
# ----------------------------------------------------------------------
messaging_router = APIRouter(prefix="/messaging", tags=["10. Messaging"])

@messaging_router.get("/threads")
async def list_threads(
    db: AsyncSession = Depends(get_db),
    claims: dict = Depends(get_current_user_claims)
):
    user_id = UUID(claims["sub"])
    stmt = select(ChatThread).where(ChatThread.buyer_id == user_id)
    res = await db.execute(stmt)
    return list(res.scalars().all())

# ----------------------------------------------------------------------
# Search Router
# ----------------------------------------------------------------------
search_router = APIRouter(prefix="/search", tags=["11. Geospatial & Sourcing Search"])

@search_router.post("/suppliers")
async def search_suppliers_advanced(
    req: SearchFilterRequest,
    db: AsyncSession = Depends(get_db)
):
    stmt = select(Supplier).where(Supplier.trust_score >= (req.min_trust_score or 70))
    if req.crop:
        stmt = stmt.where(Supplier.primary_crop.ilike(f"%{req.crop}%"))
    res = await db.execute(stmt)
    suppliers = res.scalars().all()
    return {
        "query": req.query,
        "total_results": len(suppliers),
        "results": [SupplierRead.model_validate(s) for s in suppliers]
    }
