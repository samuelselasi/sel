# Sustainable Export Link (SEL)

> **Production-Grade Sustainable Agricultural Export Verification & Sourcing Platform for African Trade & EUDR Deforestation Compliance.**

[![Live Web Application](https://img.shields.io/badge/Live%20Demo-Online%20App-10B981?style=for-the-badge&logo=googlechrome&logoColor=white)](https://ais-pre-bbfp26vcn7ssaxi2xpgper-684464457984.europe-west2.run.app)
[![Platform Version](https://img.shields.io/badge/Version-1.0.0--EUDR-blue?style=for-the-badge)](https://ais-pre-bbfp26vcn7ssaxi2xpgper-684464457984.europe-west2.run.app)

🌐 **Live Application Preview**: [https://ais-pre-bbfp26vcn7ssaxi2xpgper-684464457984.europe-west2.run.app](https://ais-pre-bbfp26vcn7ssaxi2xpgper-684464457984.europe-west2.run.app)

---

## 📸 Platform Landing Page & Educational Demos

The platform features an educational showcase explaining how the platform works, video walkthroughs, and research paywalls for deep supplier and geospatial data:

```
+-----------------------------------------------------------------------------------+
|                        SUSTAINABLE EXPORT LINK (SEL)                              |
|           Direct Sustainable Sourcing & EUDR Compliance Platform                   |
+-----------------------------------------------------------------------------------+
|  [Hero Platform Showcase]                                                         |
|  - Educational Video Walkthroughs (GPS Polygon Mapping, Escrow, Telemetry)        |
|  - EU Deforestation Regulation (EUDR 2023/1115) Compliance Explainer              |
|  - Platform Architecture & Verification Flow                                      |
+-----------------------------------------------------------------------------------+
|  [Gated Research & Paywall Access]                                                |
|  - Supplier Directory & Co-op Profiles (Requires Login)                            |
|  - PostGIS Farm GPS Polygon Map (Requires Login)                                  |
|  - Commodity Spot Price Index & Yield Forecasts (Requires Login)                   |
|  - Live Container Logistics Telemetry (Requires Login)                            |
+-----------------------------------------------------------------------------------+
```

> **Note for GitHub Repository**: You can paste screenshot images directly into your GitHub repository under a `/docs/screenshots` or `/public` directory and reference them in this README using `![Landing Page](./docs/screenshots/landing_page.png)`.

---

## 🚀 Pushing to GitHub

To push this project to your GitHub repository:

```bash
# Initialize git repository
git init

# Stage all project files
git add .

# Create initial commit
git commit -m "feat: Sustainable Export Link (SEL) platform v1.0.0"

# Rename default branch to main
git branch -M main

# Link your GitHub remote repository
git remote add origin https://github.com/YOUR_USERNAME/sustainable-export-link.git

# Push code to your GitHub repository
git push -u origin main
```

> **Live Demo & Media**: Update the live web demo URL in your GitHub repository sidebar settings and add screenshots under `docs/screenshots/` to display on your README.

---

## Key Features & Modules

- **Supplier Directory & Co-op Profiles**: Search and filter verified cooperatives by crop (Cocoa, Coffee, Cashew, Sesame, Tea, Vanilla, Spices), EUDR compliance tier, and trust scores.
- **Field Agent Inspection App**: Mobile audit tool featuring offline local caching, GPS verification, cryptographic SHA-256 audit signatures, soil health, and shade canopy index monitoring.
- **Interactive Geolocation & Map Engine**: Interactive canvas & map visualization showing verified farm boundaries, warehouses, and processing facilities.
- **B2B RFQ & Trade Engine**: Global buyers issue Requests for Quotations (RFQs), receive competitive co-op bids, and draft digital trade contracts.
- **Cryptographic Document Vault**: Tamper-proof phytosanitary certificates, EUDR deforestation-free declarations, and FairTrade compliance documentation.
- **Real-Time Trader Messaging**: Direct communication channels between European importers and African co-op export managers.

---

## Role-Based Access Control (RBAC) Matrix

The platform enforces fine-grained Role-Based Access Control (RBAC) across both the React frontend and the FastAPI backend (`/backend/app/core/dependencies.py`). Each user persona is assigned strict permission scope boundaries:

| Permission Scope | Importer / Buyer (`buyer`) | Cooperative Supplier (`supplier`) | Field Auditor / Verifier (`agent`) |
| :--- | :---: | :---: | :---: |
| **Browse Supplier Directory & Co-ops** | Allowed | Allowed | Allowed |
| **Interactive Map & GPS Polygons** | Allowed | Allowed | Allowed |
| **Spot Market Prices & AI Assistant** | Allowed | Allowed | Allowed |
| **Submit RFQ & B2B Trade Contracts** | Allowed | Restricted | Restricted |
| **Bid on RFQs & Manage Inventory** | Restricted | Allowed | Restricted |
| **On-Ground Field Inspection & GPS Audit** | Restricted | Restricted | Allowed |
| **Upload Cryptographic Certificates** | Restricted | Allowed | Allowed |
| **Container & Shipment Tracking** | Allowed | Restricted | Restricted |

---

## Tech Stack

### Frontend Application
- **Framework**: React 19 + TypeScript 5.8 + Vite 6
- **Server Integration**: Express 4 custom SSR/Middleware dev runner (`server.ts`)
- **Styling**: Tailwind CSS v4 + Motion (`motion/react`)
- **Data Visualization & Icons**: Recharts + Lucide React + Three.js

### Backend Architecture (`/backend`)
- **Framework**: FastAPI 0.110 (Python 3.11+)
- **Database**: PostgreSQL 16 with **PostGIS 3.4** spatial extension
- **ORM & Async**: Async SQLAlchemy 2.0 + GeoAlchemy2 + asyncpg
- **Database Migrations**: Alembic 1.13
- **Authentication**: JWT (JSON Web Tokens) with `passlib[bcrypt]` and `PyJWT`
- **Testing**: Pytest + Pytest-Asyncio + HTTPX async test client

---

## Repository Structure

```text
├── backend/                        # FastAPI Clean Architecture Backend
│   ├── alembic/                    # Database migration scripts & env setup
│   │   ├── versions/
│   │   │   └── 001_initial_schema.py # PostGIS tables & spatial extension migration
│   │   └── env.py
│   ├── app/
│   │   ├── api/                    # API Routers (V1 Endpoints)
│   │   │   ├── v1/
│   │   │   │   ├── routers/
│   │   │   │   │   ├── auth.py     # JWT Login & Register
│   │   │   │   │   ├── farms.py    # PostGIS Spatial Queries (ST_DWithin, ST_Contains)
│   │   │   │   │   └── all_routers.py # Users, Orgs, Suppliers, RFQs, Verification, Docs
│   │   │   │   └── api.py
│   │   ├── core/                   # Core Configuration, Database, Security & Guards
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   ├── dependencies.py
│   │   │   └── security.py
│   │   ├── models/                 # SQLAlchemy 2.0 ORM & PostGIS Entities
│   │   │   ├── base.py
│   │   │   └── entities.py
│   │   ├── repositories/           # Repository Pattern (PostGIS Spatial Queries)
│   │   │   ├── base.py
│   │   │   └── farm_repository.py
│   │   ├── schemas/                # Pydantic v2 Request/Response Schemas
│   │   │   └── schemas.py
│   │   ├── services/               # Service Layer (Business Logic & Audit Hashing)
│   │   │   ├── auth_service.py
│   │   │   └── verification_service.py
│   │   └── main.py                 # FastAPI Application Entrypoint
│   ├── tests/                      # Pytest Async Test Suite
│   │   ├── conftest.py
│   │   ├── test_auth.py
│   │   └── test_farms_postgis.py
│   ├── alembic.ini
│   └── requirements.txt            # Python dependencies
├── src/                            # React 19 Frontend Codebase
│   ├── components/                 # UI Modules & Interactive Components
│   │   ├── ArchitectureHub.tsx     # System & Backend Architecture Visualizer
│   │   ├── BuyerPortal.tsx         # Importer Procurement Dashboard
│   │   ├── FieldAgentApp.tsx       # Offline Inspection Tool
│   │   ├── InteractiveMap.tsx      # PostGIS Farm Map Visualizer
│   │   ├── Navbar.tsx              # Role & Module Navigation
│   │   ├── SupplierDirectory.tsx   # Verified Co-op Search
│   │   └── VerificationPortal.tsx  # Compliance Verification
│   ├── types.ts                    # Global TypeScript Interface Definitions
│   ├── App.tsx                     # Main React Application
│   └── main.tsx                    # Entry Point
├── .env.example                    # Environment Variables Blueprint
├── metadata.json                   # Application Manifest & Configuration
├── package.json                    # Node dependencies & scripts
└── server.ts                       # Express + Vite Development & Build Server
```

---

## Setup & Installation Guide

---

### Option 1: Setup on Ubuntu (Linux)

#### Prerequisites
- **Ubuntu**: 22.04 LTS or 24.04 LTS
- **Node.js**: v20.x or higher (`node -v`)
- **Python**: v3.11 or higher (`python3 -v`)
- **PostgreSQL**: v16 with **PostGIS** extension

#### Step 1: Install System Dependencies & PostGIS on Ubuntu

```bash
# Update package list
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x (if not installed)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs build-essential

# Install Python 3.11, venv, and PostgreSQL with PostGIS
sudo apt install -y python3 python3-venv python3-pip \
  postgresql postgresql-contrib postgis postgresql-16-postgis-3
```

#### Step 2: Configure PostgreSQL & Enable PostGIS

```bash
# Start and enable PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Switch to postgres user and set up database & user
sudo -u postgres psql -c "CREATE USER sel_admin WITH PASSWORD 'sel_secure_password';"
sudo -u postgres psql -c "CREATE DATABASE sel_production_db OWNER sel_admin;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE sel_production_db TO sel_admin;"

# Enable PostGIS extension on the database
sudo -u postgres psql -d sel_production_db -c "CREATE EXTENSION IF NOT EXISTS postgis;"
```

#### Step 3: Set Up & Run the FastAPI Backend

```bash
# Navigate to backend directory
cd backend

# Create Python virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install requirements
pip install --upgrade pip
pip install -r requirements.txt

# Run Alembic migrations to build database schema
alembic upgrade head

# Start FastAPI development server (runs on port 8000)
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

> **Swagger API Documentation**: Open `http://localhost:8000/api/v1/docs` in your browser.

#### Step 4: Set Up & Run the React Frontend

Open a new terminal window:

```bash
# In the root directory of the project
npm install

# Start the frontend dev server (runs on port 3000)
npm run dev
```

> Open `http://localhost:3000` in your browser.

---

### Option 2: Setup on Windows

You can run Sustainable Export Link on Windows using either **WSL2 (Windows Subsystem for Linux - Recommended)** or **Native Windows with PostgreSQL Installer**.

---

#### Method A: Windows via WSL2 (Recommended)

Using WSL2 gives you a native Linux environment on Windows with seamless PostGIS support.

1. **Install WSL2 & Ubuntu**:
   Open PowerShell as Administrator and run:
   ```powershell
   wsl --install
   ```
   Restart your computer if prompted.

2. **Open Ubuntu Terminal in WSL2** and follow the **Ubuntu Setup Steps** above.

---

#### Method B: Native Windows Setup

#### Prerequisites
- **Node.js**: Download and install [Node.js v20+ for Windows](https://nodejs.org/).
- **Python**: Download and install [Python 3.11+ for Windows](https://www.python.org/). Check **"Add python.exe to PATH"** during installation.
- **PostgreSQL + PostGIS**: Download [PostgreSQL 16 for Windows](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads). During installation:
  - Launch **Stack Builder** when setup finishes.
  - Under **Spatial Extensions**, select **PostGIS 3.x** and install it.

#### Step 1: Configure PostgreSQL & PostGIS on Windows

Open **SQL Shell (psql)** or **pgAdmin 4** from your Start Menu:

```sql
-- Run in psql / pgAdmin
CREATE USER sel_admin WITH PASSWORD 'sel_secure_password';
CREATE DATABASE sel_production_db OWNER sel_admin;
GRANT ALL PRIVILEGES ON DATABASE sel_production_db TO sel_admin;

-- Connect to sel_production_db and enable PostGIS
\c sel_production_db
CREATE EXTENSION IF NOT EXISTS postgis;
```

#### Step 2: Set Up Backend on Windows (PowerShell / Command Prompt)

```powershell
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment (PowerShell)
.\venv\Scripts\Activate.ps1

# (If PowerShell blocks script execution, run: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process)

# Install Python requirements
pip install -r requirements.txt

# Apply database migrations
alembic upgrade head

# Launch FastAPI backend
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

#### Step 3: Set Up Frontend on Windows

Open a second PowerShell window at the project root:

```powershell
npm install
npm run dev
```

Visit `http://localhost:3000`.

---

### Option 3: Docker Compose Setup (Optional)

If you have Docker Desktop installed on Ubuntu or Windows:

Create a `docker-compose.yml` file in the project root:

```yaml
version: '3.8'

services:
  db:
    image: postgis/postgis:16-3.4
    environment:
      POSTGRES_USER: sel_admin
      POSTGRES_PASSWORD: sel_secure_password
      POSTGRES_DB: sel_production_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000
    ports:
      - "8000:8000"
    environment:
      - POSTGRES_SERVER=db
      - POSTGRES_USER=sel_admin
      - POSTGRES_PASSWORD=sel_secure_password
      - POSTGRES_DB=sel_production_db
    depends_on:
      - db

volumes:
  postgres_data:
```

Run:
```bash
docker-compose up -d --build
```

---

## Running Tests

### Backend Unit & Spatial Integration Tests

```bash
cd backend
source venv/bin/activate  # or .\venv\Scripts\Activate.ps1 on Windows
pytest -v
```

### Frontend Typecheck & Linting

```bash
npm run lint
```

---

## API Endpoints Overview

When the backend is running, full interactive OpenAPI documentation is available at:
- **Swagger UI**: `http://localhost:8000/api/v1/docs`
- **ReDoc**: `http://localhost:8000/api/v1/redoc`

| Category | Endpoint | Method | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `/api/v1/auth/register` | `POST` | Register Buyer, Supplier, or Auditor |
| **Auth** | `/api/v1/auth/login` | `POST` | Authenticate & obtain JWT Access Token |
| **Auth** | `/api/v1/auth/me` | `GET` | Retrieve claims for current authenticated user |
| **Farms** | `/api/v1/farms/` | `POST` | Create farm plot with PostGIS spatial point/polygon |
| **Farms** | `/api/v1/farms/nearby` | `GET` | **PostGIS Spatial Query (`ST_DWithin`)** by lat/lon radius |
| **Farms** | `/api/v1/farms/supplier/{id}` | `GET` | Fetch all farm plots belonging to a co-op |
| **Verification** | `/api/v1/verification/inspections` | `POST` | Log field audit with **SHA-256 cryptographic signature** |
| **Suppliers** | `/api/v1/suppliers/` | `GET` | Filter co-ops by primary crop & trust score |
| **RFQ** | `/api/v1/rfqs/` | `GET` / `POST` | List or create B2B Requests for Quotations |
| **Search** | `/api/v1/search/suppliers` | `POST` | Multi-filter geospatial co-op search |

---

## Environment Variables (`.env`)

Copy `.env.example` to `.env`:

```env
# Frontend & Gemini API
GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
APP_URL="http://localhost:3000"

# FastAPI Backend & PostgreSQL + PostGIS Config
POSTGRES_SERVER="localhost"
POSTGRES_USER="sel_admin"
POSTGRES_PASSWORD="sel_secure_password"
POSTGRES_DB="sel_production_db"
POSTGRES_PORT=5432
SECRET_KEY="sel_super_secret_jwt_key_change_in_production_32bytes_min"
```

---

## License & Attribution

Designed for African agricultural exporters, European commodity buyers, and field compliance auditors. Built with React, FastAPI, PostgreSQL, and PostGIS.
