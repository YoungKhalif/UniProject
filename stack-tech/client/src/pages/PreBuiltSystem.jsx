import React, { useState, useEffect } from 'react';
import './PreBuiltSystem.css';

const PreBuiltSystem = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: '',
    processor: '',
    gpu: '',
    ram: '',
    storage: ''
  });
  const [sortBy, setSortBy] = useState('featured');
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const preBuiltSystems = [
    {
      id: 1,
      name: "Intel i7-13700KF Desktop Box CPU RTX 4070 Ti",
      price: "$3,299.00",
      originalPrice: "$3,599.00",
      image: "/api/placeholder/300/300",
      specs: [
        "Intel Core i7-13700KF",
        "NVIDIA RTX 4070 Ti 12GB",
        "32GB DDR5 RAM",
        "1TB NVMe SSD",
        "850W 80+ Gold PSU",
        "RGB Lighting"
      ],
      category: "high-end",
      processor: "intel",
      gpu: "rtx-4070-ti",
      ram: "32gb",
      storage: "1tb",
      badge: "BESTSELLER"
    },
    {
      id: 2,
      name: "AMD AM5 Ryzen 5 7600X RTX 4060 Ti",
      price: "$2,799.00",
      originalPrice: "$3,099.00",
      image: "/api/placeholder/300/300",
      specs: [
        "AMD Ryzen 5 7600X",
        "NVIDIA RTX 4060 Ti 16GB",
        "16GB DDR5 RAM",
        "1TB NVMe SSD",
        "750W 80+ Gold PSU",
        "Tempered Glass"
      ],
      category: "mid-range",
      processor: "amd",
      gpu: "rtx-4060-ti",
      ram: "16gb",
      storage: "1tb",
      badge: "POPULAR"
    },
    {
      id: 3,
      name: "Intel i5-13400F RTX 4060 Gaming Desktop",
      price: "$2,299.00",
      originalPrice: "$2,599.00",
      image: "/api/placeholder/300/300",
      specs: [
        "Intel Core i5-13400F",
        "NVIDIA RTX 4060 8GB",
        "16GB DDR4 RAM",
        "500GB NVMe SSD",
        "650W 80+ Bronze PSU",
        "RGB Fans"
      ],
      category: "budget",
      processor: "intel",
      gpu: "rtx-4060",
      ram: "16gb",
      storage: "500gb",
      badge: "VALUE"
    },
    {
      id: 4,
      name: "Magic Ultra RTX 4090 Supreme Gaming Build",
      price: "$4,999.00",
      originalPrice: "$5,499.00",
      image: "/api/placeholder/300/300",
      specs: [
        "Intel Core i9-13900KF",
        "NVIDIA RTX 4090 24GB",
        "64GB DDR5 RAM",
        "2TB NVMe SSD",
        "1000W 80+ Platinum PSU",
        "Custom Loop Cooling"
      ],
      category: "premium",
      processor: "intel",
      gpu: "rtx-4090",
      ram: "64gb",
      storage: "2tb",
      badge: "FLAGSHIP"
    },
    {
      id: 5,
      name: "AMD Ryzen 7 7800X3D RTX 4070 Gaming PC",
      price: "$3,599.00",
      originalPrice: "$3,899.00",
      image: "/api/placeholder/300/300",
      specs: [
        "AMD Ryzen 7 7800X3D",
        "NVIDIA RTX 4070 12GB",
        "32GB DDR5 RAM",
        "1TB NVMe SSD",
        "850W 80+ Gold PSU",
        "AIO Liquid Cooling"
      ],
      category: "high-end",
      processor: "amd",
      gpu: "rtx-4070",
      ram: "32gb",
      storage: "1tb",
      badge: "GAMING"
    },
    {
      id: 6,
      name: "Budget Builder RTX 4060 Starter System",
      price: "$1,899.00",
      originalPrice: "$2,199.00",
      image: "/api/placeholder/300/300",
      specs: [
        "Intel Core i5-12400F",
        "NVIDIA RTX 4060 8GB",
        "16GB DDR4 RAM",
        "500GB NVMe SSD",
        "600W 80+ Bronze PSU",
        "Standard Cooling"
      ],
      category: "budget",
      processor: "intel",
      gpu: "rtx-4060",
      ram: "16gb",
      storage: "500gb",
      badge: "STARTER"
    },
    {
      id: 7,
      name: "Creator Pro RTX 4080 Workstation",
      price: "$4,299.00",
      originalPrice: "$4,699.00",
      image: "/api/placeholder/300/300",
      specs: [
        "Intel Core i7-13700K",
        "NVIDIA RTX 4080 16GB",
        "64GB DDR5 RAM",
        "2TB NVMe SSD",
        "1000W 80+ Gold PSU",
        "Silent Cooling"
      ],
      category: "workstation",
      processor: "intel",
      gpu: "rtx-4080",
      ram: "64gb",
      storage: "2tb",
      badge: "CREATOR"
    },
    {
      id: 8,
      name: "Compact Gaming RTX 4070 Mini ITX",
      price: "$2,999.00",
      originalPrice: "$3,299.00",
      image: "/api/placeholder/300/300",
      specs: [
        "AMD Ryzen 5 7600X",
        "NVIDIA RTX 4070 12GB",
        "32GB DDR5 RAM",
        "1TB NVMe SSD",
        "750W SFX PSU",
        "Mini ITX Form"
      ],
      category: "compact",
      processor: "amd",
      gpu: "rtx-4070",
      ram: "32gb",
      storage: "1tb",
      badge: "COMPACT"
    },
    {
      id: 9,
      name: "Extreme Gaming RTX 4090 Ultimate",
      price: "$5,999.00",
      originalPrice: "$6,499.00",
      image: "/api/placeholder/300/300",
      specs: [
        "Intel Core i9-13900KS",
        "NVIDIA RTX 4090 24GB",
        "128GB DDR5 RAM",
        "4TB NVMe SSD",
        "1200W 80+ Titanium PSU",
        "Custom RGB Loop"
      ],
      category: "extreme",
      processor: "intel",
      gpu: "rtx-4090",
      ram: "128gb",
      storage: "4tb",
      badge: "EXTREME"
    }
  ];

  const filterOptions = {
    priceRange: [
      { value: '', label: 'All Prices' },
      { value: '0-2000', label: 'Under $2,000' },
      { value: '2000-3000', label: '$2,000 - $3,000' },
      { value: '3000-5000', label: '$3,000 - $5,000' },
      { value: '5000+', label: '$5,000+' }
    ],
    processor: [
      { value: '', label: 'All Processors' },
      { value: 'intel', label: 'Intel' },
      { value: 'amd', label: 'AMD' }
    ],
    gpu: [
      { value: '', label: 'All GPUs' },
      { value: 'rtx-4060', label: 'RTX 4060' },
      { value: 'rtx-4060-ti', label: 'RTX 4060 Ti' },
      { value: 'rtx-4070', label: 'RTX 4070' },
      { value: 'rtx-4070-ti', label: 'RTX 4070 Ti' },
      { value: 'rtx-4080', label: 'RTX 4080' },
      { value: 'rtx-4090', label: 'RTX 4090' }
    ],
    ram: [
      { value: '', label: 'All RAM' },
      { value: '16gb', label: '16GB' },
      { value: '32gb', label: '32GB' },
      { value: '64gb', label: '64GB' },
      { value: '128gb', label: '128GB' }
    ],
    storage: [
      { value: '', label: 'All Storage' },
      { value: '500gb', label: '500GB' },
      { value: '1tb', label: '1TB' },
      { value: '2tb', label: '2TB' },
      { value: '4tb', label: '4TB' }
    ]
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    // Add to cart logic here
  };

  const filteredSystems = preBuiltSystems.filter(system => {
    // Price range filter
    if (selectedFilters.priceRange) {
      const price = parseFloat(system.price.replace('$', '').replace(',', ''));
      const [min, max] = selectedFilters.priceRange.split('-').map(p => p === '' ? Infinity : parseFloat(p));
      if (max && (price < min || price > max)) return false;
      if (!max && price < min) return false;
    }

    // Other filters
    if (selectedFilters.processor && system.processor !== selectedFilters.processor) return false;
    if (selectedFilters.gpu && system.gpu !== selectedFilters.gpu) return false;
    if (selectedFilters.ram && system.ram !== selectedFilters.ram) return false;
    if (selectedFilters.storage && system.storage !== selectedFilters.storage) return false;

    return true;
  });

  return (
    <div className={`prebuilt-systems ${isVisible ? 'prebuilt-systems--visible' : ''}`}>
      {/* Header Section */}
      <section className="prebuilt-header">
        <div className="prebuilt-header__container">
          <h1 className="prebuilt-header__title">
            <span className="title-line">Pre-Built</span>
            <span className="title-line title-line--accent">Gaming Systems</span>
          </h1>
          <p className="prebuilt-header__subtitle">
            Expertly crafted gaming PCs ready to dominate any battlefield
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="filters-section">
        <div className="filters-container">
          <div className="filters-grid">
            {Object.entries(filterOptions).map(([filterType, options]) => (
              <div key={filterType} className="filter-group">
                <select
                  value={selectedFilters[filterType]}
                  onChange={(e) => handleFilterChange(filterType, e.target.value)}
                  className="filter-select"
                >
                  {options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          
          <div className="sort-controls">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="products-container">
          <div className="products-grid">
            {filteredSystems.map((system, index) => (
              <div 
                key={system.id}
                className={`product-card ${hoveredProduct === system.id ? 'product-card--hovered' : ''}`}
                onMouseEnter={() => setHoveredProduct(system.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {system.badge && (
                  <div className={`product-badge product-badge--${system.badge.toLowerCase()}`}>
                    {system.badge}
                  </div>
                )}
                
                <div className="product-image-container">
                  <img 
                    src={system.image} 
                    alt={system.name}
                    className="product-image"
                  />
                  <div className="product-overlay">
                    <button className="btn btn--quick-view">Quick View</button>
                    <button className="btn btn--compare">Compare</button>
                  </div>
                </div>

                <div className="product-info">
                  <h3 className="product-name">{system.name}</h3>
                  
                  <div className="product-specs">
                    {system.specs.map((spec, specIndex) => (
                      <div key={specIndex} className="spec-item">
                        <span className="spec-bullet">•</span>
                        <span className="spec-text">{spec}</span>
                      </div>
                    ))}
                  </div>

                  <div className="product-pricing">
                    <div className="pricing-info">
                      <span className="current-price">{system.price}</span>
                      {system.originalPrice && (
                        <span className="original-price">{system.originalPrice}</span>
                      )}
                    </div>
                    <div className="savings">
                      {system.originalPrice && (
                        <span className="savings-amount">
                          Save ${(parseFloat(system.originalPrice.replace('$', '').replace(',', '')) - 
                                parseFloat(system.price.replace('$', '').replace(',', ''))).toFixed(0)}
                        </span>
                      )}
                    </div>
                  </div>

                  <button 
                    className="btn btn--add-to-cart"
                    onClick={() => handleAddToCart(system)}
                  >
                    Add to Cart
                  </button>
                </div>

                <div className="product-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Background Elements */}
      <div className="page-background">
        <div className="bg-element bg-element--1"></div>
        <div className="bg-element bg-element--2"></div>
        <div className="bg-element bg-element--3"></div>
      </div>
    </div>
  );
};

export default PreBuiltSystem;
