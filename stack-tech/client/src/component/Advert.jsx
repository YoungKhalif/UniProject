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
                    src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center" 
                    alt="Gaming Chair" 
                    className="product-image"
                  />
                </div>
                <div className="product-item__glow"></div>
              </div>
              
              {/* Motherboard 1 */}
              <div className="product-item product-item--motherboard-1">
                <div className="product-item__image">
                  <img 
                    src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop&crop=center" 
                    alt="ASUS Motherboard" 
                    className="product-image"
                  />
                </div>
                <div className="product-item__glow"></div>
              </div>
              
              {/* Motherboard 2 */}
              <div className="product-item product-item--motherboard-2">
                <div className="product-item__image">
                  <img 
                    src="https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop&crop=center" 
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
          <div className="bg-gradient bg-gradient--1"></div>
          <div className="bg-gradient bg-gradient--2"></div>
        </div>
      </div>
    </section>
  );
};

export default Advert;
