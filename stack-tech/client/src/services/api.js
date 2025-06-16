import axios from 'axios';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

// Request interceptor for adding auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific status codes
      if (error.response.status === 401) {
        // Handle unauthorized access
        console.error('Unauthorized access');
      }
    }
    return Promise.reject(error);
  }
);

// Add authentication header interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  // Product endpoints
  getProducts: (category) => api.get(`/products/${category}`),
  getProduct: (id) => api.get(`/products/${id}`),
  
  // Configurator endpoints
  getComponents: (category) => api.get(`/products/components/${category}`),
  saveConfig: (configData) => api.post('/configs', configData),
  
  // Authentication endpoints
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/users/me'),
  
  // Order endpoints
  createOrder: (orderData) => api.post('/orders', orderData),
  getOrders: () => api.get('/orders'),
  
  // Configuration endpoints
  saveConfiguration: (configData) => api.post('/configs', configData),
  getSavedConfigurations: () => api.get('/configs'),
};