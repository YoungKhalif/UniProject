import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Header from '../component/Header';
// import Footer from '../component/Footer';
import './ItemsDisplay.css';

const ItemsDisplay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    navigate('/cart');
  };

  const products = [
    {
      id: 1,
      name: "Intel i3-13100 Gaming PC Special 4",
      price: "$1,640.00",
      image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop&crop=center",
      specs: ["Intel i3-13100", "16GB DDR4", "RTX 4060", "500GB SSD"]
    },
    {
      id: 2,
      name: "Magic 12th Gen Intel Gamer 6450",
      price: "$1,150.00",
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop&crop=center",
      specs: ["Intel i5-12400", "16GB DDR4", "RTX 3060", "1TB SSD"]
    },
    {
      id: 3,
      name: "Intel i7-13700K Gaming PC Special 4",
      price: "$2099.00",
      image: "https://images.unsplash.com/photo-1591238371432-37633bfe69ae?w=400&h=400&fit=crop&crop=center",
      specs: ["Intel i7-13700K", "32GB DDR5", "RTX 4070", "1TB NVMe"]
    },
    {
      id: 4,
      name: "Intel i7-13700K Gaming PC Special 1",
      price: "$2,289.00",
      image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=400&fit=crop&crop=center",
      specs: ["Intel i7-13700K", "32GB DDR5", "RTX 4070 Ti", "2TB SSD"]
    },
    {
      id: 5,
      name: "Intel i5-13400 Gaming PC Special 1",
      price: "$859.00",
      image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=400&fit=crop&crop=center",
      specs: ["Intel i5-13400", "16GB DDR4", "GTX 1660", "500GB SSD"]
    },
    {
      id: 6,
      name: "Magic 12th Gen Intel Gamer 6450",
      price: "$1,129.00",
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop&crop=center",
      specs: ["Intel i5-12400", "16GB DDR4", "RTX 4060 Ti", "1TB SSD"]
    }
  ];

  const trustFeatures = [
    {
      title: "Trusted Builder",
      subtitle: "Built by Hand, Tested by Experts",
      description: "Over 5 years of experience assembling high-performance PCs",
      icon: (
        <svg className="trust-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 12l2 2 4-4"/>
          <circle cx="12" cy="12" r="9"/>
        </svg>
      )
    },
    {
      title: "12-Month Warranty",
      subtitle: "Comprehensive Protection",
      description: "Every system comes with a 1-year parts and labor warranty",
      icon: (
        <svg className="trust-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="3"/>
          <circle cx="12" cy="1" r="1"/>
          <circle cx="12" cy="23" r="1"/>
          <circle cx="4.22" cy="4.22" r="1"/>
          <circle cx="19.78" cy="19.78" r="1"/>
        </svg>
      )
    },
    {
      title: "24/7 Support",
      subtitle: "Always Here When You Need Us",
      description: "Our tech support team is available any time",
      icon: (
        <svg className="trust-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    }
  ];

  return (
    <>
      {/* <Header /> */}
      <main className={`items-display ${isVisible ? 'visible' : ''}`}>
        <div className="container mx-auto px-4 py-8">
          {/* Shopping Cart Icon */}
          <div className="cart-icon-container">
            <button 
              className="cart-icon-btn"
              onClick={() => navigate('/cart')}
            >
              <svg className="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </button>
          </div>

          {/* Product Grid */}
          <div className="product-grid">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className={`product-card ${hoveredCard === product.id ? 'hovered' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="price-tag">
                    {product.price}
                  </div>
                </div>

                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Features Section */}
          <div className="trust-section">
            <div className="trust-features">
              {trustFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className="trust-item"
                  style={{ animationDelay: `${(index + 1) * 0.2}s` }}
                >
                  <div className="trust-icon">
                    {feature.icon}
                  </div>
                  <div className="trust-content">
                    <h4 className="trust-title">{feature.title}</h4>
                    <p className="trust-subtitle">{feature.subtitle}</p>
                    <p className="trust-description">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default ItemsDisplay;