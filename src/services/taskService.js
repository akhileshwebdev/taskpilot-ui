import api from "../api/axios";

export const getAllTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

export const createTask = async (task) => {
  const response = await api.post("/tasks", task);
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
};

export const filterTasks = async ({
  title = "",
  status = "",
  priority = "",
}) => {
  const params = new URLSearchParams();

  if (title) params.append("title", title);
  if (status) params.append("status", status);
  if (priority) params.append("priority", priority);

  const response = await api.get(`/tasks/filter?${params.toString()}`);

  return response.data;
};