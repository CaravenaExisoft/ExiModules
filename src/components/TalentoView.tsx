import React, { useState } from 'react';
import { Vacancy } from '../types';
import { Users, Plus, UserCheck, Briefcase, MapPin, Search } from 'lucide-react';

interface TalentoViewProps {
  vacancies: Vacancy[];
  onAddVacancy: (v: Vacancy) => void;
}

export const TalentoView: React.FC<TalentoViewProps> = ({ vacancies, onAddVacancy }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);

  // New Vacancy form states
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Ingeniería');
  const [location, setLocation] = useState('Remoto');
  const [urgency, setUrgency] = useState<Vacancy['urgency']>('Alta');

  const handleCreateVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newVac: Vacancy = {
      id: `vac-${Date.now()}`,
      title,
      department,
      candidatesCount: 1,
      status: 'Abierta',
      location,
      postedDate: new Date().toISOString().split('T')[0],
      urgency
    };

    onAddVacancy(newVac);
    setIsAddModalOpen(false);
    setTitle('');
  };

  return (
    <div id="talento-view" className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 space-y-8 animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-[#eeeef0] border border-[#e2e2e4] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[#7a3000] text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Módulo de Talento & HR</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#1a1c1d] tracking-tight">
            Gestión de Capital Humano & Reclutamiento
          </h2>
          <p className="text-sm text-[#5a4136] mt-1 max-w-xl">
            Proceso de selección activo con <strong className="text-[#7a3000]">{vacancies.length} NUEVAS VACANTES</strong> y <strong>103 postulantes evaluados</strong>.
          </p>
        </div>

        <button
          id="talento-add-vac-btn"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-[#dca385] hover:bg-[#c88f72] text-white font-bold px-5 py-2.5 rounded-full text-xs shadow-md transition-all cursor-pointer hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Publicar Vacante</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#eeeef0] p-5 rounded-2xl shadow-2xs">
          <p className="text-xs font-semibold text-[#8e7164] uppercase tracking-wider">Vacantes Abiertas</p>
          <p className="text-2xl font-black text-[#7a3000] mt-1">{vacancies.length} Vacantes</p>
          <p className="text-xs text-[#5a4136] font-medium mt-1">4 Búsquedas Prioritarias</p>
        </div>
        <div className="bg-white border border-[#eeeef0] p-5 rounded-2xl shadow-2xs">
          <p className="text-xs font-semibold text-[#8e7164] uppercase tracking-wider">Candidatos Activos</p>
          <p className="text-2xl font-black text-[#1a1c1d] mt-1">103 Postulantes</p>
          <p className="text-xs text-emerald-600 font-bold mt-1">↑ +18 esta semana</p>
        </div>
        <div className="bg-white border border-[#eeeef0] p-5 rounded-2xl shadow-2xs">
          <p className="text-xs font-semibold text-[#8e7164] uppercase tracking-wider">Retención Anual</p>
          <p className="text-2xl font-black text-[#1a1c1d] mt-1">96.2%</p>
          <p className="text-xs text-emerald-600 font-bold mt-1">Clima Laboral Excelente</p>
        </div>
        <div className="bg-white border border-[#eeeef0] p-5 rounded-2xl shadow-2xs">
          <p className="text-xs font-semibold text-[#8e7164] uppercase tracking-wider">Tiempo Contratación</p>
          <p className="text-2xl font-black text-[#1a1c1d] mt-1">18 Días Prom.</p>
          <p className="text-xs text-[#5a4136] font-medium mt-1">Proceso Agilizado</p>
        </div>
      </div>

      {/* Vacancies List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#1a1c1d]">Búsquedas Laborales en Cuestión</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vacancies.map((vac) => (
            <div key={vac.id} className="bg-white border border-[#eeeef0] rounded-3xl p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-[#a04100] uppercase tracking-wider">{vac.department}</span>
                    <h4 className="text-lg font-bold text-[#1a1c1d] mt-0.5">{vac.title}</h4>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                    vac.urgency === 'Alta' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {vac.urgency} Urgencia
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-4 text-xs text-[#5a4136]">
                  <div className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#8e7164]" />
                    <span>{vac.location}</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-[#7a3000]">
                    <Users className="w-3.5 h-3.5" />
                    <span>{vac.candidatesCount} Postulantes</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#eeeef0] flex items-center justify-between">
                <span className="text-xs text-[#8e7164]">Publicado: {vac.postedDate}</span>
                <button
                  onClick={() => setSelectedVacancy(vac)}
                  className="bg-[#eeeef0] hover:bg-[#e2e2e4] text-[#7a3000] font-bold px-4 py-1.5 rounded-full text-xs transition-colors cursor-pointer"
                >
                  Ver Candidatos ({vac.candidatesCount})
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vacancy Candidate Detail Modal */}
      {selectedVacancy && (
        <div id="vacancy-detail-modal" className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#eeeef0] space-y-4">
            <div className="flex justify-between items-start border-b border-[#eeeef0] pb-3">
              <div>
                <span className="text-xs font-bold text-[#a04100] uppercase">{selectedVacancy.department}</span>
                <h3 className="text-xl font-bold text-[#1a1c1d]">{selectedVacancy.title}</h3>
              </div>
              <button onClick={() => setSelectedVacancy(null)} className="text-gray-400 hover:text-gray-800 cursor-pointer">✕</button>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold text-[#5a4136] uppercase">Candidatos Destacados en Evaluación:</p>
              
              <div className="space-y-2">
                <div className="p-3 bg-[#f9f9fb] rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#1a1c1d]">Ing. Matías Benítez</p>
                    <p className="text-[#8e7164]">8 años exp • Senior Tech Lead</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">Entrevista Final</span>
                </div>
                <div className="p-3 bg-[#f9f9fb] rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#1a1c1d]">Lic. Natalia Varela</p>
                    <p className="text-[#8e7164]">6 años exp • Fullstack Specialist</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full text-[10px]">Prueba Técnica</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedVacancy(null)}
                className="bg-[#7a3000] hover:bg-[#602500] text-white px-5 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Vacancy Modal */}
      {isAddModalOpen && (
        <div id="add-vacancy-modal" className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#eeeef0] space-y-4">
            <h3 className="text-2xl font-extrabold text-[#1a1c1d]">Publicar Nueva Vacante</h3>
            <form onSubmit={handleCreateVacancy} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#5a4136] uppercase mb-1">Título de la Posición</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Senior Frontend Developer"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-[#eeeef0] px-4 py-2.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#dca385]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#5a4136] uppercase mb-1">Área / Depto</label>
                  <input
                    type="text"
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="w-full bg-[#eeeef0] px-4 py-2.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#dca385]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#5a4136] uppercase mb-1">Ubicación</label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full bg-[#eeeef0] px-4 py-2.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#dca385]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#dca385] hover:bg-[#c88f72] text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer shadow-md"
                >
                  Publicar Búsqueda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
