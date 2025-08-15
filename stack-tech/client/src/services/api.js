import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Create an axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
      
      // Only log for debugging
      if (import.meta.env.MODE !== 'production') {
        console.log('Using token:', token.substring(0, 20) + '...');
      }
    } else {
      console.log('No token found in localStorage');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the error is due to authentication issues
    if (error.response && error.response.status === 401 && localStorage.getItem('token')) {
      console.log('Authentication error detected, clearing auth data');
      
      // Clear auth data from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login if needed
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication service
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
  refreshToken: () => api.get('/auth/refresh'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
  verifyResetToken: (token) => api.get(`/auth/verify-reset-token/${token}`),
};

// Products service
export const productService = {
  getAllProducts: () => api.get('/products'),
  getProductById: (id) => api.get(`/products/${id}`),
  getProductsByCategory: (category) => api.get(`/products/category/${category}`),
  searchProducts: (term) => api.get(`/products/search?term=${term}`),
  // Admin methods - now route through admin endpoints
  createProduct: (productData) => api.post('/admin/products', productData),
  updateProduct: (id, productData) => api.put(`/admin/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
};

// Orders service
export const orderService = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getUserOrders: (userId) => api.get(`/orders/user/${userId}`),
  // Admin methods - now route through admin endpoints
  getAllOrders: () => api.get('/admin/orders'),
  getOrderById: (id) => api.get(`/orders/${id}`),
  updateOrderStatus: (id, statusData) => api.put(`/admin/orders/${id}`, statusData),
};

// Configurations service
export const configService = {
  createConfiguration: (configData) => api.post('/configs', configData),
  getUserConfigurations: (userId) => api.get(`/configs/user/${userId}`),
  getConfigurationById: (id) => api.get(`/configs/${id}`),
  updateConfiguration: (id, configData) => api.put(`/configs/${id}`, configData),
  deleteConfiguration: (id) => api.delete(`/configs/${id}`),
};

export default api;
