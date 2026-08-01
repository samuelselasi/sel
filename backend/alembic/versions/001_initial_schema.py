"""Initial PostGIS spatial schema migration for Sustainable Export Link

Revision ID: 001_initial_schema
Revises: 
Create Date: 2026-07-31 10:30:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from geoalchemy2 import Geometry

# revision identifiers, used by Alembic.
revision: str = '001_initial_schema'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # 1. Enable PostGIS Extension
    op.execute("CREATE EXTENSION IF NOT EXISTS postgis;")
    
    # 2. Create Organizations
    op.create_table(
        'organizations',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('org_type', sa.String(length=50), nullable=False),
        sa.Column('registration_number', sa.String(length=100), nullable=False, unique=True),
        sa.Column('country', sa.String(length=100), nullable=False),
        sa.Column('website', sa.String(length=255), nullable=True),
        sa.Column('is_verified', sa.Boolean(), default=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()')),
        sa.PrimaryKeyConstraint('id')
    )

    # 3. Create Users
    op.create_table(
        'users',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False, unique=True),
        sa.Column('hashed_password', sa.String(length=255), nullable=False),
        sa.Column('full_name', sa.String(length=255), nullable=False),
        sa.Column('phone_number', sa.String(length=50), nullable=True),
        sa.Column('role', sa.String(length=50), nullable=False),
        sa.Column('is_active', sa.Boolean(), default=True),
        sa.Column('organization_id', sa.UUID(), sa.ForeignKey('organizations.id'), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()')),
        sa.PrimaryKeyConstraint('id')
    )

    # 4. Create PostGIS Farm table with Polygon spatial index
    op.create_table(
        'farms',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('supplier_id', sa.UUID(), nullable=False),
        sa.Column('farm_name', sa.String(length=255), nullable=False),
        sa.Column('village_district', sa.String(length=150), nullable=False),
        sa.Column('region', sa.String(length=150), nullable=False),
        sa.Column('country', sa.String(length=100), nullable=False),
        sa.Column('area_hectares', sa.Float(), nullable=False),
        sa.Column('eudr_deforestation_free', sa.Boolean(), default=True),
        sa.Column('boundary_polygon', Geometry(geometry_type='POLYGON', srid=4326), nullable=True),
        sa.Column('centroid_location', Geometry(geometry_type='POINT', srid=4326), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()')),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade() -> None:
    op.drop_table('farms')
    op.drop_table('users')
    op.drop_table('organizations')
