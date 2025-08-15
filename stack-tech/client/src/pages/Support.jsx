import React, { useState } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import './Support.css';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    subject: '',
    message: ''
  });

  const supportCategories = [
    { id: 'general', name: 'General Support', icon: '❓' },
    { id: 'technical', name: 'Technical Issues', icon: '🔧' },
    { id: 'warranty', name: 'Warranty Claims', icon: '🛡️' },
    { id: 'shipping', name: 'Shipping & Returns', icon: '📦' },
    { id: 'billing', name: 'Billing & Payments', icon: '💳' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Support form submitted:', formData);
    alert('Support ticket submitted successfully!');
  };

  return (
    <div className="support">
      <Header />
      
      <main className="support__main">
        <div className="support__hero">
          <div className="container">
            <h1 className="support__title">Customer Support</h1>
            <p className="support__subtitle">
              We're here to help with any questions or issues you may have
            </p>
          </div>
        </div>

        <div className="support__content">
          <div className="container">
            <div className="support__grid">
              {/* Contact Methods */}
              <div className="support__section">
                <h2 className="support__section-title">Contact Methods</h2>
                <div className="contact-methods">
                  <div className="contact-method">
                    <div className="contact-method__icon">📞</div>
                    <div className="contact-method__content">
                      <h3>Phone Support</h3>
                      <p>(555) 123-TECH</p>
                      <p>Mon-Fri: 9AM-6PM EST</p>
                    </div>
                  </div>
                  <div className="contact-method">
                    <div className="contact-method__icon">📧</div>
                    <div className="contact-method__content">
                      <h3>Email Support</h3>
                      <p>support@stacktech.com</p>
                      <p>Response within 24 hours</p>
                    </div>
                  </div>
                  <div className="contact-method">
                    <div className="contact-method__icon">💬</div>
                    <div className="contact-method__content">
                      <h3>Live Chat</h3>
                      <p>Available on website</p>
                      <p>Mon-Fri: 9AM-6PM EST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Form */}
              <div className="support__section">
                <h2 className="support__section-title">Submit a Support Ticket</h2>
                <form className="support-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="category">Support Category</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      {supportCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="support-form__submit">
                    Submit Ticket
                  </button>
                </form>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="support__faq">
              <h2 className="support__section-title">Frequently Asked Questions</h2>
              <div className="faq-grid">
                <div className="faq-item">
                  <h3>How long is the warranty on custom PCs?</h3>
                  <p>All our custom PCs come with a comprehensive 12-month warranty covering parts and labor.</p>
                </div>
                <div className="faq-item">
                  <h3>What's your return policy?</h3>
                  <p>We offer a 30-day return policy for unopened items and 14-day for opened/used items.</p>
                </div>
                <div className="faq-item">
                  <h3>Do you offer technical support after purchase?</h3>
                  <p>Yes, we provide free technical support for the lifetime of your system purchase.</p>
                </div>
                <div className="faq-item">
                  <h3>How long does custom PC assembly take?</h3>
                  <p>Custom PC assembly typically takes 3-5 business days, plus shipping time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
