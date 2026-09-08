export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  priority: Priority;
  completed: boolean;
  createdAt: Date;
  prerequisites?: string[]; // Array of task IDs that must be completed first
}

export type SortOption = 'priority' | 'deadline' | 'created';
