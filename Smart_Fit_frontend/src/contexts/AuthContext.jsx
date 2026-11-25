// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin } from '../lib/services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Start as true to check for token

  useEffect(() => {
    // Check for a token in local storage on initial app load
    const token = localStorage.getItem('authToken');
    if (token) {
      // Here you could add logic to verify the token with the backend
      // and get user data. For now, we'll just set isAuthenticated.
      setIsAuthenticated(true);
      // You would fetch user data and setUser(userData) here in a real app
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await apiLogin(email, password);
      localStorage.setItem('authToken', data.access_token);
      setIsAuthenticated(true);
      // Fetch user data here if needed
      return true; // Indicate success
    } catch (error) {
      console.error("Login failed:", error);
      // Let the component handle showing the error message
      throw error; 
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};