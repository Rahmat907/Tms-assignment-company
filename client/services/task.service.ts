import { api } from "./api";

// Task list (pagination + filter + search)
export const getTasksApi = (params?: {
  page?: number;
  limit?: number;
  status?: "completed" | "pending";
  search?: string;
}) => {
  return api.get("/tasks", { params });
};

// Create task
export const createTaskApi = (data: {
  title: string;
  description?: string;
}) => {
  return api.post("/tasks", data);
};

// Update task
export const updateTaskApi = (
  id: string,
  data: { title?: string; description?: string }
) => {
  return api.patch(`/tasks/${id}`, data);
};

// Delete task
export const deleteTaskApi = (id: string) => {
  return api.delete(`/tasks/${id}`);
};

// Toggle task status
export const toggleTaskApi = (id: string) => {
  return api.patch(`/tasks/${id}/toggle`);
};
