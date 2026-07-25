import React from 'react';
import { Bell, Settings, Sparkles, ChevronRight } from 'lucide-react';
import { ActiveView, AppNotification } from '../types';

interface HeaderProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  notifications: AppNotification[];
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  onOpenAiAssistant: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  notifications,
  onOpenNotifications,
  onOpenSettings,
  onOpenAiAssistant
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  const viewTitles: Record<ActiveView, string> = {
    dashboard: 'SMART DASHBOARD',
    comercial: 'Comercial & Ventas',
    servicios: 'Servicios & Proyectos',
    facturacion: 'Facturación & Finanzas',
    talento: 'Talento & Gestión Humana'
  };

  return (
    <header id="main-header" className="w-full flex items-center justify-between py-4 px-6 md:px-10 bg-[#f9f9fb] border-b border-[#eeeef0] sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {activeView !== 'dashboard' && (
          <button
            id="back-to-dashboard-btn"
            onClick={() => setActiveView('dashboard')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#5a4136] hover:text-[#a04100] transition-colors bg-[#eeeef0] hover:bg-[#e2e2e4] px-3 py-1.5 rounded-full cursor-pointer"
          >
            <span>←</span>
            <span>Dashboard</span>
          </button>
        )}

        <div className="flex items-center gap-2">
          {activeView !== 'dashboard' && (
            <ChevronRight className="w-4 h-4 text-[#8e7164]" />
          )}
          <h1 id="header-app-title" className="text-2xl md:text-3xl font-black tracking-tight text-[#a04100] uppercase font-sans">
            {activeView === 'dashboard' ? 'SMART DASHBOARD' : viewTitles[activeView]}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {/* AI Assistant Button */}
        <button
          id="header-ai-copilot-btn"
          onClick={onOpenAiAssistant}
          className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#ff6b00] to-[#a04100] hover:from-[#e05e00] hover:to-[#883700] text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
          <span>IA Copilot</span>
        </button>

        {/* Notifications Bell */}
        <button
          id="header-notifications-btn"
          onClick={onOpenNotifications}
          className="relative p-2.5 rounded-full text-[#1a1c1d] hover:bg-[#eeeef0] transition-colors cursor-pointer"
          title="Notificaciones"
        >
          <Bell className="w-5 h-5 stroke-[2.2]" />
          {unreadCount > 0 && (
            <span id="header-unread-badge" className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#ff6b00] rounded-full ring-2 ring-[#f9f9fb]"></span>
          )}
        </button>

        {/* Settings Gear */}
        <button
          id="header-settings-btn"
          onClick={onOpenSettings}
          className="p-2.5 rounded-full text-[#1a1c1d] hover:bg-[#eeeef0] transition-colors cursor-pointer"
          title="Configuración"
        >
          <Settings className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* User Profile Pill */}
        <div id="header-user-profile" className="flex items-center gap-2.5 bg-[#eeeef0] hover:bg-[#e2e2e4] px-2.5 py-1 rounded-full border border-[#e2e2e4] transition-all cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
            alt="Admin User Avatar"
            className="w-7 h-7 rounded-full object-cover ring-1 ring-[#a04100]/30"
          />
          <span className="text-xs font-semibold text-[#1a1c1d] pr-1.5">Admin User</span>
        </div>
      </div>
    </header>
  );
};
