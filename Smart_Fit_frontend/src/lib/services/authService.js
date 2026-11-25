// src/lib/services/authService.js
import api from './api';

export const register = async (email, password) => {
  return await api.post('/auth/register', { email, password });
};

export const login = async (email, password) => {
  // FastAPI's OAuth2 expects form data, so we create it here
  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);

  const response = await api.post('/auth/token', formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  
  return response.data; // This will be { access_token: "...", token_type: "bearer" }
};