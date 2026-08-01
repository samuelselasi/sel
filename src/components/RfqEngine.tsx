import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Plus, 
  CheckCircle2, 
  Building2, 
  FileCheck2, 
  Clock, 
  Send, 
  ShieldCheck,
  Globe2,
  FileText,
  DollarSign,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { RfqItem, CropCategory, CertificationType } from '../types';

interface RfqEngineProps {
  rfqs: RfqItem[];
  onCreateRfq: (newRfq: Omit<RfqItem, 'id' | 'createdDate' | 'bidsCount' | 'status'>) => void;
  onOpenAiAssistant: (prompt: string) => void;
}

export const RfqEngine: React.FC<RfqEngineProps> = ({
  rfqs,
  onCreateRfq,
  onOpenAiAssistant,
}) => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [activeContractRfq, setActiveContractRfq] = useState<RfqItem | null>(null);

  // Form State for New RFQ
  const [buyerName, setBuyerName] = useState('Dr. Klaus Weber');
  const [buyerCompany, setBuyerCompany] = useState('Nordic Agro Imports GmbH');
  const [buyerCountry, setBuyerCountry] = useState('Germany');
  const [crop, setCrop] = useState<CropCategory>('Cocoa');
  const [quantityMT, setQuantityMT] = useState<number>(150);
  const [targetPrice, setTargetPrice] = useState<number>(4100);
  const [destinationPort, setDestinationPort] = useState('Port of Hamburg, Germany');
  const [incoterm, setIncoterm] = useState<'FOB' | 'CIF' | 'CFR' | 'DDP'>('CIF');
  const [targetDeliveryDate, setTargetDeliveryDate] = useState('2026-11-15');
  const [selectedCerts, setSelectedCerts] = useState<CertificationType[]>(['Organic USDA/EU', 'Fairtrade', 'Euro1 Certificate']);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateRfq({
      buyerName,
      buyerCompany,
      buyerCountry,
      crop,
      quantityMT,
      targetPricePerTonUSD: targetPrice,
      destinationPort,
      incoterm,
      requiredCertifications: selectedCerts,
      targetDeliveryDate,
    });
    setShowCreateModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Buyer Request-For-Quotation Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            International Agro B2B RFQ Marketplace
          </h2>
          <p className="text-white/60 text-sm mt-1 max-w-2xl font-light leading-relaxed">
            Post bulk sourcing requirements to verified African cooperatives, receive competitive export bids, and issue smart trade contracts.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 rounded-full bg-[#10B981] hover:brightness-110 text-[#05110B] font-extrabold text-xs flex items-center space-x-2 shadow-xl transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Buyer RFQ</span>
        </button>
      </div>

      {/* Active RFQs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rfqs.map((rfq) => (
          <div
            key={rfq.id}
            className="rounded-[28px] backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl p-6 space-y-4 hover:border-[#10B981]/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 rounded-xl bg-[#10B981]/15 text-[#10B981] font-mono font-bold text-xs">
                  {rfq.id}
                </span>
                <span className={`px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase font-mono ${
                  rfq.status === 'BIDDING' ? 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30' : 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30'
                }`}>
                  ● {rfq.status}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-white tracking-tight">
                  {rfq.quantityMT} MT {rfq.crop}
                </h3>
                <p className="text-xs text-white/60 mt-0.5 font-light">
                  Buyer: <strong className="text-white font-semibold">{rfq.buyerCompany}</strong> ({rfq.buyerCountry})
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono space-y-1.5">
                <div className="flex justify-between text-white/80">
                  <span className="text-white/40 uppercase font-bold text-[10px]">Target Price:</span>
                  <span className="text-[#F59E0B] font-bold">${rfq.targetPricePerTonUSD}/MT</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span className="text-white/40 uppercase font-bold text-[10px]">Incoterm / Port:</span>
                  <span className="text-[#10B981] font-bold">{rfq.incoterm} • {rfq.destinationPort.split(',')[0]}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span className="text-white/40 uppercase font-bold text-[10px]">Delivery Target:</span>
                  <span className="text-white/60">{rfq.targetDeliveryDate}</span>
                </div>
              </div>

              {/* Certifications required */}
              <div className="space-y-1">
                <span className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Required Compliance:</span>
                <div className="flex flex-wrap gap-1">
                  {rfq.requiredCertifications.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded-md bg-[#10B981]/10 border border-[#10B981]/20 text-[10px] text-[#10B981] font-semibold">
                      ✓ {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-white/60 font-mono flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1 text-[#10B981]" />
                {rfq.bidsCount} Bids Received
              </span>

              <button
                onClick={() => setActiveContractRfq(rfq)}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#F59E0B] font-bold flex items-center space-x-1 transition-all border border-white/10"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Trade Contract</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE NEW RFQ MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05110B]/85 backdrop-blur-xl overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-[32px] bg-[#05110B] border border-white/20 shadow-2xl p-6 space-y-6 my-8">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-tight uppercase">Create New Buyer RFQ</h3>
                <p className="text-xs text-white/60 font-light">Broadcast your agricultural order specifications to verified African co-ops.</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-white/60 hover:text-white text-xl">✕</button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/50 mb-1 font-bold uppercase tracking-wider text-[11px]">Buyer Representative</label>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#05110B] border border-white/10 text-white focus:outline-none focus:border-[#10B981]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/50 mb-1 font-bold uppercase tracking-wider text-[11px]">Company Name</label>
                  <input
                    type="text"
                    value={buyerCompany}
                    onChange={(e) => setBuyerCompany(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#05110B] border border-white/10 text-white focus:outline-none focus:border-[#10B981]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white/50 mb-1 font-bold uppercase tracking-wider text-[11px]">Crop Required</label>
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value as CropCategory)}
                    className="w-full p-3 rounded-xl bg-[#05110B] border border-white/10 text-white focus:outline-none focus:border-[#10B981] cursor-pointer"
                  >
                    <option value="Cocoa">Cocoa Beans</option>
                    <option value="Coffee">Arabica Coffee</option>
                    <option value="Cashew">Raw Cashew Nuts</option>
                    <option value="Sesame">White Sesame</option>
                    <option value="Avocado">Hass Avocado</option>
                    <option value="Shea Butter">Shea Butter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/50 mb-1 font-bold uppercase tracking-wider text-[11px]">Volume (Metric Tons)</label>
                  <input
                    type="number"
                    value={quantityMT}
                    onChange={(e) => setQuantityMT(Number(e.target.value))}
                    className="w-full p-3 rounded-xl bg-[#05110B] border border-white/10 text-white font-mono focus:outline-none focus:border-[#10B981]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/50 mb-1 font-bold uppercase tracking-wider text-[11px]">Target Price ($/MT)</label>
                  <input
                    type="number"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(Number(e.target.value))}
                    className="w-full p-3 rounded-xl bg-[#05110B] border border-white/10 text-[#F59E0B] font-mono focus:outline-none focus:border-[#10B981]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/50 mb-1 font-bold uppercase tracking-wider text-[11px]">Destination Port</label>
                  <input
                    type="text"
                    value={destinationPort}
                    onChange={(e) => setDestinationPort(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#05110B] border border-white/10 text-white focus:outline-none focus:border-[#10B981]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/50 mb-1 font-bold uppercase tracking-wider text-[11px]">Incoterm</label>
                  <select
                    value={incoterm}
                    onChange={(e) => setIncoterm(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-[#05110B] border border-white/10 text-white focus:outline-none focus:border-[#10B981] cursor-pointer"
                  >
                    <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                    <option value="FOB">FOB (Free on Board)</option>
                    <option value="CFR">CFR (Cost & Freight)</option>
                    <option value="DDP">DDP (Delivered Duty Paid)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#10B981] hover:brightness-110 text-[#05110B] font-extrabold text-sm shadow-xl transition-all uppercase tracking-wider"
              >
                Broadcast RFQ to Network
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TRADE CONTRACT PREVIEW MODAL */}
      {activeContractRfq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05110B]/85 backdrop-blur-xl overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-[32px] bg-[#05110B] border border-white/20 shadow-2xl p-6 space-y-6 my-8">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2">
                <FileCheck2 className="w-5 h-5 text-[#F59E0B]" />
                <h3 className="text-lg font-extrabold text-white tracking-tight uppercase">B2B Agricultural International Trade Contract</h3>
              </div>
              <button onClick={() => setActiveContractRfq(null)} className="text-white/60 hover:text-white text-xl">✕</button>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono space-y-4 text-white/80">
              <div className="flex justify-between text-[#F59E0B] font-bold border-b border-white/10 pb-2">
                <span>CONTRACT NO: SEL-AGRO-2026-982</span>
                <span>DATE: {new Date().toISOString().split('T')[0]}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-white/40 block font-bold uppercase text-[10px]">BUYER PARTY:</span>
                  <strong className="text-white">{activeContractRfq.buyerCompany} ({activeContractRfq.buyerCountry})</strong>
                </div>
                <div>
                  <span className="text-white/40 block font-bold uppercase text-[10px]">SELLER PARTY:</span>
                  <strong className="text-[#10B981]">Ashanti Gold Cocoa Farmers Cooperative (Ghana)</strong>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex justify-between text-white font-bold">
                  <span>COMMODITY SPECIFICATION:</span>
                  <span>{activeContractRfq.quantityMT} MT {activeContractRfq.crop}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>UNIT PRICE:</span>
                  <span className="text-[#F59E0B] font-bold">${activeContractRfq.targetPricePerTonUSD} / MT</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>TOTAL CONTRACT VALUE:</span>
                  <span className="text-[#10B981] font-bold font-mono text-sm">${(activeContractRfq.quantityMT * activeContractRfq.targetPricePerTonUSD).toLocaleString()} USD</span>
                </div>
              </div>

              <p className="text-[11px] text-white/60 leading-relaxed italic font-light">
                "Clause 4.1: Quality Assurance & EUDR Deforestation Guarantee — Seller warrants 100% boundary polygon hash traceability and COCOBOD Grade 1 Phytosanitary clearance upon loading at Takoradi port."
              </p>
            </div>

            <div className="flex items-center justify-end space-x-3 text-xs font-semibold">
              <button
                onClick={() => alert("Digital contract exported as PDF")}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 font-bold"
              >
                Download PDF Agreement
              </button>

              <button
                onClick={() => {
                  alert("Trade Contract digitally signed & submitted to Escrow settlement!");
                  setActiveContractRfq(null);
                }}
                className="px-6 py-2.5 rounded-full bg-[#10B981] hover:brightness-110 text-[#05110B] font-extrabold flex items-center space-x-1 shadow-lg"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Sign & Execute Contract</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
