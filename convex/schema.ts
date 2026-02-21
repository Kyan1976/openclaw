export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  assignedTo: string;
  createdBy: string;
  dueDate?: number;
  notes?: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
  progress: number;
  dependencies: string[];
}