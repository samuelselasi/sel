import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  Globe, 
  MapPin, 
  Layers, 
  ShieldCheck, 
  Compass, 
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  Check,
  Eye,
  Crosshair,
  Building2,
  Box
} from 'lucide-react';
import { Supplier, UserProfile, UserRole } from '../types';
import { Lock, UserCheck } from 'lucide-react';

interface InteractiveMapProps {
  suppliers: Supplier[];
  onSelectSupplier: (supplier: Supplier) => void;
  currentUser?: UserProfile | null;
  onOpenAuthModal?: (role?: UserRole) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  suppliers,
  onSelectSupplier,
  currentUser,
  onOpenAuthModal,
}) => {
  const [mapTileStyle, setMapTileStyle] = useState<'dark' | 'satellite' | 'streets'>('dark');
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('ALL');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('ALL');
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>('ALL');
  const [activeSupplier, setActiveSupplier] = useState<Supplier | null>(null);
  const [currentZoom, setCurrentZoom] = useState<number>(4);
  const [currentCenter, setCurrentCenter] = useState<{ lat: number; lng: number }>({ lat: 3.0, lng: 18.0 });

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerGroupRef = useRef<L.TileLayer | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const polygonsGroupRef = useRef<L.LayerGroup | null>(null);

  // Filtered suppliers
  const filteredSuppliers = suppliers.filter((s) => {
    const cropMatch = selectedCropFilter === 'ALL' || s.primaryCrop === selectedCropFilter;
    const countryMatch = selectedCountryFilter === 'ALL' || s.country === selectedCountryFilter;
    const supplierMatch = selectedSupplierId === 'ALL' || s.id === selectedSupplierId;
    return cropMatch && countryMatch && supplierMatch;
  });

  // Extract unique countries and crops for filter dropdowns
  const uniqueCrops = Array.from(new Set(suppliers.map(s => s.primaryCrop)));
  const uniqueCountries = Array.from(new Set(suppliers.map(s => s.country)));

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Only init once

    // Create map instance centered on Africa
    const map = L.map(mapContainerRef.current, {
      center: [3.0, 18.0],
      zoom: 4,
      zoomControl: false, // We'll render custom zoom controls
      attributionControl: false
    });

    mapInstanceRef.current = map;

    // Create layer groups
    markersGroupRef.current = L.layerGroup().addTo(map);
    polygonsGroupRef.current = L.layerGroup().addTo(map);

    // Track zoom and movement
    map.on('zoomend moveend', () => {
      setCurrentZoom(map.getZoom());
      const center = map.getCenter();
      setCurrentCenter({ lat: Number(center.lat.toFixed(4)), lng: Number(center.lng.toFixed(4)) });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer when tile style changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerGroupRef.current) {
      map.removeLayer(tileLayerGroupRef.current);
    }

    let tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    if (mapTileStyle === 'satellite') {
      tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    } else if (mapTileStyle === 'streets') {
      tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }

    const newTileLayer = L.tileLayer(tileUrl, {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    tileLayerGroupRef.current = newTileLayer;
  }, [mapTileStyle]);

  // Render Markers and Farm GPS Polygons whenever filteredSuppliers change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !markersGroupRef.current || !polygonsGroupRef.current) return;

    markersGroupRef.current.clearLayers();
    polygonsGroupRef.current.clearLayers();

    filteredSuppliers.forEach((sup) => {
      // 1. Draw GPS Farm Polygon Boundary if available
      if (sup.gpsBoundaries && sup.gpsBoundaries.length > 0) {
        const polygonCoords: [number, number][] = sup.gpsBoundaries.map(pt => [pt.latitude, pt.longitude]);
        
        const polygon = L.polygon(polygonCoords, {
          color: '#10B981',
          weight: 2,
          opacity: 0.9,
          fillColor: '#10B981',
          fillOpacity: 0.25,
          dashArray: '4, 4'
        });

        polygon.bindTooltip(
          `<div style="background-color: #05110B; color: #10B981; padding: 4px 8px; border-radius: 6px; font-family: monospace; font-size: 11px; font-weight: bold; border: 1px solid rgba(16,185,129,0.4);">
            ${sup.name} Polygon Boundary (${sup.certifiedAreaHectares} ha)
          </div>`,
          { sticky: true }
        );

        polygon.on('click', () => {
          setActiveSupplier(sup);
          map.flyTo([sup.locationCoordinates.lat, sup.locationCoordinates.lng], 14, { duration: 1.2 });
        });

        polygon.addTo(polygonsGroupRef.current!);
      }

      // 2. Custom Marker Icon
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #05110B;
            border: 2px solid #10B981;
            border-radius: 9999px;
            padding: 4px 10px;
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s ease;
          ">
            <span style="
              width: 8px;
              height: 8px;
              border-radius: 9999px;
              background-color: #10B981;
              margin-right: 6px;
              box-shadow: 0 0 8px #10B981;
            "></span>
            <span style="font-family: monospace; font-size: 11px; font-weight: 800; color: #FFFFFF;">
              ${sup.primaryCrop}
            </span>
            <span style="font-size: 10px; font-weight: 700; color: #F59E0B; margin-left: 5px;">
              ${sup.verificationScore}
            </span>
          </div>
        `,
        iconSize: [110, 32],
        iconAnchor: [55, 16]
      });

      const marker = L.marker([sup.locationCoordinates.lat, sup.locationCoordinates.lng], { icon: customIcon });

      marker.on('click', () => {
        setActiveSupplier(sup);
        map.flyTo([sup.locationCoordinates.lat, sup.locationCoordinates.lng], 14, { duration: 1.2 });
      });

      marker.addTo(markersGroupRef.current!);
    });
  }, [filteredSuppliers]);

  // Handle fly-to cooperative location
  const handleFlyToSupplier = (sup: Supplier) => {
    setActiveSupplier(sup);
    setSelectedSupplierId(sup.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(
        [sup.locationCoordinates.lat, sup.locationCoordinates.lng], 
        14, 
        { duration: 1.5 }
      );
    }
  };

  // Reset Map View back to full Africa Continent
  const handleResetAfricaView = () => {
    setActiveSupplier(null);
    setSelectedSupplierId('ALL');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([3.0, 18.0], 4, { duration: 1.2 });
    }
  };

  // Zoom controls
  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-500/15 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>AFRICAN GEOSPATIAL INTELLIGENCE & FARM POLYGON MAP</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-serif tracking-tight">
            Interactive African Crop & Plot Map
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Explore verified African farming cooperatives, inspect exact GPS boundary polygons, and zoom down to plot-level satellite telemetry across export hubs.
          </p>
        </div>

        {/* View Controls & Tile Style Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-slate-950 border border-emerald-500/30 rounded-2xl p-1 text-xs">
            <button
              onClick={() => setMapTileStyle('dark')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                mapTileStyle === 'dark' ? 'bg-[#10B981] text-[#05110B] shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Dark Vector
            </button>
            <button
              onClick={() => setMapTileStyle('satellite')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1 ${
                mapTileStyle === 'satellite' ? 'bg-[#10B981] text-[#05110B] shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5 mr-1" />
              <span>Satellite Imagery</span>
            </button>
            <button
              onClick={() => setMapTileStyle('streets')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                mapTileStyle === 'streets' ? 'bg-[#10B981] text-[#05110B] shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              OpenStreetMap
            </button>
          </div>

          <button
            onClick={handleResetAfricaView}
            className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Africa View</span>
          </button>
        </div>
      </div>

      {/* Quick Jump & Filter Toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 backdrop-blur-xl shadow-xl">
        {/* Cooperative Select / Fly-To */}
        <div className="space-y-1">
          <label className="text-[11px] font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
            <Crosshair className="w-3.5 h-3.5" />
            <span>Jump to Exact GPS Cooperative:</span>
          </label>
          <select
            value={selectedSupplierId}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedSupplierId(val);
              if (val === 'ALL') {
                handleResetAfricaView();
              } else {
                const found = suppliers.find(s => s.id === val);
                if (found) handleFlyToSupplier(found);
              }
            }}
            className="w-full bg-slate-950 border border-white/20 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
          >
            <option value="ALL">Select Cooperative Location (All Locations Shown)</option>
            {suppliers.map(sup => (
              <option key={sup.id} value={sup.id}>
                {sup.name} — {sup.country} ({sup.primaryCrop})
              </option>
            ))}
          </select>
        </div>

        {/* Crop Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter by Primary Crop:</span>
          </label>
          <select
            value={selectedCropFilter}
            onChange={(e) => setSelectedCropFilter(e.target.value)}
            className="w-full bg-slate-950 border border-white/20 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
          >
            <option value="ALL">All Agricultural Commodities</option>
            {uniqueCrops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>

        {/* Country Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>Filter by African Country:</span>
          </label>
          <select
            value={selectedCountryFilter}
            onChange={(e) => setSelectedCountryFilter(e.target.value)}
            className="w-full bg-slate-950 border border-white/20 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
          >
            <option value="ALL">All African Export Nations</option>
            {uniqueCountries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Map Canvas Stage */}
      <div className="relative rounded-3xl border border-emerald-500/30 overflow-hidden shadow-2xl min-h-[580px] bg-slate-950 flex flex-col justify-between">
        
        {/* Leaflet Map DOM Container */}
        <div ref={mapContainerRef} className={`w-full h-[580px] z-0 ${!currentUser ? 'filter blur-[3px] pointer-events-none' : ''}`} />

        {/* Unauthenticated Research Paywall Overlay */}
        {!currentUser && (
          <div className="absolute inset-0 z-[500] flex items-center justify-center p-6 bg-[#05110B]/60 backdrop-blur-md">
            <div className="max-w-md w-full p-8 rounded-[32px] bg-[#0A1E14] border-2 border-[#10B981]/50 shadow-[0_25px_70px_rgba(0,0,0,0.9)] text-center space-y-5 text-white">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center text-[#10B981] shadow-xl">
                <Lock className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] text-[10px] font-mono font-bold uppercase tracking-widest border border-[#10B981]/30">
                  Research & Geospatial Paywall
                </span>
                <h3 className="text-xl font-extrabold text-white">Sign In for GPS Polygon Intelligence</h3>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  High-resolution satellite plot boundary polygons, centroid geolocation telemetry, and farm plot auditing are restricted to authenticated commercial buyers and cooperatives.
                </p>
              </div>

              <button
                onClick={() => onOpenAuthModal && onOpenAuthModal('buyer')}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#10B981] hover:bg-[#12d292] text-[#05110B] text-xs font-extrabold flex items-center justify-center space-x-2 shadow-xl transition-all cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>Sign In to Unlock Geospatial Research</span>
              </button>
            </div>
          </div>
        )}

        {/* Floating Zoom & Map Status Overlays */}
        <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
          <div className="bg-slate-950/90 border border-white/20 backdrop-blur-md rounded-2xl p-1 flex flex-col shadow-2xl">
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              className="p-2.5 hover:bg-white/10 rounded-xl text-white transition-all cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="w-full h-px bg-white/10 my-0.5" />
            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              className="p-2.5 hover:bg-white/10 rounded-xl text-white transition-all cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleResetAfricaView}
            title="Reset Map to Full Africa View"
            className="p-2.5 bg-slate-950/90 hover:bg-emerald-600 border border-white/20 text-white rounded-2xl backdrop-blur-md transition-all shadow-2xl cursor-pointer flex items-center justify-center"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Live Telemetry Status Bar Overlay */}
        <div className="absolute bottom-4 left-4 z-[400] hidden sm:flex items-center space-x-3 bg-slate-950/90 border border-emerald-500/40 backdrop-blur-md px-4 py-2 rounded-2xl text-xs text-white font-mono shadow-2xl">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold">GPS ACTIVE</span>
          </div>
          <div className="w-px h-3 bg-white/20" />
          <div>Lat: <span className="text-white font-bold">{currentCenter.lat}°</span></div>
          <div>Lng: <span className="text-white font-bold">{currentCenter.lng}°</span></div>
          <div className="w-px h-3 bg-white/20" />
          <div>Zoom: <span className="text-amber-400 font-bold">{currentZoom}x</span></div>
          <div className="w-px h-3 bg-white/20" />
          <div className="text-white/70">
            {currentZoom >= 12 ? 'FARM PLOT LEVEL (GPS Polygon Active)' : 'CONTINENTAL AFRICA VIEW'}
          </div>
        </div>

        {/* Active Cooperative Selected Detail Card Overlay */}
        {activeSupplier && (
          <div className="absolute top-4 left-4 z-[400] max-w-sm w-full p-5 rounded-3xl bg-slate-950/95 border border-emerald-400/50 backdrop-blur-2xl shadow-2xl space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold tracking-widest block">
                  {activeSupplier.country} &bull; {activeSupplier.region}
                </span>
                <h3 className="text-base font-bold text-white leading-snug mt-0.5">
                  {activeSupplier.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveSupplier(null)}
                className="text-white/60 hover:text-white p-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-white/60 block">Primary Crop</span>
                <span className="font-extrabold text-white">{activeSupplier.primaryCrop}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-white/60 block">Audit Score</span>
                <span className="font-extrabold text-emerald-400">{activeSupplier.verificationScore}/100</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-white/60 block">Available Stock</span>
                <span className="font-extrabold text-amber-400">{activeSupplier.availableStockMT.toLocaleString()} MT</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-white/60 block">Plot Area</span>
                <span className="font-extrabold text-white">{activeSupplier.certifiedAreaHectares} Ha</span>
              </div>
            </div>

            <div className="text-xs text-white/80 space-y-1 font-mono">
              <div>GPS Centroid: <strong>{activeSupplier.locationCoordinates.lat}, {activeSupplier.locationCoordinates.lng}</strong></div>
              <div>EUDR Status: <strong className="text-emerald-400">100% Polygon Deforestation Cleared</strong></div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => onSelectSupplier(activeSupplier)}
                className="w-full py-2.5 rounded-xl bg-[#10B981] hover:bg-[#12d292] text-[#05110B] font-extrabold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-lg cursor-pointer"
              >
                <span>Inspect Cooperative Profile & Vault</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cooperative Quick Selection Badges */}
      <div className="space-y-3 pt-2">
        <div className="text-xs font-extrabold text-white/80 font-mono uppercase tracking-wider flex items-center justify-between">
          <span>Click to Zoom & Focus Farm Boundary:</span>
          <span className="text-emerald-400">{filteredSuppliers.length} Verified Cooperatives</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredSuppliers.map((sup) => {
            const isSelected = activeSupplier?.id === sup.id;
            return (
              <div
                key={sup.id}
                onClick={() => handleFlyToSupplier(sup)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected 
                    ? 'bg-emerald-950/80 border-emerald-400 shadow-lg shadow-emerald-950' 
                    : 'bg-slate-900/60 border-white/10 hover:border-emerald-500/40 hover:bg-slate-900'
                }`}
              >
                <div className="space-y-1 min-w-0 pr-2">
                  <div className="text-xs font-bold text-white truncate">{sup.name}</div>
                  <div className="text-[11px] text-white/60 font-mono flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{sup.country} &bull; {sup.primaryCrop}</span>
                  </div>
                </div>

                <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold shrink-0 border border-emerald-500/30">
                  Zoom GPS
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
