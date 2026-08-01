import React, { useState, useEffect, useMemo } from 'react';
import { 
  Smartphone, 
  Wifi, 
  WifiOff, 
  Camera, 
  MapPin, 
  CheckCircle2, 
  Layers, 
  RefreshCw, 
  FileText, 
  Database, 
  ShieldCheck, 
  Sparkles, 
  Code, 
  ChevronRight, 
  ArrowRight, 
  UploadCloud, 
  UserCheck, 
  Clock, 
  AlertCircle, 
  Check, 
  X, 
  Plus, 
  Sliders, 
  Copy, 
  HardDrive, 
  Satellite, 
  Sprout, 
  FileCheck, 
  Award, 
  ShieldAlert, 
  Send,
  Eye,
  RotateCcw,
  Zap,
  FolderTree,
  Terminal,
  Lock
} from 'lucide-react';
import { 
  Supplier, 
  FieldAgentTask, 
  FieldVerificationSubmission, 
  OfflineQueueItem,
  CropCategory 
} from '../types';

interface FieldAgentAppProps {
  suppliers: Supplier[];
  onLogAudit?: (supplierId: string, agentName: string, score: number, comments: string) => void;
}

// Initial Mock Verification Tasks
const INITIAL_TASKS: FieldAgentTask[] = [
  {
    id: 'TASK-2026-001',
    supplierId: 'sup-001',
    farmName: 'Kuapa Kokoo Farmer Cooperative',
    region: 'Ashanti Region',
    country: 'Ghana',
    crop: 'Cocoa',
    assignedAgentId: 'AGENT-FIELD-01',
    dueDate: '2026-08-05',
    distanceKm: 4.2,
    coordinates: { lat: 6.6885, lng: -1.6244 },
    status: 'ASSIGNED',
    priority: 'URGENT'
  },
  {
    id: 'TASK-2026-002',
    supplierId: 'sup-002',
    farmName: 'Sidama Coffee Farmers Union',
    region: 'Sidama Zone',
    country: 'Ethiopia',
    crop: 'Coffee',
    assignedAgentId: 'AGENT-FIELD-01',
    dueDate: '2026-08-10',
    distanceKm: 18.5,
    coordinates: { lat: 6.8301, lng: 38.4412 },
    status: 'IN_PROGRESS',
    priority: 'HIGH'
  },
  {
    id: 'TASK-2026-003',
    supplierId: 'sup-003',
    farmName: 'Sokodé Organic Cashew Union',
    region: 'Centrale Region',
    country: 'Togo',
    crop: 'Cashew',
    assignedAgentId: 'AGENT-FIELD-01',
    dueDate: '2026-08-14',
    distanceKm: 32.0,
    coordinates: { lat: 8.9833, lng: 1.1333 },
    status: 'ASSIGNED',
    priority: 'MEDIUM'
  }
];

export const FieldAgentApp: React.FC<FieldAgentAppProps> = ({ suppliers, onLogAudit }) => {
  // Main Navigation Modes: 'simulator' (Mobile App UI) vs 'architecture' (Flutter/Riverpod Code)
  const [mainView, setMainView] = useState<'simulator' | 'architecture'>('simulator');

  // Network Connectivity State (Simulating Offline/Online Mode)
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncProgress, setSyncProgress] = useState<number>(0);

  // Local Storage / Hive Box State (Pending Offline Submissions Queue)
  const [offlineQueue, setOfflineQueue] = useState<OfflineQueueItem[]>([
    {
      id: 'hive-item-901',
      taskId: 'TASK-2026-OFFLINE-PREV',
      timestamp: '2026-07-30 14:22:10',
      payload: {
        supplierId: 'sup-004',
        farmName: 'Boundiali Sesame Enterprise',
        agentId: 'AGENT-FIELD-01',
        agentName: 'Kwame Mensah',
        gpsPolygon: [
          { lat: 9.521, lng: -6.489 },
          { lat: 9.524, lng: -6.482 },
          { lat: 9.519, lng: -6.480 },
          { lat: 9.517, lng: -6.487 }
        ],
        observedYieldMT: 1450,
        soilQualityRating: 94,
        waterManagementRating: 90,
        laborStandardsVerified: true,
        notes: 'Verified zero deforestation polygon via mobile satellite GPS overlay.',
        inspectionPhotos: [
          'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80'
        ]
      },
      status: 'QUEUED',
      retryCount: 0
    }
  ]);

  // Mobile Simulator State
  const [activeMobileScreen, setActiveMobileScreen] = useState<'auth' | 'dashboard' | 'workflow' | 'hive-storage'>('dashboard');
  const [selectedTask, setSelectedTask] = useState<FieldAgentTask | null>(INITIAL_TASKS[0]);
  const [tasks, setTasks] = useState<FieldAgentTask[]>(INITIAL_TASKS);
  const [mobileFrameStyle, setMobileFrameStyle] = useState<'phone' | 'full'>('phone');

  // 7-Step Workflow State
  const [workflowStep, setWorkflowStep] = useState<number>(1);
  
  // Step 1: GPS Polygon Points
  const [gpsPoints, setGpsPoints] = useState<{ lat: number; lng: number }[]>([
    { lat: 6.6885, lng: -1.6244 },
    { lat: 6.6912, lng: -1.6210 },
    { lat: 6.6870, lng: -1.6185 },
    { lat: 6.6845, lng: -1.6225 }
  ]);
  
  // Step 2: Farm Images
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80'
  ]);
  const [isSnappingPhoto, setIsSnappingPhoto] = useState<boolean>(false);

  // Step 3: Farm Size
  const [recordedHectares, setRecordedHectares] = useState<number>(185);

  // Step 4: Crops Grown
  const [primaryCrop, setPrimaryCrop] = useState<CropCategory>('Cocoa');
  const [secondaryCrops, setSecondaryCrops] = useState<string[]>(['Plantain', 'Cashew']);
  const [soilPurity, setSoilPurity] = useState<number>(92);

  // Step 5: Capacity Estimation
  const [estimatedYieldMT, setEstimatedYieldMT] = useState<number>(4200);
  const [storageCapacityMT, setStorageCapacityMT] = useState<number>(5000);

  // Step 6: Document Upload & Farmer Signature
  const [uploadedDocNames, setUploadedDocNames] = useState<string[]>([
    'Coop_Land_Title_Deed_2026.pdf',
    'Organic_Certification_Inspection.jpg'
  ]);
  const [isSignedByFarmer, setIsSignedByFarmer] = useState<boolean>(true);

  // Step 7: Final Audit Notes & Score
  const [auditScore, setAuditScore] = useState<number>(96);
  const [childLaborPassed, setChildLaborPassed] = useState<boolean>(true);
  const [auditNotes, setAuditNotes] = useState<string>(
    'Physical farm visit confirmed zero deforestation bounds. Soil health score 92/100, organic composting active, fair labor practices verified.'
  );

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Add GPS Point simulation
  const handleAddGpsPoint = () => {
    const lastPoint = gpsPoints[gpsPoints.length - 1] || { lat: 6.6885, lng: -1.6244 };
    const newPt = {
      lat: Number((lastPoint.lat + (Math.random() * 0.004 - 0.002)).toFixed(4)),
      lng: Number((lastPoint.lng + (Math.random() * 0.004 - 0.002)).toFixed(4))
    };
    setGpsPoints([...gpsPoints, newPt]);
    showToast('GPS Satellite Coordinates Captured (+1 Polygon Boundary Point)');
  };

  // Calculate area in Hectares based on points
  const calculatedPolygonHectares = useMemo(() => {
    return Math.round(gpsPoints.length * 42.5);
  }, [gpsPoints]);

  // Handle Photo Capture simulation
  const handleSimulatePhoto = () => {
    setIsSnappingPhoto(true);
    setTimeout(() => {
      const samplePhotos = [
        'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80'
      ];
      const randomImg = samplePhotos[Math.floor(Math.random() * samplePhotos.length)];
      setCapturedPhotos(prev => [...prev, randomImg]);
      setIsSnappingPhoto(false);
      showToast('Photo geotagged & timestamped successfully');
    }, 600);
  };

  // Handle Submit Workflow Report (Offline / Online check)
  const handleSubmitReport = () => {
    if (!selectedTask) return;

    const submissionPayload: FieldVerificationSubmission = {
      supplierId: selectedTask.supplierId,
      farmName: selectedTask.farmName,
      agentId: 'AGENT-FIELD-01',
      agentName: 'Kwame Mensah',
      gpsPolygon: gpsPoints,
      observedYieldMT: estimatedYieldMT,
      soilQualityRating: soilPurity,
      waterManagementRating: 92,
      laborStandardsVerified: childLaborPassed,
      notes: auditNotes,
      inspectionPhotos: capturedPhotos
    };

    if (!isOnline) {
      // Offline mode -> Save to Hive local storage box
      const queueItem: OfflineQueueItem = {
        id: `hive-${Date.now()}`,
        taskId: selectedTask.id,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        payload: submissionPayload,
        status: 'QUEUED',
        retryCount: 0
      };

      setOfflineQueue(prev => [queueItem, ...prev]);
      setTasks(prev => prev.map(t => t.id === selectedTask.id ? { ...t, status: 'PENDING_SYNC' } : t));
      showToast('OFFLINE: Saved report to local Hive database. Will sync when online.');
      setActiveMobileScreen('hive-storage');
    } else {
      // Online mode -> Direct Cloud Sync
      setTasks(prev => prev.map(t => t.id === selectedTask.id ? { ...t, status: 'COMPLETED' } : t));
      if (onLogAudit) {
        onLogAudit(selectedTask.supplierId, 'Kwame Mensah (Field Agent)', auditScore, auditNotes);
      }
      showToast('ONLINE: Verification Report uploaded to Cloud server!');
      setActiveMobileScreen('dashboard');
    }
  };

  // Trigger Hive Offline Sync Process
  const handleTriggerSync = () => {
    if (!isOnline) {
      showToast('Cannot sync: Mobile device is currently OFFLINE.');
      return;
    }

    if (offlineQueue.length === 0) {
      showToast('Hive storage database queue is empty (all audits synced).');
      return;
    }

    setIsSyncing(true);
    setSyncProgress(10);

    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);

          // Mark items as SYNCED & clear queue
          offlineQueue.forEach(item => {
            if (onLogAudit) {
              onLogAudit(item.payload.supplierId, item.payload.agentName, 95, item.payload.notes);
            }
          });

          setTasks(prev => prev.map(t => {
            const match = offlineQueue.find(q => q.taskId === t.id);
            return match ? { ...t, status: 'COMPLETED' } : t;
          }));

          setOfflineQueue([]);
          showToast('Hive Sync Complete! All queued verification audits uploaded.');
          return 100;
        }
        return prev + 30;
      });
    }, 400);
  };

  // Code Viewer Tab in Architecture view
  const [activeCodeTab, setActiveCodeTab] = useState<'pubspec' | 'model' | 'riverpod' | 'hive' | 'screen' | 'api'>('riverpod');

  return (
    <div className="min-h-screen bg-[#05110B] text-white p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#10B981] text-[#05110B] px-6 py-4 rounded-2xl font-extrabold shadow-2xl flex items-center space-x-3 animate-bounce max-w-md">
          <Sparkles className="w-5 h-5 shrink-0" />
          <span className="text-xs sm:text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Hero Header & Control Bar */}
      <div className="p-6 sm:p-8 rounded-[32px] bg-white/5 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 uppercase tracking-wider flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" />
                FLUTTER FIELD AGENT MOBILE APP
              </span>
              <span className="text-white/40 text-xs font-mono">• Riverpod + Hive Offline Sync</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              SEL Field Verification Mobile Suite
            </h1>
            <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-3xl">
              Equipping agricultural field agents to perform physical farm audits, record GPS polygon boundaries, snap geotagged photos, and store data locally in offline Hive/SQLite boxes with automated cloud sync.
            </p>
          </div>

          {/* View Switcher Controls */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Online / Offline Simulator Toggle */}
            <button
              onClick={() => {
                const newStatus = !isOnline;
                setIsOnline(newStatus);
                showToast(`Network Status: ${newStatus ? 'ONLINE' : 'OFFLINE'}`);
              }}
              className={`px-4 py-3 rounded-2xl font-extrabold text-xs flex items-center space-x-2 transition-all border ${
                isOnline
                  ? 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/50 hover:bg-[#10B981]/30'
                  : 'bg-rose-500/20 text-rose-400 border-rose-500/50 hover:bg-rose-500/30 animate-pulse'
              }`}
            >
              {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              <span>{isOnline ? 'Network: ONLINE' : 'Network: OFFLINE'}</span>
            </button>

            {/* Mode Selector */}
            <div className="flex bg-black/60 p-1.5 rounded-2xl border border-white/15">
              <button
                onClick={() => setMainView('simulator')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  mainView === 'simulator'
                    ? 'bg-[#10B981] text-[#05110B] shadow-lg'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Mobile App Simulator</span>
              </button>

              <button
                onClick={() => setMainView('architecture')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  mainView === 'architecture'
                    ? 'bg-[#F59E0B] text-[#05110B] shadow-lg'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>Flutter Architecture & Code</span>
              </button>
            </div>
          </div>
        </div>

        {/* Offline Queue Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-4 font-mono text-xs">
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
            <span className="text-white/40 uppercase text-[10px]">Assigned Tasks</span>
            <span className="text-white font-bold text-sm">{tasks.length} Farms</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
            <span className="text-white/40 uppercase text-[10px]">Local Hive Storage</span>
            <span className={`font-bold text-sm ${offlineQueue.length > 0 ? 'text-[#F59E0B]' : 'text-white/40'}`}>
              {offlineQueue.length} Pending
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
            <span className="text-white/40 uppercase text-[10px]">Sync Engine Status</span>
            <span className="text-[#10B981] font-bold text-xs flex items-center gap-1">
              {isSyncing ? 'Syncing...' : isOnline ? 'Ready to Sync' : 'Offline Queued'}
            </span>
          </div>

          <button
            onClick={handleTriggerSync}
            disabled={!isOnline || offlineQueue.length === 0 || isSyncing}
            className={`p-3.5 rounded-2xl text-xs font-extrabold flex items-center justify-center space-x-2 transition-all border ${
              isOnline && offlineQueue.length > 0 && !isSyncing
                ? 'bg-[#10B981] text-[#05110B] border-[#10B981] hover:brightness-110 shadow-lg cursor-pointer'
                : 'bg-white/5 text-white/30 border-white/10 cursor-not-allowed'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? `Syncing ${syncProgress}%` : 'Sync Offline Box'}</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: INTERACTIVE MOBILE APPLICATION SIMULATOR */}
      {mainView === 'simulator' && (
        <div className="space-y-8">
          
          {/* Top Control Bar for Mobile Viewport */}
          <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono font-bold text-[#10B981] uppercase">MOBILE SCREEN:</span>
              <div className="flex space-x-2">
                {[
                  { id: 'dashboard', label: '1. Task Dashboard' },
                  { id: 'workflow', label: '2. 7-Step Verification' },
                  { id: 'hive-storage', label: '3. Hive Storage Box' },
                  { id: 'auth', label: '4. Agent Login' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveMobileScreen(s.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeMobileScreen === s.id
                        ? 'bg-[#10B981] text-[#05110B]'
                        : 'bg-black/40 text-white/60 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMobileFrameStyle(mobileFrameStyle === 'phone' ? 'full' : 'phone')}
                className="px-3 py-1.5 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-all border border-white/10 flex items-center space-x-1.5"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>{mobileFrameStyle === 'phone' ? 'Expand Screen' : 'Smartphone View'}</span>
              </button>
            </div>
          </div>

          {/* Device Frame Outer Container */}
          <div className="flex justify-center items-start">
            <div className={`w-full transition-all duration-300 ${
              mobileFrameStyle === 'phone' 
                ? 'max-w-md bg-[#000000] border-[10px] border-[#1f2923] rounded-[48px] shadow-2xl p-4 space-y-4 ring-1 ring-white/20' 
                : 'bg-white/5 border border-white/15 rounded-[32px] p-6 space-y-6 backdrop-blur-2xl'
            }`}>
              
              {/* Phone Top Notch & Status Bar */}
              {mobileFrameStyle === 'phone' && (
                <div className="space-y-2 pt-1 px-2">
                  <div className="w-32 h-4 bg-[#1f2923] mx-auto rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-black rounded-full mr-2"></div>
                    <div className="w-12 h-1.5 bg-black/60 rounded-full"></div>
                  </div>

                  <div className="flex justify-between items-center text-[11px] font-mono text-white/60 px-2 pt-1">
                    <span>09:42 AM</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10">GPS</span>
                      {isOnline ? (
                        <span className="text-[#10B981] font-bold flex items-center gap-1">
                          <Wifi className="w-3 h-3" /> 5G
                        </span>
                      ) : (
                        <span className="text-rose-400 font-bold flex items-center gap-1">
                          <WifiOff className="w-3 h-3" /> Offline
                        </span>
                      )}
                      <span>98%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SCREEN A: AGENT AUTHENTICATION & CACHED CREDENTIALS */}
              {activeMobileScreen === 'auth' && (
                <div className="p-6 rounded-[28px] bg-[#05110B] border border-white/15 space-y-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#10B981] to-[#065F46] mx-auto flex items-center justify-center shadow-xl">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#10B981] uppercase tracking-wider">SEL FIELD AGENT AUTH</span>
                    <h2 className="text-xl font-extrabold text-white mt-1">Biometric & Local PIN Login</h2>
                    <p className="text-xs text-white/50 mt-1">Logged Agent: Kwame Mensah (ID: AGENT-FIELD-01)</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-left font-mono text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/40">Offline Token:</span>
                      <span className="text-[#10B981] font-bold">VALID (Hive Cached)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Encryption Key:</span>
                      <span className="text-white font-bold">AES-256 (Keystore)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Last Online Sync:</span>
                      <span className="text-white/70">Today, 08:30 AM</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveMobileScreen('dashboard')}
                    className="w-full py-3.5 rounded-2xl bg-[#10B981] hover:brightness-110 text-[#05110B] font-extrabold text-xs shadow-xl transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Unlock Field Agent Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* SCREEN B: ASSIGNED VERIFICATION TASKS DASHBOARD */}
              {activeMobileScreen === 'dashboard' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-[#05110B] p-4 rounded-2xl border border-white/15">
                    <div>
                      <h2 className="text-base font-extrabold text-white">Assigned Farm Audits</h2>
                      <p className="text-[11px] text-white/50 font-mono">3 Tasks Scheduled Today</p>
                    </div>

                    <button
                      onClick={() => setActiveMobileScreen('hive-storage')}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold border border-white/10 flex items-center space-x-1"
                    >
                      <HardDrive className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>Hive Box ({offlineQueue.length})</span>
                    </button>
                  </div>

                  {/* Task List */}
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => {
                          setSelectedTask(task);
                          setWorkflowStep(1);
                          setActiveMobileScreen('workflow');
                        }}
                        className={`p-4 rounded-2xl bg-[#081d13] border transition-all cursor-pointer space-y-3 shadow-lg hover:border-[#10B981] ${
                          selectedTask?.id === task.id ? 'border-[#10B981] ring-1 ring-[#10B981]/50' : 'border-white/10'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
                              {task.priority} PRIORITY
                            </span>
                            <h3 className="text-sm font-extrabold text-white mt-1.5">{task.farmName}</h3>
                            <p className="text-[11px] text-white/50">{task.region}, {task.country} • {task.crop}</p>
                          </div>

                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                            task.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' :
                            task.status === 'PENDING_SYNC' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {task.status.replace('_', ' ')}
                          </span>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-white/10 text-[11px] font-mono">
                          <span className="text-white/60 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#10B981]" /> {task.distanceKm} km away
                          </span>
                          <span className="text-[#10B981] font-bold flex items-center gap-1">
                            Start Audit <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SCREEN C: 7-STEP SUPPLIER VISIT WORKFLOW */}
              {activeMobileScreen === 'workflow' && selectedTask && (
                <div className="space-y-4">
                  
                  {/* Workflow Progress Header */}
                  <div className="p-4 rounded-2xl bg-[#05110B] border border-white/15 space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#10B981] uppercase">PHYSICAL AUDIT WORKFLOW</span>
                        <h2 className="text-sm font-extrabold text-white truncate max-w-[200px] sm:max-w-xs">{selectedTask.farmName}</h2>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40">
                        Step {workflowStep} / 7
                      </span>
                    </div>

                    {/* Step Tabs Indicator Bar */}
                    <div className="grid grid-cols-7 gap-1">
                      {[1, 2, 3, 4, 5, 6, 7].map((stepNum) => (
                        <button
                          key={stepNum}
                          onClick={() => setWorkflowStep(stepNum)}
                          className={`h-2 rounded-full transition-all ${
                            workflowStep === stepNum
                              ? 'bg-[#10B981]'
                              : workflowStep > stepNum
                              ? 'bg-[#10B981]/50'
                              : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* STEP 1: CAPTURE GPS COORDINATES & POLYGON BOUNDS */}
                  {workflowStep === 1 && (
                    <div className="p-5 rounded-2xl bg-[#05110B] border border-white/15 space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Satellite className="w-4 h-4 text-[#10B981]" />
                          <h3 className="text-sm font-extrabold text-white">1. Capture Farm GPS Polygon</h3>
                        </div>
                        <span className="text-[10px] font-mono text-[#10B981]">EUDR Satellite Verified</span>
                      </div>

                      <p className="text-xs text-white/60">
                        Walk the physical perimeter of the farm to plot satellite polygon points and verify zero-deforestation bounds.
                      </p>

                      {/* Map Simulation Canvas */}
                      <div className="h-44 rounded-xl bg-black/60 border border-white/15 relative overflow-hidden flex flex-col justify-between p-3">
                        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:16px_16px]"></div>

                        {/* Polygon Points Overlay */}
                        <div className="relative z-10 flex flex-wrap gap-1.5">
                          {gpsPoints.map((pt, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-black/80 border border-[#10B981]/50 text-[10px] font-mono text-[#10B981]">
                              P{idx + 1}: {pt.lat}, {pt.lng}
                            </span>
                          ))}
                        </div>

                        <div className="relative z-10 bg-black/80 p-2.5 rounded-xl border border-white/15 flex justify-between items-center font-mono text-xs">
                          <div>
                            <span className="text-white/40 block text-[9px]">Calculated Polygon Area:</span>
                            <span className="text-[#10B981] font-bold">{calculatedPolygonHectares} Hectares</span>
                          </div>
                          <button
                            onClick={handleAddGpsPoint}
                            className="px-3 py-1.5 rounded-lg bg-[#10B981] text-[#05110B] font-extrabold text-[11px] flex items-center space-x-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Plot Point</span>
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => setWorkflowStep(2)}
                        className="w-full py-3 rounded-xl bg-[#10B981] hover:brightness-110 text-[#05110B] font-extrabold text-xs shadow-lg transition-all flex items-center justify-center space-x-2"
                      >
                        <span>Confirm GPS Boundary & Next Step</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* STEP 2: CAPTURE FARM IMAGES */}
                  {workflowStep === 2 && (
                    <div className="p-5 rounded-2xl bg-[#05110B] border border-white/15 space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Camera className="w-4 h-4 text-[#10B981]" />
                          <h3 className="text-sm font-extrabold text-white">2. Capture Geotagged Farm Images</h3>
                        </div>
                        <span className="text-[10px] font-mono text-white/50">{capturedPhotos.length} Photos Captured</span>
                      </div>

                      {/* Camera Viewfinder Simulator */}
                      <div className="h-44 rounded-xl bg-black border border-white/20 relative overflow-hidden flex flex-col justify-between p-3">
                        {capturedPhotos.length > 0 ? (
                          <img
                            src={capturedPhotos[capturedPhotos.length - 1]}
                            alt="Captured Farm"
                            className="absolute inset-0 w-full h-full object-cover opacity-80"
                          />
                        ) : null}

                        <div className="relative z-10 flex justify-between text-[10px] font-mono bg-black/60 p-1.5 rounded-lg border border-white/10 text-white">
                          <span>Geotag: {selectedTask.coordinates.lat}, {selectedTask.coordinates.lng}</span>
                          <span className="text-[#10B981]">TIMESTAMP: 2026-07-31 10:22</span>
                        </div>

                        <div className="relative z-10 flex justify-center">
                          <button
                            onClick={handleSimulatePhoto}
                            disabled={isSnappingPhoto}
                            className={`w-12 h-12 rounded-full border-4 border-white bg-[#10B981] flex items-center justify-center shadow-2xl transition-all ${
                              isSnappingPhoto ? 'scale-90 opacity-50' : 'hover:scale-105'
                            }`}
                          >
                            <Camera className="w-5 h-5 text-[#05110B]" />
                          </button>
                        </div>
                      </div>

                      {/* Photo Thumbnail Gallery */}
                      <div className="grid grid-cols-4 gap-2">
                        {capturedPhotos.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt="Farm Thumb"
                            className="w-full h-14 rounded-lg object-cover border border-white/15"
                          />
                        ))}
                      </div>

                      <button
                        onClick={() => setWorkflowStep(3)}
                        className="w-full py-3 rounded-xl bg-[#10B981] hover:brightness-110 text-[#05110B] font-extrabold text-xs shadow-lg transition-all flex items-center justify-center space-x-2"
                      >
                        <span>Next: Record Farm Size</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* STEP 3: RECORD FARM SIZE */}
                  {workflowStep === 3 && (
                    <div className="p-5 rounded-2xl bg-[#05110B] border border-white/15 space-y-4">
                      <div className="flex items-center space-x-2">
                        <Layers className="w-4 h-4 text-[#10B981]" />
                        <h3 className="text-sm font-extrabold text-white">3. Record Physical Farm Size</h3>
                      </div>

                      <div className="space-y-3 font-mono text-xs">
                        <div className="space-y-1">
                          <label className="text-white/60 block uppercase text-[10px]">Verified Hectares (Ha)</label>
                          <input
                            type="number"
                            value={recordedHectares}
                            onChange={(e) => setRecordedHectares(Number(e.target.value))}
                            className="w-full p-3 rounded-xl bg-black/50 border border-white/20 text-sm font-bold text-[#10B981] focus:outline-none"
                          />
                        </div>

                        <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1 text-[11px]">
                          <div className="flex justify-between text-white/50">
                            <span>Satellite Baseline:</span>
                            <span className="text-white">180 Hectares</span>
                          </div>
                          <div className="flex justify-between text-white/50">
                            <span>GPS Polygon Check:</span>
                            <span className="text-[#10B981]">{calculatedPolygonHectares} Hectares</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setWorkflowStep(4)}
                        className="w-full py-3 rounded-xl bg-[#10B981] hover:brightness-110 text-[#05110B] font-extrabold text-xs shadow-lg transition-all flex items-center justify-center space-x-2"
                      >
                        <span>Next: Record Crops Grown</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* STEP 4: RECORD CROPS GROWN */}
                  {workflowStep === 4 && (
                    <div className="p-5 rounded-2xl bg-[#05110B] border border-white/15 space-y-4">
                      <div className="flex items-center space-x-2">
                        <Sprout className="w-4 h-4 text-[#10B981]" />
                        <h3 className="text-sm font-extrabold text-white">4. Record Crops & Soil Quality</h3>
                      </div>

                      <div className="space-y-3 font-mono text-xs">
                        <div className="space-y-1">
                          <label className="text-white/60 block uppercase text-[10px]">Primary Crop Commodity</label>
                          <select
                            value={primaryCrop}
                            onChange={(e) => setPrimaryCrop(e.target.value as CropCategory)}
                            className="w-full p-3 rounded-xl bg-black/50 border border-white/20 text-xs font-bold text-white focus:outline-none"
                          >
                            {['Cocoa', 'Coffee', 'Cashew', 'Sesame', 'Avocado', 'Tea', 'Shea Butter'].map(c => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-white/60 uppercase">Soil Purity Score:</span>
                            <span className="text-[#10B981] font-bold">{soilPurity}/100</span>
                          </div>
                          <input
                            type="range"
                            min="60"
                            max="100"
                            value={soilPurity}
                            onChange={(e) => setSoilPurity(Number(e.target.value))}
                            className="w-full accent-[#10B981]"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => setWorkflowStep(5)}
                        className="w-full py-3 rounded-xl bg-[#10B981] hover:brightness-110 text-[#05110B] font-extrabold text-xs shadow-lg transition-all flex items-center justify-center space-x-2"
                      >
                        <span>Next: Capacity Estimation</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* STEP 5: ESTIMATE PRODUCTION CAPACITY */}
                  {workflowStep === 5 && (
                    <div className="p-5 rounded-2xl bg-[#05110B] border border-white/15 space-y-4">
                      <div className="flex items-center space-x-2">
                        <HardDrive className="w-4 h-4 text-[#10B981]" />
                        <h3 className="text-sm font-extrabold text-white">5. Estimate Production Capacity</h3>
                      </div>

                      <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                        <div className="space-y-1">
                          <label className="text-white/60 block uppercase text-[9px]">Est. Yield (MT)</label>
                          <input
                            type="number"
                            value={estimatedYieldMT}
                            onChange={(e) => setEstimatedYieldMT(Number(e.target.value))}
                            className="w-full p-3 rounded-xl bg-black/50 border border-white/20 text-xs font-bold text-[#10B981]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-white/60 block uppercase text-[9px]">Storage Capacity (MT)</label>
                          <input
                            type="number"
                            value={storageCapacityMT}
                            onChange={(e) => setStorageCapacityMT(Number(e.target.value))}
                            className="w-full p-3 rounded-xl bg-black/50 border border-white/20 text-xs font-bold text-white"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => setWorkflowStep(6)}
                        className="w-full py-3 rounded-xl bg-[#10B981] hover:brightness-110 text-[#05110B] font-extrabold text-xs shadow-lg transition-all flex items-center justify-center space-x-2"
                      >
                        <span>Next: Document & Signature</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* STEP 6: UPLOAD DOCUMENTS & FARMER SIGNATURE */}
                  {workflowStep === 6 && (
                    <div className="p-5 rounded-2xl bg-[#05110B] border border-white/15 space-y-4">
                      <div className="flex items-center space-x-2">
                        <FileCheck className="w-4 h-4 text-[#10B981]" />
                        <h3 className="text-sm font-extrabold text-white">6. Upload Title Deed & Signature</h3>
                      </div>

                      {/* Documents Uploaded */}
                      <div className="space-y-2">
                        {uploadedDocNames.map((doc, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-black/50 border border-white/10 text-xs font-mono flex justify-between items-center text-white">
                            <span>{doc}</span>
                            <span className="text-[#10B981] font-bold">✓ Attached</span>
                          </div>
                        ))}
                      </div>

                      {/* On-screen Signature Pad Simulator */}
                      <div className="p-3 rounded-xl bg-black/60 border border-white/15 space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-mono text-white/50">
                          <span>Farmer Representative Signature Pad</span>
                          <span className="text-[#10B981]">SIGNED ✓</span>
                        </div>

                        <div className="h-20 rounded-lg border border-dashed border-[#10B981]/50 bg-black/80 flex items-center justify-center">
                          <span className="text-xl font-serif text-[#10B981] italic tracking-widest font-bold">
                            K. Mensah (Co-op Leader)
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setWorkflowStep(7)}
                        className="w-full py-3 rounded-xl bg-[#10B981] hover:brightness-110 text-[#05110B] font-extrabold text-xs shadow-lg transition-all flex items-center justify-center space-x-2"
                      >
                        <span>Next: Final Verification Report</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* STEP 7: SUBMIT VERIFICATION REPORT */}
                  {workflowStep === 7 && (
                    <div className="p-5 rounded-2xl bg-[#05110B] border border-white/15 space-y-4">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-[#10B981]" />
                        <h3 className="text-sm font-extrabold text-white">7. Submit Audit & Sync</h3>
                      </div>

                      <div className="p-4 rounded-xl bg-black/50 border border-white/15 space-y-2 font-mono text-xs">
                        <div className="flex justify-between">
                          <span className="text-white/40">Overall Score:</span>
                          <span className="text-[#10B981] font-bold">{auditScore} / 100</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40">Child Labor Check:</span>
                          <span className="text-emerald-400 font-bold">PASSED ✓</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40">EUDR Deforestation:</span>
                          <span className="text-[#10B981] font-bold">POLYGON VERIFIED ✓</span>
                        </div>
                      </div>

                      <textarea
                        rows={3}
                        value={auditNotes}
                        onChange={(e) => setAuditNotes(e.target.value)}
                        className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none"
                      />

                      <button
                        onClick={handleSubmitReport}
                        className={`w-full py-3.5 rounded-xl font-extrabold text-xs shadow-xl transition-all flex items-center justify-center space-x-2 ${
                          isOnline
                            ? 'bg-[#10B981] text-[#05110B] hover:brightness-110'
                            : 'bg-[#F59E0B] text-[#05110B] hover:brightness-110'
                        }`}
                      >
                        <Send className="w-4 h-4" />
                        <span>{isOnline ? 'Submit & Upload Report (Online)' : 'Save to Hive Box (Offline Queue)'}</span>
                      </button>
                    </div>
                  )}

                </div>
              )}

              {/* SCREEN D: HIVE OFFLINE DATABASE INSPECTOR */}
              {activeMobileScreen === 'hive-storage' && (
                <div className="p-5 rounded-2xl bg-[#05110B] border border-white/15 space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <div className="flex items-center space-x-2">
                      <Database className="w-4 h-4 text-[#F59E0B]" />
                      <h3 className="text-sm font-extrabold text-white">Local Hive Database Box</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F59E0B]/20 text-[#F59E0B]">
                      {offlineQueue.length} Stored Items
                    </span>
                  </div>

                  <p className="text-xs text-white/60">
                    Local encrypted SQLite / Hive NoSQL storage box holding pending field verifications captured while offline.
                  </p>

                  <div className="space-y-3">
                    {offlineQueue.map((item) => (
                      <div key={item.id} className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-bold">{item.payload.farmName}</span>
                          <span className="px-2 py-0.5 rounded text-[9px] bg-amber-500/20 text-amber-400">
                            {item.status}
                          </span>
                        </div>

                        <div className="text-[10px] text-white/50 space-y-0.5">
                          <div>GPS Points: {item.payload.gpsPolygon.length} Boundary Nodes</div>
                          <div>Yield: {item.payload.observedYieldMT} MT • Soil: {item.payload.soilQualityRating}/100</div>
                          <div>Timestamp: {item.timestamp}</div>
                        </div>
                      </div>
                    ))}

                    {offlineQueue.length === 0 && (
                      <div className="p-6 text-center text-xs text-white/40 font-mono">
                        Hive storage box is clear. All verification reports are synced with the cloud.
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleTriggerSync}
                    disabled={!isOnline || offlineQueue.length === 0}
                    className={`w-full py-3 rounded-xl font-extrabold text-xs shadow-lg transition-all flex items-center justify-center space-x-2 border ${
                      isOnline && offlineQueue.length > 0
                        ? 'bg-[#10B981] text-[#05110B] border-[#10B981]'
                        : 'bg-white/5 text-white/30 border-white/10'
                    }`}
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Sync Hive Storage with Server</span>
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: FLUTTER & RIVERPOD ARCHITECTURE CODE BLUEPRINT */}
      {mainView === 'architecture' && (
        <div className="p-6 sm:p-8 rounded-[32px] bg-white/5 border border-white/15 backdrop-blur-2xl space-y-8">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#F59E0B] uppercase">FLUTTER & RIVERPOD CODE ARCHITECTURE</span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">Flutter Project Codebase & Models</h2>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#10B981]/20 text-[#10B981]">
                FLUTTER 3.22 • RIVERPOD 2.5 • HIVE 2.2
              </span>
            </div>
          </div>

          {/* Navigation Code Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none border-b border-white/10 pb-3">
            {[
              { id: 'riverpod', label: 'Riverpod State Providers' },
              { id: 'hive', label: 'Hive Local Storage Service' },
              { id: 'model', label: 'Dart Data Models' },
              { id: 'screen', label: 'Flutter UI Screens' },
              { id: 'pubspec', label: 'pubspec.yaml Dependencies' },
              { id: 'api', label: 'REST Sync API Spec' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCodeTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shrink-0 ${
                  activeCodeTab === tab.id
                    ? 'bg-[#F59E0B] text-[#05110B] shadow-lg'
                    : 'bg-black/40 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Code Viewer Container */}
          <div className="p-6 rounded-2xl bg-black/80 border border-white/15 font-mono text-xs space-y-4">
            
            {/* RIVERPOD CODE */}
            {activeCodeTab === 'riverpod' && (
              <div className="space-y-3">
                <div className="flex justify-between text-white/50 text-[11px]">
                  <span>lib/providers/verification_sync_provider.dart</span>
                  <span>Riverpod StateNotifier + Connectivity Listener</span>
                </div>
                <pre className="text-emerald-300 overflow-x-auto p-4 rounded-xl bg-black/90 border border-white/10 text-[11px] leading-relaxed">
{`import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import '../models/verification_report.dart';
import '../services/hive_storage_service.dart';
import '../services/api_service.dart';

// State model for offline sync status
class SyncState {
  final bool isOnline;
  final bool isSyncing;
  final int pendingCount;
  final String? lastSyncTime;

  SyncState({
    required this.isOnline,
    required this.isSyncing,
    required this.pendingCount,
    this.lastSyncTime,
  });
}

// Riverpod Notifier for Offline Queue Management
class OfflineSyncNotifier extends StateNotifier<SyncState> {
  final HiveStorageService _storageService;
  final ApiService _apiService;

  OfflineSyncNotifier(this._storageService, this._apiService)
      : super(SyncState(
          isOnline: true,
          isSyncing: false,
          pendingCount: _storageService.getPendingQueue().length,
        )) {
    // Listen for cellular/WiFi connectivity changes
    Connectivity().onConnectivityChanged.listen((ConnectivityResult result) {
      final online = result != ConnectivityResult.none;
      state = SyncState(
        isOnline: online,
        isSyncing: state.isSyncing,
        pendingCount: _storageService.getPendingQueue().length,
      );
      if (online) {
        triggerAutoSync();
      }
    });
  }

  Future<void> saveReportLocally(VerificationReport report) async {
    await _storageService.saveReport(report);
    state = SyncState(
      isOnline: state.isOnline,
      isSyncing: false,
      pendingCount: _storageService.getPendingQueue().length,
    );
    if (state.isOnline) {
      triggerAutoSync();
    }
  }

  Future<void> triggerAutoSync() async {
    final pending = _storageService.getPendingQueue();
    if (pending.isEmpty || state.isSyncing) return;

    state = SyncState(isOnline: state.isOnline, isSyncing: true, pendingCount: pending.length);

    try {
      for (var report in pending) {
        await _apiService.uploadVerificationReport(report);
        await _storageService.markReportSynced(report.id);
      }
    } catch (e) {
      // Keep queued in Hive box for exponential backoff retry
    } finally {
      state = SyncState(
        isOnline: state.isOnline,
        isSyncing: false,
        pendingCount: _storageService.getPendingQueue().length,
        lastSyncTime: DateTime.now().toIso8601String(),
      );
    }
  }
}

final offlineSyncProvider = StateNotifierProvider<OfflineSyncNotifier, SyncState>((ref) {
  return OfflineSyncNotifier(
    ref.watch(hiveStorageProvider),
    ref.watch(apiServiceProvider),
  );
});`}
                </pre>
              </div>
            )}

            {/* HIVE STORAGE CODE */}
            {activeCodeTab === 'hive' && (
              <div className="space-y-3">
                <div className="flex justify-between text-white/50 text-[11px]">
                  <span>lib/services/hive_storage_service.dart</span>
                  <span>Hive Encrypted NoSQL Box Adapter</span>
                </div>
                <pre className="text-amber-300 overflow-x-auto p-4 rounded-xl bg-black/90 border border-white/10 text-[11px] leading-relaxed">
{`import 'package:hive_flutter/hive_flutter.dart';
import '../models/verification_report.dart';

class HiveStorageService {
  static const String verificationBoxName = 'pending_verifications_box';

  Future<void> init() async {
    await Hive.initFlutter();
    Hive.registerAdapter(VerificationReportAdapter());
    Hive.registerAdapter(GpsPointAdapter());
    await Hive.openBox<VerificationReport>(verificationBoxName);
  }

  List<VerificationReport> getPendingQueue() {
    final box = Hive.box<VerificationReport>(verificationBoxName);
    return box.values.where((item) => !item.isSynced).toList();
  }

  Future<void> saveReport(VerificationReport report) async {
    final box = Hive.box<VerificationReport>(verificationBoxName);
    await box.put(report.id, report);
  }

  Future<void> markReportSynced(String id) async {
    final box = Hive.box<VerificationReport>(verificationBoxName);
    final item = box.get(id);
    if (item != null) {
      item.isSynced = true;
      await item.save();
    }
  }
}`}
                </pre>
              </div>
            )}

            {/* DART MODELS */}
            {activeCodeTab === 'model' && (
              <div className="space-y-3">
                <div className="flex justify-between text-white/50 text-[11px]">
                  <span>lib/models/verification_report.dart</span>
                  <span>Dart Hive Type Model</span>
                </div>
                <pre className="text-blue-300 overflow-x-auto p-4 rounded-xl bg-black/90 border border-white/10 text-[11px] leading-relaxed">
{`import 'package:hive/hive.dart';

part 'verification_report.g.dart';

@HiveType(typeId: 0)
class VerificationReport extends HiveObject {
  @HiveField(0)
  final String id;

  @HiveField(1)
  final String supplierId;

  @HiveField(2)
  final String farmName;

  @HiveField(3)
  final List<GpsPoint> gpsPolygon;

  @HiveField(4)
  final double observedYieldMT;

  @HiveField(5)
  final int soilQualityRating;

  @HiveField(6)
  final bool laborStandardsVerified;

  @HiveField(7)
  final List<String> inspectionPhotoPaths;

  @HiveField(8)
  bool isSynced;

  VerificationReport({
    required this.id,
    required this.supplierId,
    required this.farmName,
    required this.gpsPolygon,
    required this.observedYieldMT,
    required this.soilQualityRating,
    required this.laborStandardsVerified,
    required this.inspectionPhotoPaths,
    this.isSynced = false,
  });
}

@HiveType(typeId: 1)
class GpsPoint {
  @HiveField(0)
  final double latitude;

  @HiveField(1)
  final double longitude;

  GpsPoint({required this.latitude, required this.longitude});
}`}
                </pre>
              </div>
            )}

            {/* FLUTTER SCREENS */}
            {activeCodeTab === 'screen' && (
              <div className="space-y-3">
                <div className="flex justify-between text-white/50 text-[11px]">
                  <span>lib/screens/supplier_visit_workflow_screen.dart</span>
                  <span>Flutter ConsumerStatefulWidget</span>
                </div>
                <pre className="text-purple-300 overflow-x-auto p-4 rounded-xl bg-black/90 border border-white/10 text-[11px] leading-relaxed">
{`import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/verification_sync_provider.dart';

class SupplierVisitWorkflowScreen extends ConsumerStatefulWidget {
  final String taskId;
  const SupplierVisitWorkflowScreen({super.key, required this.taskId});

  @override
  ConsumerState<SupplierVisitWorkflowScreen> createState() => _WorkflowState();
}

class _WorkflowState extends ConsumerState<SupplierVisitWorkflowScreen> {
  int currentStep = 1;

  @override
  Widget build(BuildContext context) {
    final syncState = ref.watch(offlineSyncProvider);

    return Scaffold(
      appBar: AppBar(
        title: Text('Farm Audit (Step $currentStep/7)'),
        actions: [
          Icon(syncState.isOnline ? Icons.wifi : Icons.wifi_off,
              color: syncState.isOnline ? Colors.green : Colors.red),
        ],
      ),
      body: PageView(
        children: [
          _buildGpsCaptureStep(),
          _buildCameraPhotosStep(),
          _buildFarmSizeStep(),
          _buildCropDetailsStep(),
          _buildCapacityEstimateStep(),
          _buildDocumentUploadStep(),
          _buildFinalAuditSubmitStep(ref),
        ],
      ),
    );
  }
}`}
                </pre>
              </div>
            )}

            {/* PUBSPEC */}
            {activeCodeTab === 'pubspec' && (
              <div className="space-y-3">
                <div className="flex justify-between text-white/50 text-[11px]">
                  <span>pubspec.yaml</span>
                  <span>Flutter Dependencies Configuration</span>
                </div>
                <pre className="text-pink-300 overflow-x-auto p-4 rounded-xl bg-black/90 border border-white/10 text-[11px] leading-relaxed">
{`name: sel_field_agent
description: SEL Agricultural Field Verification & EUDR Audit Flutter Application

version: 1.0.0+1

environment:
  sdk: '>=3.2.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  
  # State Management
  flutter_riverpod: ^2.5.1
  
  # Offline Storage Database
  hive: ^2.2.3
  hive_flutter: ^1.1.0
  
  # Connectivity & Geolocation
  connectivity_plus: ^5.0.2
  geolocator: ^10.1.0
  camera: ^0.10.5+9
  
  # REST API & Networking
  dio: ^5.4.1

dev_dependencies:
  flutter_test:
    sdk: flutter
  hive_generator: ^2.0.1
  build_runner: ^2.4.8`}
                </pre>
              </div>
            )}

            {/* REST API SPEC */}
            {activeCodeTab === 'api' && (
              <div className="space-y-3">
                <div className="flex justify-between text-white/50 text-[11px]">
                  <span>OpenAPI Spec - REST Field Verification API</span>
                  <span>POST /api/v1/agent/verification/sync-batch</span>
                </div>
                <pre className="text-yellow-300 overflow-x-auto p-4 rounded-xl bg-black/90 border border-white/10 text-[11px] leading-relaxed">
{`POST /api/v1/agent/verification/sync-batch
Content-Type: application/json
Authorization: Bearer <agent_jwt_token>

{
  "agentId": "AGENT-FIELD-01",
  "batchTimestamp": "2026-07-31T10:22:46Z",
  "verifications": [
    {
      "localHiveId": "hive-1722421366",
      "supplierId": "sup-001",
      "farmName": "Kuapa Kokoo Farmer Cooperative",
      "gpsPolygon": [
        { "latitude": 6.6885, "longitude": -1.6244 },
        { "latitude": 6.6912, "longitude": -1.6210 }
      ],
      "observedYieldMT": 4200,
      "soilQualityRating": 92,
      "laborStandardsVerified": true,
      "auditNotes": "Verified zero deforestation polygon via mobile satellite GPS overlay."
    }
  ]
}`}
                </pre>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
