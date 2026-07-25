import React, { useState } from 'react';
import { Lead } from '../types';
import { salesMonthlyData } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Plus, TrendingUp, Sparkles, Filter, CheckCircle, Search } from 'lucide-react';

interface ComercialViewProps {
  leads: Lead[];
  onAddLead: (lead: Lead) => void;
}

export const ComercialView: React.FC<ComercialViewProps> = ({ leads, onAddLead }) => {
  const [filterStage, setFilterStage] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  // New lead form state
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const [newValue, setNewValue] = useState(25000);
  const [newStage, setNewStage] = useState<Lead['stage']>('Nuevo');
  const [newAssignedTo, setNewAssignedTo] = useState('Sofía Valenzuela');

  const filteredLeads = leads.filter(lead => {
    const matchesStage = filterStage === 'Todos' || lead.stage === filterStage;
    const matchesSearch = lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.contactName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const totalPipelineValue = leads.reduce((acc, curr) => acc + curr.value, 0);

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName || !newContactName) return;

    const newLeadItem: Lead = {
      id: `lead-${Date.now()}`,
      companyName: newCompanyName,
      contactName: newContactName,
      value: Number(newValue),
      stage: newStage,
      probability: newStage === 'Ganado' ? 100 : newStage === 'Negociacion' ? 80 : 40,
      lastContact: 'Hoy',
      assignedTo: newAssignedTo
    };

    onAddLead(newLeadItem);
    setIsAddModalOpen(false);
    setNewCompanyName('');
    setNewContactName('');
  };

  const handleGenerateAiStrategy = async () => {
    setIsLoadingAi(true);
    setAiInsight(null);

    try {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'Comercial & Ventas',
          query: 'Analiza nuestro pipeline de ventas de $251,500 USD y dame 3 recomendaciones tácticas para acelerar los cierres de este mes.',
          dataContext: { pipelineTotal: totalPipelineValue, leadsCount: leads.length }
        })
      });

      const data = await response.json();
      setAiInsight(data.result || 'Análisis no disponible.');
    } catch (err) {
      console.error(err);
      setAiInsight('Ocurrió un error al consultar el análisis estratégico de IA.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div id="comercial-view" className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 space-y-8 animate-fade-in">
      
      {/* Top Bar Banner */}
      <div className="bg-[#eeeef0] border border-[#e2e2e4] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[#a04100] text-xs font-bold uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Módulo Comercial</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#1a1c1d] tracking-tight">
            Gestión de Ventas & Leads
          </h2>
          <p className="text-sm text-[#5a4136] mt-1 max-w-xl">
            Crecimiento acumulado de <strong className="text-[#a04100]">+12% este mes</strong> con un pipeline proyectado de <strong>${totalPipelineValue.toLocaleString()} USD</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="comercial-ai-btn"
            onClick={handleGenerateAiStrategy}
            disabled={isLoadingAi}
            className="flex items-center gap-2 bg-[#eeeef0] hover:bg-[#e2e2e4] text-[#a04100] border border-[#a04100]/30 font-bold px-4 py-2.5 rounded-full text-xs transition-all cursor-pointer shadow-2xs hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-[#ff6b00]" />
            <span>{isLoadingAi ? 'Analizando...' : 'Estrategia IA'}</span>
          </button>

          <button
            id="comercial-add-lead-btn"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-[#ff6b00] hover:bg-[#e05e00] text-white font-bold px-5 py-2.5 rounded-full text-xs shadow-md transition-all cursor-pointer hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Nuevo Lead</span>
          </button>
        </div>
      </div>

      {/* AI Strategy Box if active */}
      {aiInsight && (
        <div id="comercial-ai-insight-box" className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-sm space-y-3 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#a04100] font-bold text-sm">
              <Sparkles className="w-4 h-4 text-[#ff6b00]" />
              <span>Recomendaciones Estratégicas IA</span>
            </div>
            <button onClick={() => setAiInsight(null)} className="text-xs text-gray-500 hover:text-gray-800 cursor-pointer">✕ Cerrar</button>
          </div>
          <div className="text-sm text-[#1a1c1d] whitespace-pre-line leading-relaxed">
            {aiInsight}
          </div>
        </div>
      )}

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#eeeef0] p-5 rounded-2xl shadow-2xs">
          <p className="text-xs font-semibold text-[#8e7164] uppercase tracking-wider">Ventas Octubre</p>
          <p className="text-2xl font-black text-[#1a1c1d] mt-1">$124,500 USD</p>
          <p className="text-xs text-emerald-600 font-bold mt-1">↑ +12.4% vs Mes Anterior</p>
        </div>
        <div className="bg-white border border-[#eeeef0] p-5 rounded-2xl shadow-2xs">
          <p className="text-xs font-semibold text-[#8e7164] uppercase tracking-wider">Pipeline Activo</p>
          <p className="text-2xl font-black text-[#1a1c1d] mt-1">${totalPipelineValue.toLocaleString()} USD</p>
          <p className="text-xs text-[#a04100] font-bold mt-1">{leads.length} Oportunidades</p>
        </div>
        <div className="bg-white border border-[#eeeef0] p-5 rounded-2xl shadow-2xs">
          <p className="text-xs font-semibold text-[#8e7164] uppercase tracking-wider">Tasa Cierre</p>
          <p className="text-2xl font-black text-[#1a1c1d] mt-1">24.5%</p>
          <p className="text-xs text-emerald-600 font-bold mt-1">↑ +3.1% Meta Trimestral</p>
        </div>
        <div className="bg-white border border-[#eeeef0] p-5 rounded-2xl shadow-2xs">
          <p className="text-xs font-semibold text-[#8e7164] uppercase tracking-wider">Ticket Promedio</p>
          <p className="text-2xl font-black text-[#1a1c1d] mt-1">$50,300 USD</p>
          <p className="text-xs text-[#5a4136] font-medium mt-1">Empresas Mid-Market</p>
        </div>
      </div>

      {/* Sales Trend Chart */}
      <div className="bg-white border border-[#eeeef0] p-6 rounded-3xl shadow-xs">
        <h3 className="text-lg font-bold text-[#1a1c1d] mb-4">Evolución de Ventas vs Meta ($)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesMonthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eeeef0" />
              <XAxis dataKey="month" stroke="#8e7164" fontSize={12} tickLine={false} />
              <YAxis stroke="#8e7164" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1c1d', borderRadius: '12px', color: '#fff', border: 'none' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="ventas" fill="#ff6b00" name="Ventas Reales" radius={[6, 6, 0, 0]} />
              <Bar dataKey="meta" fill="#e2dfde" name="Meta Asignada" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Leads CRM Table & Filters */}
      <div className="bg-white border border-[#eeeef0] rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-[#1a1c1d]">Pipeline de Oportunidades</h3>
          
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-48">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#8e7164]" />
              <input
                type="text"
                placeholder="Buscar lead..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#eeeef0] text-xs text-[#1a1c1d] pl-9 pr-3 py-2 rounded-full border border-transparent focus:border-[#a04100] outline-none"
              />
            </div>

            {/* Stage Filters */}
            <div className="flex items-center gap-1 bg-[#eeeef0] p-1 rounded-full text-xs">
              {['Todos', 'Nuevo', 'Calificado', 'Negociacion', 'Ganado'].map(stage => (
                <button
                  key={stage}
                  onClick={() => setFilterStage(stage)}
                  className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                    filterStage === stage ? 'bg-[#ff6b00] text-white shadow-xs' : 'text-[#5a4136] hover:text-[#1a1c1d]'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#eeeef0] text-[#8e7164] text-xs font-semibold uppercase">
                <th className="py-3 px-4">Empresa</th>
                <th className="py-3 px-4">Contacto</th>
                <th className="py-3 px-4">Monto (USD)</th>
                <th className="py-3 px-4">Etapa</th>
                <th className="py-3 px-4">Probabilidad</th>
                <th className="py-3 px-4">Ejecutivo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eeeef0]">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-[#f9f9fb] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#1a1c1d]">{lead.companyName}</td>
                  <td className="py-3.5 px-4 text-[#5a4136]">{lead.contactName}</td>
                  <td className="py-3.5 px-4 font-black text-[#a04100]">${lead.value.toLocaleString()}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      lead.stage === 'Ganado' ? 'bg-emerald-100 text-emerald-800' :
                      lead.stage === 'Negociacion' ? 'bg-amber-100 text-amber-900' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {lead.stage}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#5a4136]">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-[#eeeef0] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#ff6b00] h-full" style={{ width: `${lead.probability}%` }}></div>
                      </div>
                      <span className="text-xs font-semibold">{lead.probability}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#8e7164] text-xs">{lead.assignedTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Lead Modal */}
      {isAddModalOpen && (
        <div id="add-lead-modal" className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#eeeef0] space-y-4">
            <h3 className="text-2xl font-extrabold text-[#1a1c1d]">Agregar Nueva Oportunidad</h3>
            <form onSubmit={handleCreateLead} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#5a4136] uppercase mb-1">Nombre Empresa</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Corporación Alfa"
                  value={newCompanyName}
                  onChange={e => setNewCompanyName(e.target.value)}
                  className="w-full bg-[#eeeef0] px-4 py-2.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#ff6b00]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5a4136] uppercase mb-1">Nombre Contacto</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Roberto Sánchez"
                  value={newContactName}
                  onChange={e => setNewContactName(e.target.value)}
                  className="w-full bg-[#eeeef0] px-4 py-2.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#ff6b00]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#5a4136] uppercase mb-1">Monto (USD)</label>
                  <input
                    type="number"
                    value={newValue}
                    onChange={e => setNewValue(Number(e.target.value))}
                    className="w-full bg-[#eeeef0] px-4 py-2.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#ff6b00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#5a4136] uppercase mb-1">Etapa</label>
                  <select
                    value={newStage}
                    onChange={e => setNewStage(e.target.value as Lead['stage'])}
                    className="w-full bg-[#eeeef0] px-4 py-2.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#ff6b00]"
                  >
                    <option value="Nuevo">Nuevo</option>
                    <option value="Contactado">Contactado</option>
                    <option value="Calificado">Calificado</option>
                    <option value="Negociacion">Negociacion</option>
                    <option value="Ganado">Ganado</option>
                  </select>
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
                  className="bg-[#ff6b00] hover:bg-[#e05e00] text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer shadow-md"
                >
                  Guardar Oportunidad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
