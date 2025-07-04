// src/services/taskService.js
import api from '../api/axios';

export const fetchTasks = async (workspaceId) => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/api/tasks/${workspaceId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createTask = async (data) => {
  const token = localStorage.getItem("token");
  const res = await api.post(`/api/tasks`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
