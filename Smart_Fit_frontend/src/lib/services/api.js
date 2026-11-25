// src/lib/services/api.js
import axios from 'axios';

// Vite exposes environment variables on the `import.meta.env` object.
const baseURL = import.meta.env.VITE_API_BASE_URL;

console.log(`API is connecting to: ${baseURL}`); // A helpful log to see which URL is being used

const api = axios.create({
  baseURL: baseURL,
});

// Interceptor to add the JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;