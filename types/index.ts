export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  dueDate: string; // format for date ('YYYY-MM-DD')
  subtasks?: string[]; // Array of subtasks
}

export interface NewTask {
  title: string;
  description: string;
  status: "pending" | "completed";
  dueDate: string;
}
