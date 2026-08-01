import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  X, 
  ShieldCheck, 
  ArrowRight,
  Globe2,
  FileCheck2,
  Building2
} from 'lucide-react';

interface AiSourcingAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export const AiSourcingAssistant: React.FC<AiSourcingAssistantProps> = ({
  isOpen,
  onClose,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Hello! I am SEL AI (Sustainable Export Link Trade Advisor). Ask me anything about African agricultural suppliers, export quality standards, EUDR compliance, or international B2B trade terms."
    }
  ]);

  const [input, setInput] = useState(initialPrompt || '');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    "Find Grade 1 Organic Cocoa in Ghana with MOQ < 25MT",
    "What are the EUDR satellite audit requirements for cocoa?",
    "Explain FOB vs CIF incoterms out of Mombasa port",
    "Compare Arabica Coffee cupping grades between Kenya & Ethiopia"
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = { role: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend })
      });
      const data = await res.json();
      const assistantMsg: Message = { role: 'assistant', text: data.text };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Apologies, unable to fetch trade intelligence right now. Please verify your connection or try again.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-4 sm:p-6 bg-[#05110B]/80 backdrop-blur-md">
      <div className="w-full max-w-xl h-[85vh] rounded-[32px] bg-[#05110B] border border-white/20 shadow-2xl flex flex-col overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white tracking-tight uppercase">SEL AI Trade Advisor</h3>
              <p className="text-[11px] text-[#10B981] font-mono font-bold uppercase tracking-wider">Powered by Gemini 2.5 Flash</p>
            </div>
          </div>

          <button onClick={onClose} className="text-white/60 hover:text-white text-xl p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-black/40 border-b border-white/10 flex gap-2 overflow-x-auto text-[11px] font-mono">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-[#10B981]/50 whitespace-nowrap shrink-0 transition-all font-semibold"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message History */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-[#10B981]" />
                </div>
              )}

              <div
                className={`max-w-[85%] p-4 rounded-[20px] leading-relaxed whitespace-pre-wrap font-light ${
                  m.role === 'user'
                    ? 'bg-[#10B981] text-[#05110B] font-semibold shadow-md'
                    : 'bg-black/40 border border-white/10 text-white/90'
                }`}
              >
                {m.text}
              </div>

              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-[#10B981] text-xs font-mono p-2">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Analyzing African trade datasets & export regulatory standards...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-black/50 border-t border-white/10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about crop specs, suppliers, or trade terms..."
              className="flex-1 p-3 rounded-xl bg-[#05110B] border border-white/10 text-xs text-white focus:outline-none focus:border-[#10B981]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3 rounded-xl bg-[#10B981] hover:brightness-110 text-[#05110B] font-extrabold disabled:opacity-50 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
