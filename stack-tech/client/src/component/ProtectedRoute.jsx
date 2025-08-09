import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './css/Loading.css';

// Protected route component that redirects to login if user is not authenticated
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  // If still loading authentication status, display a loading indicator
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Authenticating...</p>
      </div>
    );
  }

  // For admin-only routes, check both authentication and admin status
  if (adminOnly) {
    return isAuthenticated && isAdmin ? children : <Navigate to="/login" />;
  }
  
  // For regular protected routes, just check authentication
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
