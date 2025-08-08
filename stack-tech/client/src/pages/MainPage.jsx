import React, { useState, useEffect } from 'react';
import './MainPage.css';

const MainPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

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
      price: "$2,099.00",
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

  return (
    <main className={`main-page ${isVisible ? 'main-page--visible' : ''}`}>
      <div className="main-page__container">
        <div className="products-grid">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="product-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="product-image-container">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-image"
                />
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">{product.price}</div>
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Features Section */}
        <div className="trust-features">
          <div className="trust-item">
            <div className="trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
                <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
              </svg>
            </div>
            <div className="trust-content">
              <h4 className="trust-title">Trusted Builder</h4>
              <p className="trust-description">Over 5 years of experience assembling high-performance PCs</p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 12l2 2 4-4"/>
              </svg>
            </div>
            <div className="trust-content">
              <h4 className="trust-title">12-Month Warranty</h4>
              <p className="trust-description">Every system comes with a 1-year parts and labor warranty</p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className="trust-content">
              <h4 className="trust-title">24/7 Support</h4>
              <p className="trust-description">Have What You Need Us. Our tech support team is available any time</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
