import React, { useState, useEffect } from 'react';
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
  const [totalPrice, setTotalPrice] = useState(0);
  const [expandedSection, setExpandedSection] = useState('cpu');

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

  const steps = [
    { id: 'cpu', name: 'CPU', icon: '⚡' },
    { id: 'motherboard', name: 'Motherboard', icon: '🔌' },
    { id: 'gpu', name: 'GPU', icon: '🎮' },
    { id: 'ram', name: 'RAM', icon: '💾' },
    { id: 'storage', name: 'Storage', icon: '💿' },
    { id: 'psu', name: 'PSU', icon: '🔋' },
    { id: 'case', name: 'Case', icon: '📦' },
    { id: 'cooling', name: 'Cooling', icon: '❄️' }
  ];

  const componentData = {
    cpu: [
      {
        id: 1,
        name: "Intel Core i5-13400F - 6-Core 4.6GHz",
        price: 200.00,
        image: "/api/placeholder/80/80",
        specs: ["6 Cores / 12 Threads", "Base: 2.5GHz, Boost: 4.6GHz", "20MB L3 Cache", "LGA 1700 Socket"],
        compatible: true
      },
      {
        id: 2,
        name: "AMD Ryzen 5 4700 - Octa-Core Budget Option",
        price: 179.00,
        image: "/api/placeholder/80/80",
        specs: ["8 Cores / 8 Threads", "Base: 3.6GHz, Boost: 4.0GHz", "8MB L3 Cache", "AM4 Socket"],
        compatible: true
      },
      {
        id: 3,
        name: "Intel Pentium Gold G7400 - Budget Dual-Core CPU",
        price: 89.99,
        image: "/api/placeholder/80/80",
        specs: ["2 Cores / 4 Threads", "Base: 3.7GHz", "4MB L3 Cache", "LGA 1700 Socket"],
        compatible: true
      }
    ],
    motherboard: [
      {
        id: 1,
        name: "ASUS Prime B660M-A D4 - Micro-ATX, LGA1700",
        price: 129.99,
        image: "/api/placeholder/80/80",
        specs: ["LGA 1700 Socket", "DDR4 Memory", "PCIe 5.0 x16", "USB 3.2 Gen 2"],
        compatible: true
      },
      {
        id: 2,
        name: "Gigabyte B760 Gaming X AX - LGA1700, WiFi 6",
        price: 159.99,
        image: "/api/placeholder/80/80",
        specs: ["LGA 1700 Socket", "DDR5 Memory", "WiFi 6E", "RGB Lighting"],
        compatible: true
      },
      {
        id: 3,
        name: "MSI MAG B660M Mortar - LGA1700, DDR4 Support",
        price: 149.99,
        image: "/api/placeholder/80/80",
        specs: ["LGA 1700 Socket", "DDR4 Memory", "PCIe 5.0", "USB-C Header"],
        compatible: true
      }
    ],
    gpu: [
      {
        id: 1,
        name: "NVIDIA GeForce RTX 4060 Ti - 16GB GDDR6X",
        price: 499.99,
        image: "/api/placeholder/80/80",
        specs: ["16GB GDDR6X", "128-bit Memory Bus", "2535 MHz Boost Clock", "DLSS 3.0"],
        compatible: true
      },
      {
        id: 2,
        name: "AMD Radeon RX 7600 - 8GB GDDR6",
        price: 299.99,
        image: "/api/placeholder/80/80",
        specs: ["8GB GDDR6", "128-bit Memory Bus", "2655 MHz Game Clock", "Ray Tracing"],
        compatible: true
      },
      {
        id: 3,
        name: "NVIDIA GeForce RTX 4070 - 12GB GDDR6X",
        price: 599.99,
        image: "/api/placeholder/80/80",
        specs: ["12GB GDDR6X", "192-bit Memory Bus", "2475 MHz Boost Clock", "AV1 Encoding"],
        compatible: true
      }
    ],
    ram: [
      {
        id: 1,
        name: "Corsair Vengeance LPX 16GB DDR4-3200",
        price: 79.99,
        image: "/api/placeholder/80/80",
        specs: ["16GB Kit (2x8GB)", "DDR4-3200", "CL16 Latency", "Black Heat Spreader"],
        compatible: true
      },
      {
        id: 2,
        name: "G.Skill Ripjaws V 32GB DDR4-3600",
        price: 139.99,
        image: "/api/placeholder/80/80",
        specs: ["32GB Kit (2x16GB)", "DDR4-3600", "CL16 Latency", "Red Heat Spreader"],
        compatible: true
      }
    ],
    storage: [
      {
        id: 1,
        name: "Samsung 970 EVO Plus 1TB NVMe SSD",
        price: 89.99,
        image: "/api/placeholder/80/80",
        specs: ["1TB Capacity", "NVMe M.2", "3,500 MB/s Read", "5 Year Warranty"],
        compatible: true
      },
      {
        id: 2,
        name: "WD Black SN850X 2TB NVMe SSD",
        price: 199.99,
        image: "/api/placeholder/80/80",
        specs: ["2TB Capacity", "NVMe M.2", "7,300 MB/s Read", "Game Mode"],
        compatible: true
      }
    ],
    psu: [
      {
        id: 1,
        name: "Corsair RM750x 750W 80+ Gold Modular",
        price: 129.99,
        image: "/api/placeholder/80/80",
        specs: ["750W Power", "80+ Gold Certified", "Fully Modular", "10 Year Warranty"],
        compatible: true
      }
    ],
    case: [
      {
        id: 1,
        name: "Fractal Design Core 1000 Micro ATX Case",
        price: 49.99,
        image: "/api/placeholder/80/80",
        specs: ["Micro ATX Support", "2x USB 3.0", "Tool-free Installation", "Cable Management"],
        compatible: true
      }
    ],
    cooling: [
      {
        id: 1,
        name: "Cooler Master Hyper 212 RGB Black Edition",
        price: 49.99,
        image: "/api/placeholder/80/80",
        specs: ["Direct Contact Heatpipes", "RGB Lighting", "120mm Fan", "Universal Socket"],
        compatible: true
      }
    ]
  };

  const handleComponentSelect = (componentType, component) => {
    setSelectedComponents(prev => ({
      ...prev,
      [componentType]: component
    }));
  };

  const handleSectionToggle = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const getCompatibilityStatus = (component) => {
    // This would contain actual compatibility logic
    return component.compatible ? 'compatible' : 'incompatible';
  };

  return (
    <div className={`custom-build-configurator ${isVisible ? 'configurator--visible' : ''}`}>
      {/* Header */}
      <div className="configurator-header">
        <div className="configurator-header__container">
          <h1 className="configurator-title">
            <span className="title-line">Custom Build</span>
            <span className="title-line title-line--accent">Configurator</span>
          </h1>
          
          {/* Progress Steps */}
          <div className="progress-steps">
            {steps.map((step) => (
              <div 
                key={step.id}
                className={`progress-step ${selectedComponents[step.id] ? 'progress-step--completed' : ''} ${expandedSection === step.id ? 'progress-step--active' : ''}`}
              >
                <div className="step-icon">{step.icon}</div>
                <span className="step-name">{step.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="configurator-content">
        <div className="configurator-container">
          {/* Left Side - Component Selection */}
          <div className="component-selection">
            {Object.entries(componentData).map(([componentType, components]) => (
              <div 
                key={componentType}
                className={`component-section ${expandedSection === componentType ? 'component-section--expanded' : ''}`}
              >
                <div 
                  className="component-section-header"
                  onClick={() => handleSectionToggle(componentType)}
                >
                  <h3 className="section-title">
                    Select your {componentType.toUpperCase()}
                  </h3>
                  <div className="section-toggle">
                    <span className="toggle-icon">
                      {expandedSection === componentType ? '−' : '+'}
                    </span>
                  </div>
                </div>

                {expandedSection === componentType && (
                  <div className="component-list">
                    <div className="component-list-header">
                      <span className="header-product">Product</span>
                      <span className="header-view">View</span>
                      <span className="header-price">Price</span>
                      <span className="header-add">Add/Select</span>
                    </div>

                    {components.map((component) => (
                      <div 
                        key={component.id}
                        className={`component-item ${selectedComponents[componentType]?.id === component.id ? 'component-item--selected' : ''}`}
                      >
                        <div className="component-image">
                          <img 
                            src={component.image} 
                            alt={component.name}
                            className="item-image"
                          />
                        </div>

                        <div className="component-info">
                          <h4 className="component-name">{component.name}</h4>
                          <div className="component-specs">
                            {component.specs.map((spec, index) => (
                              <span key={index} className="spec-item">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="component-view">
                          <button className="btn btn--view">View</button>
                        </div>

                        <div className="component-price">
                          <span className="price-amount">{formatPrice(component.price)}</span>
                        </div>

                        <div className="component-add">
                          <button 
                            className={`btn btn--add ${selectedComponents[componentType]?.id === component.id ? 'btn--selected' : ''}`}
                            onClick={() => handleComponentSelect(componentType, component)}
                          >
                            {selectedComponents[componentType]?.id === component.id ? (
                              <span className="add-icon">✓</span>
                            ) : (
                              <span className="add-icon">+</span>
                            )}
                          </button>
                        </div>

                        <div className="component-compatibility">
                          <div className={`compatibility-indicator compatibility-indicator--${getCompatibilityStatus(component)}`}>
                            {getCompatibilityStatus(component) === 'compatible' ? '✓' : '✗'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side - Build Summary */}
          <div className="build-summary">
            <div className="summary-card">
              <div className="summary-header">
                <h3 className="summary-title">Your Build</h3>
                <div className="total-price">
                  <span className="price-label">Total Price:</span>
                  <span className="price-amount">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <div className="summary-tabs">
                <button className="tab-button tab-button--active">Your Build</button>
                <button className="tab-button">Performance Summary</button>
                <button className="tab-button">Compatibility</button>
                <button className="tab-button">Save Configuration</button>
              </div>

              <div className="selected-components">
                {Object.entries(selectedComponents).map(([componentType, component]) => (
                  <div key={componentType} className="selected-component">
                    <div className="component-type">
                      {componentType.toUpperCase()}
                    </div>
                    <div className="component-details">
                      {component ? (
                        <>
                          <span className="component-name">{component.name}</span>
                          <span className="component-price">{formatPrice(component.price)}</span>
                        </>
                      ) : (
                        <span className="component-placeholder">Not selected</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-actions">
                <button className="btn btn--primary btn--large">Add to Cart</button>
                <button className="btn btn--secondary btn--large">Save Configuration</button>
                <button className="btn btn--tertiary btn--large">Get Quote</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="configurator-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h4>Stack Technologies</h4>
          </div>
          <div className="footer-social">
            <a href="#" className="social-link">📧</a>
            <a href="#" className="social-link">📘</a>
            <a href="#" className="social-link">🐦</a>
          </div>
          <div className="footer-info">
            <p>Contact Us</p>
            <p>Custom PC Builder</p>
            <p>Phone: (555) 123-4567</p>
          </div>
        </div>
      </footer>

      {/* Background Elements */}
      <div className="page-background">
        <div className="bg-element bg-element--1"></div>
        <div className="bg-element bg-element--2"></div>
      </div>
    </div>
  );
};

export default CustomBuildConfigurator;
