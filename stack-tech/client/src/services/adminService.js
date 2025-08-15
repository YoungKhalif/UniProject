import api from './api';

// Admin Service for Stack Technologies
export const adminService = {
  // Dashboard Analytics
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  getAnalytics: (dateRange = '30days') => {
    if (!dateRange) dateRange = '30days'; // Set default if undefined
    return api.get(`/admin/analytics?dateRange=${dateRange}`);
  },

  // Product Management
  getAllProducts: (params = {}) => {
    // Filter out undefined values
    const filteredParams = Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    const queryString = new URLSearchParams(filteredParams).toString();
    return api.get(`/admin/products?${queryString}`);
  },
  createProduct: (productData) => {
    // Handle FormData for file uploads
    const config = {};
    if (productData instanceof FormData) {
      config.headers = { 'Content-Type': 'multipart/form-data' };
    }
    return api.post('/admin/products', productData, config);
  },
  updateProduct: (id, productData) => {
    // Handle FormData for file uploads
    const config = {};
    if (productData instanceof FormData) {
      config.headers = { 'Content-Type': 'multipart/form-data' };
    }
    return api.put(`/admin/products/${id}`, productData, config);
  },
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),

  // Image Upload
  uploadImage: (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    return api.post('/admin/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  // Order Management
  getAllOrders: (params = {}) => {
    // Filter out undefined values
    const filteredParams = Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    const queryString = new URLSearchParams(filteredParams).toString();
    return api.get(`/admin/orders?${queryString}`);
  },
  updateOrderStatus: (id, statusData) => api.put(`/admin/orders/${id}`, statusData),

  // User Management
  getAllUsers: (params = {}) => {
    // Filter out undefined values
    const filteredParams = Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    const queryString = new URLSearchParams(filteredParams).toString();
    return api.get(`/admin/users?${queryString}`);
  },
  updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),

  // Inventory Management
  updateStock: (id, stockData) => api.put(`/admin/inventory/${id}`, stockData),
  getLowStockProducts: (threshold = 10) => api.get(`/admin/inventory/low-stock?threshold=${threshold}`),

  // Utility functions for admin operations
  bulkUpdateProducts: (products) => api.put('/admin/products/bulk', { products }),
  exportData: (type, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/admin/export/${type}?${queryString}`, { responseType: 'blob' });
  },
  
  // Settings
  getSystemSettings: () => api.get('/admin/settings'),
  updateSystemSettings: (settings) => api.put('/admin/settings', settings),
};

export default adminService;
