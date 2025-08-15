import React from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import './Shipping.css';

const Shipping = () => {
  return (
    <div className="shipping">
      <Header />
      
      <main className="shipping__main">
        <div className="shipping__hero">
          <div className="container">
            <h1 className="shipping__title">Shipping & Returns</h1>
            <p className="shipping__subtitle">
              Fast, secure shipping with hassle-free returns
            </p>
          </div>
        </div>

        <div className="shipping__content">
          <div className="container">
            <section className="shipping__info">
              <h2>Shipping Information</h2>
              <div className="shipping-grid">
                <div className="shipping-option">
                  <h3>Standard Shipping</h3>
                  <div className="shipping-price">FREE</div>
                  <div className="shipping-time">5-7 Business Days</div>
                  <p>Free on orders over $500</p>
                </div>
                <div className="shipping-option">
                  <h3>Express Shipping</h3>
                  <div className="shipping-price">$29.99</div>
                  <div className="shipping-time">2-3 Business Days</div>
                  <p>Expedited processing and delivery</p>
                </div>
                <div className="shipping-option featured">
                  <h3>Rush Delivery</h3>
                  <div className="shipping-price">$79.99</div>
                  <div className="shipping-time">Next Business Day</div>
                  <p>Available for in-stock items only</p>
                </div>
              </div>
            </section>

            <section className="returns__info">
              <h2>Return Policy</h2>
              <div className="returns-content">
                <div className="return-period">
                  <h3>Return Windows</h3>
                  <ul>
                    <li><strong>Custom PCs:</strong> 14 days from delivery</li>
                    <li><strong>Components:</strong> 30 days if unopened, 14 days if opened</li>
                    <li><strong>Accessories:</strong> 30 days from delivery</li>
                    <li><strong>Software:</strong> No returns on opened software</li>
                  </ul>
                </div>
                
                <div className="return-conditions">
                  <h3>Return Conditions</h3>
                  <ul>
                    <li>Items must be in original condition</li>
                    <li>Original packaging required</li>
                    <li>All accessories and cables included</li>
                    <li>No physical damage or modifications</li>
                    <li>Return authorization (RMA) required</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="packaging__info">
              <h2>Packaging & Protection</h2>
              <div className="packaging-features">
                <div className="packaging-feature">
                  <div className="feature-icon">📦</div>
                  <h3>Custom Foam Inserts</h3>
                  <p>Each PC is secured with custom-cut foam for maximum protection during transit.</p>
                </div>
                <div className="packaging-feature">
                  <div className="feature-icon">🛡️</div>
                  <h3>Anti-Static Protection</h3>
                  <p>All components are wrapped in anti-static materials to prevent damage.</p>
                </div>
                <div className="packaging-feature">
                  <div className="feature-icon">📋</div>
                  <h3>Detailed Documentation</h3>
                  <p>Complete setup instructions and component specifications included.</p>
                </div>
                <div className="packaging-feature">
                  <div className="feature-icon">🔒</div>
                  <h3>Tamper-Evident Seals</h3>
                  <p>All packages are sealed to ensure integrity during shipping.</p>
                </div>
              </div>
            </section>

            <section className="international__info">
              <h2>International Shipping</h2>
              <div className="international-content">
                <p>We currently ship to the following countries:</p>
                <div className="countries-grid">
                  <div className="country-group">
                    <h4>North America</h4>
                    <ul>
                      <li>United States</li>
                      <li>Canada</li>
                      <li>Mexico</li>
                    </ul>
                  </div>
                  <div className="country-group">
                    <h4>Europe</h4>
                    <ul>
                      <li>United Kingdom</li>
                      <li>Germany</li>
                      <li>France</li>
                      <li>Netherlands</li>
                    </ul>
                  </div>
                  <div className="country-group">
                    <h4>Asia Pacific</h4>
                    <ul>
                      <li>Australia</li>
                      <li>Japan</li>
                      <li>Singapore</li>
                    </ul>
                  </div>
                </div>
                <p className="international-note">
                  International shipping rates and delivery times vary by destination. 
                  Customs duties and taxes are the responsibility of the customer.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shipping;
