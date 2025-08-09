import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../component/css/Unauthorized.css';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const handleGoBack = () => {
    // Safer navigation that prevents going back to protected routes
    navigate('/', { replace: true });
  };
  
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <div className="unauthorized-icon">
          <i className="fas fa-lock"></i>
        </div>
        <h1>Access Denied</h1>
        <p className="unauthorized-message">You don't have permission to access this page.</p>
        <p className="unauthorized-details">Please contact an administrator if you believe this is an error.</p>
        
        <div className="unauthorized-actions">
          <button 
            className="primary-btn" 
            onClick={handleGoBack}
          >
            Go to Home
          </button>
          
          {!isAuthenticated && (
            <Link to="/login" className="secondary-btn">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
