// Notification Service - Stack Technologies
import { useNotification } from '../component/NotificationSystem';

class NotificationService {
  constructor() {
    this.addNotification = null;
  }

  // Initialize with the notification context
  init(addNotificationFn) {
    this.addNotification = addNotificationFn;
  }

  // Order-related notifications
  orderConfirmed(orderData) {
    return this.addNotification({
      type: 'order',
      title: 'Order Confirmed',
      message: `Order #${orderData.orderNumber} has been confirmed for ${orderData.customerName}`,
      isToast: true,
      actions: [
        {
          label: 'View Order',
          style: 'primary',
          onClick: () => window.location.href = `/admin/orders/${orderData.id}`
        }
      ]
    });
  }

  orderShipped(orderData) {
    return this.addNotification({
      type: 'order',
      title: 'Order Shipped',
      message: `Order #${orderData.orderNumber} has been shipped to ${orderData.customerName}`,
      isToast: true,
      actions: [
        {
          label: 'View Tracking',
          style: 'primary',
          onClick: () => window.open(orderData.trackingUrl, '_blank')
        }
      ]
    });
  }

  orderDelivered(orderData) {
    return this.addNotification({
      type: 'success',
      title: 'Order Delivered',
      message: `Order #${orderData.orderNumber} has been successfully delivered`,
      isToast: true,
      actions: [
        {
          label: 'Send Feedback Request',
          style: 'primary',
          onClick: () => this.sendFeedbackRequest(orderData)
        }
      ]
    });
  }

  // Inventory-related notifications
  lowStockAlert(productData) {
    return this.addNotification({
      type: 'warning',
      title: 'Low Stock Alert',
      message: `${productData.name} is running low (${productData.currentStock} left)`,
      autoRemove: false,
      actions: [
        {
          label: 'Restock Now',
          style: 'primary',
          onClick: () => window.location.href = `/admin/inventory?restock=${productData.id}`
        },
        {
          label: 'View Product',
          style: 'secondary',
          onClick: () => window.location.href = `/admin/products/${productData.id}`
        }
      ]
    });
  }

  outOfStockAlert(productData) {
    return this.addNotification({
      type: 'error',
      title: 'Out of Stock',
      message: `${productData.name} is now out of stock`,
      autoRemove: false,
      actions: [
        {
          label: 'Urgent Restock',
          style: 'danger',
          onClick: () => window.location.href = `/admin/inventory?urgent=${productData.id}`
        }
      ]
    });
  }

  stockRestocked(productData) {
    return this.addNotification({
      type: 'success',
      title: 'Stock Restocked',
      message: `${productData.name} has been restocked (${productData.newStock} units added)`,
      isToast: true
    });
  }

  // User-related notifications
  newUserRegistered(userData) {
    return this.addNotification({
      type: 'user',
      title: 'New User Registered',
      message: `${userData.name} (${userData.email}) has created an account`,
      actions: [
        {
          label: 'View Profile',
          style: 'primary',
          onClick: () => window.location.href = `/admin/users/${userData.id}`
        },
        {
          label: 'Send Welcome Email',
          style: 'secondary',
          onClick: () => this.sendWelcomeEmail(userData)
        }
      ]
    });
  }

  userAccountSuspended(userData) {
    return this.addNotification({
      type: 'warning',
      title: 'User Account Suspended',
      message: `Account for ${userData.name} has been suspended`,
      actions: [
        {
          label: 'Review Account',
          style: 'primary',
          onClick: () => window.location.href = `/admin/users/${userData.id}`
        }
      ]
    });
  }

  // System notifications
  systemMaintenanceScheduled(maintenanceData) {
    return this.addNotification({
      type: 'system',
      title: 'Maintenance Scheduled',
      message: `System maintenance scheduled for ${maintenanceData.date} at ${maintenanceData.time}`,
      autoRemove: false,
      actions: [
        {
          label: 'View Details',
          style: 'primary',
          onClick: () => window.location.href = '/admin/maintenance'
        }
      ]
    });
  }

  systemBackupCompleted() {
    return this.addNotification({
      type: 'success',
      title: 'Backup Completed',
      message: 'System backup has been completed successfully',
      isToast: true
    });
  }

  systemError(errorData) {
    return this.addNotification({
      type: 'error',
      title: 'System Error',
      message: `System error: ${errorData.message}`,
      autoRemove: false,
      actions: [
        {
          label: 'View Logs',
          style: 'danger',
          onClick: () => window.location.href = '/admin/logs'
        },
        {
          label: 'Contact Support',
          style: 'secondary',
          onClick: () => window.location.href = '/admin/support'
        }
      ]
    });
  }

  // Payment notifications
  paymentReceived(paymentData) {
    return this.addNotification({
      type: 'success',
      title: 'Payment Received',
      message: `Payment of $${paymentData.amount} received for order #${paymentData.orderNumber}`,
      isToast: true,
      actions: [
        {
          label: 'View Order',
          style: 'primary',
          onClick: () => window.location.href = `/admin/orders/${paymentData.orderId}`
        }
      ]
    });
  }

  paymentFailed(paymentData) {
    return this.addNotification({
      type: 'error',
      title: 'Payment Failed',
      message: `Payment failed for order #${paymentData.orderNumber}: ${paymentData.reason}`,
      autoRemove: false,
      actions: [
        {
          label: 'Retry Payment',
          style: 'danger',
          onClick: () => window.location.href = `/admin/orders/${paymentData.orderId}/payment`
        },
        {
          label: 'Contact Customer',
          style: 'secondary',
          onClick: () => this.contactCustomer(paymentData.customerEmail)
        }
      ]
    });
  }

  // Review notifications
  newReviewReceived(reviewData) {
    return this.addNotification({
      type: 'info',
      title: 'New Review',
      message: `${reviewData.customerName} left a ${reviewData.rating}-star review for ${reviewData.productName}`,
      actions: [
        {
          label: 'View Review',
          style: 'primary',
          onClick: () => window.location.href = `/admin/reviews/${reviewData.id}`
        },
        {
          label: 'Respond',
          style: 'secondary',
          onClick: () => window.location.href = `/admin/reviews/${reviewData.id}/respond`
        }
      ]
    });
  }

  // Custom notification
  custom(notificationData) {
    return this.addNotification(notificationData);
  }

  // Success helper
  success(title, message, options = {}) {
    return this.addNotification({
      type: 'success',
      title,
      message,
      isToast: true,
      ...options
    });
  }

  // Error helper
  error(title, message, options = {}) {
    return this.addNotification({
      type: 'error',
      title,
      message,
      autoRemove: false,
      ...options
    });
  }

  // Warning helper
  warning(title, message, options = {}) {
    return this.addNotification({
      type: 'warning',
      title,
      message,
      ...options
    });
  }

  // Info helper
  info(title, message, options = {}) {
    return this.addNotification({
      type: 'info',
      title,
      message,
      ...options
    });
  }

  // Helper methods for actions
  async sendWelcomeEmail(userData) {
    try {
      // Send welcome email logic here
      this.success('Welcome Email Sent', `Welcome email sent to ${userData.email}`);
    } catch (err) {
      console.error('Failed to send welcome email:', err);
      this.error('Email Failed', 'Failed to send welcome email');
    }
  }

  async sendFeedbackRequest(orderData) {
    try {
      // Send feedback request logic here
      this.success('Feedback Request Sent', `Feedback request sent for order #${orderData.orderNumber}`);
    } catch (err) {
      console.error('Failed to send feedback request:', err);
      this.error('Email Failed', 'Failed to send feedback request');
    }
  }

  contactCustomer(email) {
    // Open email client or compose modal
    window.location.href = `mailto:${email}`;
  }
}

// Create and export a singleton instance
const notificationService = new NotificationService();

// Hook to use the notification service
export const useNotificationService = () => {
  const { addNotification } = useNotification();
  
  // Initialize the service with the current context
  if (addNotification && !notificationService.addNotification) {
    notificationService.init(addNotification);
  }

  return notificationService;
};

// Create a singleton instance
const notificationServiceInstance = new NotificationService();

// Export both as default and named export
export { notificationServiceInstance as notificationService };
export default notificationServiceInstance;
