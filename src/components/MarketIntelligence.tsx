import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  ShieldAlert, 
  Info, 
  Sparkles,
  ArrowUpRight,
  Sun,
  CloudRain
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { MarketPricePoint, UserProfile, UserRole } from '../types';
import { Lock, UserCheck } from 'lucide-react';

interface MarketIntelligenceProps {
  priceData: MarketPricePoint[];
  onOpenAiAssistant: (query: string) => void;
  currentUser?: UserProfile | null;
  onOpenAuthModal?: (role?: UserRole) => void;
}

export const MarketIntelligence: React.FC<MarketIntelligenceProps> = ({
  priceData,
  onOpenAiAssistant,
  currentUser,
  onOpenAuthModal,
}) => {
  const [activeCropMetric, setActiveCropMetric] = useState<'cocoaPrice' | 'coffeePrice' | 'cashewPrice' | 'sesamePrice' | 'avocadoPrice'>('cocoaPrice');

  const harvestMatrix = [
    { country: 'Ghana 🇬🇭', crop: 'Cocoa Beans', peak: 'Oct - Mar', mid: 'Jun - Aug', status: 'PEAK HARVEST' },
    { country: 'Kenya 🇰🇪', crop: 'Arabica Coffee', peak: 'Oct - Jan', mid: 'May - Jul', status: 'FLY CROP' },
    { country: 'Tanzania 🇹🇿', crop: 'Raw Cashew Nuts', peak: 'Oct - Jan', mid: 'Feb - Mar', status: 'PEAK HARVEST' },
    { country: 'Nigeria 🇳🇬', crop: 'White Sesame', peak: 'Oct - Dec', mid: 'Jan - Feb', status: 'PROCESSING' },
    { country: 'Ethiopia 🇪🇹', crop: 'Specialty Coffee', peak: 'Nov - Feb', mid: 'Mar - Apr', status: 'EXPORT PEAK' },
    { country: 'Kenya 🇰🇪', crop: 'Hass Avocado', peak: 'Mar - Aug', mid: 'Sep - Nov', status: 'MAIN HARVEST' },
    { country: 'Côte d’Ivoire 🇨🇮', crop: 'Cocoa Beans', peak: 'Oct - Mar', mid: 'May - Jul', status: 'GRANDE RÉCOLTE' },
    { country: 'Uganda 🇺🇬', crop: 'Nilotica Shea Butter', peak: 'May - Aug', mid: 'Sep - Oct', status: 'PROCESSING' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-500/15 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>COMMODITY MARKET INTELLIGENCE & HARVEST CYCLES</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-serif tracking-tight">
            Spot Price Trends & Yield Forecasts
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Realtime benchmark export prices ($/Metric Ton), seasonal harvest calendars, and climate impact indicators across major African trade corridors.
          </p>
        </div>

        <button
          onClick={() => onOpenAiAssistant("What is the projected price trend for African Organic Cocoa and Kenya Arabica Coffee over the next quarter?")}
          className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-emerald-500/30 text-emerald-300 hover:text-white hover:border-emerald-400 text-xs font-bold flex items-center space-x-2 transition-all shadow-md"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Ask SEL AI Price Forecast</span>
        </button>
      </div>

      {/* Main Spot Prices Recharts Chart with Paywall Overlay */}
      <div className="relative p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-xl shadow-2xl space-y-6 overflow-hidden">
        
        {!currentUser && (
          <div className="absolute inset-0 z-30 flex items-center justify-center p-6 bg-[#05110B]/75 backdrop-blur-md">
            <div className="max-w-md w-full p-8 rounded-[32px] bg-[#0A1E14] border-2 border-[#10B981]/50 shadow-[0_25px_70px_rgba(0,0,0,0.9)] text-center space-y-5 text-white">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center text-[#10B981] shadow-xl">
                <Lock className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] text-[10px] font-mono font-bold uppercase tracking-widest border border-[#10B981]/30">
                  Market Intelligence Paywall
                </span>
                <h3 className="text-xl font-extrabold text-white">Sign In to Unlock Price Trends & Yields</h3>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  Live commodity spot prices ($/MT), origin harvest calendars, and AI-driven yield forecasts across African export corridors are reserved for authenticated members.
                </p>
              </div>

              <button
                onClick={() => onOpenAuthModal && onOpenAuthModal('buyer')}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#10B981] hover:bg-[#12d292] text-[#05110B] text-xs font-extrabold flex items-center justify-center space-x-2 shadow-xl transition-all cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>Sign In to Access Market Research</span>
              </button>
            </div>
          </div>
        )}

        <div className={`space-y-6 ${!currentUser ? 'filter blur-[3px] pointer-events-none' : ''}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center">
                <TrendingUp className="w-4 h-4 text-emerald-400 mr-2" />
                African Commodity Spot Price Index ($/Metric Ton)
              </h3>
              <p className="text-xs text-slate-400">Monthly FOB/CIF benchmark rates reported across major origin ports.</p>
            </div>

          {/* Metric Selector Buttons */}
          <div className="flex flex-wrap gap-1.5 text-xs font-mono">
            <button
              onClick={() => setActiveCropMetric('cocoaPrice')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeCropMetric === 'cocoaPrice' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              Cocoa ($4,200)
            </button>
            <button
              onClick={() => setActiveCropMetric('coffeePrice')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeCropMetric === 'coffeePrice' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              Coffee ($7,600)
            </button>
            <button
              onClick={() => setActiveCropMetric('cashewPrice')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeCropMetric === 'cashewPrice' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              Cashew ($1,610)
            </button>
            <button
              onClick={() => setActiveCropMetric('sesamePrice')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeCropMetric === 'sesamePrice' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              Sesame ($1,490)
            </button>
          </div>
        </div>

        {/* Recharts Container */}
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#020617', borderColor: '#10b981', borderRadius: '12px', fontSize: '12px' }}
                itemStyle={{ color: '#10b981' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="cocoaPrice" name="Cocoa ($/MT)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="coffeePrice" name="Coffee ($/MT)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="cashewPrice" name="Cashew RCN ($/MT)" stroke="#38bdf8" strokeWidth={2} />
              <Line type="monotone" dataKey="sesamePrice" name="Sesame ($/MT)" stroke="#a855f7" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Harvest Calendar & Climate Risk Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Harvest Calendar Table */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center">
              <Calendar className="w-4 h-4 text-emerald-400 mr-2" />
              African Regional Harvest Window Matrix
            </h3>
            <span className="text-xs text-slate-400 font-mono">UPDATED Q3 2026</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="text-slate-500 border-b border-slate-800">
                  <th className="py-2.5 px-3">Origin</th>
                  <th className="py-2.5 px-3">Crop</th>
                  <th className="py-2.5 px-3">Main Harvest</th>
                  <th className="py-2.5 px-3">Mid Crop</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {harvestMatrix.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-950/60 transition-colors">
                    <td className="py-3 px-3 font-bold text-white">{item.country}</td>
                    <td className="py-3 px-3 text-emerald-300">{item.crop}</td>
                    <td className="py-3 px-3">{item.peak}</td>
                    <td className="py-3 px-3 text-slate-400">{item.mid}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Climate & Risk Indicators */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-xl shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center">
            <Sun className="w-4 h-4 text-amber-400 mr-2" />
            Seasonal Climate & Yield Index
          </h3>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">West Africa Harmattan Index:</span>
                <span className="text-emerald-400 font-bold">FAVORABLE (Low Moisture Risk)</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Optimal solar radiation in Ashanti & Bas-Sassandra for sun-drying cocoa beans.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">East Africa Rainfall Index:</span>
                <span className="text-amber-400 font-bold">NORMAL (Rift Valley)</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Highland coffee & avocado cherry development tracking +4% yield over 2025.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">EUDR Satellite Compliance:</span>
                <span className="text-emerald-400 font-bold">100% AUDITED</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Zero deforestation alerts triggered across registered cooperative plots.
              </p>
            </div>
          </div>
        </div>
        </div>

      </div>
    </div>
  );
};
