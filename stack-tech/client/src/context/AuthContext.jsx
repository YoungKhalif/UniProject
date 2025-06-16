import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        // Verify token with backend
        const response = await api.get('/users/me');
        setUser(response.data);
      } catch (err) {
        console.error('Authentication check failed', err);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.login({ email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      
      // Fetch user data
      const userResponse = await api.get('/users/me');
      setUser(userResponse.data);
      
      return { success: true };
    } catch (error) {
      console.error('Login failed', error);
      return { success: false, message: error.response?.data?.msg || 'Login failed' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await api.register({ name, email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      
      // Fetch user data
      const userResponse = await api.get('/users/me');
      setUser(userResponse.data);
      
      return { success: true };
    } catch (error) {
      console.error('Registration failed', error);
      return { success: false, message: error.response?.data?.msg || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);