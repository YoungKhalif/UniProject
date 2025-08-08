import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

// Initial cart data matching the reference image - moved outside component
const initialCartItems = [
  {
    id: 1,
    name: 'Intel 10th Generation System',
    description: 'i5-10600KF',
    specs: [
      'HEC H5300 Black Mid Tower Case',
      'Intel Core i5-10600KF Comet Lake 4.0Hz (4.8 GHz Turbo)',
      'B-Series 12-Thread Processor'
    ],
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    price: 2570.00,
    quantity: 1,
    totalPrice: 2570.00
  },
  {
    id: 2,
    name: 'Intel i7-13700K Gaming PC Special 4',
    description: 'Gaming PC Special 4',
    specs: [
      'HEC H5300 Black Mid Tower Case',
      'Intel Core i5-10600KF Comet Lake 4.0Hz (4.8 GHz Turbo)',
      'B-Series 12-Thread Processor'
    ],
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    price: 2099.00,
    quantity: 2,
    totalPrice: 4198.00
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading cart data
    setIsLoading(true);
    setTimeout(() => {
      setCartItems(initialCartItems);
      setIsLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    // Calculate totals
    const newSubtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const newShipping = newSubtotal > 0 ? (newSubtotal > 5000 ? 0 : 199.00) : 0;
    const newOrderTotal = newSubtotal + newShipping;

    setSubtotal(newSubtotal);
    setShipping(newShipping);
    setOrderTotal(newOrderTotal);
  }, [cartItems]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: item.price * newQuantity
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const handleContinueShopping = () => {
    console.log('Continue shopping clicked');
    navigate('/home');
  };

  const handleProceedToCheckout = () => {
    console.log('Proceed to checkout clicked');
    navigate('/checkout');
  };

  if (isLoading) {
    return (
      <div className="cart-loading">
        <div className="loading-spinner"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__container">
        {/* Header */}
        <header className="cart__header">
          <div className="cart__logo">
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
          
          <div className="cart__title-section">
            <h2 className="cart__title">SHOPPING CART</h2>
            <div className="cart__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="m1 1 4 0 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="cart__content">
          {/* Left Side - Cart Items */}
          <div className="cart__items-section">
            <div className="cart__items-header">
              <h3 className="items__title">Cart Items</h3>
              <div className="items__columns">
                <span className="column__label">Total</span>
                <span className="column__label">Qty</span>
                <span className="column__label">Price</span>
              </div>
            </div>

            <div className="cart__items-list">
              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <div className="empty-cart__icon">🛒</div>
                  <h3 className="empty-cart__title">Your cart is empty</h3>
                  <p className="empty-cart__text">Add some amazing gaming PCs to get started!</p>
                  <button className="empty-cart__button" onClick={handleContinueShopping}>
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="cart__item"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="item__image-container">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="item__image"
                        loading="lazy"
                      />
                    </div>

                    <div className="item__details">
                      <h4 className="item__name">{item.name}</h4>
                      <p className="item__description">{item.description}</p>
                      <ul className="item__specs">
                        {item.specs.map((spec, specIndex) => (
                          <li key={specIndex} className="item__spec">
                            • {spec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="item__pricing">
                      <div className="item__total">
                        <span className="total__label">Total</span>
                        <span className="total__price">{formatPrice(item.totalPrice)}</span>
                      </div>

                      <div className="item__quantity">
                        <span className="quantity__label">Qty</span>
                        <div className="quantity__controls">
                          <button
                            className="quantity__button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="quantity__value">{item.quantity}</span>
                          <button
                            className="quantity__button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="item__price">
                        <span className="price__label">Price</span>
                        <span className="price__value">{formatPrice(item.price)}</span>
                      </div>

                      <button
                        className="item__remove"
                        onClick={() => removeItem(item.id)}
                        title="Remove item"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <polyline points="3,6 5,6 21,6"></polyline>
                          <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="cart__summary-section">
            <div className="summary__container">
              <div className="summary__totals">
                <div className="summary__row">
                  <span className="summary__label">Total</span>
                  <div className="summary__placeholder"></div>
                </div>

                <div className="summary__row">
                  <span className="summary__label">Subtotal</span>
                  <span className="summary__value">{formatPrice(subtotal)}</span>
                </div>

                <div className="summary__row">
                  <span className="summary__label">Shipping</span>
                  <span className="summary__value">
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>

                <div className="summary__row summary__row--total">
                  <span className="summary__label">Order Total</span>
                  <span className="summary__value summary__value--total">
                    {formatPrice(orderTotal)}
                  </span>
                </div>
              </div>

              <div className="summary__actions">
                <button
                  className="summary__button summary__button--continue"
                  onClick={handleContinueShopping}
                >
                  Continue Shopping
                </button>
                
                <button
                  className="summary__button summary__button--checkout"
                  onClick={handleProceedToCheckout}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
