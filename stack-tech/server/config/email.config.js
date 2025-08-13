// Email and SendGrid configuration
module.exports = {
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    fromEmail: process.env.SENDGRID_FROM_EMAIL || 'noreply@stacktechnologies.com',
    templates: {
      orderConfirmation: 'd-xxxxxxxxxxxxx', // Replace with your SendGrid template ID
      orderShipped: 'd-xxxxxxxxxxxxx',
      lowStockAlert: 'd-xxxxxxxxxxxxx',
      welcomeEmail: 'd-xxxxxxxxxxxxx'
    }
  },
  adminEmail: process.env.ADMIN_EMAIL || 'admin@stacktechnologies.com',
  supportEmail: process.env.SUPPORT_EMAIL || 'support@stacktechnologies.com',
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  adminUrl: process.env.ADMIN_URL || 'http://localhost:3000/admin'
};
