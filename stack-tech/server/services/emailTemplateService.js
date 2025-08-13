// Server-side Email Template Service
class EmailTemplateService {
  // Welcome email template
  welcomeEmail(data) {
    const { name, verificationLink } = data;
    return {
      subject: 'Welcome to Stack Technologies! 🚀',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Stack Technologies</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ACBDBA, #A599B5); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .button { display: inline-block; background: #A599B5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { background: #2E2F2F; color: white; padding: 20px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Stack Technologies!</h1>
            </div>
            <div class="content">
              <h2>Hello ${name}!</h2>
              <p>Thank you for joining Stack Technologies, your premier destination for custom-built PCs and cutting-edge technology solutions.</p>
              <p>To get started, please verify your email address by clicking the button below:</p>
              <a href="${verificationLink}" class="button">Verify Email Address</a>
              <p>Once verified, you'll have access to:</p>
              <ul>
                <li>Custom PC configurator</li>
                <li>Pre-built gaming systems</li>
                <li>Exclusive member discounts</li>
                <li>Priority customer support</li>
              </ul>
              <p>If you didn't create an account, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 Stack Technologies. All rights reserved.</p>
              <p>Contact us: support@stacktechnologies.com | 1-800-STACK-PC</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Welcome to Stack Technologies! Please verify your email by visiting: ${verificationLink}`
    };
  }

  // Email verification success
  emailVerificationSuccess(data) {
    const { name } = data;
    return {
      subject: 'Email Verified Successfully! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Email Verified</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .footer { background: #2E2F2F; color: white; padding: 20px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Email Verified!</h1>
            </div>
            <div class="content">
              <h2>Hello ${name}!</h2>
              <p>Your email has been successfully verified. You now have full access to all Stack Technologies features.</p>
              <p>Start exploring our products and build your dream PC today!</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 Stack Technologies. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  }

  // Order confirmation email
  orderConfirmation(data) {
    const { customerName, orderNumber, orderDate, orderTotal, orderItems, estimatedDelivery } = data;
    return {
      subject: `Order Confirmation - #${orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Order Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ACBDBA, #A599B5); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .order-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .items-table th, .items-table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
            .items-table th { background: #f8f9fa; }
            .total { font-size: 18px; font-weight: bold; color: #A599B5; }
            .footer { background: #2E2F2F; color: white; padding: 20px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Confirmed! 🎉</h1>
            </div>
            <div class="content">
              <h2>Thank you, ${customerName}!</h2>
              <p>Your order has been confirmed and is being processed.</p>
              
              <div class="order-details">
                <h3>Order Details</h3>
                <p><strong>Order Number:</strong> #${orderNumber}</p>
                <p><strong>Order Date:</strong> ${orderDate}</p>
                <p><strong>Estimated Delivery:</strong> ${estimatedDelivery}</p>
              </div>

              <table class="items-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderItems}
                </tbody>
              </table>

              <p class="total">Order Total: $${orderTotal}</p>
              
              <p>We'll send you another email when your order ships with tracking information.</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 Stack Technologies. All rights reserved.</p>
              <p>Questions? Contact us: support@stacktechnologies.com</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  }

  // Shipping notification
  shippingNotification(data) {
    const { customerName, orderNumber, trackingNumber, carrier, estimatedDelivery } = data;
    return {
      subject: `Your Order #${orderNumber} Has Shipped! 📦`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Order Shipped</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .tracking-info { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #3b82f6; }
            .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { background: #2E2F2F; color: white; padding: 20px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📦 Your Order Has Shipped!</h1>
            </div>
            <div class="content">
              <h2>Great news, ${customerName}!</h2>
              <p>Your order #${orderNumber} has been shipped and is on its way to you.</p>
              
              <div class="tracking-info">
                <h3>Shipping Information</h3>
                <p><strong>Carrier:</strong> ${carrier}</p>
                <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
                <p><strong>Estimated Delivery:</strong> ${estimatedDelivery}</p>
              </div>

              <p>You can track your shipment using the tracking number above on the ${carrier} website.</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 Stack Technologies. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  }

  // Password reset email
  passwordReset(data) {
    const { name, resetLink } = data;
    return {
      subject: 'Password Reset Request',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Password Reset</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .button { display: inline-block; background: #f59e0b; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { background: #2E2F2F; color: white; padding: 20px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>We received a request to reset your password for your Stack Technologies account.</p>
              <p>Click the button below to reset your password:</p>
              <a href="${resetLink}" class="button">Reset Password</a>
              <p><strong>This link will expire in 1 hour for security reasons.</strong></p>
              <p>If you didn't request this reset, please ignore this email and your password will remain unchanged.</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 Stack Technologies. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  }

  // Payment confirmation
  paymentConfirmation(data) {
    const { customerName, orderNumber, paymentAmount, paymentMethod, transactionId } = data;
    return {
      subject: `Payment Confirmed - Order #${orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Payment Confirmed</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .payment-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #10b981; }
            .footer { background: #2E2F2F; color: white; padding: 20px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Payment Confirmed!</h1>
            </div>
            <div class="content">
              <h2>Thank you, ${customerName}!</h2>
              <p>Your payment has been successfully processed.</p>
              
              <div class="payment-details">
                <h3>Payment Details</h3>
                <p><strong>Order Number:</strong> #${orderNumber}</p>
                <p><strong>Amount Paid:</strong> $${paymentAmount}</p>
                <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                <p><strong>Transaction ID:</strong> ${transactionId}</p>
              </div>

              <p>Your order is now being processed and you'll receive a shipping confirmation once it's dispatched.</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 Stack Technologies. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  }
}

module.exports = new EmailTemplateService();
