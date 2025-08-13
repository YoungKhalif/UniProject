// Email Template Service - Stack Technologies

class EmailTemplateService {
  constructor() {
    this.templates = {
      orderConfirmation: {
        name: 'Order Confirmation',
        subject: 'Order Confirmation - #{orderNumber}',
        category: 'order',
        variables: ['customerName', 'orderNumber', 'orderDate', 'orderTotal', 'orderItems', 'estimatedDelivery'],
        template: '<!DOCTYPE html>' +
'<html>' +
'<head>' +
'    <meta charset="utf-8">' +
'    <meta name="viewport" content="width=device-width, initial-scale=1">' +
'    <title>Order Confirmation - Stack Technologies</title>' +
'    <style>' +
'        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; }' +
'        .container { max-width: 600px; margin: 0 auto; background: white; }' +
'        .header { background: linear-gradient(135deg, #A599B5 0%, #ACBDBA 100%); color: white; padding: 40px 30px; text-align: center; }' +
'        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }' +
'        .content { padding: 40px 30px; }' +
'        .order-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }' +
'        .order-items { margin: 20px 0; }' +
'        .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e9ecef; }' +
'        .footer { background: #2E2F2F; color: white; padding: 30px; text-align: center; }' +
'        .btn { display: inline-block; background: #A599B5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }' +
'    </style>' +
'</head>' +
'<body>' +
'    <div class="container">' +
'        <div class="header">' +
'            <h1>Stack Technologies</h1>' +
'            <p>Order Confirmed</p>' +
'        </div>' +
'        <div class="content">' +
'            <h2>Hello {customerName}!</h2>' +
'            <p>Thank you for your order! We are excited to confirm that we have received your order and it is being processed.</p>' +
'            ' +
'            <div class="order-details">' +
'                <h3>Order Details</h3>' +
'                <p><strong>Order Number:</strong> #{orderNumber}</p>' +
'                <p><strong>Order Date:</strong> {orderDate}</p>' +
'                <p><strong>Total Amount:</strong> {orderTotal}</p>' +
'                <p><strong>Estimated Delivery:</strong> {estimatedDelivery}</p>' +
'            </div>' +
'' +
'            <div class="order-items">' +
'                <h3>Items Ordered</h3>' +
'                {orderItems}' +
'            </div>' +
'' +
'            <a href="{trackingLink}" class="btn">Track Your Order</a>' +
'' +
'            <p>We will send you another email with tracking information once your order ships.</p>' +
'            <p>Thank you for choosing Stack Technologies!</p>' +
'        </div>' +
'        <div class="footer">' +
'            <p>&copy; 2024 Stack Technologies. All rights reserved.</p>' +
'            <p>Contact us: support@stacktech.com | 1-800-STACK-PC</p>' +
'        </div>' +
'    </div>' +
'</body>' +
'</html>'
      },

      orderShipped: {
        name: 'Order Shipped',
        subject: 'Your Order Has Shipped - #{orderNumber}',
        category: 'order',
        variables: ['customerName', 'orderNumber', 'trackingNumber', 'carrier', 'estimatedDelivery', 'trackingLink'],
        template: `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Order Shipped - Stack Technologies</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #10b981 0%, #ACBDBA 100%); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .content { padding: 40px 30px; }
        .shipping-info { background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
        .footer { background: #2E2F2F; color: white; padding: 30px; text-align: center; }
        .btn { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📦 Your Order is On Its Way!</h1>
        </div>
        <div class="content">
            <h2>Great news, {customerName}!</h2>
            <p>Your order has been shipped and is on its way to you.</p>
            
            <div class="shipping-info">
                <h3>Shipping Information</h3>
                <p><strong>Order Number:</strong> #{orderNumber}</p>
                <p><strong>Tracking Number:</strong> {trackingNumber}</p>
                <p><strong>Carrier:</strong> {carrier}</p>
                <p><strong>Estimated Delivery:</strong> {estimatedDelivery}</p>
            </div>

            <a href="{trackingLink}" class="btn">Track Your Package</a>

            <p>If you have any questions about your order, please don't hesitate to contact us.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Stack Technologies. All rights reserved.</p>
            <p>Contact us: support@stacktech.com | 1-800-STACK-PC</p>
        </div>
    </div>
</body>
</html>`
      },

      lowStock: {
        name: 'Low Stock Alert',
        subject: 'Low Stock Alert - {productName}',
        category: 'alert',
        variables: ['productName', 'productSku', 'currentStock', 'minStockLevel', 'reorderLink'],
        template: `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Low Stock Alert - Stack Technologies</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #f59e0b 0%, #ACBDBA 100%); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .content { padding: 40px 30px; }
        .alert-info { background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b; }
        .footer { background: #2E2F2F; color: white; padding: 30px; text-align: center; }
        .btn { display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>⚠️ Low Stock Alert</h1>
        </div>
        <div class="content">
            <h2>Attention Required</h2>
            <p>This is an automated alert to inform you that the following product is running low on stock:</p>
            
            <div class="alert-info">
                <h3>Product Information</h3>
                <p><strong>Product:</strong> {productName}</p>
                <p><strong>SKU:</strong> {productSku}</p>
                <p><strong>Current Stock:</strong> {currentStock} units</p>
                <p><strong>Minimum Stock Level:</strong> {minStockLevel} units</p>
            </div>

            <a href="{reorderLink}" class="btn">Reorder Now</a>

            <p>Please restock this item as soon as possible to avoid stockouts.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Stack Technologies Inventory System</p>
        </div>
    </div>
</body>
</html>`
      },

      welcome: {
        name: 'Welcome Email',
        subject: 'Welcome to Stack Technologies!',
        category: 'welcome',
        variables: ['customerName', 'accountLink', 'supportEmail'],
        template: `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome - Stack Technologies</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #A599B5 0%, #ACBDBA 100%); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .content { padding: 40px 30px; }
        .features { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .feature { margin: 10px 0; padding: 10px 0; }
        .footer { background: #2E2F2F; color: white; padding: 30px; text-align: center; }
        .btn { display: inline-block; background: #A599B5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Welcome to Stack Technologies!</h1>
        </div>
        <div class="content">
            <h2>Hello {customerName}!</h2>
            <p>Welcome to Stack Technologies! We're thrilled to have you as part of our community.</p>
            
            <p>Your account has been successfully created and you can now:</p>
            
            <div class="features">
                <div class="feature">🛒 Browse our extensive catalog of PC components</div>
                <div class="feature">⚙️ Create custom builds with our configurator</div>
                <div class="feature">📦 Track your orders and shipments</div>
                <div class="feature">💰 Access exclusive member deals</div>
                <div class="feature">🎮 Join our community forums</div>
            </div>

            <a href="{accountLink}" class="btn">Access Your Account</a>

            <p>If you have any questions or need assistance, our support team is here to help at {supportEmail}.</p>
            <p>Welcome aboard!</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Stack Technologies. All rights reserved.</p>
            <p>Contact us: support@stacktech.com | 1-800-STACK-PC</p>
        </div>
    </div>
</body>
</html>`
      },

      orderDelivered: {
        name: 'Order Delivered',
        subject: 'Your Order Has Been Delivered - #{orderNumber}',
        category: 'order',
        variables: ['customerName', 'orderNumber', 'deliveryDate', 'reviewLink', 'supportEmail'],
        template: `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Order Delivered - Stack Technologies</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #10b981 0%, #ACBDBA 100%); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .content { padding: 40px 30px; }
        .delivery-info { background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
        .footer { background: #2E2F2F; color: white; padding: 30px; text-align: center; }
        .btn { display: inline-block; background: #A599B5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Order Delivered!</h1>
        </div>
        <div class="content">
            <h2>Great news, {customerName}!</h2>
            <p>Your order has been successfully delivered.</p>
            
            <div class="delivery-info">
                <h3>Delivery Confirmation</h3>
                <p><strong>Order Number:</strong> #{orderNumber}</p>
                <p><strong>Delivered On:</strong> {deliveryDate}</p>
            </div>

            <p>We hope you're satisfied with your purchase! We'd love to hear about your experience.</p>

            <div style="text-align: center;">
                <a href="{reviewLink}" class="btn">Leave a Review</a>
            </div>

            <p>If you have any issues or questions about your order, please contact us at {supportEmail}.</p>
            <p>Thank you for choosing Stack Technologies!</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Stack Technologies. All rights reserved.</p>
            <p>Contact us: support@stacktech.com | 1-800-STACK-PC</p>
        </div>
    </div>
</body>
</html>`
      }
    };
  }

  // Get all templates
  getAllTemplates() {
    return Object.entries(this.templates).map(([key, template]) => ({
      key,
      ...template
    }));
  }

  // Get template by key
  getTemplate(key) {
    return this.templates[key] || null;
  }

  // Get templates by category
  getTemplatesByCategory(category) {
    return Object.entries(this.templates)
      .filter(([, template]) => template.category === category)
      .map(([key, template]) => ({ key, ...template }));
  }

  // Render template with variables
  renderTemplate(templateKey, variables = {}) {
    const template = this.getTemplate(templateKey);
    if (!template) {
      throw new Error(`Template '${templateKey}' not found`);
    }

    let rendered = template.template;
    let subject = template.subject;

    // Replace variables in template and subject
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{${key}}`, 'g');
      rendered = rendered.replace(regex, value || '');
      subject = subject.replace(regex, value || '');
    });

    return {
      subject,
      html: rendered,
      variables: template.variables,
      category: template.category
    };
  }

  // Get template variables
  getTemplateVariables(templateKey) {
    const template = this.getTemplate(templateKey);
    return template ? template.variables : [];
  }

  // Validate template variables
  validateVariables(templateKey, variables) {
    const template = this.getTemplate(templateKey);
    if (!template) {
      return { valid: false, error: `Template '${templateKey}' not found` };
    }

    const missing = template.variables.filter(variable => 
      !variables.hasOwnProperty(variable) || variables[variable] === undefined
    );

    if (missing.length > 0) {
      return { 
        valid: false, 
        error: `Missing required variables: ${missing.join(', ')}`,
        missing 
      };
    }

    return { valid: true };
  }

  // Preview template
  previewTemplate(templateKey, variables = {}) {
    try {
      const rendered = this.renderTemplate(templateKey, variables);
      return {
        success: true,
        preview: rendered
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get sample variables for a template
  getSampleVariables(templateKey) {
    const sampleData = {
      orderConfirmation: {
        customerName: 'John Doe',
        orderNumber: 'ST-2024-001',
        orderDate: new Date().toLocaleDateString(),
        orderTotal: '1,299.99',
        orderItems: '<div class="item"><span>Intel Core i7-13700K</span><span>$399.99</span></div><div class="item"><span>NVIDIA RTX 4070</span><span>$599.99</span></div>',
        estimatedDelivery: '3-5 business days',
        trackingLink: '#'
      },
      orderShipped: {
        customerName: 'Jane Smith',
        orderNumber: 'ST-2024-002',
        trackingNumber: '1Z999AA1234567890',
        carrier: 'UPS',
        estimatedDelivery: 'December 15, 2024',
        trackingLink: '#'
      },
      lowStock: {
        productName: 'Intel Core i7-13700K',
        productSku: 'CPU-INTEL-13700K',
        currentStock: '5',
        minStockLevel: '10',
        reorderLink: '#'
      },
      welcome: {
        customerName: 'Alex Johnson',
        accountLink: '#',
        supportEmail: 'support@stacktech.com'
      },
      orderDelivered: {
        customerName: 'Mike Wilson',
        orderNumber: 'ST-2024-003',
        deliveryDate: new Date().toLocaleDateString(),
        reviewLink: '#',
        supportEmail: 'support@stacktech.com'
      }
    };

    return sampleData[templateKey] || {};
  }
}

// Export singleton instance
const emailTemplateService = new EmailTemplateService();
export { emailTemplateService };
export default emailTemplateService;
