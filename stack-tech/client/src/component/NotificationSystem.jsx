import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './NotificationSystem.css';

// Notification Context
const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// Notification Provider
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      timestamp: new Date(),
      read: false,
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);

    // Auto-remove notification after specified duration
    if (notification.autoRemove !== false) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration || 5000);
    }

    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      markAsRead,
      markAllAsRead,
      clearAll,
      unreadCount
    }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

// Individual Notification Component
const NotificationItem = ({ notification, onRemove, onMarkAsRead }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return 'fas fa-check-circle';
      case 'error': return 'fas fa-exclamation-circle';
      case 'warning': return 'fas fa-exclamation-triangle';
      case 'info': return 'fas fa-info-circle';
      case 'order': return 'fas fa-shopping-cart';
      case 'inventory': return 'fas fa-boxes';
      case 'user': return 'fas fa-user';
      case 'system': return 'fas fa-cog';
      default: return 'fas fa-bell';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <motion.div
      className={`notification-item ${notification.type} ${notification.read ? 'read' : 'unread'}`}
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="notification-icon">
        <i className={getNotificationIcon(notification.type)}></i>
      </div>
      
      <div className="notification-content">
        <div className="notification-header">
          <h4 className="notification-title">{notification.title}</h4>
          <span className="notification-time">{formatTimeAgo(notification.timestamp)}</span>
        </div>
        <p className="notification-message">{notification.message}</p>
        
        {notification.actions && (
          <div className="notification-actions">
            {notification.actions.map((action, index) => (
              <button
                key={index}
                className={`notification-action-btn ${action.style || 'primary'}`}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="notification-controls">
        {!notification.read && (
          <button
            className="mark-read-btn"
            onClick={() => onMarkAsRead(notification.id)}
            title="Mark as read"
          >
            <i className="fas fa-check"></i>
          </button>
        )}
        <button
          className="close-btn"
          onClick={() => onRemove(notification.id)}
          title="Dismiss"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </motion.div>
  );
};

// Toast Notification Component (for temporary notifications)
const ToastNotification = ({ notification, onRemove }) => {
  return (
    <motion.div
      className={`toast-notification ${notification.type}`}
      initial={{ opacity: 0, y: -50, x: 300 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -50, x: 300 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
    >
      <div className="toast-icon">
        <i className={`fas ${
          notification.type === 'success' ? 'fa-check-circle' :
          notification.type === 'error' ? 'fa-exclamation-circle' :
          notification.type === 'warning' ? 'fa-exclamation-triangle' :
          'fa-info-circle'
        }`}></i>
      </div>
      
      <div className="toast-content">
        <h4>{notification.title}</h4>
        <p>{notification.message}</p>
      </div>

      <button
        className="toast-close-btn"
        onClick={() => onRemove(notification.id)}
      >
        <i className="fas fa-times"></i>
      </button>
    </motion.div>
  );
};

// Notification Container
const NotificationContainer = () => {
  const { notifications, removeNotification, markAsRead } = useNotification();
  const [showToasts, setShowToasts] = useState(true);

  const toastNotifications = notifications.filter(notif => notif.isToast);

  return (
    <>
      {/* Toast Notifications */}
      {showToasts && (
        <div className="toast-container">
          <AnimatePresence>
            {toastNotifications.slice(0, 3).map(notification => (
              <ToastNotification
                key={notification.id}
                notification={notification}
                onRemove={removeNotification}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

// Rename the default export to match the component name
export default NotificationProvider;
