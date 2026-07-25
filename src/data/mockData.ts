import { Lead, Project, Invoice, Vacancy, AppNotification } from '../types';

export const initialLeads: Lead[] = [
  {
    id: 'lead-1',
    companyName: 'TechCorp Latam',
    contactName: 'Carlos Mendoza',
    value: 45000,
    stage: 'Negociacion',
    probability: 85,
    lastContact: 'Ayer',
    assignedTo: 'Sofía Valenzuela'
  },
  {
    id: 'lead-2',
    companyName: 'Banco Global Innovación',
    contactName: 'Mariana Ríos',
    value: 98000,
    stage: 'Calificado',
    probability: 60,
    lastContact: 'Hace 2 días',
    assignedTo: 'Diego Fernández'
  },
  {
    id: 'lead-3',
    companyName: 'Grupo Retail Sur',
    contactName: 'Andrés Morales',
    value: 28000,
    stage: 'Ganado',
    probability: 100,
    lastContact: 'Hoy',
    assignedTo: 'Sofía Valenzuela'
  },
  {
    id: 'lead-4',
    companyName: 'Logística Express',
    contactName: 'Lucía Gómez',
    value: 18500,
    stage: 'Nuevo',
    probability: 20,
    lastContact: 'Hoy',
    assignedTo: 'Valentina Rossi'
  },
  {
    id: 'lead-5',
    companyName: 'Salud Digital Solutions',
    contactName: 'Jorge Peralta',
    value: 62000,
    stage: 'Contactado',
    probability: 40,
    lastContact: 'Hace 3 días',
    assignedTo: 'Diego Fernández'
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Rediseño Portal Corporativo',
    client: 'Banco Global',
    progress: 78,
    status: 'En Progreso',
    deliverablesCount: 8,
    deadline: '2024-11-15',
    teamLead: 'Martín Paez',
    budget: 35000
  },
  {
    id: 'proj-2',
    name: 'Sistema ERP Nube Phase 2',
    client: 'Logística Express',
    progress: 45,
    status: 'Briefing',
    deliverablesCount: 12,
    deadline: '2024-12-01',
    teamLead: 'Elena Torres',
    budget: 85000
  },
  {
    id: 'proj-3',
    name: 'App Móvil iOS/Android',
    client: 'Salud Digital',
    progress: 92,
    status: 'Control Calidad',
    deliverablesCount: 6,
    deadline: '2024-10-30',
    teamLead: 'Lucas Silva',
    budget: 42000
  },
  {
    id: 'proj-4',
    name: 'Migración Infraestructura AWS',
    client: 'TechCorp Latam',
    progress: 100,
    status: 'Completado',
    deliverablesCount: 4,
    deadline: '2024-10-10',
    teamLead: 'Gabriel Costa',
    budget: 29000
  }
];

export const initialInvoices: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'FAC-2024-0089',
    client: 'TechCorp Latam',
    amount: 14500,
    tax: 3045,
    date: '2024-10-20',
    dueDate: '2024-11-05',
    status: 'Pagada',
    category: 'Consultoría Software'
  },
  {
    id: 'inv-2',
    invoiceNumber: 'FAC-2024-0090',
    client: 'Grupo Retail Sur',
    amount: 28000,
    tax: 5880,
    date: '2024-10-22',
    dueDate: '2024-11-10',
    status: 'Pagada',
    category: 'Desarrollo Web'
  },
  {
    id: 'inv-3',
    invoiceNumber: 'FAC-2024-0091',
    client: 'Banco Global Innovación',
    amount: 32500,
    tax: 6825,
    date: '2024-10-24',
    dueDate: '2024-11-15',
    status: 'Pagada',
    category: 'Licencia Cloud'
  }
];

export const initialVacancies: Vacancy[] = [
  {
    id: 'vac-1',
    title: 'Senior Fullstack Engineer (React / Node)',
    department: 'Ingeniería',
    candidatesCount: 42,
    status: 'En Entrevistas',
    location: 'Remoto / Buenos Aires',
    postedDate: '2024-10-10',
    urgency: 'Alta'
  },
  {
    id: 'vac-2',
    title: 'UX/UI Product Designer Lead',
    department: 'Diseño & Producto',
    candidatesCount: 28,
    status: 'Abierta',
    location: 'Híbrido / Santiago',
    postedDate: '2024-10-15',
    urgency: 'Alta'
  },
  {
    id: 'vac-3',
    title: 'Account Executive B2B Senior',
    department: 'Comercial',
    candidatesCount: 19,
    status: 'Abierta',
    location: 'Remoto / CDMX',
    postedDate: '2024-10-18',
    urgency: 'Media'
  },
  {
    id: 'vac-4',
    title: 'DevOps & Cloud Security Specialist',
    department: 'Infraestructura',
    candidatesCount: 14,
    status: 'Abierta',
    location: 'Remoto',
    postedDate: '2024-10-21',
    urgency: 'Normal'
  }
];

export const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Cobro Registrado',
    message: 'Factura FAC-2024-0091 por $32,500 fue acreditada exitosamente.',
    time: 'Hace 10 min',
    type: 'success',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Nuevo Lead Asignado',
    message: 'TechCorp Latam avanzó a la etapa de Negociación ($45,000 USD).',
    time: 'Hace 1 hora',
    type: 'info',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Hito Cumplido',
    message: 'Proyecto "Migración Infraestructura AWS" marcó 100% de avance.',
    time: 'Hace 3 horas',
    type: 'success',
    read: true
  },
  {
    id: 'notif-4',
    title: 'Postulante Destacado',
    message: 'Se recibieron 5 nuevas postulaciones para Senior Fullstack Engineer.',
    time: 'Hace 5 horas',
    type: 'info',
    read: true
  }
];

export const salesMonthlyData = [
  { month: 'Mayo', ventas: 62000, meta: 60000 },
  { month: 'Junio', ventas: 74000, meta: 70000 },
  { month: 'Julio', ventas: 81000, meta: 75000 },
  { month: 'Agosto', ventas: 92000, meta: 85000 },
  { month: 'Setiembre', ventas: 105000, meta: 95000 },
  { month: 'Octubre', ventas: 124500, meta: 110000 },
];
