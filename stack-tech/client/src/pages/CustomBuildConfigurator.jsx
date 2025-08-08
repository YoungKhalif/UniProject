import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import './CustomBuildConfigurator.css';

const CustomBuildConfigurator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState({
    cpu: null,
    motherboard: null,
    gpu: null,
    ram: null,
    storage: null,
    psu: null,
    case: null,
    cooling: null
  });
  const [totalPrice, setTotalPrice] = useState(5089.00);
  const [performanceRating, setPerformanceRating] = useState(85);
  const [compatibilityScore, setCompatibilityScore] = useState(95);
  const [selectedCategory, setSelectedCategory] = useState('cpu');
  const navigate = useNavigate();

  const componentData = {
    cpu: [
      {
        id: 1,
        name: "Intel Core i9-13700KF - 8-Core 4.6GHz",
        price: 800.00,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&h=200&fit=crop&crop=center",
        specs: ["8 Cores / 16 Threads", "Base: 3.4GHz, Boost: 4.6GHz", "30MB L3 Cache", "LGA 1700 Socket"],
        compatible: true
      },
      {
        id: 2,
        name: "AMD Ryzen 3 4100 - Quad-Core Budget Option",
        price: 675.00,
        image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=300&h=200&fit=crop&crop=center",
        specs: ["4 Cores / 8 Threads", "Base: 3.8GHz, Boost: 4.0GHz", "4MB L3 Cache", "AM4 Socket"],
        compatible: true
      },
      {
        id: 3,
        name: "Intel Pentium Gold G7400 - Budget Dual-Core CPU",
        price: 699.99,
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300&h=200&fit=crop&crop=center",
        specs: ["2 Cores / 4 Threads", "Base: 3.7GHz", "4MB L3 Cache", "LGA 1700 Socket"],
        compatible: true
      }
    ],
    motherboard: [
      {
        id: 1,
        name: "ASUS Prime B660M A D4 - Micro-ATX, LGA1700",
        price: 2099.00,
        image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=300&h=200&fit=crop&crop=center",
        specs: ["LGA 1700 Socket", "DDR4 Memory", "PCIe 5.0 x16", "USB 3.2 Gen 2"],
        compatible: true
      },
      {
        id: 2,
        name: "Gigabyte B760 Gaming X AX - LGA1700, Wi-Fi 6",
        price: 597.00,
        image: "https://images.unsplash.com/photo-1591238371432-37633bfe69ae?w=300&h=200&fit=crop&crop=center",
        specs: ["LGA 1700 Socket", "DDR5 Memory", "WiFi 6E", "RGB Lighting"],
        compatible: true
      },
      {
        id: 3,
        name: "MSI MAG B660M Mortar - LGA1700, DDR4 Support",
        price: 800.99,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&h=200&fit=crop&crop=center",
        specs: ["LGA 1700 Socket", "DDR4 Memory", "PCIe 5.0", "USB-C Header"],
        compatible: true
      }
    ]
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Calculate total price when components change
    const total = Object.values(selectedComponents)
      .filter(component => component !== null)
      .reduce((sum, component) => sum + component.price, 0);
    setTotalPrice(total);
  }, [selectedComponents]);

  const handleComponentSelect = (category, component) => {
    setSelectedComponents(prev => ({
      ...prev,
      [category]: component
    }));
    
    // Update performance and compatibility scores based on selection
    setPerformanceRating(prev => Math.min(100, prev + 5));
    setCompatibilityScore(prev => Math.max(90, prev - 1));
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = () => {
    // Navigate to cart with selected build
    navigate('/cart', { state: { customBuild: selectedComponents, totalPrice } });
  };

  const renderComponentCard = (component, category) => (
    <div 
      key={component.id} 
      className={`component-card ${selectedComponents[category]?.id === component.id ? 'selected' : ''}`}
      onClick={() => handleComponentSelect(category, component)}
    >
      <div className="component-image">
        <img src={component.image} alt={component.name} />
      </div>
      <div className="component-info">
        <h4>{component.name}</h4>
        <div className="component-specs">
          {component.specs.map((spec, index) => (
            <span key={index} className="spec-item">{spec}</span>
          ))}
        </div>
      </div>
      <div className="component-price">
        R{component.price.toFixed(2)}
      </div>
      <button className="add-product-btn">
        {selectedComponents[category]?.id === component.id ? '✓' : '+'}
      </button>
      <div className={`compatibility-badge ${component.compatible ? 'compatible' : 'incompatible'}`}>
        {component.compatible ? '✓ Compatible' : '⚠ Incompatible'}
      </div>
    </div>
  );

  return (
    <div className="custom-build-configurator">
      <Header />
      
      {/* Top Navigation Bar */}
      <div className="build-nav-bar">
        <div className="build-stats">
          <div className="stat-item">
            <span className="stat-label">Total Price:</span>
            <span className="stat-value">R{totalPrice.toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Performance:</span>
            <span className="stat-value">{performanceRating}/100</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Compatibility:</span>
            <span className="stat-value">{compatibilityScore}%</span>
          </div>
        </div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add Build to Cart
        </button>
      </div>

      <div className={`configurator-container ${isVisible ? 'visible' : ''}`}>
        {/* Left Sidebar - Component Categories */}
        <div className="component-categories">
          <h3>Build Components</h3>
          {Object.keys(componentData).map((category) => (
            <div 
              key={category}
              className={`category-item ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategorySelect(category)}
            >
              <div className="category-icon">
                {category === 'cpu' && '🔧'}
                {category === 'motherboard' && '🔲'}
              </div>
              <span className="category-name">
                {category.toUpperCase().replace('_', ' ')}
              </span>
              {selectedComponents[category] && (
                <div className="selected-indicator">✓</div>
              )}
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="component-selection-area">
          <div className="section-header">
            <h2>Select {selectedCategory.toUpperCase()}</h2>
            <p>Choose the best {selectedCategory} for your build</p>
          </div>

          <div className="components-grid">
            {componentData[selectedCategory]?.map((component) => 
              renderComponentCard(component, selectedCategory)
            )}
          </div>
        </div>

        {/* Right Sidebar - Build Summary */}
        <div className="build-summary">
          <h3>Your Build</h3>
          <div className="selected-components">
            {Object.entries(selectedComponents).map(([category, component]) => (
              <div key={category} className="summary-item">
                <div className="summary-category">{category.toUpperCase()}</div>
                {component ? (
                  <div className="summary-component">
                    <div className="summary-name">{component.name}</div>
                    <div className="summary-price">R{component.price.toFixed(2)}</div>
                  </div>
                ) : (
                  <div className="summary-empty">Not selected</div>
                )}
              </div>
            ))}
          </div>

          <div className="build-total">
            <div className="total-line">
              <span>Total: R{totalPrice.toFixed(2)}</span>
            </div>
            <div className="performance-bars">
              <div className="performance-item">
                <span>Performance</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{width: `${performanceRating}%`}}
                  ></div>
                </div>
                <span>{performanceRating}%</span>
              </div>
              <div className="performance-item">
                <span>Compatibility</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill compatibility" 
                    style={{width: `${compatibilityScore}%`}}
                  ></div>
                </div>
                <span>{compatibilityScore}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomBuildConfigurator;
