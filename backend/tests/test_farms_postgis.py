import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_find_farms_nearby_spatial_endpoint(client: AsyncClient):
    # Query for farms near Kumasi, Ghana (6.6885, -1.6244)
    response = await client.get("/api/v1/farms/nearby?latitude=6.6885&longitude=-1.6244&radius_km=25")
    assert response.status_code == 200
    farms = response.json()
    assert isinstance(farms, list)
