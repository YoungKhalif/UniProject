import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
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
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const preBuiltSystems = [
    {
      id: 1,
      name: "Intel i5-13100 Gaming PC Special 4",
      price: "$2,570.00",
      image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop&crop=center",
      specs: [
        "Intel Core i5-13100",
        "NVIDIA RTX 4060 Ti",
        "16GB DDR4 RAM",
        "500GB NVMe SSD",
        "650W 80+ Gold PSU"
      ],
      category: "mid-range",
      processor: "intel",
      gpu: "rtx-4060-ti",
      ram: "16gb",
      storage: "500gb"
    },
    {
      id: 2,
      name: "AMD AM5 Series AM7X GT Elite PC",
      price: "$3,700.00",
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop&crop=center",
      specs: [
        "AMD Ryzen 7 7700X",
        "NVIDIA RTX 4070 Ti",
        "32GB DDR5 RAM",
        "1TB NVMe SSD",
        "850W 80+ Gold PSU"
      ],
      category: "high-end",
      processor: "amd",
      gpu: "rtx-4070-ti",
      ram: "32gb",
      storage: "1tb"
    },
    {
      id: 3,
      name: "Intel i7-13700K Gaming PC Special 4",
      price: "$4,320.00",
      image: "https://images.unsplash.com/photo-1591238371432-37633bfe69ae?w=400&h=400&fit=crop&crop=center",
      specs: [
        "Intel Core i7-13700K",
        "NVIDIA RTX 4080",
        "32GB DDR5 RAM",
        "1TB NVMe SSD",
        "1000W 80+ Platinum PSU"
      ],
      category: "premium",
      processor: "intel",
      gpu: "rtx-4080",
      ram: "32gb",
      storage: "1tb"
    },
    {
      id: 4,
      name: "Magic Intel RTX AMD Ryzen 5 Business Pro",
      price: "$600.00",
      image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=400&fit=crop&crop=center",
      specs: [
        "AMD Ryzen 5 5600G",
        "Integrated Graphics",
        "16GB DDR4 RAM",
        "256GB NVMe SSD",
        "450W 80+ Bronze PSU"
      ],
      category: "budget",
      processor: "amd",
      gpu: "integrated",
      ram: "16gb",
      storage: "256gb"
    },
    {
      id: 5,
      name: "Intel i9-13900K Gaming PC Special 1",
      price: "$620.00",
      image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=400&fit=crop&crop=center",
      specs: [
        "Intel Core i9-13900K",
        "NVIDIA RTX 4090",
        "64GB DDR5 RAM",
        "2TB NVMe SSD",
        "1200W 80+ Titanium PSU"
      ],
      category: "extreme",
      processor: "intel",
      gpu: "rtx-4090",
      ram: "64gb",
      storage: "2tb"
    },
    {
      id: 6,
      name: "Compact Gaming RTX 4070 Mini ITX",
      price: "$870.00",
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop&crop=center",
      specs: [
        "AMD Ryzen 5 7600X",
        "NVIDIA RTX 4070",
        "32GB DDR5 RAM",
        "1TB NVMe SSD",
        "750W SFX PSU"
      ],
      category: "compact",
      processor: "amd",
      gpu: "rtx-4070",
      ram: "32gb",
      storage: "1tb"
    },
    {
      id: 7,
      name: "Creator Pro RTX 4080 Workstation",
      price: "$1999.00",
      image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=400&fit=crop&crop=center",
      specs: [
        "Intel Core i7-13700K",
        "NVIDIA RTX 4080",
        "64GB DDR5 RAM",
        "2TB NVMe SSD",
        "1000W 80+ Gold PSU"
      ],
      category: "workstation",
      processor: "intel",
      gpu: "rtx-4080",
      ram: "64gb",
      storage: "2tb"
    },
    {
      id: 8,
      name: "Budget Starter Gaming PC",
      price: "$590.00",
      image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop&crop=center",
      specs: [
        "Intel Core i5-12400F",
        "NVIDIA GTX 1660 Super",
        "16GB DDR4 RAM",
        "500GB SATA SSD",
        "600W 80+ Bronze PSU"
      ],
      category: "budget",
      processor: "intel",
      gpu: "gtx-1660",
      ram: "16gb",
      storage: "500gb"
    },
    {
      id: 9,
      name: "Ultimate Gaming Beast RTX 4090",
      price: "$1280.00",
      image: "https://images.unsplash.com/photo-1591238371432-37633bfe69ae?w=400&h=400&fit=crop&crop=center",
      specs: [
        "Intel Core i9-13900KS",
        "NVIDIA RTX 4090",
        "128GB DDR5 RAM",
        "4TB NVMe SSD",
        "1600W 80+ Titanium PSU"
      ],
      category: "extreme",
      processor: "intel",
      gpu: "rtx-4090",
      ram: "128gb",
      storage: "4tb"
    }
  ];

  const filterOptions = {
    priceRange: [
      { value: '', label: 'All Prices' },
      { value: '0-1000', label: 'Under $1,000' },
      { value: '1000-2000', label: '$1,000 - $2,000' },
      { value: '2000-4000', label: '$2,000 - $4,000' },
      { value: '4000+', label: '$4,000+' }
    ],
    processor: [
      { value: '', label: 'All Processors' },
      { value: 'intel', label: 'Intel' },
      { value: 'amd', label: 'AMD' }
    ],
    gpu: [
      { value: '', label: 'All GPUs' },
      { value: 'integrated', label: 'Integrated' },
      { value: 'gtx-1660', label: 'GTX 1660' },
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
      { value: '256gb', label: '256GB' },
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
    navigate('/cart');
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
    <>
      <Header />
      <div className={`prebuilt-systems ${isVisible ? 'prebuilt-systems--visible' : ''}`}>
        <div className="prebuilt-container">
          {/* Sidebar Filters */}
          <aside className="filters-sidebar">
            <div className="filters-header">
              <h3 className="filters-title">PROCESSORS</h3>
            </div>
            <div className="filter-section">
              <div className="filter-group">
                {filterOptions.processor.slice(1).map(option => (
                  <label key={option.value} className="filter-option">
                    <input
                      type="radio"
                      name="processor"
                      value={option.value}
                      checked={selectedFilters.processor === option.value}
                      onChange={(e) => handleFilterChange('processor', e.target.value)}
                      className="filter-radio"
                    />
                    <span className="filter-label">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filters-header">
              <h3 className="filters-title">GPU</h3>
            </div>
            <div className="filter-section">
              <div className="filter-group">
                {filterOptions.gpu.slice(1).map(option => (
                  <label key={option.value} className="filter-option">
                    <input
                      type="radio"
                      name="gpu"
                      value={option.value}
                      checked={selectedFilters.gpu === option.value}
                      onChange={(e) => handleFilterChange('gpu', e.target.value)}
                      className="filter-radio"
                    />
                    <span className="filter-label">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filters-header">
              <h3 className="filters-title">PRICE RANGE</h3>
            </div>
            <div className="filter-section">
              <div className="filter-group">
                {filterOptions.priceRange.slice(1).map(option => (
                  <label key={option.value} className="filter-option">
                    <input
                      type="radio"
                      name="priceRange"
                      value={option.value}
                      checked={selectedFilters.priceRange === option.value}
                      onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                      className="filter-radio"
                    />
                    <span className="filter-label">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filters-header">
              <h3 className="filters-title">RAM / STORAGE</h3>
            </div>
            <div className="filter-section">
              <div className="filter-group">
                {filterOptions.ram.slice(1).map(option => (
                  <label key={option.value} className="filter-option">
                    <input
                      type="radio"
                      name="ram"
                      value={option.value}
                      checked={selectedFilters.ram === option.value}
                      onChange={(e) => handleFilterChange('ram', e.target.value)}
                      className="filter-radio"
                    />
                    <span className="filter-label">{option.label} RAM</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="products-main">
            {/* Products Grid */}
            <div className="products-grid">
              {filteredSystems.map((system, index) => (
                <div 
                  key={system.id}
                  className={`product-card ${hoveredProduct === system.id ? 'product-card--hovered' : ''}`}
                  onMouseEnter={() => setHoveredProduct(system.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="product-image-container">
                    <img 
                      src={system.image} 
                      alt={system.name}
                      className="product-image"
                    />
                    <div className="product-price-tag">
                      {system.price}
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

                    <button 
                      className="btn-add-to-cart"
                      onClick={() => handleAddToCart(system)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>

        {/* Background Elements */}
        <div className="page-background">
          <div className="bg-circle bg-circle--1"></div>
          <div className="bg-circle bg-circle--2"></div>
          <div className="bg-circle bg-circle--3"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PreBuiltSystem;
