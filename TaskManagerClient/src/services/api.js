import axios from 'axios';

const API_URL = 'https://localhost:7228/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  // Получить все задачи с фильтром
  getTasks: async (status = 'all') => {
    const response = await api.get(`/tasks?status=${status}`);
    return response.data;
  },

  // Создать новую задачу
  createTask: async (task) => {
    const response = await api.post('/tasks', task);
    return response.data;
  },

  // Обновить задачу
  updateTask: async (id, task) => {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  },

  // Удалить задачу
  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default taskService;