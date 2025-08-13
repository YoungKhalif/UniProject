import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from './NotificationSystem';
import './EmailSystem.css';

const EmailSystem = () => {
  const { addNotification } = useNotification();
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCompose, setShowCompose] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filter, setFilter] = useState('all'); // all, unread, sent, drafts
  
  const [composeEmail, setComposeEmail] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: '',
    priority: 'normal',
    template: 'none'
  });

  // Email templates
  const emailTemplates = {
    orderConfirmation: {
      subject: 'Order Confirmation - #{orderNumber}',
      body: `Dear {customerName},

Thank you for your order! We're excited to confirm that we've received your order and it's being processed.

Order Details:
Order Number: #{orderNumber}
Order Date: {orderDate}
Total Amount: ${orderTotal}

Items Ordered:
{orderItems}

Estimated Delivery: {estimatedDelivery}

We'll send you another email with tracking information once your order ships.

Thank you for choosing Stack Technologies!

Best regards,
The Stack Technologies Team`
    },
    orderShipped: {
      subject: 'Your Order Has Shipped - #{orderNumber}',
      body: `Dear {customerName},

Great news! Your order has been shipped and is on its way to you.

Order Number: #{orderNumber}
Tracking Number: {trackingNumber}
Carrier: {carrier}
Estimated Delivery: {estimatedDelivery}

You can track your package at: {trackingLink}

If you have any questions, please don't hesitate to contact us.

Best regards,
The Stack Technologies Team`
    },
    lowStock: {
      subject: 'Low Stock Alert - {productName}',
      body: `Dear Team,

This is an automated alert to inform you that the following product is running low on stock:

Product: {productName}
SKU: {productSku}
Current Stock: {currentStock}
Minimum Stock Level: {minStockLevel}

Please restock this item as soon as possible to avoid stockouts.

Regards,
Stack Technologies Inventory System`
    },
    welcome: {
      subject: 'Welcome to Stack Technologies!',
      body: `Dear {customerName},

Welcome to Stack Technologies! We're thrilled to have you as part of our community.

Your account has been successfully created and you can now:
• Browse our extensive catalog of PC components
• Create custom builds with our configurator
• Track your orders and shipments
• Access exclusive member deals

If you have any questions or need assistance, our support team is here to help.

Welcome aboard!

Best regards,
The Stack Technologies Team`
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockEmails = [
        {
          id: 'email-001',
          from: 'orders@stacktech.com',
          to: 'john.doe@email.com',
          subject: 'Order Confirmation - #ST-2024-001',
          body: 'Thank you for your order! Your order #ST-2024-001 has been confirmed...',
          timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          read: false,
          type: 'sent',
          priority: 'normal',
          category: 'order'
        },
        {
          id: 'email-002',
          from: 'support@stacktech.com',
          to: 'jane.smith@email.com',
          subject: 'Welcome to Stack Technologies!',
          body: 'Welcome to Stack Technologies! We\'re thrilled to have you...',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          read: true,
          type: 'sent',
          priority: 'normal',
          category: 'welcome'
        },
        {
          id: 'email-003',
          from: 'inventory@stacktech.com',
          to: 'admin@stacktech.com',
          subject: 'Low Stock Alert - Intel Core i7-13700K',
          body: 'This is an automated alert to inform you that Intel Core i7-13700K is running low...',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
          read: false,
          type: 'received',
          priority: 'high',
          category: 'alert'
        }
      ];
      setEmails(mockEmails);
      setLoading(false);
    }, 1000);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    
    try {
      const newEmail = {
        id: `email-${Date.now()}`,
        from: 'system@stacktech.com',
        to: composeEmail.to,
        cc: composeEmail.cc,
        bcc: composeEmail.bcc,
        subject: composeEmail.subject,
        body: composeEmail.body,
        timestamp: new Date(),
        read: true,
        type: 'sent',
        priority: composeEmail.priority,
        category: 'manual'
      };

      setEmails(prev => [newEmail, ...prev]);
      setShowCompose(false);
      setComposeEmail({
        to: '',
        cc: '',
        bcc: '',
        subject: '',
        body: '',
        priority: 'normal',
        template: 'none'
      });

      addNotification({
        type: 'success',
        title: 'Email Sent',
        message: `Email sent successfully to ${composeEmail.to}`,
        isToast: true
      });

    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Email Failed',
        message: 'Failed to send email. Please try again.',
        isToast: true
      });
    }
  };

  const handleTemplateSelect = (templateKey) => {
    if (templateKey === 'none') {
      setComposeEmail(prev => ({
        ...prev,
        subject: '',
        body: '',
        template: 'none'
      }));
      return;
    }

    const template = emailTemplates[templateKey];
    setComposeEmail(prev => ({
      ...prev,
      subject: template.subject,
      body: template.body,
      template: templateKey
    }));
  };

  const markAsRead = (emailId) => {
    setEmails(prev => 
      prev.map(email => 
        email.id === emailId ? { ...email, read: true } : email
      )
    );
  };

  const deleteEmail = (emailId) => {
    setEmails(prev => prev.filter(email => email.id !== emailId));
    if (selectedEmail?.id === emailId) {
      setSelectedEmail(null);
    }
  };

  const filteredEmails = emails.filter(email => {
    if (filter === 'unread') return !email.read;
    if (filter === 'sent') return email.type === 'sent';
    if (filter === 'drafts') return email.type === 'draft';
    return true;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'order': return 'fas fa-shopping-cart';
      case 'welcome': return 'fas fa-hand-wave';
      case 'alert': return 'fas fa-exclamation-triangle';
      case 'support': return 'fas fa-headset';
      case 'newsletter': return 'fas fa-newspaper';
      default: return 'fas fa-envelope';
    }
  };

  if (loading) {
    return (
      <div className="email-loading">
        <div className="loading-spinner"></div>
        <p>Loading emails...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="email-system"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Email System Header */}
      <div className="email-header">
        <div>
          <h2>Email System</h2>
          <p>Manage email communications and templates</p>
        </div>
        <motion.button
          className="btn-primary compose-btn"
          onClick={() => setShowCompose(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className="fas fa-plus"></i>
          Compose Email
        </motion.button>
      </div>

      {/* Email Statistics */}
      <div className="email-stats">
        <div className="stat-card">
          <div className="stat-value">{emails.length}</div>
          <div className="stat-label">Total Emails</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{emails.filter(e => !e.read).length}</div>
          <div className="stat-label">Unread</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{emails.filter(e => e.type === 'sent').length}</div>
          <div className="stat-label">Sent</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{emails.filter(e => e.priority === 'high').length}</div>
          <div className="stat-label">High Priority</div>
        </div>
      </div>

      <div className="email-content">
        {/* Email Sidebar */}
        <div className="email-sidebar">
          <div className="email-filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              <i className="fas fa-inbox"></i>
              All Emails ({emails.length})
            </button>
            <button 
              className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
              onClick={() => setFilter('unread')}
            >
              <i className="fas fa-envelope"></i>
              Unread ({emails.filter(e => !e.read).length})
            </button>
            <button 
              className={`filter-btn ${filter === 'sent' ? 'active' : ''}`}
              onClick={() => setFilter('sent')}
            >
              <i className="fas fa-paper-plane"></i>
              Sent ({emails.filter(e => e.type === 'sent').length})
            </button>
          </div>
        </div>

        {/* Email List */}
        <div className="email-list">
          {filteredEmails.length === 0 ? (
            <div className="empty-emails">
              <i className="fas fa-inbox"></i>
              <h3>No emails found</h3>
              <p>No emails match your current filter.</p>
            </div>
          ) : (
            <AnimatePresence>
              {filteredEmails.map(email => (
                <motion.div
                  key={email.id}
                  className={`email-item ${email.read ? 'read' : 'unread'}`}
                  onClick={() => {
                    setSelectedEmail(email);
                    if (!email.read) markAsRead(email.id);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="email-item-header">
                    <div className="email-from">
                      <i className={getCategoryIcon(email.category)}></i>
                      <span>{email.from}</span>
                    </div>
                    <div className="email-meta">
                      <span 
                        className="priority-indicator"
                        style={{ color: getPriorityColor(email.priority) }}
                      >
                        <i className="fas fa-circle"></i>
                      </span>
                      <span className="email-time">
                        {new Date(email.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="email-subject">{email.subject}</div>
                  <div className="email-preview">{email.body.substring(0, 100)}...</div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Email Detail */}
        {selectedEmail && (
          <motion.div 
            className="email-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="email-detail-header">
              <div className="email-detail-meta">
                <h3>{selectedEmail.subject}</h3>
                <div className="email-addresses">
                  <div><strong>From:</strong> {selectedEmail.from}</div>
                  <div><strong>To:</strong> {selectedEmail.to}</div>
                  {selectedEmail.cc && <div><strong>CC:</strong> {selectedEmail.cc}</div>}
                </div>
                <div className="email-timestamp">
                  {new Date(selectedEmail.timestamp).toLocaleString()}
                </div>
              </div>
              <div className="email-actions">
                <button
                  className="btn-icon"
                  onClick={() => deleteEmail(selectedEmail.id)}
                  title="Delete email"
                >
                  <i className="fas fa-trash"></i>
                </button>
                <button
                  className="btn-icon"
                  onClick={() => setSelectedEmail(null)}
                  title="Close"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
            <div className="email-body">
              <pre>{selectedEmail.body}</pre>
            </div>
          </motion.div>
        )}
      </div>

      {/* Compose Email Modal */}
      {showCompose && (
        <div className="modal-overlay" onClick={() => setShowCompose(false)}>
          <motion.div 
            className="compose-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="modal-header">
              <h3>Compose Email</h3>
              <button 
                className="close-btn"
                onClick={() => setShowCompose(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSendEmail} className="compose-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Template</label>
                  <select
                    value={composeEmail.template}
                    onChange={(e) => handleTemplateSelect(e.target.value)}
                  >
                    <option value="none">None</option>
                    <option value="orderConfirmation">Order Confirmation</option>
                    <option value="orderShipped">Order Shipped</option>
                    <option value="lowStock">Low Stock Alert</option>
                    <option value="welcome">Welcome Email</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={composeEmail.priority}
                    onChange={(e) => setComposeEmail(prev => ({...prev, priority: e.target.value}))}
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>To *</label>
                <input
                  type="email"
                  required
                  value={composeEmail.to}
                  onChange={(e) => setComposeEmail(prev => ({...prev, to: e.target.value}))}
                  placeholder="recipient@example.com"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>CC</label>
                  <input
                    type="email"
                    value={composeEmail.cc}
                    onChange={(e) => setComposeEmail(prev => ({...prev, cc: e.target.value}))}
                    placeholder="cc@example.com"
                  />
                </div>
                <div className="form-group">
                  <label>BCC</label>
                  <input
                    type="email"
                    value={composeEmail.bcc}
                    onChange={(e) => setComposeEmail(prev => ({...prev, bcc: e.target.value}))}
                    placeholder="bcc@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Subject *</label>
                <input
                  type="text"
                  required
                  value={composeEmail.subject}
                  onChange={(e) => setComposeEmail(prev => ({...prev, subject: e.target.value}))}
                  placeholder="Email subject"
                />
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  required
                  rows="12"
                  value={composeEmail.body}
                  onChange={(e) => setComposeEmail(prev => ({...prev, body: e.target.value}))}
                  placeholder="Email message..."
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowCompose(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <i className="fas fa-paper-plane"></i>
                  Send Email
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default EmailSystem;
