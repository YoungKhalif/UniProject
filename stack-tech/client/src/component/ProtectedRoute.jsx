import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './css/Loading.css';

// Protected route component that redirects to login if user is not authenticated
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();
  
  // Prevent back button access to protected pages when not authenticated
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      // Replace current history entry to prevent back button access
      window.history.replaceState(null, null, '/login');
    }
  }, [isAuthenticated, loading]);

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
    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (!isAdmin) {
      return <Navigate to="/unauthorized" replace />;
    }
    return children;
  }
  
  // For regular protected routes, just check authentication
  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
