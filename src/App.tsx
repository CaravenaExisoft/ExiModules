import React, { useState } from 'react';
import { ActiveView, Lead, Project, Invoice, Vacancy, AppNotification } from './types';
import {
  initialLeads,
  initialProjects,
  initialInvoices,
  initialVacancies,
  initialNotifications
} from './data/mockData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { DashboardGrid } from './components/DashboardGrid';
import { ComercialView } from './components/ComercialView';
import { ServiciosView } from './components/ServiciosView';
import { FacturacionView } from './components/FacturacionView';
import { TalentoView } from './components/TalentoView';
import { AiAssistantModal } from './components/AiAssistantModal';
import { SettingsModal } from './components/SettingsModal';
import { NotificationDrawer } from './components/NotificationDrawer';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  
  // Data State
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [vacancies, setVacancies] = useState<Vacancy[]>(initialVacancies);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);

  // Modals and Drawers
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Data Handlers
  const handleAddLead = (newLead: Lead) => {
    setLeads([newLead, ...leads]);
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Nuevo Lead Registrado',
      message: `Se creó la oportunidad para ${newLead.companyName} por $${newLead.value.toLocaleString()} USD.`,
      time: 'Hace un momento',
      type: 'info',
      read: false
    };
    setNotifications([notif, ...notifications]);
  };

  const handleAddProject = (newProj: Project) => {
    setProjects([newProj, ...projects]);
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Proyecto Iniciado',
      message: `Se dio inicio al proyecto "${newProj.name}" para ${newProj.client}.`,
      time: 'Hace un momento',
      type: 'success',
      read: false
    };
    setNotifications([notif, ...notifications]);
  };

  const handleAddInvoice = (newInv: Invoice) => {
    setInvoices([newInv, ...invoices]);
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Factura Emitida',
      message: `Comprobante ${newInv.invoiceNumber} emitido a ${newInv.client} por $${newInv.amount.toLocaleString()} USD.`,
      time: 'Hace un momento',
      type: 'success',
      read: false
    };
    setNotifications([notif, ...notifications]);
  };

  const handleAddVacancy = (newVac: Vacancy) => {
    setVacancies([newVac, ...vacancies]);
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Vacante Publicada',
      message: `Búsqueda iniciada para ${newVac.title} (${newVac.department}).`,
      time: 'Hace un momento',
      type: 'info',
      read: false
    };
    setNotifications([notif, ...notifications]);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div id="smart-app-root" className="min-h-screen bg-[#f9f9fb] text-[#1a1c1d] flex flex-col font-sans selection:bg-[#ff6b00] selection:text-white">
      {/* Top Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAiAssistant={() => setIsAiOpen(true)}
      />

      {/* Main Container with Left Sidebar */}
      <div className="flex flex-1 w-full relative">
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          onOpenAiAssistant={() => setIsAiOpen(true)}
        />

        {/* Content Area */}
        <main className="flex-1 flex flex-col min-w-0 pb-12 overflow-y-auto">
          {activeView === 'dashboard' && (
            <DashboardGrid setActiveView={setActiveView} />
          )}

          {activeView === 'comercial' && (
            <ComercialView leads={leads} onAddLead={handleAddLead} />
          )}

          {activeView === 'servicios' && (
            <ServiciosView projects={projects} onAddProject={handleAddProject} />
          )}

          {activeView === 'facturacion' && (
            <FacturacionView invoices={invoices} onAddInvoice={handleAddInvoice} />
          )}

          {activeView === 'talento' && (
            <TalentoView vacancies={vacancies} onAddVacancy={handleAddVacancy} />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <AiAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        currentView={activeView}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
      />
    </div>
  );
}
