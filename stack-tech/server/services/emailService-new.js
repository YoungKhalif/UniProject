// Email Service for Stack Technologies
const nodemailer = require('nodemailer');
const emailTemplateService = require('./emailTemplateService');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });

    // Verify connection configuration
    this.transporter.verify((error, success) => {
      if (error) {
        console.error('Email service error:', error);
      } else {
        console.log('✅ Email server is ready to send messages');
      }
    });
  }

  // Send a single email
  async sendEmail(to, subject, html, text) {
    try {
      const mailOptions = {
        from: `"Stack Technologies" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
        text
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('📧 Email sent successfully:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Error sending email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send welcome email with verification link
  async sendWelcomeEmail(user, verificationToken) {
    try {
      const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
      const template = emailTemplateService.welcomeEmail({
        name: user.firstName || user.username,
        verificationLink
      });

      return await this.sendEmail(user.email, template.subject, template.html, template.text);
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send email verification success
  async sendEmailVerificationSuccess(user) {
    try {
      const template = emailTemplateService.emailVerificationSuccess({
        name: user.firstName || user.username
      });

      return await this.sendEmail(user.email, template.subject, template.html);
    } catch (error) {
      console.error('Error sending verification success email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send order confirmation
  async sendOrderConfirmation(order, user, orderItems) {
    try {
      const template = emailTemplateService.orderConfirmation({
        customerName: user.firstName || user.username,
        orderNumber: order.id.slice(-8).toUpperCase(),
        orderDate: new Date(order.createdAt).toLocaleDateString(),
        orderTotal: order.totalAmount,
        orderItems: this.formatOrderItems(orderItems),
        estimatedDelivery: this.getEstimatedDelivery()
      });

      return await this.sendEmail(user.email, template.subject, template.html);
    } catch (error) {
      console.error('Error sending order confirmation:', error);
      return { success: false, error: error.message };
    }
  }

  // Send shipping notification
  async sendShippingNotification(order, user, trackingInfo) {
    try {
      const template = emailTemplateService.shippingNotification({
        customerName: user.firstName || user.username,
        orderNumber: order.id.slice(-8).toUpperCase(),
        trackingNumber: trackingInfo.trackingNumber,
        carrier: trackingInfo.carrier,
        estimatedDelivery: trackingInfo.estimatedDelivery
      });

      return await this.sendEmail(user.email, template.subject, template.html);
    } catch (error) {
      console.error('Error sending shipping notification:', error);
      return { success: false, error: error.message };
    }
  }

  // Send password reset email
  async sendPasswordResetEmail(user, resetToken) {
    try {
      const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
      const template = emailTemplateService.passwordReset({
        name: user.firstName || user.username,
        resetLink
      });

      return await this.sendEmail(user.email, template.subject, template.html);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send payment confirmation
  async sendPaymentConfirmation(order, user, paymentDetails) {
    try {
      const template = emailTemplateService.paymentConfirmation({
        customerName: user.firstName || user.username,
        orderNumber: order.id.slice(-8).toUpperCase(),
        paymentAmount: order.totalAmount,
        paymentMethod: paymentDetails.method,
        transactionId: paymentDetails.transactionId
      });

      return await this.sendEmail(user.email, template.subject, template.html);
    } catch (error) {
      console.error('Error sending payment confirmation:', error);
      return { success: false, error: error.message };
    }
  }

  // Helper: Format order items for email
  formatOrderItems(orderItems) {
    return orderItems.map(item => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">
          <strong>${item.Product.name}</strong>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">
          $${parseFloat(item.price).toFixed(2)}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">
          $${(item.quantity * parseFloat(item.price)).toFixed(2)}
        </td>
      </tr>
    `).join('');
  }

  // Helper: Get estimated delivery date (5 business days)
  getEstimatedDelivery() {
    const date = new Date();
    let businessDays = 5;
    while (businessDays > 0) {
      date.setDate(date.getDate() + 1);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        businessDays--;
      }
    }
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }
}

// Create singleton instance
const emailService = new EmailService();
module.exports = emailService;
