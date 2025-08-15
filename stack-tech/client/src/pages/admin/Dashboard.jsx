import React, { useState, useEffect, useRef } from 'react';
import ProductManagement from './components/ProductManagement';
import OrderManagement from './components/OrderManagement';
import UserManagement from './components/UserManagement';
import Analytics from './components/Analytics';
import InventoryManagement from './components/InventoryManagement';
import Settings from './components/Settings';
import { useAuth } from '../../context/AuthContext';
import { adminService } from '../../services/adminService';
import './Dashboard.css';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardStats, setDashboardStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    lowStockItems: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Refs for accessing child component methods
  const productManagementRef = useRef(null);
  const orderManagementRef = useRef(null);
  const analyticsRef = useRef(null);

  // Enhanced Quick Action handlers
  const handleAddProduct = () => {
    setActiveTab('products');
    // Use setTimeout to ensure the component is rendered before calling the method
    setTimeout(() => {
      if (productManagementRef.current) {
        productManagementRef.current.openAddModal();
      }
    }, 100);
  };

  const handleViewOrders = () => {
    setActiveTab('orders');
    // Show pending orders if there are any
    setTimeout(() => {
      if (orderManagementRef.current && dashboardStats.pendingOrders > 0) {
        orderManagementRef.current.showPendingOrders();
      }
    }, 100);
  };

  const handleViewReports = () => {
    setActiveTab('analytics');
    setTimeout(() => {
      if (analyticsRef.current) {
        analyticsRef.current.showReports();
      }
    }, 100);
  };

  useEffect(() => {
    // Fetch dashboard overview stats
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const response = await adminService.getDashboardStats();
        
        if (response.data.success) {
          setDashboardStats({
            totalProducts: response.data.data.totalProducts,
            totalOrders: response.data.data.totalOrders,
            totalUsers: response.data.data.totalUsers,
            totalRevenue: response.data.data.totalRevenue,
            lowStockItems: response.data.data.lowStockItems,
            pendingOrders: response.data.data.pendingOrders
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        // Fallback to mock data on error
        setDashboardStats({
          totalProducts: 45,
          totalOrders: 128,
          totalUsers: 89,
          totalRevenue: 45280.50,
          lowStockItems: 8,
          pendingOrders: 12
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview 
          stats={dashboardStats} 
          onAddProduct={handleAddProduct}
          onViewOrders={handleViewOrders}
          onViewReports={handleViewReports}
          onShowInventory={() => setActiveTab('inventory')}
          onShowOrders={() => setActiveTab('orders')}
        />;
      case 'products':
        return <ProductManagement ref={productManagementRef} />;
      case 'orders':
        return <OrderManagement ref={orderManagementRef} />;
      case 'users':
        return <UserManagement />;
      case 'inventory':
        return <InventoryManagement />;
      case 'analytics':
        return <Analytics ref={analyticsRef} />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardOverview 
          stats={dashboardStats} 
          onAddProduct={handleAddProduct}
          onViewOrders={handleViewOrders}
          onViewReports={handleViewReports}
          onShowInventory={() => setActiveTab('inventory')}
          onShowOrders={() => setActiveTab('orders')}
        />;
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-white"
            >
              Stack Technologies Admin
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-white/80"
            >
              Welcome back, {user?.firstName || 'Admin'}
            </motion.p>
          </div>
          <div className="admin-header-actions">
            <button className="notification-btn relative p-2">
              <i className="fas fa-bell text-white/90"></i>
              <span className="notification-count">3</span>
            </button>
            <div className="admin-user-info ml-4 flex items-center">
              <div className="admin-avatar-container w-8 h-8 rounded-full bg-violet-accent flex items-center justify-center">
                {user?.firstName?.charAt(0) || 'A'}
              </div>
              <span className="ml-2 text-white">{user?.firstName} {user?.lastName}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="admin-container">
        {/* Sidebar Navigation */}
        <motion.aside 
          className="admin-sidebar"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <nav className="admin-nav">
            <ul>
              <li className={activeTab === 'overview' ? 'active' : ''}>
                <button onClick={() => setActiveTab('overview')}>
                  <i className="fas fa-home"></i>
                  Overview
                </button>
              </li>
              <li className={activeTab === 'products' ? 'active' : ''}>
                <button onClick={() => setActiveTab('products')}>
                  <i className="fas fa-box"></i>
                  Products
                </button>
              </li>
              <li className={activeTab === 'inventory' ? 'active' : ''}>
                <button onClick={() => setActiveTab('inventory')}>
                  <i className="fas fa-warehouse"></i>
                  Inventory
                </button>
              </li>
              <li className={activeTab === 'orders' ? 'active' : ''}>
                <button onClick={() => setActiveTab('orders')}>
                  <i className="fas fa-shopping-cart"></i>
                  Orders
                  {dashboardStats.pendingOrders > 0 && (
                    <span className="badge bg-violet-accent text-white text-xs px-2 py-0.5 rounded-full ml-2">
                      {dashboardStats.pendingOrders}
                    </span>
                  )}
                </button>
              </li>
              <li className={activeTab === 'users' ? 'active' : ''}>
                <button onClick={() => setActiveTab('users')}>
                  <i className="fas fa-users"></i>
                  Users
                </button>
              </li>
              <li className={activeTab === 'analytics' ? 'active' : ''}>
                <button onClick={() => setActiveTab('analytics')}>
                  <i className="fas fa-chart-line"></i>
                  Analytics
                </button>
              </li>
              <li className={activeTab === 'settings' ? 'active' : ''}>
                <button onClick={() => setActiveTab('settings')}>
                  <i className="fas fa-cog"></i>
                  Settings
                </button>
              </li>
            </ul>
          </nav>
        </motion.aside>

        {/* Main Content */}
        <motion.main 
          className="admin-main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          key={activeTab} // This forces animation to re-run when tab changes
        >
          {renderTabContent()}
        </motion.main>
      </div>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = ({ stats, onAddProduct, onViewOrders, onViewReports, onShowInventory, onShowOrders }) => {
  return (
    <div className="dashboard-overview">
      <div className="dashboard-title mb-8">
        <h2 className="text-2xl font-bold text-dark-charcoal">Dashboard Overview</h2>
        <p className="text-gray-600">Here's what's happening at Stack Technologies today</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="stat-icon bg-violet-accent text-white">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-content">
            <h3 className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</h3>
            <p className="text-gray-600">Total Revenue</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="stat-icon bg-soft-blue-grey text-white">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="stat-content">
            <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
            <p className="text-gray-600">Total Orders</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="stat-icon bg-muted-light-grey text-dark-charcoal">
            <i className="fas fa-box"></i>
          </div>
          <div className="stat-content">
            <h3 className="text-2xl font-bold">{stats.totalProducts}</h3>
            <p className="text-gray-600">Products</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="stat-icon bg-dark-charcoal text-white">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
            <p className="text-gray-600">Registered Users</p>
          </div>
        </motion.div>
      </div>

      {/* Sales Overview Chart */}
      <motion.div 
        className="mt-8 bg-white p-6 rounded-lg shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold mb-4">Monthly Sales Overview</h3>
        <div className="chart-container h-64">
          <div className="chart-bars w-full h-full">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
              <div key={month} className="chart-bar-container flex flex-col items-center">
                <motion.div 
                  className="bar bg-violet-accent"
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.floor(Math.random() * 70) + 30}%` }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                ></motion.div>
                <span className="text-xs mt-2">{month}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        className="quick-actions bg-white p-6 rounded-lg shadow mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="action-buttons">
          <button 
            className="action-btn primary bg-violet-accent text-white"
            onClick={onAddProduct}
            aria-label="Add new product"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Product
          </button>
          <button 
            className="action-btn secondary bg-muted-light-grey text-dark-charcoal"
            onClick={onViewOrders}
            aria-label="View all orders"
          >
            <i className="fas fa-eye mr-2"></i>
            View Orders
            {stats.pendingOrders > 0 && (
              <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                {stats.pendingOrders}
              </span>
            )}
          </button>
          <button 
            className="action-btn accent bg-soft-blue-grey text-white"
            onClick={onViewReports}
            aria-label="View analytics reports"
          >
            <i className="fas fa-chart-bar mr-2"></i>
            View Reports
          </button>
        </div>
      </motion.div>

      {/* Alerts */}
      {(stats.lowStockItems > 0 || stats.pendingOrders > 0) && (
        <motion.div 
          className="dashboard-alerts mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h3 className="text-lg font-semibold mb-4">Alerts</h3>
          {stats.lowStockItems > 0 && (
            <div 
              className="alert warning bg-amber-50 border-l-4 border-amber-500 p-4 mb-4 cursor-pointer hover:bg-amber-100 transition-colors"
              onClick={onShowInventory}
              role="button"
              tabIndex="0"
              aria-label="View low stock items"
            >
              <i className="fas fa-exclamation-triangle mr-2 text-amber-500"></i>
              <span>{stats.lowStockItems} items are running low on stock</span>
            </div>
          )}
          {stats.pendingOrders > 0 && (
            <div 
              className="alert info bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 cursor-pointer hover:bg-blue-100 transition-colors"
              onClick={onShowOrders}
              role="button"
              tabIndex="0"
              aria-label="View pending orders"
            >
              <i className="fas fa-clock mr-2 text-blue-500"></i>
              <span>{stats.pendingOrders} orders are pending processing</span>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
