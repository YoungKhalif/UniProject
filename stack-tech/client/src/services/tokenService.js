/**
 * Token Service
 * Handles token storage and management
 */

// Store token in localStorage
export const setToken = (token) => {
  if (!token) return false;
  
  try {
    localStorage.setItem('token', token);
    return true;
  } catch (error) {
    console.error('Error storing token:', error);
    return false;
  }
};

// Get token from localStorage
export const getToken = () => {
  try {
    return localStorage.getItem('token');
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// Remove token from localStorage
export const removeToken = () => {
  try {
    localStorage.removeItem('token');
    return true;
  } catch (error) {
    console.error('Error removing token:', error);
    return false;
  }
};

// Store user data in localStorage
export const setUser = (userData) => {
  if (!userData) return false;
  
  try {
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  } catch (error) {
    console.error('Error storing user data:', error);
    return false;
  }
};

// Get user data from localStorage
export const getUser = () => {
  try {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Remove user data from localStorage
export const removeUser = () => {
  try {
    localStorage.removeItem('user');
    return true;
  } catch (error) {
    console.error('Error removing user data:', error);
    return false;
  }
};

// Clear all auth data
export const clearAuthData = () => {
  removeToken();
  removeUser();
};
