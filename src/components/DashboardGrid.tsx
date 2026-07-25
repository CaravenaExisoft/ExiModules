import React from 'react';
import { ActiveView } from '../types';

interface DashboardGridProps {
  setActiveView: (view: ActiveView) => void;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({ setActiveView }) => {
  return (
    <div id="dashboard-grid-container" className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        
        {/* Card 1: Comercial */}
        <div
          id="card-comercial"
          onClick={() => setActiveView('comercial')}
          className="bg-[#eeeef0] hover:bg-[#e6e6e9] transition-all duration-300 rounded-[32px] p-8 md:p-10 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md border border-[#e2e2e4] flex flex-col justify-between min-h-[260px]"
        >
          {/* Top Row: Icon Badge & Background Watermark */}
          <div className="flex items-center justify-between mb-8">
            <div className="w-14 h-14 rounded-full bg-[#ff5500] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              {/* Bar Chart Icon */}
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <rect x="3" y="12" width="4" height="8" rx="1.5" />
                <rect x="10" y="8" width="4" height="12" rx="1.5" />
                <rect x="17" y="4" width="4" height="16" rx="1.5" />
              </svg>
            </div>

            {/* Subtle Watermark Icon Top Right */}
            <div className="text-[#a04100]/15 group-hover:text-[#a04100]/25 transition-colors pointer-events-none pr-2 pt-1">
              <svg className="w-24 h-24 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <line x1="3" y1="20" x2="21" y2="20" strokeWidth="2" strokeLinecap="round" />
                <line x1="6" y1="20" x2="6" y2="14" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="12" y1="20" x2="12" y2="8" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="18" y1="20" x2="18" y2="4" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Title & Description */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1c1d] tracking-tight mb-3 font-sans">
              Comercial
            </h2>
            <p className="text-[#5a4136] text-sm md:text-base leading-snug font-normal max-w-sm">
              Gestión de ventas, leads y crecimiento estratégico del mercado.
            </p>
          </div>

          {/* Status Tag */}
          <div>
            <span className="text-[#ff5500] font-black text-xs md:text-sm tracking-wider uppercase font-sans">
              +12% ESTE MES
            </span>
          </div>
        </div>

        {/* Card 2: Servicios */}
        <div
          id="card-servicios"
          onClick={() => setActiveView('servicios')}
          className="bg-[#eeeef0] hover:bg-[#e6e6e9] transition-all duration-300 rounded-[32px] p-8 md:p-10 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md border border-[#e2e2e4] flex flex-col justify-between min-h-[260px]"
        >
          {/* Top Row: Icon Badge & Background Watermark */}
          <div className="flex items-center justify-between mb-8">
            <div className="w-14 h-14 rounded-full bg-[#0088ff] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              {/* Wrench Tool Icon */}
              <svg className="w-7 h-7 stroke-current fill-none" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>

            {/* Subtle Watermark Icon Top Right */}
            <div className="text-[#0062a1]/15 group-hover:text-[#0062a1]/25 transition-colors pointer-events-none pr-2 pt-1">
              <svg className="w-24 h-24 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="12" r="4" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Title & Description */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1c1d] tracking-tight mb-3 font-sans">
              Servicios
            </h2>
            <p className="text-[#5a4136] text-sm md:text-base leading-snug font-normal max-w-sm">
              Control de proyectos operativos y briefing de entregables activos.
            </p>
          </div>

          {/* Status Tag */}
          <div>
            <span className="text-[#0062a1] font-black text-xs md:text-sm tracking-wider uppercase font-sans">
              24 PROYECTOS ACTIVOS
            </span>
          </div>
        </div>

        {/* Card 3: Facturación */}
        <div
          id="card-facturacion"
          onClick={() => setActiveView('facturacion')}
          className="bg-[#eeeef0] hover:bg-[#e6e6e9] transition-all duration-300 rounded-[32px] p-8 md:p-10 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md border border-[#e2e2e4] flex flex-col justify-between min-h-[260px]"
        >
          {/* Top Row: Icon Badge & Background Watermark */}
          <div className="flex items-center justify-between mb-8">
            <div className="w-14 h-14 rounded-full bg-[#f88d67] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              {/* Receipt Icon */}
              <svg className="w-7 h-7 stroke-current fill-none" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z" />
                <line x1="8" y1="8" x2="16" y2="8" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="8" y1="12" x2="14" y2="12" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="8" y1="16" x2="11" y2="16" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Subtle Watermark Icon Top Right */}
            <div className="text-[#b85020]/15 group-hover:text-[#b85020]/25 transition-colors pointer-events-none pr-2 pt-1">
              <svg className="w-24 h-24 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z" strokeWidth="1.5" />
                <circle cx="12" cy="10" r="2" strokeWidth="2" />
                <line x1="8" y1="15" x2="16" y2="15" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Title & Description */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1c1d] tracking-tight mb-3 font-sans">
              Facturación
            </h2>
            <p className="text-[#5a4136] text-sm md:text-base leading-snug font-normal max-w-sm">
              Administración de cobros, impuestos y salud financiera global.
            </p>
          </div>

          {/* Status Tag */}
          <div>
            <span className="text-[#b85020] font-black text-xs md:text-sm tracking-wider uppercase font-sans">
              SIN PENDIENTES HOY
            </span>
          </div>
        </div>

        {/* Card 4: Talento */}
        <div
          id="card-talento"
          onClick={() => setActiveView('talento')}
          className="bg-[#eeeef0] hover:bg-[#e6e6e9] transition-all duration-300 rounded-[32px] p-8 md:p-10 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md border border-[#e2e2e4] flex flex-col justify-between min-h-[260px]"
        >
          {/* Top Row: Icon Badge & Background Watermark */}
          <div className="flex items-center justify-between mb-8">
            <div className="w-14 h-14 rounded-full bg-[#dca385] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              {/* User Avatar Icon */}
              <svg className="w-7 h-7 stroke-current fill-none" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            {/* Subtle Watermark Icon Top Right */}
            <div className="text-[#7a3000]/15 group-hover:text-[#7a3000]/25 transition-colors pointer-events-none pr-2 pt-1">
              <svg className="w-24 h-24 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 0 0-3-3.87" strokeWidth="1.5" />
                <path d="M9 21v-2a4 4 0 0 1 3-3.87" strokeWidth="1.5" />
                <circle cx="12" cy="7" r="4" strokeWidth="1.5" />
                <circle cx="5" cy="9" r="3" strokeWidth="1.5" />
                <circle cx="19" cy="9" r="3" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* Title & Description */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1c1d] tracking-tight mb-3 font-sans">
              Talento
            </h2>
            <p className="text-[#5a4136] text-sm md:text-base leading-snug font-normal max-w-sm">
              Gestión de capital humano, formación y bienestar corporativo.
            </p>
          </div>

          {/* Status Tag */}
          <div>
            <span className="text-[#7a3000] font-black text-xs md:text-sm tracking-wider uppercase font-sans">
              4 NUEVAS VACANTES
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
