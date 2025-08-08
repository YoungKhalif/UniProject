import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import './Accessories.css';

// Product data matching the reference image
const products = [
  {
    id: 1,
    name: 'Gaming Laptop',
    price: 2600.00,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Laptops',
    compatibility: 'Works with AMD builds',
    rating: 4.8,
    reviews: 245
  },
  {
    id: 2,
    name: 'Acer Predator XB271HU',
    price: 1199.00,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Monitors',
    compatibility: 'Works with AMD builds',
    rating: 4.7,
    reviews: 189
  },
  {
    id: 3,
    name: 'XPG Gaming Keyboard GAMER BOARD',
    price: 259.00,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Keyboards',
    compatibility: 'Works with AMD builds',
    rating: 4.6,
    reviews: 324
  },
  {
    id: 4,
    name: 'Logitech G233 Prodigy Gaming Headset',
    price: 459.00,
    image: 'https://images.unsplash.com/photo-1599669454699-248893623440?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Audio',
    compatibility: 'Works with AMD builds',
    rating: 4.5,
    reviews: 156
  },
  {
    id: 5,
    name: 'TPBeats Bluetooth Wireless Speaker',
    price: 699.00,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Audio',
    compatibility: 'Works with AMD builds',
    rating: 4.4,
    reviews: 98
  },
  {
    id: 6,
    name: 'X7 Optical LED Gaming PC Mouse',
    price: 799.00,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Mice',
    compatibility: 'Works with AMD builds',
    rating: 4.9,
    reviews: 412
  }
];

const Accessories = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedCompatibility, setSelectedCompatibility] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['All', 'Laptops', 'Monitors', 'Keyboards', 'Audio', 'Mice', 'Cases', 'Cooling'];
  const compatibilityOptions = ['All', 'Works with AMD builds', 'Works with Intel builds', 'Universal'];

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    // Add to cart logic here
    navigate('/cart');
  };

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setFilteredProducts(products);
      setIsLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by compatibility
    if (selectedCompatibility && selectedCompatibility !== 'All') {
      filtered = filtered.filter(product => product.compatibility === selectedCompatibility);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, selectedCompatibility, sortBy]);

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <div className="accessories-loading">
        <div className="loading-spinner"></div>
        <p>Loading accessories...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="accessories">
      <div className="accessories__container">
        {/* Sidebar Filters */}
        <aside className="accessories__sidebar">
          <div className="sidebar__header">
            <h2 className="sidebar__title">Filters</h2>
            <button 
              className="sidebar__clear"
              onClick={() => {
                setSelectedCategory('');
                setPriceRange([0, 3000]);
                setSelectedCompatibility('');
              }}
            >
              Clear All
            </button>
          </div>

          {/* Category Filter */}
          <div className="filter__section">
            <h3 className="filter__title">Category</h3>
            <div className="filter__options">
              {categories.map(category => (
                <label key={category} className="filter__option">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category || (category === 'All' && !selectedCategory)}
                    onChange={(e) => setSelectedCategory(e.target.value === 'All' ? '' : e.target.value)}
                  />
                  <span className="filter__radio"></span>
                  <span className="filter__label">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="filter__section">
            <h3 className="filter__title">Price</h3>
            <div className="price__range">
              <div className="price__inputs">
                <input
                  type="number"
                  className="price__input"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                />
                <span className="price__separator">-</span>
                <input
                  type="number"
                  className="price__input"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 3000])}
                />
              </div>
              <div className="price__slider">
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="slider"
                />
              </div>
              <div className="price__display">
                ${priceRange[0]} - ${priceRange[1]}
              </div>
            </div>
          </div>

          {/* Compatibility Filter */}
          <div className="filter__section">
            <h3 className="filter__title">Compatibility</h3>
            <div className="filter__options">
              {compatibilityOptions.map(option => (
                <label key={option} className="filter__option">
                  <input
                    type="radio"
                    name="compatibility"
                    value={option}
                    checked={selectedCompatibility === option || (option === 'All' && !selectedCompatibility)}
                    onChange={(e) => setSelectedCompatibility(e.target.value === 'All' ? '' : e.target.value)}
                  />
                  <span className="filter__radio"></span>
                  <span className="filter__label">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="accessories__main">
          {/* Header */}
          <div className="main__header">
            <div className="header__left">
              <h1 className="main__title">Gaming Accessories</h1>
              <p className="main__subtitle">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
            <div className="header__right">
              <div className="sort__container">
                <label htmlFor="sort" className="sort__label">Sort by:</label>
                <select
                  id="sort"
                  className="sort__select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="products__grid">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="product__card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="product__image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product__image"
                    loading="lazy"
                  />
                  <div className="product__overlay">
                    <button
                      className="product__quick-view"
                      onClick={() => console.log('Quick view:', product)}
                    >
                      Quick View
                    </button>
                  </div>
                </div>
                
                <div className="product__info">
                  <div className="product__rating">
                    <div className="rating__stars">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`star ${i < Math.floor(product.rating) ? 'star--filled' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="rating__text">({product.reviews})</span>
                  </div>
                  
                  <h3 className="product__name">{product.name}</h3>
                  
                  <div className="product__price">
                    <span className="price__current">{formatPrice(product.price)}</span>
                  </div>
                  
                  <button
                    className="product__add-to-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="no-results">
              <div className="no-results__icon">🔍</div>
              <h3 className="no-results__title">No products found</h3>
              <p className="no-results__text">
                Try adjusting your filters or search criteria
              </p>
            </div>
          )}
        </main>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Accessories;
