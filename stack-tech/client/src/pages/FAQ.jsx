import React, { useState } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How long does it take to build a custom PC?",
      answer: "Custom PC builds typically take 3-5 business days to assemble and test, plus 1-2 days for quality assurance. Rush orders can be completed in 1-2 business days for an additional fee."
    },
    {
      question: "What warranty do you provide on custom builds?",
      answer: "All our custom PCs come with a comprehensive 12-month warranty covering parts and labor. Individual components may have longer manufacturer warranties that we honor."
    },
    {
      question: "Can I upgrade my PC later?",
      answer: "Absolutely! We design our systems with upgradability in mind. We can help you plan future upgrades and provide installation services if needed."
    },
    {
      question: "Do you offer financing options?",
      answer: "Yes, we partner with several financing companies to offer 0% APR financing for qualified customers. Options include 6, 12, and 24-month payment plans."
    },
    {
      question: "What if a component fails after I receive my PC?",
      answer: "Contact our support team immediately. We'll troubleshoot the issue and arrange for repair or replacement under warranty. We provide prepaid shipping labels for returns."
    },
    {
      question: "Can you help me choose the right specifications?",
      answer: "Yes! Our experts can help you choose the perfect specifications based on your intended use, budget, and performance requirements. Contact us for a free consultation."
    },
    {
      question: "Do you provide technical support after purchase?",
      answer: "We offer lifetime technical support for all systems we build. This includes software troubleshooting, driver updates, and general maintenance guidance."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, bank transfers, and financing through our approved partners. Cryptocurrency payments are available for orders over $1,000."
    },
    {
      question: "Can I track my order status?",
      answer: "Yes, you'll receive email updates throughout the build process and a tracking number once your system ships. You can also check your order status in your account dashboard."
    },
    {
      question: "Do you ship internationally?",
      answer: "We ship to select countries including Canada, UK, Australia, and several EU nations. International shipping rates and delivery times vary by destination."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq">
      <Header />
      
      <main className="faq__main">
        <div className="faq__hero">
          <div className="container">
            <h1 className="faq__title">Frequently Asked Questions</h1>
            <p className="faq__subtitle">
              Find answers to common questions about our products and services
            </p>
          </div>
        </div>

        <div className="faq__content">
          <div className="container">
            <div className="faq__list">
              {faqs.map((faq, index) => (
                <div key={index} className={`faq__item ${activeIndex === index ? 'active' : ''}`}>
                  <button 
                    className="faq__question"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span>{faq.question}</span>
                    <span className="faq__icon">{activeIndex === index ? '−' : '+'}</span>
                  </button>
                  <div className="faq__answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="faq__contact">
              <h2>Still Have Questions?</h2>
              <p>Can't find what you're looking for? Our support team is here to help!</p>
              <div className="contact-options">
                <a href="/support" className="contact-button">Contact Support</a>
                <a href="tel:+15551234567" className="contact-button">Call (555) 123-TECH</a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
