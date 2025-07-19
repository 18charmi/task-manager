export interface Project {
  id: string;
  title: string;
  description: string;
  tasks: Task[]
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  status: "pending" | "completed";
}
