import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNotification } from './NotificationSystem';
import NotificationPanel from './NotificationPanel';
import './NotificationButton.css';

const NotificationButton = () => {
  const { unreadCount } = useNotification();
  const [showPanel, setShowPanel] = useState(false);

  return (
    <>
      <motion.button
        className="notification-button"
        onClick={() => setShowPanel(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={`${unreadCount} unread notifications`}
      >
        <i className="fas fa-bell"></i>
        {unreadCount > 0 && (
          <motion.span 
            className="notification-count"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </motion.span>
        )}
        {unreadCount > 0 && (
          <motion.div
            className="notification-pulse"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 0.3, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.button>

      <NotificationPanel 
        isOpen={showPanel} 
        onClose={() => setShowPanel(false)} 
      />
    </>
  );
};

export default NotificationButton;
