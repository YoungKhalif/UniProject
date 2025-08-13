import React, { useState } from 'react';
import '../Dashboard.css';
import './AdminStyles.css';
import { motion } from 'framer-motion';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [formData, setFormData] = useState({
    siteName: 'Stack Technologies',
    contactEmail: 'support@stacktech.com',
    phoneNumber: '+1 (555) 123-4567',
    address: '123 Tech Avenue, San Francisco, CA 94107',
    taxRate: 8.5,
    enableUserRegistration: true,
    enableGuestCheckout: true,
    maintenanceMode: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSaveMessage({
        type: 'success',
        text: 'Settings saved successfully!'
      });
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setSaveMessage(null);
      }, 5000);
    }, 1500);
  };

  return (
    <motion.div
      className="settings-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="admin-section-header">
        <h2>Settings</h2>
        <p>Configure your system settings and preferences</p>
      </div>

      <div className="settings-content">
        <div className="settings-sidebar">
          <button 
            className={activeSection === 'general' ? 'active' : ''} 
            onClick={() => setActiveSection('general')}
          >
            General Settings
          </button>
          <button 
            className={activeSection === 'appearance' ? 'active' : ''} 
            onClick={() => setActiveSection('appearance')}
          >
            Appearance
          </button>
          <button 
            className={activeSection === 'payment' ? 'active' : ''} 
            onClick={() => setActiveSection('payment')}
          >
            Payment Methods
          </button>
          <button 
            className={activeSection === 'shipping' ? 'active' : ''} 
            onClick={() => setActiveSection('shipping')}
          >
            Shipping Options
          </button>
          <button 
            className={activeSection === 'emails' ? 'active' : ''} 
            onClick={() => setActiveSection('emails')}
          >
            Email Templates
          </button>
          <button 
            className={activeSection === 'integrations' ? 'active' : ''} 
            onClick={() => setActiveSection('integrations')}
          >
            Integrations
          </button>
        </div>

        <div className="settings-main">
          {activeSection === 'general' && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSave}
            >
              <h3 className="settings-section-title">General Settings</h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="siteName">Site Name</label>
                  <input 
                    type="text" 
                    id="siteName" 
                    name="siteName" 
                    value={formData.siteName}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contactEmail">Contact Email</label>
                  <input 
                    type="email" 
                    id="contactEmail" 
                    name="contactEmail" 
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input 
                    type="text" 
                    id="phoneNumber" 
                    name="phoneNumber" 
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Business Address</label>
                  <textarea 
                    id="address" 
                    name="address" 
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form-control"
                    rows="3"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="taxRate">Tax Rate (%)</label>
                  <input 
                    type="number" 
                    id="taxRate" 
                    name="taxRate" 
                    step="0.01"
                    value={formData.taxRate}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-divider"></div>

              <h4 className="settings-subsection">Store Preferences</h4>

              <div className="form-group checkbox-group">
                <input 
                  type="checkbox" 
                  id="enableUserRegistration" 
                  name="enableUserRegistration" 
                  checked={formData.enableUserRegistration}
                  onChange={handleInputChange}
                />
                <label htmlFor="enableUserRegistration">Enable User Registration</label>
              </div>

              <div className="form-group checkbox-group">
                <input 
                  type="checkbox" 
                  id="enableGuestCheckout" 
                  name="enableGuestCheckout" 
                  checked={formData.enableGuestCheckout}
                  onChange={handleInputChange}
                />
                <label htmlFor="enableGuestCheckout">Enable Guest Checkout</label>
              </div>

              <div className="form-group checkbox-group">
                <input 
                  type="checkbox" 
                  id="maintenanceMode" 
                  name="maintenanceMode" 
                  checked={formData.maintenanceMode}
                  onChange={handleInputChange}
                />
                <label htmlFor="maintenanceMode">Maintenance Mode</label>
                <p className="help-text">When enabled, only administrators can access the site.</p>
              </div>

              {saveMessage && (
                <div className={`alert ${saveMessage.type === 'success' ? 'success' : 'error'}`}>
                  {saveMessage.text}
                </div>
              )}

              <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button type="button" className="btn-secondary">Cancel</button>
              </div>
            </motion.form>
          )}

          {activeSection === 'appearance' && (
            <div className="settings-placeholder">
              <h3>Appearance Settings</h3>
              <p>Customize the look and feel of your store.</p>
              <div className="coming-soon">Coming Soon</div>
            </div>
          )}
          
          {activeSection === 'payment' && (
            <div className="settings-placeholder">
              <h3>Payment Methods</h3>
              <p>Configure payment gateways and options.</p>
              <div className="coming-soon">Coming Soon</div>
            </div>
          )}
          
          {activeSection === 'shipping' && (
            <div className="settings-placeholder">
              <h3>Shipping Options</h3>
              <p>Set up shipping zones and delivery methods.</p>
              <div className="coming-soon">Coming Soon</div>
            </div>
          )}
          
          {activeSection === 'emails' && (
            <div className="settings-placeholder">
              <h3>Email Templates</h3>
              <p>Customize email notifications sent to customers.</p>
              <div className="coming-soon">Coming Soon</div>
            </div>
          )}
          
          {activeSection === 'integrations' && (
            <div className="settings-placeholder">
              <h3>Integrations</h3>
              <p>Connect with third-party services and tools.</p>
              <div className="coming-soon">Coming Soon</div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
