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
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication service
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
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
  // Admin methods
  createProduct: (productData) => api.post('/products', productData),
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

// Orders service
export const orderService = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getUserOrders: (userId) => api.get(`/orders/user/${userId}`),
  // Admin methods
  getAllOrders: () => api.get('/orders'),
  getOrderById: (id) => api.get(`/orders/${id}`),
  updateOrderStatus: (id, statusData) => api.put(`/orders/${id}`, statusData),
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
