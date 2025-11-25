
import { TaskGroup, Person } from './types';

export const USERS: Record<string, Person> = {
  alex: { id: '1', name: 'Alex (Tech Lead)', avatarUrl: 'https://picsum.photos/seed/alex/100' },
  sarah: { id: '2', name: 'Sarah (Frontend)', avatarUrl: 'https://picsum.photos/seed/sarah/100' },
  mike: { id: '3', name: 'Mike (Backend)', avatarUrl: 'https://picsum.photos/seed/mike/100' },
  emma: { id: '4', name: 'Emma (DevOps)', avatarUrl: 'https://picsum.photos/seed/emma/100' },
  john: { id: '5', name: 'John (QA)', avatarUrl: 'https://picsum.photos/seed/john/100' },
  lisa: { id: '6', name: 'Lisa (PO)', avatarUrl: 'https://picsum.photos/seed/lisa/100' },
};

export const INITIAL_DATA: TaskGroup[] = [
  {
    id: 'g1',
    title: 'Em Desenvolvimento (Sprint 24)',
    color: '#3b82f6', // blue-500
    items: [
      {
        id: 't1',
        name: 'Refatoração da API de Usuários',
        owner: USERS.mike,
        reviewer: USERS.alex,
        startDate: '1 mar 2024',
        dueDate: '10 mar 2024',
        priority: { label: 'Alta', type: 'high', color: '#ef4444' }, // Red
        status: { label: 'Em Progresso', color: '#fdab3d', textColor: '#fff' }, // Orange
      },
      {
        id: 't2',
        name: 'Implementar Dark Mode',
        owner: USERS.sarah,
        reviewer: USERS.lisa,
        startDate: '5 mar 2024',
        dueDate: '12 mar 2024',
        priority: { label: 'Média', type: 'medium', color: '#3b82f6' }, // Blue
        status: { label: 'Em Progresso', color: '#fdab3d', textColor: '#fff' },
      },
      {
        id: 't3',
        name: 'Configurar Pipeline CI/CD',
        owner: USERS.emma,
        reviewer: USERS.alex,
        startDate: '28 fev 2024',
        dueDate: '5 mar 2024',
        priority: { label: 'Alta', type: 'high', color: '#ef4444' },
        status: { label: 'Code Review', color: '#a25ddc', textColor: '#fff' }, // Purple
      },
    ],
  },
  {
    id: 'g2',
    title: 'Backlog / Planejamento',
    color: '#a855f7', // purple-500
    items: [
      {
        id: 't4',
        name: 'Migração Database v2',
        owner: USERS.alex,
        reviewer: USERS.mike,
        startDate: '15 mar 2024',
        dueDate: '30 mar 2024',
        priority: { label: 'Crítica', type: 'high', color: '#7e22ce' }, // Deep Purple
        status: { label: 'Pendente', color: '#94a3b8', textColor: '#fff' }, // Gray
      },
      {
        id: 't5',
        name: 'Testes E2E Checkout',
        owner: USERS.john,
        reviewer: USERS.sarah,
        startDate: '20 mar 2024',
        dueDate: '25 mar 2024',
        priority: { label: 'Baixa', type: 'low', color: '#64748b' }, // Slate
        status: { label: 'Pendente', color: '#94a3b8', textColor: '#fff' },
      },
    ],
  },
  {
    id: 'g3',
    title: 'Concluído (Entregas Recentes)',
    color: '#00c875', // green-500
    items: [
      {
        id: 't6',
        name: 'Otimização de Imagens',
        owner: USERS.sarah,
        reviewer: USERS.lisa,
        startDate: '10 fev 2024',
        dueDate: '15 fev 2024',
        priority: { label: 'Média', type: 'medium', color: '#3b82f6' },
        status: { label: 'Entregue', color: '#00c875', textColor: '#fff' }, // Green
      },
      {
        id: 't7',
        name: 'Correção Bug Login OAuth',
        owner: USERS.mike,
        reviewer: USERS.emma,
        startDate: '18 fev 2024',
        dueDate: '20 fev 2024',
        priority: { label: 'Alta', type: 'high', color: '#ef4444' },
        status: { label: 'Entregue', color: '#00c875', textColor: '#fff' },
      },
    ],
  },
];
