import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { authService } from '../services/api';
import * as tokenService from '../services/tokenService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(tokenService.getUser());
  const [token, setToken] = useState(tokenService.getToken());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to refresh token
  const refreshToken = useCallback(async () => {
    try {
      console.log('Attempting to refresh token');
      const response = await authService.refreshToken();
      if (response.data && response.data.token) {
        console.log('Token refreshed successfully');
        tokenService.setToken(response.data.token);
        setToken(response.data.token);
        return response.data.token;
      }
    } catch (err) {
      console.error('Token refresh failed:', err);
      return null;
    }
  }, []);

  // Load user from token if available
  useEffect(() => {
    const loadUser = async () => {
      // If no token but we have cached user data, try to use that first
      if (!token) {
        if (user) {
          console.log('Using cached user data');
        }
        setLoading(false);
        return;
      }

      try {
        console.log('Attempting to get current user with token');
        const response = await authService.getCurrentUser();
        console.log('Current user response:', response);
        
        // Store the user data in localStorage
        tokenService.setUser(response.data);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Authentication error:', err.response || err);
        
        // If authentication failed with 401, try refreshing the token once
        if (err.response && err.response.status === 401) {
          try {
            // Attempt to refresh token
            const newToken = await refreshToken();
            if (newToken) {
              // If successful, retry getting the user
              const userResponse = await authService.getCurrentUser();
              tokenService.setUser(userResponse.data);
              setUser(userResponse.data);
              setLoading(false);
              return;
            }
          } catch (refreshErr) {
            console.error('Token refresh attempt failed:', refreshErr);
          }
          
          // If we got here, token refresh failed or getting user failed again
          tokenService.clearAuthData();
          setToken(null);
          setUser(null);
          setError('Authentication failed. Please log in again.');
        }
        setLoading(false);
      }
    };

    loadUser();
  }, [token, refreshToken]);

  // Register a new user
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      
      // Store token securely
      tokenService.setToken(response.data.token);
      setToken(response.data.token);
      
      // Load user data after successful registration
      const userResponse = await authService.getCurrentUser();
      
      // Store user data
      tokenService.setUser(userResponse.data);
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
      console.log('Login attempt with credentials:', { ...credentials, password: '[REDACTED]' });
      
      const response = await authService.login(credentials);
      console.log('Login response:', response);
      
      if (response.data && response.data.token) {
        console.log('Setting token in state and storage');
        
        // Store token securely
        tokenService.setToken(response.data.token);
        setToken(response.data.token);
        
        // Load user data after successful login
        try {
          console.log('Fetching user data after login');
          const userResponse = await authService.getCurrentUser();
          console.log('User data response:', userResponse);
          
          // Save user data to storage
          tokenService.setUser(userResponse.data);
          setUser(userResponse.data);
        } catch (userError) {
          console.error('Error fetching user data:', userError);
        }
      } else {
        console.error('No token received from server');
        setError('No authentication token received');
      }
      
      setLoading(false);
      return response.data;
    } catch (err) {
      console.error('Login error:', err.response || err);
      setError(err.response?.data?.msg || 'Login failed');
      setLoading(false);
      throw err;
    }
  };

  // Logout user
  const logout = () => {
    // Clear all auth-related data
    tokenService.clearAuthData();
    
    // Reset state
    setToken(null);
    setUser(null);
    setError(null);
    
    console.log('User logged out successfully');
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
