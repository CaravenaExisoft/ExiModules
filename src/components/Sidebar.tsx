import React from 'react';
import { LayoutGrid, BarChart2, FileText, Receipt, Users, Sparkles } from 'lucide-react';
import { ActiveView } from '../types';

interface SidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  onOpenAiAssistant: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  onOpenAiAssistant
}) => {
  const navItems = [
    {
      id: 'dashboard' as ActiveView,
      label: 'Dashboard Principal',
      icon: LayoutGrid,
      badgeColor: 'bg-[#ff6b00]'
    },
    {
      id: 'comercial' as ActiveView,
      label: 'Comercial',
      icon: BarChart2,
      badgeColor: 'text-[#a04100]'
    },
    {
      id: 'servicios' as ActiveView,
      label: 'Servicios',
      icon: FileText,
      badgeColor: 'text-[#0062a1]'
    },
    {
      id: 'facturacion' as ActiveView,
      label: 'Facturación',
      icon: Receipt,
      badgeColor: 'text-[#b85020]'
    },
    {
      id: 'talento' as ActiveView,
      label: 'Talento',
      icon: Users,
      badgeColor: 'text-[#7a3000]'
    },
  ];

  return (
    <aside id="main-sidebar" className="w-16 md:w-20 bg-[#f9f9fb] border-r border-[#eeeef0] flex flex-col items-center py-6 justify-between min-h-[calc(100vh-73px)] shrink-0 z-20">
      <div className="flex flex-col items-center gap-5 w-full">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          const IconComponent = item.icon;

          if (item.id === 'dashboard') {
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => setActiveView('dashboard')}
                title={item.label}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                  isActive
                    ? 'bg-[#ff6b00] text-white ring-2 ring-[#ff6b00]/30 shadow-md scale-105'
                    : 'bg-[#eeeef0] text-[#5a4136] hover:bg-[#e2e2e4] hover:text-[#1a1c1d]'
                }`}
              >
                <IconComponent className="w-5 h-5 stroke-[2.2]" />
              </button>
            );
          }

          return (
            <button
              key={item.id}
              id={`sidebar-nav-${item.id}`}
              onClick={() => setActiveView(item.id)}
              title={item.label}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer relative group ${
                isActive
                  ? 'bg-[#eeeef0] text-[#ff6b00] font-bold shadow-inner'
                  : 'text-[#8e7164] hover:text-[#1a1c1d] hover:bg-[#eeeef0]/60'
              }`}
            >
              <IconComponent className="w-5 h-5 stroke-[2]" />
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#ff6b00] rounded-r-full"></span>
              )}
              {/* Tooltip */}
              <span className="absolute left-full ml-3 px-2.5 py-1 bg-[#1a1c1d] text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* AI Copilot floating trigger in sidebar */}
      <div className="flex flex-col items-center gap-3">
        <button
          id="sidebar-ai-trigger"
          onClick={onOpenAiAssistant}
          title="Asistente de Inteligencia Artificial"
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#a04100] to-[#ff6b00] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer group relative"
        >
          <Sparkles className="w-5 h-5 animate-pulse text-amber-200" />
          <span className="absolute left-full ml-3 px-2.5 py-1 bg-[#1a1c1d] text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
            Consultar IA
          </span>
        </button>
      </div>
    </aside>
  );
};
