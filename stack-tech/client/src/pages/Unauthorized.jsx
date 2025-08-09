import React from 'react';
import { Navigate } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="unauthorized-message">
      <h2>Access Denied</h2>
      <p>You don't have permission to access this page.</p>
      <p>Please contact an administrator if you believe this is an error.</p>
      <button 
        className="back-btn" 
        onClick={() => window.history.back()}
      >
        Go Back
      </button>
    </div>
  );
};

export default Unauthorized;
