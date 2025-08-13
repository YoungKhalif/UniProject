import React, { useState } from 'react';
import { useNotification } from '../component/NotificationSystem';
import EmailSystem from '../component/EmailSystem';
import notificationService from '../services/notificationService';
import emailTemplateService from '../services/emailTemplateService';
import './NotificationDemo.css';

const NotificationDemo = () => {
  const { addNotification } = useNotification();
  const [showEmailSystem, setShowEmailSystem] = useState(false);

  // Demo functions for testing notifications
  const showSuccessNotification = () => {
    addNotification({
      id: Date.now().toString(),
      type: 'success',
      title: 'Order Confirmed',
      message: 'Your order #12345 has been successfully placed and confirmed.',
      timestamp: new Date(),
      category: 'order',
      priority: 'normal'
    });
  };

  const showErrorNotification = () => {
    addNotification({
      id: Date.now().toString(),
      type: 'error',
      title: 'Payment Failed',
      message: 'We encountered an issue processing your payment. Please try again.',
      timestamp: new Date(),
      category: 'payment',
      priority: 'high'
    });
  };

  const showWarningNotification = () => {
    addNotification({
      id: Date.now().toString(),
      type: 'warning',
      title: 'Low Stock Alert',
      message: 'NVIDIA RTX 4090 GPU is running low in stock. Only 3 items remaining.',
      timestamp: new Date(),
      category: 'inventory',
      priority: 'medium'
    });
  };

  const showInfoNotification = () => {
    addNotification({
      id: Date.now().toString(),
      type: 'info',
      title: 'New Feature Available',
      message: 'Check out our new PC configuration wizard with AI recommendations.',
      timestamp: new Date(),
      category: 'system',
      priority: 'normal'
    });
  };

  const showOrderUpdateNotification = () => {
    const notification = notificationService.createOrderUpdateNotification(
      'ORD-789',
      'shipped',
      { carrier: 'FedEx', trackingNumber: 'FDX123456789' }
    );
    addNotification(notification);
  };

  const showSystemMaintenanceNotification = () => {
    const notification = notificationService.createSystemMaintenanceNotification(
      new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      '2 hours'
    );
    addNotification(notification);
  };

  const showInventoryAlertNotification = () => {
    const notification = notificationService.createInventoryAlertNotification(
      'NVIDIA RTX 4090 GPU',
      5,
      10
    );
    addNotification(notification);
  };

  const previewEmailTemplate = (templateId) => {
    try {
      const sampleData = emailTemplateService.getSampleVariables(templateId);
      const html = emailTemplateService.renderTemplate(templateId, sampleData);
      
      // Open preview in new window
      const previewWindow = window.open('', '_blank');
      previewWindow.document.write(html);
      previewWindow.document.close();
      
      addNotification({
        id: Date.now().toString(),
        type: 'info',
        title: 'Email Preview',
        message: `Opened preview for ${templateId} template in new window.`,
        timestamp: new Date(),
        category: 'system',
        priority: 'normal'
      });
    } catch (error) {
      addNotification({
        id: Date.now().toString(),
        type: 'error',
        title: 'Preview Error',
        message: `Failed to preview ${templateId} template: ${error.message}`,
        timestamp: new Date(),
        category: 'system',
        priority: 'normal'
      });
    }
  };

  return (
    <div className="notification-demo">
      <div className="demo-container">
        <h1 className="demo-title">Stack Technologies Notification & Email System Demo</h1>
        
        <div className="demo-section">
          <h2 className="section-title">Toast Notifications</h2>
          <p className="section-description">
            Test different types of toast notifications that appear temporarily and auto-dismiss.
          </p>
          
          <div className="button-grid">
            <button 
              className="demo-button demo-button--success"
              onClick={showSuccessNotification}
            >
              Show Success
            </button>
            
            <button 
              className="demo-button demo-button--error"
              onClick={showErrorNotification}
            >
              Show Error
            </button>
            
            <button 
              className="demo-button demo-button--warning"
              onClick={showWarningNotification}
            >
              Show Warning
            </button>
            
            <button 
              className="demo-button demo-button--info"
              onClick={showInfoNotification}
            >
              Show Info
            </button>
          </div>
        </div>

        <div className="demo-section">
          <h2 className="section-title">Predefined Notifications</h2>
          <p className="section-description">
            Test notifications created with the notification service for common scenarios.
          </p>
          
          <div className="button-grid">
            <button 
              className="demo-button demo-button--primary"
              onClick={showOrderUpdateNotification}
            >
              Order Update
            </button>
            
            <button 
              className="demo-button demo-button--secondary"
              onClick={showSystemMaintenanceNotification}
            >
              System Maintenance
            </button>
            
            <button 
              className="demo-button demo-button--warning"
              onClick={showInventoryAlertNotification}
            >
              Inventory Alert
            </button>
          </div>
        </div>

        <div className="demo-section">
          <h2 className="section-title">Email Templates</h2>
          <p className="section-description">
            Preview email templates with sample data. Templates open in a new window.
          </p>
          
          <div className="button-grid">
            <button 
              className="demo-button demo-button--email"
              onClick={() => previewEmailTemplate('orderConfirmation')}
            >
              Order Confirmation
            </button>
            
            <button 
              className="demo-button demo-button--email"
              onClick={() => previewEmailTemplate('shippingNotification')}
            >
              Shipping Notification
            </button>
            
            <button 
              className="demo-button demo-button--email"
              onClick={() => previewEmailTemplate('lowStockAlert')}
            >
              Low Stock Alert
            </button>
            
            <button 
              className="demo-button demo-button--email"
              onClick={() => previewEmailTemplate('welcomeEmail')}
            >
              Welcome Email
            </button>
            
            <button 
              className="demo-button demo-button--email"
              onClick={() => previewEmailTemplate('deliveryConfirmation')}
            >
              Delivery Confirmation
            </button>
          </div>
        </div>

        <div className="demo-section">
          <h2 className="section-title">Email System</h2>
          <p className="section-description">
            Access the full email management interface with composition and template support.
          </p>
          
          <button 
            className="demo-button demo-button--large demo-button--primary"
            onClick={() => setShowEmailSystem(true)}
          >
            Open Email System
          </button>
        </div>

        <div className="demo-info">
          <h3>How to Use:</h3>
          <ul>
            <li>Click the notification bell in the header to view all notifications</li>
            <li>Toast notifications appear in the top-right corner and auto-dismiss</li>
            <li>Email templates include variable substitution and validation</li>
            <li>All components use Stack Technologies brand colors</li>
          </ul>
        </div>
      </div>

      {showEmailSystem && (
        <EmailSystem onClose={() => setShowEmailSystem(false)} />
      )}
    </div>
  );
};

export default NotificationDemo;
