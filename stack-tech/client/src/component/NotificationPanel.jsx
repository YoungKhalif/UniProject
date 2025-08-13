import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from './NotificationSystem';
import './NotificationPanel.css';

const NotificationPanel = ({ isOpen, onClose }) => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearAll 
  } = useNotification();
  
  const [filter, setFilter] = useState('all'); // all, unread, read

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const groupNotificationsByDate = (notifications) => {
    const groups = {};
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    notifications.forEach(notif => {
      const notifDate = new Date(notif.timestamp);
      let groupKey;

      if (notifDate.toDateString() === today.toDateString()) {
        groupKey = 'Today';
      } else if (notifDate.toDateString() === yesterday.toDateString()) {
        groupKey = 'Yesterday';
      } else {
        groupKey = notifDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'short', 
          day: 'numeric' 
        });
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(notif);
    });

    return groups;
  };

  const groupedNotifications = groupNotificationsByDate(filteredNotifications);

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

  if (!isOpen) return null;

  return (
    <motion.div 
      className="notification-panel-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="notification-panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Panel Header */}
        <div className="notification-panel-header">
          <div className="header-left">
            <h2>Notifications</h2>
            {unreadCount > 0 && (
              <span className="unread-badge">{unreadCount}</span>
            )}
          </div>
          <div className="header-actions">
            {unreadCount > 0 && (
              <button 
                className="mark-all-read-btn"
                onClick={markAllAsRead}
                title="Mark all as read"
              >
                <i className="fas fa-check-double"></i>
              </button>
            )}
            {notifications.length > 0 && (
              <button 
                className="clear-all-btn"
                onClick={clearAll}
                title="Clear all notifications"
              >
                <i className="fas fa-trash"></i>
              </button>
            )}
            <button 
              className="close-panel-btn"
              onClick={onClose}
              title="Close panel"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="notification-filters">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({notifications.length})
          </button>
          <button 
            className={`filter-tab ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </button>
          <button 
            className={`filter-tab ${filter === 'read' ? 'active' : ''}`}
            onClick={() => setFilter('read')}
          >
            Read ({notifications.length - unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        <div className="notification-panel-content">
          {filteredNotifications.length === 0 ? (
            <div className="empty-notifications">
              <i className="fas fa-bell-slash"></i>
              <h3>No notifications</h3>
              <p>
                {filter === 'all' 
                  ? "You're all caught up! No notifications to show."
                  : filter === 'unread'
                  ? "No unread notifications."
                  : "No read notifications."
                }
              </p>
            </div>
          ) : (
            <div className="notifications-list">
              {Object.entries(groupedNotifications).map(([date, notifs]) => (
                <div key={date} className="notification-group">
                  <h3 className="group-date">{date}</h3>
                  <AnimatePresence>
                    {notifs.map((notification) => (
                      <motion.div
                        key={notification.id}
                        className={`notification-item ${notification.type} ${notification.read ? 'read' : 'unread'}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="notification-icon">
                          <i className={getNotificationIcon(notification.type)}></i>
                        </div>
                        
                        <div className="notification-content">
                          <div className="notification-header">
                            <h4 className="notification-title">{notification.title}</h4>
                            <span className="notification-time">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
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
                              onClick={() => markAsRead(notification.id)}
                              title="Mark as read"
                            >
                              <i className="fas fa-check"></i>
                            </button>
                          )}
                          <button
                            className="close-btn"
                            onClick={() => removeNotification(notification.id)}
                            title="Remove notification"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NotificationPanel;
