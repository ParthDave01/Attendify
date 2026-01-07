import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (userData) => API.post('/auth/register', userData);
export const login = (userData) => API.post('/auth/login', userData);

// Timetable APIs
export const getTimetable = () => API.get('/timetable');
export const saveTimetable = (classes) => API.post('/timetable', { classes });
export const deleteClass = (classId) => API.delete(`/timetable/class/${classId}`);
export const clearTimetable = () => API.delete('/timetable');

export default API;