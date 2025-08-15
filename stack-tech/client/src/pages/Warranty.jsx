import React from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import './Warranty.css';

const Warranty = () => {
  return (
    <div className="warranty">
      <Header />
      
      <main className="warranty__main">
        <div className="warranty__hero">
          <div className="container">
            <h1 className="warranty__title">Warranty Information</h1>
            <p className="warranty__subtitle">
              Comprehensive coverage for your Stack Technologies products
            </p>
          </div>
        </div>

        <div className="warranty__content">
          <div className="container">
            <section className="warranty__overview">
              <h2>Warranty Coverage Overview</h2>
              <div className="coverage-grid">
                <div className="coverage-card">
                  <h3>Custom PCs</h3>
                  <div className="coverage-duration">12 Months</div>
                  <ul>
                    <li>Full parts and labor coverage</li>
                    <li>Free diagnosis and repair</li>
                    <li>Remote support included</li>
                    <li>Replacement parts guarantee</li>
                  </ul>
                </div>
                <div className="coverage-card">
                  <h3>Gaming Laptops</h3>
                  <div className="coverage-duration">12 Months</div>
                  <ul>
                    <li>Manufacturer warranty pass-through</li>
                    <li>Stack Technologies support</li>
                    <li>Battery replacement coverage</li>
                    <li>Screen protection included</li>
                  </ul>
                </div>
                <div className="coverage-card">
                  <h3>Components</h3>
                  <div className="coverage-duration">Varies</div>
                  <ul>
                    <li>Manufacturer warranty honored</li>
                    <li>Easy RMA process</li>
                    <li>Testing before shipment</li>
                    <li>DOA replacement guarantee</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="warranty__details">
              <h2>Warranty Terms & Conditions</h2>
              <div className="terms-content">
                <div className="term-section">
                  <h3>What's Covered</h3>
                  <ul>
                    <li>Manufacturing defects in workmanship</li>
                    <li>Component failures under normal use</li>
                    <li>Software configuration issues</li>
                    <li>Performance optimization problems</li>
                    <li>Cable management and connections</li>
                  </ul>
                </div>
                
                <div className="term-section">
                  <h3>What's Not Covered</h3>
                  <ul>
                    <li>Physical damage from accidents</li>
                    <li>Liquid damage or spills</li>
                    <li>Modifications by unauthorized parties</li>
                    <li>Normal wear and tear on components</li>
                    <li>Software issues from user modifications</li>
                  </ul>
                </div>
                
                <div className="term-section">
                  <h3>Warranty Process</h3>
                  <ol>
                    <li>Contact our support team</li>
                    <li>Provide purchase details and serial numbers</li>
                    <li>Describe the issue in detail</li>
                    <li>Follow troubleshooting steps if applicable</li>
                    <li>Receive RMA number for returns if needed</li>
                    <li>Ship item using provided prepaid label</li>
                  </ol>
                </div>
              </div>
            </section>

            <section className="warranty__extended">
              <h2>Extended Warranty Options</h2>
              <div className="extended-grid">
                <div className="extended-plan">
                  <h3>Extended Care Plus</h3>
                  <div className="plan-price">$199</div>
                  <div className="plan-duration">Additional 12 months</div>
                  <ul>
                    <li>Extends warranty to 24 months total</li>
                    <li>Includes accidental damage protection</li>
                    <li>Priority support queue</li>
                    <li>Free annual performance checkup</li>
                  </ul>
                  <button className="plan-button">Learn More</button>
                </div>
                
                <div className="extended-plan featured">
                  <h3>Ultimate Protection</h3>
                  <div className="plan-price">$349</div>
                  <div className="plan-duration">Additional 24 months</div>
                  <ul>
                    <li>Extends warranty to 36 months total</li>
                    <li>Comprehensive damage protection</li>
                    <li>On-site repair service</li>
                    <li>Free upgrades consultation</li>
                    <li>Liquid damage coverage</li>
                  </ul>
                  <button className="plan-button">Learn More</button>
                </div>
              </div>
            </section>

            <section className="warranty__contact">
              <h2>Warranty Support Contact</h2>
              <div className="contact-info">
                <div className="contact-method">
                  <h3>Phone Support</h3>
                  <p>(555) 123-TECH</p>
                  <p>Monday - Friday: 9AM - 6PM EST</p>
                </div>
                <div className="contact-method">
                  <h3>Email Support</h3>
                  <p>warranty@stacktech.com</p>
                  <p>Response within 24 hours</p>
                </div>
                <div className="contact-method">
                  <h3>Online Portal</h3>
                  <p>Submit warranty claims online</p>
                  <p>Track repair status 24/7</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Warranty;
