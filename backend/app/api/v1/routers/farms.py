from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.schemas import FarmCreate, FarmRead
from app.repositories.farm_repository import FarmRepository
from app.models.entities import Farm
from app.core.dependencies import get_current_user_claims
from geoalchemy2.functions import ST_SetSRID, ST_MakePoint

router = APIRouter(prefix="/farms", tags=["6. PostGIS Farms & Spatial Geometries"])

@router.post("/", response_model=FarmRead)
async def create_farm(
    req: FarmCreate,
    db: AsyncSession = Depends(get_db),
    claims: dict = Depends(get_current_user_claims)
):
    """
    Creates a farm entity with PostGIS spatial point centroid.
    """
    repo = FarmRepository(db)
    
    farm = Farm(
        supplier_id=req.supplier_id,
        farm_name=req.farm_name,
        village_district=req.village_district,
        region=req.region,
        country=req.country,
        area_hectares=req.area_hectares,
        eudr_deforestation_free=True,
        centroid_location=ST_SetSRID(ST_MakePoint(req.longitude, req.latitude), 4326)
    )
    
    created_farm = await repo.create(farm)
    return FarmRead.model_validate(created_farm)

@router.get("/nearby", response_model=List[FarmRead])
async def find_farms_nearby(
    latitude: float = Query(..., ge=-90, le=90),
    longitude: float = Query(..., ge=-180, le=180),
    radius_km: float = Query(50.0, gt=0),
    db: AsyncSession = Depends(get_db)
):
    """
    Executes PostGIS ST_DWithin query to discover farms within a specified radius.
    """
    repo = FarmRepository(db)
    farms = await repo.find_farms_near_point(latitude, longitude, radius_km * 1000.0)
    return [FarmRead.model_validate(f) for f in farms]

@router.get("/supplier/{supplier_id}", response_model=List[FarmRead])
async def get_farms_by_supplier(supplier_id: UUID, db: AsyncSession = Depends(get_db)):
    """Retrieves all PostGIS farm polygons associated with a supplier cooperative."""
    repo = FarmRepository(db)
    farms = await repo.get_farms_by_supplier(supplier_id)
    return [FarmRead.model_validate(f) for f in farms]
