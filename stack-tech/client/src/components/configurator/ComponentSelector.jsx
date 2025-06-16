import { useState } from 'react';

const ComponentSelector = ({ options, onSelect, category }) => {
  const [filters, setFilters] = useState({
    brand: '',
    priceRange: ''
  });

  const filterOptions = () => {
    return options.filter(option => {
      // Apply brand filter
      if (filters.brand && option.specs.brand !== filters.brand) return false;
      
      // Apply price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (max) {
          return option.price >= min && option.price <= max;
        }
        return option.price >= min;
      }
      
      return true;
    });
  };

  const getUniqueBrands = () => {
    const brands = new Set();
    options.forEach(option => {
      if (option.specs.brand) brands.add(option.specs.brand);
    });
    return Array.from(brands).sort();
  };

  const priceRanges = [
    { label: 'Under $100', value: '0-100' },
    { label: '$100 - $250', value: '100-250' },
    { label: '$250 - $500', value: '250-500' },
    { label: '$500+', value: '500' }
  ];

  // Special ranges for expensive components like GPUs
  if (category === 'gpu') {
    priceRanges.push(
      { label: '$500 - $1000', value: '500-1000' },
      { label: '$1000+', value: '1000' }
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
          <select
            value={filters.brand}
            onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-violet-accent"
          >
            <option value="">All Brands</option>
            {getUniqueBrands().map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <select
            value={filters.priceRange}
            onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-violet-accent"
          >
            <option value="">All Prices</option>
            {priceRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto p-2">
        {filterOptions().map(component => (
          <div
            key={component._id}
            onClick={() => onSelect(component)}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex justify-center mb-3">
              {component.image ? (
                <img 
                  src={component.image} 
                  alt={component.name} 
                  className="h-24 object-contain"
                />
              ) : (
                <div className="bg-gray-100 w-24 h-24 rounded flex items-center justify-center">
                  <span className="text-3xl">💻</span>
                </div>
              )}
            </div>
            <h3 className="font-semibold text-center">{component.name}</h3>
            <p className="text-violet-accent font-bold text-center mt-1">
              ${component.price}
            </p>
            <div className="mt-2 text-sm text-gray-600">
              {Object.entries(component.specs).slice(0, 3).map(([key, value]) => (
                <div key={key} className="truncate">
                  <span className="font-medium">{key}:</span> {value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentSelector;