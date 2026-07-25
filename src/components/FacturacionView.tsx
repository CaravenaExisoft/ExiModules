import React, { useState } from 'react';
import { Invoice } from '../types';
import { Receipt, Plus, Download, CheckCircle, FileText, ArrowUpRight } from 'lucide-react';

interface FacturacionViewProps {
  invoices: Invoice[];
  onAddInvoice: (inv: Invoice) => void;
}

export const FacturacionView: React.FC<FacturacionViewProps> = ({ invoices, onAddInvoice }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // New Invoice state
  const [client, setClient] = useState('');
  const [amount, setAmount] = useState(15000);
  const [category, setCategory] = useState('Desarrollo Web');

  const totalInvoiced = invoices.reduce((acc, curr) => acc + curr.amount, 0);
  const totalTaxes = invoices.reduce((acc, curr) => acc + curr.tax, 0);

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client) return;

    const num = `FAC-2024-00${invoices.length + 92}`;
    const newInv: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: num,
      client,
      amount: Number(amount),
      tax: Math.round(Number(amount) * 0.21),
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      status: 'Pagada',
      category
    };

    onAddInvoice(newInv);
    setIsAddModalOpen(false);
    setClient('');
  };

  return (
    <div id="facturacion-view" className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 space-y-8 animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-[#eeeef0] border border-[#e2e2e4] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[#b85020] text-xs font-bold uppercase tracking-wider mb-1">
            <Receipt className="w-4 h-4" />
            <span>Módulo de Facturación</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#1a1c1d] tracking-tight">
            Cobros, Impuestos & Salud Financiera
          </h2>
          <p className="text-sm text-[#5a4136] mt-1 max-w-xl">
            Estado fiscal al día. <strong className="text-[#b85020]">SIN PENDIENTES HOY</strong>. Total facturado acumulado de <strong>${totalInvoiced.toLocaleString()} USD</strong>.
          </p>
        </div>

        <button
          id="facturacion-add-inv-btn"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-[#f88d67] hover:bg-[#e07752] text-white font-bold px-5 py-2.5 rounded-full text-xs shadow-md transition-all cursor-pointer hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Emitir Factura</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#eeeef0] p-5 rounded-2xl shadow-2xs">
          <p className="text-xs font-semibold text-[#8e7164] uppercase tracking-wider">Cobros Totales</p>
          <p className="text-2xl font-black text-[#1a1c1d] mt-1">${totalInvoiced.toLocaleString()} USD</p>
          <p className="text-xs text-emerald-600 font-bold mt-1">✓ 100% Recaudado</p>
        </div>
        <div className="bg-white border border-[#eeeef0] p-5 rounded-2xl shadow-2xs">
          <p className="text-xs font-semibold text-[#8e7164] uppercase tracking-wider">Cuentas por Cobrar</p>
          <p className="text-2xl font-black text-[#b85020] mt-1">$0.00 USD</p>
          <p className="text-xs text-emerald-600 font-bold mt-1">Sin Pendientes Vencidos</p>
        </div>
        <div className="bg-white border border-[#eeeef0] p-5 rounded-2xl shadow-2xs">
          <p className="text-xs font-semibold text-[#8e7164] uppercase tracking-wider">Impuestos Est. (VAT)</p>
          <p className="text-2xl font-black text-[#1a1c1d] mt-1">${totalTaxes.toLocaleString()} USD</p>
          <p className="text-xs text-[#5a4136] font-medium mt-1">I.V.A 21% Calculado</p>
        </div>
        <div className="bg-white border border-[#eeeef0] p-5 rounded-2xl shadow-2xs">
          <p className="text-xs font-semibold text-[#8e7164] uppercase tracking-wider">Margen Operativo</p>
          <p className="text-2xl font-black text-[#1a1c1d] mt-1">38.5%</p>
          <p className="text-xs text-emerald-600 font-bold mt-1">Salud Financiera Óptima</p>
        </div>
      </div>

      {/* Invoices History Table */}
      <div className="bg-white border border-[#eeeef0] rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#1a1c1d]">Historial de Facturación y Comprobantes</h3>
          <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            ✓ Libro de Ventas Sincronizado
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#eeeef0] text-[#8e7164] text-xs font-semibold uppercase">
                <th className="py-3 px-4">Comprobante</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Servicio</th>
                <th className="py-3 px-4">Emisión</th>
                <th className="py-3 px-4">Monto Neto</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eeeef0]">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#f9f9fb] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#1a1c1d]">{inv.invoiceNumber}</td>
                  <td className="py-3.5 px-4 font-bold text-[#1a1c1d]">{inv.client}</td>
                  <td className="py-3.5 px-4 text-[#5a4136] text-xs">{inv.category}</td>
                  <td className="py-3.5 px-4 text-[#8e7164] text-xs">{inv.date}</td>
                  <td className="py-3.5 px-4 font-black text-[#b85020]">${inv.amount.toLocaleString()} USD</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
                      <CheckCircle className="w-3 h-3" />
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="text-xs font-bold text-[#a04100] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Ver / Imprimir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div id="invoice-detail-modal" className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-[#eeeef0] space-y-6">
            <div className="flex justify-between items-start border-b border-[#eeeef0] pb-4">
              <div>
                <span className="text-xs font-bold text-[#a04100] uppercase">Smart Systems Corp</span>
                <h3 className="text-2xl font-black text-[#1a1c1d]">{selectedInvoice.invoiceNumber}</h3>
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="text-gray-400 hover:text-gray-800 cursor-pointer">✕</button>
            </div>

            <div className="space-y-3 text-xs text-[#5a4136]">
              <div className="flex justify-between">
                <span>Cliente:</span>
                <strong className="text-[#1a1c1d]">{selectedInvoice.client}</strong>
              </div>
              <div className="flex justify-between">
                <span>Categoría Servicio:</span>
                <strong className="text-[#1a1c1d]">{selectedInvoice.category}</strong>
              </div>
              <div className="flex justify-between">
                <span>Fecha Emisión:</span>
                <strong className="text-[#1a1c1d]">{selectedInvoice.date}</strong>
              </div>
              <div className="flex justify-between">
                <span>Monto Subtotal:</span>
                <strong className="text-[#1a1c1d]">${(selectedInvoice.amount - selectedInvoice.tax).toLocaleString()} USD</strong>
              </div>
              <div className="flex justify-between">
                <span>I.V.A (21%):</span>
                <strong className="text-[#1a1c1d]">${selectedInvoice.tax.toLocaleString()} USD</strong>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#eeeef0] text-sm">
                <span className="font-bold text-[#1a1c1d]">Total Acreditado:</span>
                <strong className="font-extrabold text-[#b85020] text-base">${selectedInvoice.amount.toLocaleString()} USD</strong>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="bg-[#eeeef0] hover:bg-[#e2e2e4] text-[#1a1c1d] px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  alert(`Descargando comprobante fiscal ${selectedInvoice.invoiceNumber}...`);
                  setSelectedInvoice(null);
                }}
                className="bg-[#b85020] hover:bg-[#9a4018] text-white px-5 py-2 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Descargar PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Invoice Modal */}
      {isAddModalOpen && (
        <div id="add-invoice-modal" className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#eeeef0] space-y-4">
            <h3 className="text-2xl font-extrabold text-[#1a1c1d]">Emitir Nueva Factura</h3>
            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#5a4136] uppercase mb-1">Cliente</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Banco Santander"
                  value={client}
                  onChange={e => setClient(e.target.value)}
                  className="w-full bg-[#eeeef0] px-4 py-2.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#f88d67]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5a4136] uppercase mb-1">Concepto / Categoría</label>
                <input
                  type="text"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-[#eeeef0] px-4 py-2.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#f88d67]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5a4136] uppercase mb-1">Monto Total (USD)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(Number(e.target.value))}
                  className="w-full bg-[#eeeef0] px-4 py-2.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#f88d67]"
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
                  className="bg-[#f88d67] hover:bg-[#e07752] text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer shadow-md"
                >
                  Emitir Comprobante
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
