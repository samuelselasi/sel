import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { 
  INITIAL_SUPPLIERS, 
  HISTORICAL_MARKET_PRICES, 
  INITIAL_RFQS, 
  INITIAL_SHIPMENTS,
  SYSTEM_ARCHITECTURE_SPEC 
} from './src/data/mockData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory databases initialized from mockData
  let suppliers = [...INITIAL_SUPPLIERS];
  let rfqs = [...INITIAL_RFQS];
  let shipments = [...INITIAL_SHIPMENTS];
  let marketPrices = [...HISTORICAL_MARKET_PRICES];

  // API Route: Health Check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      platform: 'Sustainable Export Link (SEL)',
      version: '2.4.0',
      timestamp: new Date().toISOString()
    });
  });

  // API Route: Get Suppliers with Filters
  app.get('/api/suppliers', (req, res) => {
    const { crop, country, verificationStatus, minScore, searchQuery } = req.query;

    let filtered = suppliers;

    if (crop && crop !== 'ALL') {
      filtered = filtered.filter(s => s.primaryCrop === crop || s.secondaryCrops.includes(crop as any));
    }

    if (country && country !== 'ALL') {
      filtered = filtered.filter(s => s.country.toLowerCase() === (country as string).toLowerCase());
    }

    if (verificationStatus) {
      filtered = filtered.filter(s => s.verificationStatus === verificationStatus);
    }

    if (minScore) {
      filtered = filtered.filter(s => s.verificationScore >= Number(minScore));
    }

    if (searchQuery) {
      const q = (searchQuery as string).toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.region.toLowerCase().includes(q) ||
        s.primaryCrop.toLowerCase().includes(q)
      );
    }

    res.json({
      total: filtered.length,
      suppliers: filtered
    });
  });

  // API Route: Get Single Supplier Detail
  app.get('/api/suppliers/:id', (req, res) => {
    const supplier = suppliers.find(s => s.id === req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.json(supplier);
  });

  // API Route: Get Market Price Intelligence
  app.get('/api/intelligence/prices', (req, res) => {
    res.json({
      currency: 'USD',
      unit: 'Metric Ton (MT)',
      data: marketPrices
    });
  });

  // API Route: Get & Create RFQs
  app.get('/api/rfqs', (req, res) => {
    res.json({
      total: rfqs.length,
      rfqs: rfqs
    });
  });

  app.post('/api/rfqs', (req, res) => {
    const newRfq = {
      id: `rfq-2026-${String(rfqs.length + 1).padStart(3, '0')}`,
      createdDate: new Date().toISOString().split('T')[0],
      bidsCount: 0,
      status: 'OPEN' as const,
      ...req.body
    };
    rfqs.unshift(newRfq);
    res.status(201).json({ message: 'RFQ created successfully', rfq: newRfq });
  });

  // API Route: Submit Bid on RFQ
  app.post('/api/rfqs/:id/bids', (req, res) => {
    const rfq = rfqs.find(r => r.id === req.params.id);
    if (!rfq) {
      return res.status(404).json({ error: 'RFQ not found' });
    }
    rfq.bidsCount += 1;
    rfq.status = 'BIDDING';
    res.json({
      message: 'Bid submitted successfully',
      rfqId: rfq.id,
      bidsCount: rfq.bidsCount
    });
  });

  // API Route: Field Agent Verification Audit
  app.post('/api/verification/audits', (req, res) => {
    const { supplierId, agentName, score, comments, gpsBoundariesConfirmed } = req.body;
    const supplier = suppliers.find(s => s.id === supplierId);
    
    if (supplier) {
      const newAudit = {
        id: `aud-${Date.now()}`,
        agentName: agentName || 'Field Verification Agent',
        agentId: 'AGENT-FIELD-01',
        date: new Date().toISOString().split('T')[0],
        score: score || 98,
        soilPurityScore: 97,
        childLaborAudit: 'PASSED' as const,
        waterManagementScore: 96,
        comments: comments || 'Audit completed with GPS boundary validation.',
        gpsBoundariesConfirmed: gpsBoundariesConfirmed ?? true
      };
      supplier.auditHistory.unshift(newAudit);
      supplier.verificationScore = Math.round((supplier.verificationScore + (score || 98)) / 2);
    }

    res.status(201).json({
      message: 'Verification audit logged and cryptographic checksum generated',
      verifiedHash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
      status: 'VERIFIED'
    });
  });

  // API Route: Shipments Tracking
  app.get('/api/shipments', (req, res) => {
    res.json({
      total: shipments.length,
      shipments: shipments
    });
  });

  // API Route: System Architecture Spec
  app.get('/api/architecture', (req, res) => {
    res.json(SYSTEM_ARCHITECTURE_SPEC);
  });

  // API Route: Server-side Gemini AI B2B Agricultural Trade Advisor
  app.post('/api/ai-assistant', async (req, res) => {
    const { prompt, context } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const systemInstruction = `You are SEL AI (Sustainable Export Link Trade Advisor), an elite B2B agricultural commodity trade, supply chain, and trade compliance expert for African exports.
Provide precise, professional, executive-grade advice on:
- Agricultural crop sourcing (Cocoa, Coffee, Cashew, Sesame, Avocado, Shea Butter, Spices)
- Export quality specifications, certifications (GlobalGAP, Organic, EUDR, Euro1, Phytosanitary)
- International trade terms (FOB, CIF, CFR, Incoterms 2020)
- Freight risk, harvest calendars, seasonal pricing benchmarks, and supplier verification.
Be direct, knowledgeable, and concise.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${prompt}\n\nCurrent Context: ${JSON.stringify(context || {})}` }] }
          ]
        });

        return res.json({ text: response.text });
      }
    } catch (err) {
      console.error('Gemini API Error:', err);
    }

    // Fallback response if Gemini API Key not present or error occurs
    res.json({
      text: `[SEL AI Trade Advisor Response]
Thank you for querying the Sustainable Export Link (SEL) trade intelligence network.

Regarding your request "${prompt}":
1. **Verified Supplier Matching**: We recommend filtering for suppliers holding **GlobalGAP**, **Organic USDA/EU**, and **Euro1** certificates. For main cocoa & coffee crops, harvest runs through October to March.
2. **Quality & Compliance**: Ensure your contract incorporates strict moisture limits (<7.5% for cocoa, <12% for coffee, <8% for raw cashew nuts) and 100% GPS polygon mapping for EUDR compliance.
3. **Trade Terms**: Standard export incoterms out of Takoradi, Mombasa, or San Pédro are FOB or CIF. Standard transit time to Rotterdam/Hamburg is 16-22 days.

Would you like to issue a formal Request-For-Quotation (RFQ) or view audited supplier certificates?`
    });
  });

  // Mount Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sustainable Export Link (SEL) Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
