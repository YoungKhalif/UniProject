import React from 'react';
import { Link } from 'react-router-dom';
import './css/AuthLinks.css';

const AuthLinks = () => {
  return (
    <div className="auth-links">
      <Link to="/login" className="auth-links__login">
        Login
      </Link>
      <Link to="/signup" className="auth-links__signup">
        Sign Up
      </Link>
    </div>
  );
};

export default AuthLinks;
