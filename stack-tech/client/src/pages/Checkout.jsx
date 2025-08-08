import React, { useState, useEffect } from 'react';
import './Checkout.css';

// Order data from cart - moved outside component
const orderData = {
  items: [
    {
      id: 1,
      name: 'Intel 10th Generation System',
      price: 2570.00,
      quantity: 1
    },
    {
      id: 2,
      name: 'Intel i7-13700K Gaming PC Special 4',
      price: 2099.00,
      quantity: 2
    }
  ],
  subtotal: 6768.00,
  shipping: 0, // Free shipping
  total: 6768.00
};

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    streetAddress: '',
    zipCode: '',
    
    // Payment Information
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    billingAddress: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Simulate loading checkout data
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleShippingMethodChange = (method) => {
    setShippingMethod(method);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Shipping Information Validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    
    // Payment Information Validation
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!formData.expirationDate.trim()) newErrors.expirationDate = 'Expiration date is required';
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = 'CVV must be 3-4 digits';
    }
    if (!formData.billingAddress.trim()) newErrors.billingAddress = 'Billing address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };

  const formatExpirationDate = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleExpirationDateChange = (e) => {
    const formatted = formatExpirationDate(e.target.value);
    setFormData(prev => ({
      ...prev,
      expirationDate: formatted
    }));
  };

  const handleBackToCart = () => {
    console.log('Back to cart clicked');
    // Navigate back to cart
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Order placed successfully:', {
        orderData,
        shippingMethod,
        customerInfo: formData
      });
      
      // Navigate to order confirmation
    } catch (error) {
      console.error('Order processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <div className="checkout-loading">
        <div className="loading-spinner"></div>
        <p>Preparing checkout...</p>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout__container">
        {/* Header */}
        <header className="checkout__header">
          <div className="checkout__logo">
            <div className="logo__icon">
              <div className="logo__stack">
                <div className="stack__layer stack__layer--1"></div>
                <div className="stack__layer stack__layer--2"></div>
                <div className="stack__layer stack__layer--3"></div>
              </div>
            </div>
            <div className="logo__text">
              <h1 className="logo__title">STACKS</h1>
              <span className="logo__subtitle">TECHNOLOGIES</span>
            </div>
          </div>
          
          <h2 className="checkout__title">CHECKOUT</h2>
        </header>

        {/* Main Content */}
        <div className="checkout__content">
          {/* Shipping Information */}
          <section className="checkout__section">
            <h3 className="section__title">Shipping Information</h3>
            
            <div className="form__grid">
              <div className="form__group">
                <label htmlFor="firstName" className="form__label">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`form__input ${errors.firstName ? 'form__input--error' : ''}`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <span className="form__error">{errors.firstName}</span>}
              </div>

              <div className="form__group">
                <label htmlFor="phoneNumber" className="form__label">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`form__input ${errors.phoneNumber ? 'form__input--error' : ''}`}
                  placeholder="Enter your phone number"
                />
                {errors.phoneNumber && <span className="form__error">{errors.phoneNumber}</span>}
              </div>

              <div className="form__group">
                <label htmlFor="lastName" className="form__label">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`form__input ${errors.lastName ? 'form__input--error' : ''}`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <span className="form__error">{errors.lastName}</span>}
              </div>

              <div className="form__group">
                <label htmlFor="streetAddress" className="form__label">Street Address</label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  className={`form__input ${errors.streetAddress ? 'form__input--error' : ''}`}
                  placeholder="Enter your street address"
                />
                {errors.streetAddress && <span className="form__error">{errors.streetAddress}</span>}
              </div>

              <div className="form__group">
                <label htmlFor="email" className="form__label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form__input ${errors.email ? 'form__input--error' : ''}`}
                  placeholder="Enter your email address"
                />
                {errors.email && <span className="form__error">{errors.email}</span>}
              </div>

              <div className="form__group">
                <label htmlFor="zipCode" className="form__label">Zip Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={`form__input ${errors.zipCode ? 'form__input--error' : ''}`}
                  placeholder="Enter your zip code"
                />
                {errors.zipCode && <span className="form__error">{errors.zipCode}</span>}
              </div>
            </div>

            {/* Shipping Method */}
            <div className="shipping__methods">
              <div className="shipping__method">
                <input
                  type="radio"
                  id="standard"
                  name="shippingMethod"
                  value="standard"
                  checked={shippingMethod === 'standard'}
                  onChange={() => handleShippingMethodChange('standard')}
                  className="shipping__radio"
                />
                <label htmlFor="standard" className="shipping__label">
                  <span className="shipping__name">Standard</span>
                  <span className="shipping__price">FREE</span>
                </label>
              </div>

              <div className="shipping__method">
                <input
                  type="radio"
                  id="express"
                  name="shippingMethod"
                  value="express"
                  checked={shippingMethod === 'express'}
                  onChange={() => handleShippingMethodChange('express')}
                  className="shipping__radio"
                />
                <label htmlFor="express" className="shipping__label">
                  <span className="shipping__name">Express</span>
                  <span className="shipping__price">$99.00</span>
                </label>
              </div>
            </div>
          </section>

          {/* Payment Information */}
          <section className="checkout__section">
            <h3 className="section__title">Payment Information</h3>
            
            <div className="form__grid">
              <div className="form__group">
                <label htmlFor="cardNumber" className="form__label">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  className={`form__input ${errors.cardNumber ? 'form__input--error' : ''}`}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
                {errors.cardNumber && <span className="form__error">{errors.cardNumber}</span>}
              </div>

              <div className="form__group">
                <label htmlFor="cvv" className="form__label">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className={`form__input ${errors.cvv ? 'form__input--error' : ''}`}
                  placeholder="123"
                  maxLength="4"
                />
                {errors.cvv && <span className="form__error">{errors.cvv}</span>}
              </div>

              <div className="form__group">
                <label htmlFor="expirationDate" className="form__label">Expiration Date</label>
                <input
                  type="text"
                  id="expirationDate"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleExpirationDateChange}
                  className={`form__input ${errors.expirationDate ? 'form__input--error' : ''}`}
                  placeholder="MM/YY"
                  maxLength="5"
                />
                {errors.expirationDate && <span className="form__error">{errors.expirationDate}</span>}
              </div>

              <div className="form__group">
                <label htmlFor="billingAddress" className="form__label">Billing Address</label>
                <input
                  type="text"
                  id="billingAddress"
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleInputChange}
                  className={`form__input ${errors.billingAddress ? 'form__input--error' : ''}`}
                  placeholder="Enter billing address"
                />
                {errors.billingAddress && <span className="form__error">{errors.billingAddress}</span>}
              </div>
            </div>
          </section>

          {/* Order Summary */}
          <section className="checkout__section checkout__section--summary">
            <h3 className="section__title">Order Summary</h3>
            
            <div className="summary__grid">
              <div className="summary__row">
                <span className="summary__label">Total</span>
                <div className="summary__placeholder"></div>
              </div>

              <div className="summary__row">
                <span className="summary__label">Shipping</span>
                <div className="summary__placeholder"></div>
              </div>

              <div className="summary__row">
                <span className="summary__label">Subtotal</span>
                <span className="summary__value">{formatPrice(orderData.subtotal)}</span>
              </div>

              <div className="summary__row summary__row--total">
                <span className="summary__label">Order Total</span>
                <span className="summary__value summary__value--total">
                  {formatPrice(orderData.total + (shippingMethod === 'express' ? 99 : 0))}
                </span>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="checkout__actions">
            <button
              className="checkout__button checkout__button--back"
              onClick={handleBackToCart}
              disabled={isProcessing}
            >
              Back to Cart
            </button>
            
            <button
              className="checkout__button checkout__button--place-order"
              onClick={handlePlaceOrder}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="button__spinner"></div>
                  Processing...
                </>
              ) : (
                'Place Order'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
