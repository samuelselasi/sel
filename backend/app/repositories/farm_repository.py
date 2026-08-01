from typing import List, Optional
from uuid import UUID
from sqlalchemy import select, func
from geoalchemy2.functions import ST_DWithin, ST_MakePoint, ST_GeomFromText, ST_Contains, ST_SetSRID
from app.repositories.base import BaseRepository
from app.models.entities import Farm, Warehouse, ProcessingFacility

class FarmRepository(BaseRepository[Farm]):
    def __init__(self, session):
        super().__init__(Farm, session)

    async def get_farms_by_supplier(self, supplier_id: UUID) -> List[Farm]:
        query = select(Farm).where(Farm.supplier_id == supplier_id)
        result = await self.session.execute(query)
        return list(result.scalars().all())

    async def find_farms_near_point(
        self, 
        latitude: float, 
        longitude: float, 
        radius_meters: float = 50000.0
    ) -> List[Farm]:
        """
        PostGIS Spatial Query: Finds all farms within radius_meters of (lat, lon) using WGS84 (SRID 4326).
        """
        point_geom = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
        query = select(Farm).where(
            ST_DWithin(
                Farm.centroid_location,
                point_geom,
                radius_meters / 111320.0 # Approximate degrees conversion for geography
            )
        )
        result = await self.session.execute(query)
        return list(result.scalars().all())

    async def check_point_inside_farm_polygon(
        self, 
        farm_id: UUID, 
        latitude: float, 
        longitude: float
    ) -> bool:
        """
        PostGIS Spatial Query: Checks if a GPS audit coordinate falls strictly within the registered polygon.
        """
        farm = await self.get_by_id(farm_id)
        if not farm or not farm.boundary_polygon:
            return False
        
        point_geom = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
        query = select(
            ST_Contains(Farm.boundary_polygon, point_geom)
        ).where(Farm.id == farm_id)
        
        result = await self.session.execute(query)
        return bool(result.scalar())
