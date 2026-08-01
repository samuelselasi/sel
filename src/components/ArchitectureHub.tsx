import React, { useState } from 'react';
import { 
  Layers, 
  Database, 
  Server, 
  Smartphone, 
  Globe2, 
  Code2, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  FileCode,
  MapPin,
  Cpu,
  GitBranch,
  Terminal
} from 'lucide-react';

export const ArchitectureHub: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'system' | 'fastapi' | 'frontend' | 'backend' | 'database' | 'api' | 'components' | 'roadmap'>('fastapi');
  const [selectedFastApiModule, setSelectedFastApiModule] = useState<'overview' | 'models' | 'repository' | 'service' | 'routers' | 'security' | 'migrations' | 'tests'>('overview');
  const [selectedCodeSnippet, setSelectedCodeSnippet] = useState<'models' | 'postgis' | 'repository' | 'service' | 'jwt' | 'alembic' | 'pytest'>('models');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-slate-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-500/15 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>PRODUCTION TECHNICAL BLUEPRINT & SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-serif tracking-tight">
            Sustainable Export Link (SEL) Architecture
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Enterprise technical specification for scaling digital agricultural infrastructure across Africa.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-amber-300 bg-slate-900 px-3.5 py-2 rounded-2xl border border-amber-500/30">
          <Cpu className="w-4 h-4 text-amber-400" />
          <span>STABLE SPEC VERSION: 2.4.0-ENTERPRISE</span>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs font-mono font-bold">
        <button
          onClick={() => setActiveSection('fastapi')}
          className={`px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${activeSection === 'fastapi' ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-lg shadow-emerald-500/20' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-emerald-500/40'}`}
        >
          <Server className="w-3.5 h-3.5" />
          <span>FastAPI Backend (Clean Arch)</span>
        </button>
        <button
          onClick={() => setActiveSection('system')}
          className={`px-3.5 py-2 rounded-xl transition-all ${activeSection === 'system' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
        >
          1. System Architecture
        </button>
        <button
          onClick={() => setActiveSection('frontend')}
          className={`px-3.5 py-2 rounded-xl transition-all ${activeSection === 'frontend' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
        >
          2. Frontend Architecture
        </button>
        <button
          onClick={() => setActiveSection('backend')}
          className={`px-3.5 py-2 rounded-xl transition-all ${activeSection === 'backend' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
        >
          3. Backend Microservices
        </button>
        <button
          onClick={() => setActiveSection('database')}
          className={`px-3.5 py-2 rounded-xl transition-all ${activeSection === 'database' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
        >
          4. Database & PostGIS
        </button>
        <button
          onClick={() => setActiveSection('api')}
          className={`px-3.5 py-2 rounded-xl transition-all ${activeSection === 'api' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
        >
          5. OpenAPI REST & WS
        </button>
        <button
          onClick={() => setActiveSection('components')}
          className={`px-3.5 py-2 rounded-xl transition-all ${activeSection === 'components' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
        >
          6. UI Hierarchy
        </button>
        <button
          onClick={() => setActiveSection('roadmap')}
          className={`px-3.5 py-2 rounded-xl transition-all ${activeSection === 'roadmap' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
        >
          7. Roadmap (Phases)
        </button>
      </div>

      {/* SECTION: FASTAPI CLEAN ARCHITECTURE BACKEND */}
      {activeSection === 'fastapi' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/30 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white font-serif flex items-center">
                  <Server className="w-6 h-6 text-emerald-400 mr-2.5" />
                  FastAPI Clean Architecture Production Backend Specification
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Fully normalized PostgreSQL + PostGIS database engine, Async SQLAlchemy 2.0 ORM, Repository Pattern, JWT Auth, Alembic Migrations, & Pytest suite.
                </p>
              </div>

              <div className="flex items-center space-x-2 font-mono text-[11px]">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">FastAPI 0.110</span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold">PostgreSQL 16 + PostGIS 3.4</span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">SQLAlchemy 2.0</span>
              </div>
            </div>

            {/* 11 Modules Architecture Matrix Grid */}
            <div>
              <h4 className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider mb-3 flex items-center">
                <Layers className="w-4 h-4 mr-1.5" />
                11 Core Enterprise Domain Modules
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 font-mono text-xs">
                {[
                  { name: "1. Authentication", desc: "JWT Bearer, bcrypt, refresh flow" },
                  { name: "2. Users", desc: "Role-based access controls" },
                  { name: "3. Organizations", desc: "Co-ops, Importers, Authorities" },
                  { name: "4. Suppliers", desc: "Export licenses & trust scoring" },
                  { name: "5. Crops", desc: "HS code international catalog" },
                  { name: "6. PostGIS Farms", desc: "Polygon spatial geometries" },
                  { name: "7. Verification", desc: "Cryptographic SHA-256 audit logs" },
                  { name: "8. Documents", desc: "Phytosanitary & EUDR cert vault" },
                  { name: "9. RFQ Engine", desc: "B2B bids & trade contracts" },
                  { name: "10. Messaging", desc: "Encrypted trader chat threads" },
                  { name: "11. Search Engine", desc: "PostGIS radius & filter queries" },
                  { name: "12. Warehouses & Facilities", desc: "Point centroids (PostGIS)" },
                ].map((mod, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-1">
                    <div className="font-bold text-white text-[11px]">{mod.name}</div>
                    <div className="text-[10px] text-slate-400">{mod.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clean Architecture Tier Selector */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex flex-wrap gap-2 text-xs font-mono font-bold border-b border-slate-800 pb-3">
                <button
                  onClick={() => setSelectedCodeSnippet('models')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${selectedCodeSnippet === 'models' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
                >
                  SQLAlchemy 2.0 ORM Models
                </button>
                <button
                  onClick={() => setSelectedCodeSnippet('postgis')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${selectedCodeSnippet === 'postgis' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
                >
                  PostGIS Spatial Entities (Farms/Warehouses)
                </button>
                <button
                  onClick={() => setSelectedCodeSnippet('repository')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${selectedCodeSnippet === 'repository' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
                >
                  Repository Pattern (ST_DWithin, ST_Contains)
                </button>
                <button
                  onClick={() => setSelectedCodeSnippet('service')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${selectedCodeSnippet === 'service' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
                >
                  Service Layer (SHA-256 Audit Sealing)
                </button>
                <button
                  onClick={() => setSelectedCodeSnippet('jwt')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${selectedCodeSnippet === 'jwt' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
                >
                  JWT Security & Guards
                </button>
                <button
                  onClick={() => setSelectedCodeSnippet('alembic')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${selectedCodeSnippet === 'alembic' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
                >
                  Alembic PostGIS Migration
                </button>
                <button
                  onClick={() => setSelectedCodeSnippet('pytest')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${selectedCodeSnippet === 'pytest' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
                >
                  Pytest Async Suite
                </button>
              </div>

              {/* Code Display Area */}
              <div className="font-mono text-xs overflow-x-auto text-slate-300 bg-slate-900 p-4 rounded-xl border border-slate-800">
                {selectedCodeSnippet === 'models' && (
                  <div>
                    <div className="text-amber-400 font-bold mb-2">// backend/app/models/entities.py (SQLAlchemy 2.0 Normalized Schema)</div>
                    <pre className="text-[11px] text-slate-300 space-y-1">
{`class User(Base, TimestampMixin):
    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRoleEnum] = mapped_column(SQLEnum(UserRoleEnum), default=UserRoleEnum.BUYER)
    organization_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("organizations.id"))
    organization: Mapped[Optional[Organization]] = relationship("Organization", back_populates="users")

class Supplier(Base, TimestampMixin):
    __tablename__ = "suppliers"

    organization_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("organizations.id"))
    supplier_code: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    export_license_no: Mapped[str] = mapped_column(String(100), nullable=False)
    primary_crop: Mapped[str] = mapped_column(String(100), nullable=False)
    trust_score: Mapped[int] = mapped_column(Integer, default=85)`}
                    </pre>
                  </div>
                )}

                {selectedCodeSnippet === 'postgis' && (
                  <div>
                    <div className="text-emerald-400 font-bold mb-2">// Entities with PostGIS Spatial Geometries (Farms, Warehouses, Facilities)</div>
                    <pre className="text-[11px] text-slate-300 space-y-1">
{`class Farm(Base, TimestampMixin):
    __tablename__ = "farms"

    supplier_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("suppliers.id"))
    farm_name: Mapped[str] = mapped_column(String(255), nullable=False)
    area_hectares: Mapped[float] = mapped_column(Float, nullable=False)
    eudr_deforestation_free: Mapped[bool] = mapped_column(Boolean, default=True)

    # PostGIS Polygon perimeter for EUDR deforestation verification
    boundary_polygon: Mapped[Optional[Any]] = mapped_column(Geometry("POLYGON", srid=4326))
    
    # PostGIS Point centroid for geospatial distance calculation
    centroid_location: Mapped[Optional[Any]] = mapped_column(Geometry("POINT", srid=4326))

class Warehouse(Base, TimestampMixin):
    __tablename__ = "warehouses"
    capacity_metric_tons: Mapped[float] = mapped_column(Float, nullable=False)
    location: Mapped[Optional[Any]] = mapped_column(Geometry("POINT", srid=4326))

class ProcessingFacility(Base, TimestampMixin):
    __tablename__ = "processing_facilities"
    daily_throughput_mt: Mapped[float] = mapped_column(Float, nullable=False)
    location: Mapped[Optional[Any]] = mapped_column(Geometry("POINT", srid=4326))`}
                    </pre>
                  </div>
                )}

                {selectedCodeSnippet === 'repository' && (
                  <div>
                    <div className="text-amber-400 font-bold mb-2">// backend/app/repositories/farm_repository.py (PostGIS Spatial Queries)</div>
                    <pre className="text-[11px] text-slate-300 space-y-1">
{`class FarmRepository(BaseRepository[Farm]):
    async def find_farms_near_point(self, latitude: float, longitude: float, radius_meters: float = 50000.0) -> List[Farm]:
        """PostGIS ST_DWithin query finding farms within radius of (lat, lon) in WGS84 (SRID 4326)."""
        point_geom = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
        query = select(Farm).where(
            ST_DWithin(Farm.centroid_location, point_geom, radius_meters / 111320.0)
        )
        result = await self.session.execute(query)
        return list(result.scalars().all())

    async def check_point_inside_farm_polygon(self, farm_id: UUID, latitude: float, longitude: float) -> bool:
        """PostGIS ST_Contains query checking if GPS audit coordinate falls inside farm boundary."""
        point_geom = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
        query = select(ST_Contains(Farm.boundary_polygon, point_geom)).where(Farm.id == farm_id)
        result = await self.session.execute(query)
        return bool(result.scalar())`}
                    </pre>
                  </div>
                )}

                {selectedCodeSnippet === 'service' && (
                  <div>
                    <div className="text-emerald-400 font-bold mb-2">// backend/app/services/verification_service.py (SHA-256 Audit Sealing)</div>
                    <pre className="text-[11px] text-slate-300 space-y-1">
{`class VerificationService:
    async def log_field_inspection(self, inspector_id: UUID, req: VerificationAuditCreate) -> FieldInspectionRead:
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
            cryptographic_sha256=sha256_hash
        )
        self.session.add(inspection)
        await self.session.commit()
        return FieldInspectionRead.model_validate(inspection)`}
                    </pre>
                  </div>
                )}

                {selectedCodeSnippet === 'jwt' && (
                  <div>
                    <div className="text-amber-400 font-bold mb-2">// backend/app/core/security.py & dependencies.py (JWT Authentication)</div>
                    <pre className="text-[11px] text-slate-300 space-y-1">
{`def create_access_token(subject: Union[str, Any], expires_delta: Optional[timedelta] = None, extra_claims: Optional[dict] = None) -> str:
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode = {"exp": expire, "sub": str(subject), "iat": datetime.utcnow()}
    if extra_claims: to_encode.update(extra_claims)
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

async def get_current_user_claims(token: str = Depends(OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login"))) -> dict:
    payload = decode_access_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(status_code=401, detail="Invalid token or session expired")
    return payload`}
                    </pre>
                  </div>
                )}

                {selectedCodeSnippet === 'alembic' && (
                  <div>
                    <div className="text-emerald-400 font-bold mb-2">// backend/alembic/versions/001_initial_schema.py (PostGIS Migration)</div>
                    <pre className="text-[11px] text-slate-300 space-y-1">
{`def upgrade() -> None:
    # 1. Enable PostGIS Spatial Extension
    op.execute("CREATE EXTENSION IF NOT EXISTS postgis;")

    # 2. Create Farms with Polygon Geometry
    op.create_table(
        'farms',
        sa.Column('id', sa.UUID(), primary_key=True),
        sa.Column('supplier_id', sa.UUID(), sa.ForeignKey('suppliers.id'), nullable=False),
        sa.Column('area_hectares', sa.Float(), nullable=False),
        sa.Column('boundary_polygon', Geometry(geometry_type='POLYGON', srid=4326), nullable=True),
        sa.Column('centroid_location', Geometry(geometry_type='POINT', srid=4326), nullable=True)
    )`}
                    </pre>
                  </div>
                )}

                {selectedCodeSnippet === 'pytest' && (
                  <div>
                    <div className="text-amber-400 font-bold mb-2">// backend/tests/test_farms_postgis.py (Pytest Async Suite)</div>
                    <pre className="text-[11px] text-slate-300 space-y-1">
{`@pytest.mark.asyncio
async def test_find_farms_nearby_spatial_endpoint(client: AsyncClient):
    # Test PostGIS ST_DWithin API endpoint near Kumasi, Ghana (6.6885, -1.6244)
    response = await client.get("/api/v1/farms/nearby?latitude=6.6885&longitude=-1.6244&radius_km=25")
    assert response.status_code == 200
    farms = response.json()
    assert isinstance(farms, list)`}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 1: SYSTEM ARCHITECTURE */}
      {activeSection === 'system' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-xl shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white font-serif flex items-center">
              <Layers className="w-5 h-5 text-emerald-400 mr-2" />
              1. Overall System Architecture Topology
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              SEL is designed as a distributed, high-availability microservices ecosystem with explicit separation of concern between geospatial data processing, B2B marketplace matching, and cryptographic document audit verification.
            </p>

            {/* Architecture Box Diagram */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-4">
              <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 flex justify-between items-center">
                <span>[CLIENT LAYER] Next.js 15 Web App + Flutter iOS/Android Field App</span>
                <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">HTTPS / WSS / gRPC</span>
              </div>

              <div className="flex justify-center text-slate-600 font-bold">↓ API Gateway & Auth Guard (FastAPI / Nginx) ↓</div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-amber-300 font-bold block">Supplier & RFQ Microservice</span>
                  <span className="text-[11px] text-slate-400 block">FastAPI + Async Python</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-amber-300 font-bold block">Geospatial EUDR Engine</span>
                  <span className="text-[11px] text-slate-400 block">PostGIS + GDAL / Sentinel-2</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-amber-300 font-bold block">Document Vault & Ledger</span>
                  <span className="text-[11px] text-slate-400 block">Cloudflare R2 + SHA-256</span>
                </div>
              </div>

              <div className="flex justify-center text-slate-600 font-bold">↓ Persistent Storage & Search Layer ↓</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/20 text-emerald-400">
                  PostgreSQL 16 + PostGIS (Spatial Polygons, Cooperative Audits, RFQ State)
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/20 text-amber-300">
                  OpenSearch / Elasticsearch (Full-text Sourcing Search & Crop Filters)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: FRONTEND ARCHITECTURE */}
      {activeSection === 'frontend' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-xl shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white font-serif flex items-center">
              <Globe2 className="w-5 h-5 text-emerald-400 mr-2" />
              2. Frontend & Mobile Client Architecture
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-bold text-emerald-300 uppercase font-mono">Web Application (Next.js 15)</h4>
                <ul className="space-y-1 text-slate-300">
                  <li>• React 19 App Router with SSR & Edge Caching</li>
                  <li>• Tailwind CSS v4 + Framer Motion liquid glass styling</li>
                  <li>• Three.js interactive 3D African Agricultural Globe</li>
                  <li>• Recharts commodity spot pricing trends engine</li>
                  <li>• Server-side Gemini AI integration (@google/genai)</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-300 uppercase font-mono">Mobile App (Flutter / Dart)</h4>
                <ul className="space-y-1 text-slate-300">
                  <li>• Offline-first SQLite database for field agent sync</li>
                  <li>• Native GPS Hardware camera & photo hash signing</li>
                  <li>• Mapbox Mobile SDK plot boundary drawer</li>
                  <li>• Bluetooth thermal printer output for physical inspection seals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: BACKEND MICROSERVICES */}
      {activeSection === 'backend' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-xl shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white font-serif flex items-center">
              <Server className="w-5 h-5 text-emerald-400 mr-2" />
              3. Backend Architecture (Python FastAPI Microservices)
            </h3>
            <p className="text-xs text-slate-300">
              High-concurrency Python backend utilizing AsyncIO, Pydantic v2 data validation, and Celery asynchronous task queues for heavy geospatial satellite queries.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-3">
              <div className="text-amber-400 font-bold">Key Microservices API Router Spec:</div>
              <div className="text-slate-300 space-y-1">
                <div>• <span className="text-emerald-400 font-bold">/api/v1/suppliers</span> — CRUD, verification scoring algorithm</div>
                <div>• <span className="text-emerald-400 font-bold">/api/v1/geospatial</span> — PostGIS ST_Contains polygon boundary check</div>
                <div>• <span className="text-emerald-400 font-bold">/api/v1/rfq</span> — RFQ bidding engine & smart trade contract generator</div>
                <div>• <span className="text-emerald-400 font-bold">/api/v1/verification</span> — Cryptographic SHA-256 certificate hashing</div>
                <div>• <span className="text-emerald-400 font-bold">/api/v1/telemetry</span> — Realtime IoT container temperature/humidity stream</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: DATABASE DESIGN */}
      {activeSection === 'database' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-xl shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white font-serif flex items-center">
              <Database className="w-5 h-5 text-emerald-400 mr-2" />
              4. Database Design (PostgreSQL 16 + PostGIS)
            </h3>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs overflow-x-auto space-y-2 text-slate-300">
              <div className="text-emerald-400 font-bold">-- PostgreSQL + PostGIS Schema Definition</div>
              <pre className="text-[11px] text-slate-400">
{`CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    primary_crop VARCHAR(50) NOT NULL,
    farm_size_hectares NUMERIC(10,2),
    verification_score INT CHECK (verification_score BETWEEN 0 AND 100),
    farm_boundary GEOMETRY(Polygon, 4326), -- PostGIS Spatial Polygon
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE verification_audits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_id UUID REFERENCES suppliers(id),
    agent_id VARCHAR(100) NOT NULL,
    soil_purity_rating INT,
    child_labor_audit VARCHAR(20) CHECK (child_labor_audit IN ('PASSED', 'FAILED')),
    document_hash VARCHAR(64) NOT NULL, -- SHA-256
    audit_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: API STRUCTURE */}
      {activeSection === 'api' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-xl shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white font-serif flex items-center">
              <FileCode className="w-5 h-5 text-emerald-400 mr-2" />
              5. OpenAPI 3.1 REST API Specification
            </h3>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs overflow-x-auto text-slate-300">
              <div className="text-amber-400 font-bold">GET /api/suppliers/search</div>
              <p className="text-slate-400 text-[11px] mt-1">
                Parameters: crop=Cocoa&country=Ghana&min_verification_score=95
              </p>
              <div className="text-emerald-400 font-bold mt-3">POST /api/rfq/create</div>
              <p className="text-slate-400 text-[11px] mt-1">
                Body: &#123; buyer_id, crop, quantity_mt: 250, target_price_usd: 4100, incoterm: "CIF" &#125;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: UI COMPONENT HIERARCHY */}
      {activeSection === 'components' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-xl shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white font-serif flex items-center">
              <GitBranch className="w-5 h-5 text-emerald-400 mr-2" />
              6. UI Component Hierarchy & Design System
            </h3>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2 text-slate-300">
              <div>App.tsx (Root Layout & State Controller)</div>
              <div className="pl-4">├── Navbar.tsx (Liquid Glass Navigation & Role Switcher)</div>
              <div className="pl-4">├── HeroCinematic.tsx (Full-screen drone visual background & live stats)</div>
              <div className="pl-4">├── SupplierDirectory.tsx (Filterable Cooperative Intelligence Grid)</div>
              <div className="pl-4">├── SupplierDetailModal.tsx (Document Vault & GPS Boundary Inspector)</div>
              <div className="pl-4">├── InteractiveMap.tsx (3D Three.js Globe & 2D Spatial Map)</div>
              <div className="pl-4">├── MarketIntelligence.tsx (Recharts Commodity Spot Price Trends)</div>
              <div className="pl-4">├── RfqEngine.tsx (Buyer RFQ Marketplace & B2B Trade Contract Generator)</div>
              <div className="pl-4">├── VerificationPortal.tsx (Field Agent Audit & Cryptographic Badge Issuer)</div>
              <div className="pl-4">├── SupplyChainTracker.tsx (IoT Reefer Sensor & Vessel Track & Trace)</div>
              <div className="pl-4">└── AiSourcingAssistant.tsx (Gemini 2.5 Flash Trade Advisor)</div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7: ROADMAP */}
      {activeSection === 'roadmap' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-xl shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white font-serif flex items-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2" />
              7. Multi-Phase Technical Rollout Roadmap
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2">
                <span className="text-emerald-400 font-bold block">Phase 1: Core Marketplace & Verification (Q3 2026)</span>
                <p className="text-slate-400">
                  Supplier onboarding, GPS plot verification, basic RFQ engine, and document vault.
                </p>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">STATUS: COMPLETED</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2">
                <span className="text-amber-400 font-bold block">Phase 2: Geospatial Heatmaps & Realtime Ticker (Q4 2026)</span>
                <p className="text-slate-400">
                  Sentinel-2 satellite forest cover checks, live pricing tickers, and automated trade contract generator.
                </p>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">STATUS: IN PROGRESS</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-slate-300 font-bold block">Phase 3: Escrow Trade Settlement (Q1 2027)</span>
                <p className="text-slate-400">
                  Letter of Credit (LC) banking APIs, IoT reefer telemetry integration, automated phytosanitary clearance.
                </p>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold">STATUS: PLANNED</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-slate-300 font-bold block">Phase 4: Global Commodity Exchange API (Q2 2027)</span>
                <p className="text-slate-400">
                  Public API for commodity traders, ERP plugins (SAP, Oracle Agro), automated carbon credit origin verification.
                </p>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold">STATUS: PLANNED</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
