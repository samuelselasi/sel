import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_health_check(client: AsyncClient):
    response = await client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["postgis_enabled"] is True

@pytest.mark.asyncio
async def test_user_registration_flow(client: AsyncClient):
    payload = {
        "email": "test.exporter@sel.africa",
        "password": "SecurePassword123!",
        "full_name": "Kofi Mensah",
        "role": "supplier",
        "organization_name": "Kuapa Kokoo Co-op",
        "country": "Ghana"
    }
    response = await client.post("/api/v1/auth/register", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["email"] == "test.exporter@sel.africa"
    assert data["role"] == "supplier"

@pytest.mark.asyncio
async def test_jwt_protected_route_without_token(client: AsyncClient):
    response = await client.get("/api/v1/auth/me")
    assert response.status_code == 401
