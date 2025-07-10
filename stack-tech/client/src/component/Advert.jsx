import React, { useState, useEffect } from 'react';
import './css/Advert.css';

const Advert = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`advert ${isVisible ? 'advert--visible' : ''}`}>
      <div className="advert__container">
        <div className="advert__content">
          <div className="advert__text">
            <h2 className="advert__title">
              <span className="advert__title-line">NEW ARRIVALS</span>
              <span className="advert__title-line">
                WITH FREE 
                <span className="advert__title-highlight"> SHIPPING</span>
              </span>
            </h2>
          </div>
          
          <div className="advert__products">
            <div className="product-showcase">
              {/* Gaming Chair */}
              <div className="product-item product-item--chair">
                <div className="product-item__image">
                  <img 
                    src="/api/placeholder/200/200" 
                    alt="Gaming Chair" 
                    className="product-image"
                  />
                </div>
                <div className="product-item__glow"></div>
              </div>
              
              {/* Motherboards */}
              <div className="product-item product-item--motherboard-1">
                <div className="product-item__image">
                  <img 
                    src="/api/placeholder/180/140" 
                    alt="ASUS Motherboard" 
                    className="product-image"
                  />
                </div>
                <div className="product-item__glow"></div>
              </div>
              
              <div className="product-item product-item--motherboard-2">
                <div className="product-item__image">
                  <img 
                    src="/api/placeholder/180/140" 
                    alt="ROG Motherboard" 
                    className="product-image"
                  />
                </div>
                <div className="product-item__glow"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="advert__background">
          <div className="bg-element bg-element--1"></div>
          <div className="bg-element bg-element--2"></div>
          <div className="bg-element bg-element--3"></div>
        </div>
        
        {/* Floating Particles */}
        <div className="particles">
          <div className="particle particle--1"></div>
          <div className="particle particle--2"></div>
          <div className="particle particle--3"></div>
          <div className="particle particle--4"></div>
          <div className="particle particle--5"></div>
        </div>
      </div>
    </section>
  );
};

export default Advert;
