
export interface Person {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface TaskStatus {
  label: string;
  color: string; // hex or tailwind class for background
  textColor?: string;
}

export interface TaskItem {
  id: string;
  name: string;
  owner: Person;
  reviewer: Person;
  startDate: string;
  dueDate: string;
  priority: {
    label: string;
    type: 'high' | 'medium' | 'low';
    color: string;
  };
  status: TaskStatus;
}

export interface TaskGroup {
  id: string;
  title: string;
  color: string; // The side border color
  items: TaskItem[];
}

export type ViewMode = 'table' | 'gantt' | 'kanban' | 'dashboard';
