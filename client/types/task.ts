

export type TaskStatus = "completed" | "pending";

export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TaskCreateRequest = {
  title: string;
  description?: string;
};

export type TaskUpdateRequest = {
  title?: string;
  description?: string;
};

export type TaskListResponse = {
  data: Task[];
  page: number;
  limit: number;
  total: number;
};
