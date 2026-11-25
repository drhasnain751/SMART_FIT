// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider'; // Import from the provider

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // If we are still checking for the token, show a loading indicator
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Checking authentication...</div>;
  }

  // If the user is authenticated, render the children (e.g., the MainLayout)
  if (isAuthenticated) {
    return children;
  }

  // If the user is not authenticated, redirect them to the login page
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;