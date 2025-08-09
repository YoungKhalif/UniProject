import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from token if available
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await authService.getCurrentUser();
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setError('Authentication failed. Please log in again.');
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  // Register a new user
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      
      // Load user data after successful registration
      const userResponse = await authService.getCurrentUser();
      setUser(userResponse.data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
      setLoading(false);
      throw err;
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      
      // Load user data after successful login
      const userResponse = await authService.getCurrentUser();
      setUser(userResponse.data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
      setLoading(false);
      throw err;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // Clear any errors
  const clearError = () => setError(null);

  const value = {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout,
    clearError,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
