export type ActiveView = 'dashboard' | 'comercial' | 'servicios' | 'facturacion' | 'talento';

export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  value: number;
  stage: 'Nuevo' | 'Contactado' | 'Calificado' | 'Negociacion' | 'Ganado';
  probability: number;
  lastContact: string;
  assignedTo: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  progress: number;
  status: 'En Progreso' | 'Briefing' | 'Control Calidad' | 'Completado';
  deliverablesCount: number;
  deadline: string;
  teamLead: string;
  budget: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  amount: number;
  tax: number;
  date: string;
  dueDate: string;
  status: 'Pagada' | 'Pendiente' | 'Borrador';
  category: string;
}

export interface Vacancy {
  id: string;
  title: string;
  department: string;
  candidatesCount: number;
  status: 'Abierta' | 'En Entrevistas' | 'Cerrada';
  location: string;
  postedDate: string;
  urgency: 'Alta' | 'Media' | 'Normal';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
}
