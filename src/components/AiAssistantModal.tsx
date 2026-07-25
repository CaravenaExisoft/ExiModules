import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, Loader2 } from 'lucide-react';
import { ActiveView } from '../types';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: ActiveView;
}

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  currentView
}) => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: '¡Hola! Soy tu Copiloto Ejecutivo de Smart Systems. ¿En qué área o métrica deseas profundizar hoy?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'Resumen ejecutivo global de la empresa',
    '¿Cómo podemos acelerar el pipeline comercial?',
    'Análisis de entregables y riesgos en proyectos',
    'Reporte de salud fiscal y cobros'
  ];

  const handleSend = async (userText: string) => {
    if (!userText.trim()) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { sender: 'user', text: userText }
    ];
    setMessages(newMessages);
    setPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: currentView,
          query: userText,
          dataContext: {
            view: currentView,
            timestamp: new Date().toISOString()
          }
        })
      });

      const data = await response.json();
      setMessages([
        ...newMessages,
        { sender: 'ai', text: data.result || 'No se pudo obtener una respuesta de la IA.' }
      ]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { sender: 'ai', text: 'Error de conexión con el servidor de inteligencia artificial.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ai-assistant-overlay" className="fixed inset-0 bg-black/40 backdrop-blur-xs flex justify-end z-50 animate-fade-in">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl border-l border-[#eeeef0]">
        
        {/* Drawer Header */}
        <div className="p-5 bg-[#eeeef0] border-b border-[#e2e2e4] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#ff6b00] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-100" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#1a1c1d]">Asistente Ejecutivo IA</h3>
              <p className="text-[11px] font-semibold text-[#8e7164]">Gemini 3.6 Flash Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#e2e2e4] flex items-center justify-center text-gray-600 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Quick Prompts */}
        <div className="p-3 bg-[#f9f9fb] border-b border-[#eeeef0] flex gap-2 overflow-x-auto text-[11px]">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              className="bg-white border border-[#e2e2e4] hover:border-[#a04100] text-[#5a4136] hover:text-[#a04100] px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer shrink-0"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Messages List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                msg.sender === 'user' ? 'bg-[#1a1c1d] text-white' : 'bg-[#ff6b00] text-white'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[85%] whitespace-pre-line shadow-2xs ${
                msg.sender === 'user'
                  ? 'bg-[#1a1c1d] text-white rounded-tr-none'
                  : 'bg-[#eeeef0] text-[#1a1c1d] rounded-tl-none font-medium'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-[#a04100] font-bold p-2 bg-amber-50 rounded-xl w-fit">
              <Loader2 className="w-4 h-4 animate-spin text-[#ff6b00]" />
              <span>Analizando contexto empresarial...</span>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-[#f9f9fb] border-t border-[#eeeef0]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(prompt);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Haz una pregunta o pide una recomendación..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 bg-[#eeeef0] text-xs text-[#1a1c1d] px-4 py-3 rounded-full border border-transparent focus:border-[#a04100] outline-none font-medium"
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="w-10 h-10 rounded-full bg-[#ff6b00] hover:bg-[#e05e00] disabled:bg-gray-300 text-white flex items-center justify-center cursor-pointer shadow-md transition-all shrink-0"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
