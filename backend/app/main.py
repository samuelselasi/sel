from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.api.v1.api import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="""
    ## Sustainable Export Link (SEL) Production FastAPI Backend
    
    Clean architecture microservice backend for agricultural export verification across Africa.
    
    ### Architecture Features:
    - **PostGIS 3.4 Spatial Indexing**: Polygon farm boundaries, warehouse point centroids, EUDR compliance checks.
    - **JWT Auth & Role Security**: Cryptographic bearer token validation for Buyers, Suppliers, and Field Auditors.
    - **SHA-256 Audit Vault**: Immutable audit ledger and phytosanitary certificate verification.
    - **SQLAlchemy 2.0 Async ORM**: Repository pattern abstractions and Alembic database migrations.
    """,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc"
)

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Attach API Routers
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/health", tags=["Health & Status"])
async def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "postgis_enabled": True
    }

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal System Exception", "error": str(exc)}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
