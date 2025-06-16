import { useState, useEffect } from 'react';
import ProductCard from '../components/products/ProductCard';
import FilterPanel from '../components/products/FilterPanel';
import api from '../services/api';

const PreBuilt = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    processor: [],
    gpu: [],
    ram: [],
    storage: [],
    priceRange: [0, 5000]
  });
  
  const [sortOption, setSortOption] = useState('featured');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await api.get('/products/prebuilt');
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, sortOption, products]);

  const applyFilters = () => {
    let result = [...products];
    
    // Apply processor filter
    if (filters.processor.length > 0) {
      result = result.filter(product => 
        filters.processor.includes(product.specs.processorBrand)
      );
    }
    
    // Apply GPU filter
    if (filters.gpu.length > 0) {
      result = result.filter(product => 
        filters.gpu.some(gpu => product.specs.gpuModel.includes(gpu))
      );
    }
    
    // Apply RAM filter
    if (filters.ram.length > 0) {
      result = result.filter(product => 
        filters.ram.includes(product.specs.ramSize)
      );
    }
    
    // Apply storage filter
    if (filters.storage.length > 0) {
      result = result.filter(product => 
        filters.storage.includes(product.specs.storageType)
      );
    }
    
    // Apply price filter
    result = result.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'performance':
        // This would be based on actual performance metrics in a real app
        result.sort((a, b) => b.specs.performanceScore - a.specs.performanceScore);
        break;
      default:
        // 'featured' - maintain original order
        break;
    }
    
    setFilteredProducts(result);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handlePriceRangeChange = (min, max) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [min, max]
    }));
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 text-center">
        <div className="bg-red-50 text-red-700 p-6 rounded-lg max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-2">Error Loading Products</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-violet-accent text-white py-2 px-6 rounded hover:bg-violet-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-dark-charcoal">Pre-Built Gaming PCs</h1>
        <p className="text-lg text-gray-600 mt-2">
          Ready-to-ship systems optimized for gaming performance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterPanel 
            products={products}
            filters={filters}
            onFilterChange={handleFilterChange}
            onPriceRangeChange={handlePriceRangeChange}
          />
        </div>
        
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'system' : 'systems'} found
            </p>
            
            <div className="flex items-center">
              <label className="mr-2 text-gray-700">Sort by:</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-violet-accent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="performance">Performance</option>
              </select>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-accent"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">No systems match your filters</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filter settings</p>
              <button 
                onClick={() => setFilters({
                  processor: [],
                  gpu: [],
                  ram: [],
                  storage: [],
                  priceRange: [0, 5000]
                })}
                className="bg-violet-accent text-white py-2 px-6 rounded hover:bg-violet-700"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreBuilt;