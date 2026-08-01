from fastapi import APIRouter
from app.api.v1.routers import auth, farms
from app.api.v1.routers.all_routers import (
    users_router, orgs_router, suppliers_router, crops_router,
    verification_router, documents_router, rfq_router, messaging_router,
    search_router
)

api_router = APIRouter()

# Include all 11 required core modules
api_router.include_router(auth.router)
api_router.include_router(users_router)
api_router.include_router(orgs_router)
api_router.include_router(suppliers_router)
api_router.include_router(crops_router)
api_router.include_router(farms.router)
api_router.include_router(verification_router)
api_router.include_router(documents_router)
api_router.include_router(rfq_router)
api_router.include_router(messaging_router)
api_router.include_router(search_router)
