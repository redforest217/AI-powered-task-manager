// types/index.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  dueDate: string; // ISO string format for date ('YYYY-MM-DD')
  subtasks?: string[]; // Optional array of subtasks
}

export interface NewTask {
  title: string;
  description: string;
  status: "pending" | "completed";
  dueDate: string;
}
