import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './css/Loading.css';

// Public route component that redirects authenticated users away from auth pages
const PublicRoute = ({ children, redirectTo = "/" }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // Prevent back button access to auth pages when authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      // Replace current history entry to prevent back button access
      window.history.replaceState(null, null, redirectTo);
    }
  }, [isAuthenticated, loading, redirectTo]);

  // If still loading authentication status, display a loading indicator
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // If user is authenticated, redirect them away from auth pages
  return isAuthenticated ? <Navigate to={redirectTo} replace /> : children;
};

export default PublicRoute;
