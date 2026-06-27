import axios from 'axios';
import { API_BASE_URL, PAGE_SIZE } from '../config/constants.js';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const HospitalsService = {
  getAll: async ({ state, city, page = 1, pageSize = PAGE_SIZE } = {}) => {
    const { data } = await api.get('/hospitals/', {
      params: {
        state: state || undefined,
        city: city || undefined,
        page,
        page_size: pageSize,
      },
    });
    return data; // { items, total, page, page_size, total_pages }
  },

  create: async (payload) => {
    const { data } = await api.post('/hospitals/', payload);
    return data;
  },
};

export const StatsService = {
  get: async () => {
    const { data } = await api.get('/stats/');
    return data; // { active_hospitals, open_needs, fulfilled_needs }
  },
};

export const NeedsService = {
  create: async (payload) => {
    const { data } = await api.post('/needs/', payload);
    return data;
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/needs/${id}`, payload);
    return data;
  },
};

export default api;
