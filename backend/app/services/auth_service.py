import uuid
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status
from app.models.entities import User, Organization, UserRoleEnum
from app.schemas.schemas import UserRegisterRequest, UserLoginRequest, Token
from app.core.security import verify_password, get_password_hash, create_access_token

class AuthService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def register_user(self, req: UserRegisterRequest) -> Token:
        # Check existing user
        stmt = select(User).where(User.email == req.email)
        res = await self.session.execute(stmt)
        if res.scalars().first():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists"
            )

        # Create or attach organization
        org_id = None
        if req.organization_name:
            org = Organization(
                name=req.organization_name,
                org_type=req.organization_type,
                registration_number=f"REG-{uuid.uuid4().hex[:8].upper()}",
                country=req.country or "Ghana",
                is_verified=True
            )
            self.session.add(org)
            await self.session.flush()
            org_id = org.id

        user = User(
            email=req.email,
            hashed_password=get_password_hash(req.password),
            full_name=req.full_name,
            phone_number=req.phone_number,
            role=req.role,
            organization_id=org_id,
            is_active=True
        )
        self.session.add(user)
        await self.session.commit()
        await self.session.refresh(user)

        access_token = create_access_token(
            subject=str(user.id),
            extra_claims={"role": user.role.value, "email": user.email}
        )

        return Token(
            access_token=access_token,
            user_id=user.id,
            role=user.role,
            email=user.email
        )

    async def login_user(self, req: UserLoginRequest) -> Token:
        stmt = select(User).where(User.email == req.email)
        res = await self.session.execute(stmt)
        user = res.scalars().first()

        if not user or not verify_password(req.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email credentials or password"
            )

        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Inactive user account"
            )

        access_token = create_access_token(
            subject=str(user.id),
            extra_claims={"role": user.role.value, "email": user.email}
        )

        return Token(
            access_token=access_token,
            user_id=user.id,
            role=user.role,
            email=user.email
        )
