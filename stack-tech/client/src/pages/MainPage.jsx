import React, { useState, useEffect } from 'react';
import './MainPage.css';

const MainPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const products = [
    {
      id: 1,
      name: "Intel i5-13400 Gaming PC Special 1",
      price: "$1,649.00",
      image: "/api/placeholder/300/300",
      specs: ["Intel i5-13400", "16GB DDR4", "RTX 4060", "1TB SSD"],
      tag: "POPULAR"
    },
    {
      id: 2,
      name: "Magic 320 Complete Gaming Setup",
      price: "$1,559.00",
      image: "/api/placeholder/300/300",
      specs: ["AMD Ryzen 5", "16GB DDR4", "RTX 3060", "500GB SSD"],
      tag: "NEW"
    },
    {
      id: 3,
      name: "Intel i7-13700K Gaming PC Special 2",
      price: "$2,099.00",
      image: "/api/placeholder/300/300",
      specs: ["Intel i7-13700K", "32GB DDR5", "RTX 4070", "1TB NVMe"],
      tag: "PREMIUM"
    },
    {
      id: 4,
      name: "AMD Ryzen 7 Gaming PC",
      price: "$2,299.00",
      image: "/api/placeholder/300/300",
      specs: ["AMD Ryzen 7", "32GB DDR5", "RTX 4070 Ti", "2TB SSD"],
      tag: "BESTSELLER"
    },
    {
      id: 5,
      name: "Intel i5-13400 Gaming PC Special 1",
      price: "$899.00",
      image: "/api/placeholder/300/300",
      specs: ["Intel i5-13400", "16GB DDR4", "GTX 1660", "500GB SSD"],
      tag: "BUDGET"
    },
    {
      id: 6,
      name: "Magic RGB Gaming Setup Extra",
      price: "$1,799.00",
      image: "/api/placeholder/300/300",
      specs: ["AMD Ryzen 5", "16GB DDR4", "RTX 4060 Ti", "1TB SSD"],
      tag: "RGB"
    }
  ];

  const trustFeatures = [
    {
      icon: "🛡️",
      title: "Trusted Builder",
      description: "Over 10,000 custom PCs built with expert craftsmanship and quality components."
    },
    {
      icon: "🏆",
      title: "12-Month Warranty",
      description: "Comprehensive warranty coverage on all components and professional assembly."
    },
    {
      icon: "🎧",
      title: "24/7 Support",
      description: "Round-the-clock technical support for all your gaming PC needs and questions."
    }
  ];

  return (
    <main className={`main-page ${isVisible ? 'main-page--visible' : ''}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-line">Premium Gaming</span>
              <span className="hero-title-line hero-title-line--accent">PCs Built for You</span>
            </h1>
            <p className="hero-description">
              Discover our collection of high-performance gaming computers, 
              built with cutting-edge components and backed by our expertise.
            </p>
            <div className="hero-actions">
              <button className="btn btn--primary">Shop Pre-Built</button>
              <button className="btn btn--secondary">Custom Build</button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="products-container">
          <div className="section-header">
            <h2 className="section-title">Featured Gaming PCs</h2>
            <p className="section-subtitle">Hand-picked systems for every gaming enthusiast</p>
          </div>

          <div className="products-grid">
            {products.map((product, index) => (
              <div 
                key={product.id}
                className={`product-card ${hoveredProduct === product.id ? 'product-card--hovered' : ''}`}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {product.tag && (
                  <div className={`product-tag product-tag--${product.tag.toLowerCase()}`}>
                    {product.tag}
                  </div>
                )}
                
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-overlay">
                    <button className="btn btn--quick-view">Quick View</button>
                  </div>
                </div>

                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  
                  <div className="product-specs">
                    {product.specs.map((spec, specIndex) => (
                      <span key={specIndex} className="spec-item">{spec}</span>
                    ))}
                  </div>

                  <div className="product-footer">
                    <div className="product-price">{product.price}</div>
                    <button className="btn btn--add-cart">ADD TO CART</button>
                  </div>
                </div>

                <div className="product-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="trust-section">
        <div className="trust-container">
          {trustFeatures.map((feature, index) => (
            <div 
              key={index}
              className="trust-card"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="trust-icon">{feature.icon}</div>
              <h3 className="trust-title">{feature.title}</h3>
              <p className="trust-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Background Elements */}
      <div className="page-background">
        <div className="bg-shape bg-shape--1"></div>
        <div className="bg-shape bg-shape--2"></div>
        <div className="bg-shape bg-shape--3"></div>
      </div>

      {/* Floating Particles */}
      <div className="page-particles">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className={`page-particle page-particle--${i + 1}`}
          ></div>
        ))}
      </div>
    </main>
  );
};

export default MainPage;
