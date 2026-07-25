import React, { useState } from 'react';
import { Project } from '../types';
import { Wrench, Sparkles, Plus, CheckCircle2, Clock, FileText, User } from 'lucide-react';

interface ServiciosViewProps {
  projects: Project[];
  onAddProject: (project: Project) => void;
}

export const ServiciosView: React.FC<ServiciosViewProps> = ({ projects, onAddProject }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  
  // Brief generator states
  const [briefTitle, setBriefTitle] = useState('');
  const [briefClient, setBriefClient] = useState('');
  const [briefScope, setBriefScope] = useState('');
  const [generatedBrief, setGeneratedBrief] = useState<string | null>(null);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);

  // New Project form states
  const [newName, setNewName] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newBudget, setNewBudget] = useState(30000);
  const [newTeamLead, setNewTeamLead] = useState('Elena Torres');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newClient) return;

    const proj: Project = {
      id: `proj-${Date.now()}`,
      name: newName,
      client: newClient,
      progress: 10,
      status: 'Briefing',
      deliverablesCount: 5,
      deadline: '2024-12-15',
      teamLead: newTeamLead,
      budget: Number(newBudget)
    };

    onAddProject(proj);
    setIsAddModalOpen(false);
    setNewName('');
    setNewClient('');
  };

  const handleGenerateBrief = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!briefTitle || !briefClient) return;

    setIsGeneratingBrief(true);
    setGeneratedBrief(null);

    try {
      const response = await fetch('/api/ai/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectTitle: briefTitle,
          clientName: briefClient,
          scope: briefScope || 'Desarrollo integral, testing y despliegue cloud.'
        })
      });

      const data = await response.json();
      setGeneratedBrief(data.brief || 'No se pudo generar el briefing.');
    } catch (err) {
      console.error(err);
      setGeneratedBrief('Error al generar briefing operativo con IA.');
    } finally {
      setIsGeneratingBrief(false);
    }
  };

  return (
    <div id="servicios-view" className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 space-y-8 animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-[#eeeef0] border border-[#e2e2e4] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[#0062a1] text-xs font-bold uppercase tracking-wider mb-1">
            <Wrench className="w-4 h-4" />
            <span>Módulo de Servicios</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#1a1c1d] tracking-tight">
            Control de Proyectos & Entregables
          </h2>
          <p className="text-sm text-[#5a4136] mt-1 max-w-xl">
            Monitoreo en tiempo real de <strong className="text-[#0062a1]">24 proyectos activos</strong> con control de calidad y briefing automatizado.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="servicios-brief-ai-btn"
            onClick={() => setIsBriefModalOpen(true)}
            className="flex items-center gap-2 bg-[#eeeef0] hover:bg-[#e2e2e4] text-[#0062a1] border border-[#0062a1]/30 font-bold px-4 py-2.5 rounded-full text-xs transition-all cursor-pointer shadow-2xs hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-[#0088ff]" />
            <span>Generar Briefing IA</span>
          </button>

          <button
            id="servicios-add-proj-btn"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-[#0088ff] hover:bg-[#0070d2] text-white font-bold px-5 py-2.5 rounded-full text-xs shadow-md transition-all cursor-pointer hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Nuevo Proyecto</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#eeeef0] p-5 rounded-2xl shadow-2xs">
          <p className="text-xs font-semibold text-[#8e7164] uppercase tracking-wider">Proyectos Activos</p>
          <p className="text-2xl font-black text-[#0062a1] mt-1">24 Proyectos</p>
          <p className="text-xs text-emerald-600 font-bold mt-1">92% Entregas a Tiempo</p>
        </div>
        <div className="bg-white border border-[#eeeef0] p-5 rounded-2xl shadow-2xs">
          <p className="text-xs font-semibold text-[#8e7164] uppercase tracking-wider">Entregables del Mes</p>
          <p className="text-2xl font-black text-[#1a1c1d] mt-1">42 Activos</p>
          <p className="text-xs text-[#0062a1] font-bold mt-1">18 Aprobados por Cliente</p>
        </div>
        <div className="bg-white border border-[#eeeef0] p-5 rounded-2xl shadow-2xs">
          <p className="text-xs font-semibold text-[#8e7164] uppercase tracking-wider">Líderes Asignados</p>
          <p className="text-2xl font-black text-[#1a1c1d] mt-1">8 Tech Leads</p>
          <p className="text-xs text-[#5a4136] font-medium mt-1">Capacidad: 88%</p>
        </div>
        <div className="bg-white border border-[#eeeef0] p-5 rounded-2xl shadow-2xs">
          <p className="text-xs font-semibold text-[#8e7164] uppercase tracking-wider">Satisfacción Cliente</p>
          <p className="text-2xl font-black text-[#1a1c1d] mt-1">4.9 / 5.0</p>
          <p className="text-xs text-emerald-600 font-bold mt-1">NPS Excelente</p>
        </div>
      </div>

      {/* Projects Grid Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#1a1c1d]">Proyectos en Ejecución</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-white border border-[#eeeef0] rounded-3xl p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#8e7164] uppercase tracking-wider">{proj.client}</span>
                    <h4 className="text-lg font-bold text-[#1a1c1d] mt-0.5">{proj.name}</h4>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                    proj.status === 'Completado' ? 'bg-emerald-100 text-emerald-800' :
                    proj.status === 'En Progreso' ? 'bg-blue-100 text-blue-900' :
                    proj.status === 'Control Calidad' ? 'bg-purple-100 text-purple-900' :
                    'bg-amber-100 text-amber-900'
                  }`}>
                    {proj.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#5a4136]">Avance General</span>
                    <span className="text-[#0062a1]">{proj.progress}%</span>
                  </div>
                  <div className="w-full bg-[#eeeef0] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#0088ff] to-[#0062a1] h-full transition-all duration-500 rounded-full"
                      style={{ width: `${proj.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#eeeef0] flex items-center justify-between text-xs text-[#5a4136]">
                <div className="flex items-center gap-1.5 font-medium">
                  <User className="w-3.5 h-3.5 text-[#0062a1]" />
                  <span>Lead: <strong>{proj.teamLead}</strong></span>
                </div>
                <div className="flex items-center gap-1 font-semibold text-[#8e7164]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Fecha: {proj.deadline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Brief Modal */}
      {isBriefModalOpen && (
        <div id="brief-ai-modal" className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-[#eeeef0] space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-[#1a1c1d] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#0088ff]" />
                <span>Generador de Briefing Operativo Inteligente</span>
              </h3>
              <button onClick={() => setIsBriefModalOpen(false)} className="text-gray-400 hover:text-gray-800 cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleGenerateBrief} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#5a4136] uppercase mb-1">Nombre del Proyecto</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Portal Omnicanal"
                    value={briefTitle}
                    onChange={e => setBriefTitle(e.target.value)}
                    className="w-full bg-[#eeeef0] px-4 py-2 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#0088ff]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#5a4136] uppercase mb-1">Cliente</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Seguros Patria"
                    value={briefClient}
                    onChange={e => setBriefClient(e.target.value)}
                    className="w-full bg-[#eeeef0] px-4 py-2 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#0088ff]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5a4136] uppercase mb-1">Alcance y Requerimientos Clave</label>
                <textarea
                  rows={2}
                  placeholder="Detalla los entregables esperados..."
                  value={briefScope}
                  onChange={e => setBriefScope(e.target.value)}
                  className="w-full bg-[#eeeef0] p-3 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#0088ff]"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isGeneratingBrief}
                  className="bg-[#0088ff] hover:bg-[#0070d2] text-white px-5 py-2 rounded-xl text-xs font-bold cursor-pointer shadow-md"
                >
                  {isGeneratingBrief ? 'Generando con Gemini...' : 'Generar Brief Completo'}
                </button>
              </div>
            </form>

            {generatedBrief && (
              <div className="bg-[#f9f9fb] border border-[#e2e2e4] p-5 rounded-2xl text-xs text-[#1a1c1d] space-y-2 whitespace-pre-line leading-relaxed">
                <p className="font-bold text-[#0062a1] uppercase">Briefing de Entregables Generado:</p>
                {generatedBrief}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <div id="add-project-modal" className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#eeeef0] space-y-4">
            <h3 className="text-2xl font-extrabold text-[#1a1c1d]">Crear Nuevo Proyecto</h3>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#5a4136] uppercase mb-1">Nombre del Proyecto</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full bg-[#eeeef0] px-4 py-2.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#0088ff]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5a4136] uppercase mb-1">Cliente</label>
                <input
                  type="text"
                  required
                  value={newClient}
                  onChange={e => setNewClient(e.target.value)}
                  className="w-full bg-[#eeeef0] px-4 py-2.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#0088ff]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5a4136] uppercase mb-1">Tech Lead</label>
                <input
                  type="text"
                  value={newTeamLead}
                  onChange={e => setNewTeamLead(e.target.value)}
                  className="w-full bg-[#eeeef0] px-4 py-2.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#0088ff]"
                />
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
                  className="bg-[#0088ff] hover:bg-[#0070d2] text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer shadow-md"
                >
                  Guardar Proyecto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
