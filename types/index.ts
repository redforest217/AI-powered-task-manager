export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  dueDate: string; // ISO string format for date ('2025-07-20')
  subtasks?: string[]; // Array of subtasks
}

export interface NewTask {
  title: string;
  description: string;
  status: "pending" | "completed";
  dueDate: string;
}
