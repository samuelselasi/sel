from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.schemas import UserRegisterRequest, UserLoginRequest, Token
from app.services.auth_service import AuthService
from app.core.dependencies import get_current_user_claims

router = APIRouter(prefix="/auth", tags=["1. Authentication & Identity"])

@router.post("/register", response_model=Token)
async def register(req: UserRegisterRequest, db: AsyncSession = Depends(get_db)):
    """Registers a new user (Buyer, Supplier Co-op, or Field Auditor) and issues JWT access token."""
    service = AuthService(db)
    return await service.register_user(req)

@router.post("/login", response_model=Token)
async def login(req: UserLoginRequest, db: AsyncSession = Depends(get_db)):
    """Authenticates user email & password and generates JWT bearer token."""
    service = AuthService(db)
    return await service.login_user(req)

@router.get("/me")
async def get_current_user_profile(claims: dict = Depends(get_current_user_claims)):
    """Returns claims of the currently authenticated JWT bearer token."""
    return claims
