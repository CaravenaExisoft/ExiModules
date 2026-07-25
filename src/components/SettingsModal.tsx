import React, { useState } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [accentColor, setAccentColor] = useState('#ff6b00');
  const [language, setLanguage] = useState('es');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  if (!isOpen) return null;

  return (
    <div id="settings-modal-overlay" className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#eeeef0] space-y-6">
        <div className="flex items-center justify-between border-b border-[#eeeef0] pb-3">
          <h3 className="text-xl font-extrabold text-[#1a1c1d]">Configuración de Smart Systems</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 cursor-pointer font-bold">✕</button>
        </div>

        <div className="space-y-4 text-xs text-[#5a4136]">
          {/* Accent Color */}
          <div>
            <label className="block font-bold text-[#1a1c1d] uppercase mb-2">Color de Énfasis del Dashboard</label>
            <div className="flex items-center gap-3">
              {['#ff6b00', '#0088ff', '#f88d67', '#dca385'].map(color => (
                <button
                  key={color}
                  onClick={() => setAccentColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                    accentColor === color ? 'border-[#1a1c1d] scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block font-bold text-[#1a1c1d] uppercase mb-1">Idioma de la Interfaz</label>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="w-full bg-[#eeeef0] p-2.5 rounded-xl font-semibold outline-none text-[#1a1c1d]"
            >
              <option value="es">Español (Latinoamérica)</option>
              <option value="en">English (US)</option>
            </select>
          </div>

          {/* Switches */}
          <div className="flex items-center justify-between py-1">
            <span className="font-semibold text-[#1a1c1d]">Notificaciones en tiempo real</span>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={e => setNotificationsEnabled(e.target.checked)}
              className="w-4 h-4 accent-[#ff6b00] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="font-semibold text-[#1a1c1d]">Sincronización automática de métricas</span>
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={e => setAutoRefresh(e.target.checked)}
              className="w-4 h-4 accent-[#ff6b00] cursor-pointer"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-[#eeeef0]">
          <button
            onClick={onClose}
            className="bg-[#a04100] hover:bg-[#883700] text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};
