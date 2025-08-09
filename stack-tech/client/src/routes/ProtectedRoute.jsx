import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// A wrapper for routes that should only be accessible to authenticated users
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show nothing while checking authentication status
  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  // Redirect to login if not authenticated, but save the intended destination
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child components
  return children;
};

// A wrapper for routes that should only be accessible to admin users
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  // Show nothing while checking authentication status
  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to home if authenticated but not admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If authenticated and admin, render the child components
  return children;
};

export { ProtectedRoute, AdminRoute };
