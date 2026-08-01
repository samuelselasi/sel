import hashlib
import json
from uuid import UUID
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException
from app.models.entities import FieldInspection, Farm, VerificationStatusEnum
from app.schemas.schemas import VerificationAuditCreate, FieldInspectionRead

class VerificationService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def log_field_inspection(
        self, 
        inspector_id: UUID, 
        req: VerificationAuditCreate
    ) -> FieldInspectionRead:
        # Verify farm existence
        farm_stmt = select(Farm).where(Farm.id == req.farm_id)
        res = await self.session.execute(farm_stmt)
        farm = res.scalars().first()
        if not farm:
            raise HTTPException(status_code=404, detail="Farm record not found")

        # Generate cryptographic SHA-256 hash payload of the immutable audit
        audit_payload = {
            "farm_id": str(req.farm_id),
            "inspector_id": str(inspector_id),
            "soil_health_index": req.soil_health_index,
            "child_labor_audit_pass": req.child_labor_audit_pass,
            "shade_canopy_percentage": req.shade_canopy_percentage,
            "timestamp": datetime.utcnow().isoformat()
        }
        json_str = json.dumps(audit_payload, sort_keys=True)
        sha256_hash = hashlib.sha256(json_str.encode("utf-8")).hexdigest()

        inspection = FieldInspection(
            farm_id=req.farm_id,
            inspector_id=inspector_id,
            status=VerificationStatusEnum.VERIFIED if req.child_labor_audit_pass else VerificationStatusEnum.REJECTED,
            soil_health_index=req.soil_health_index,
            child_labor_audit_pass=req.child_labor_audit_pass,
            shade_canopy_percentage=req.shade_canopy_percentage,
            inspection_notes=req.inspection_notes,
            cryptographic_sha256=sha256_hash
        )

        self.session.add(inspection)
        await self.session.commit()
        await self.session.refresh(inspection)

        return FieldInspectionRead.model_validate(inspection)
