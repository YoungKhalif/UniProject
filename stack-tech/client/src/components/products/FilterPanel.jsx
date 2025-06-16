import { useMemo } from 'react';

const FilterPanel = ({ products, filters, onFilterChange, onPriceRangeChange }) => {
  // Calculate unique filter options
  const filterOptions = useMemo(() => {
    const options = {
      processor: new Set(),
      gpu: new Set(),
      ram: new Set(),
      storage: new Set()
    };
    
    products.forEach(product => {
      if (product.specs.processorBrand) options.processor.add(product.specs.processorBrand);
      if (product.specs.gpuModel) options.gpu.add(product.specs.gpuModel);
      if (product.specs.ramSize) options.ram.add(product.specs.ramSize);
      if (product.specs.storageType) options.storage.add(product.specs.storageType);
    });
    
    // Convert sets to sorted arrays
    return {
      processor: Array.from(options.processor).sort(),
      gpu: Array.from(options.gpu).sort((a, b) => {
        // Sort GPUs by model number
        const numA = parseInt(a.match(/\d+/)?.[0] || 0);
        const numB = parseInt(b.match(/\d+/)?.[0] || 0);
        return numB - numA;
      }),
      ram: Array.from(options.ram).sort((a, b) => {
        const numA = parseInt(a);
        const numB = parseInt(b);
        return numA - numB;
      }),
      storage: Array.from(options.storage).sort()
    };
  }, [products]);

  // Calculate price range min/max
  const priceRange = useMemo(() => {
    if (products.length === 0) return [0, 5000];
    
    const prices = products.map(p => p.price);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  }, [products]);

  const handleCheckboxChange = (filterType, value) => {
    const currentValues = [...filters[filterType]];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange(filterType, newValues);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      
      <div className="space-y-6">
        {/* Price Range Filter */}
        <div>
          <h3 className="font-medium mb-2">Price Range</h3>
          <div className="px-2">
            <input
              type="range"
              min={priceRange[0]}
              max={priceRange[1]}
              value={filters.priceRange[1]}
              onChange={(e) => onPriceRangeChange(filters.priceRange[0], parseInt(e.target.value))}
              className="w-full accent-violet-accent"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>
        
        {/* Processor Filter */}
        {filterOptions.processor.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Processor</h3>
            <div className="space-y-2">
              {filterOptions.processor.map(brand => (
                <label key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.processor.includes(brand)}
                    onChange={() => handleCheckboxChange('processor', brand)}
                    className="rounded text-violet-accent focus:ring-violet-accent"
                  />
                  <span className="ml-2 text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        
        {/* GPU Filter */}
        {filterOptions.gpu.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Graphics Card</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {filterOptions.gpu.map(model => (
                <label key={model} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.gpu.includes(model)}
                    onChange={() => handleCheckboxChange('gpu', model)}
                    className="rounded text-violet-accent focus:ring-violet-accent"
                  />
                  <span className="ml-2 text-gray-700">{model}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        
        {/* RAM Filter */}
        {filterOptions.ram.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">RAM</h3>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions.ram.map(size => (
                <label key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.ram.includes(size)}
                    onChange={() => handleCheckboxChange('ram', size)}
                    className="rounded text-violet-accent focus:ring-violet-accent"
                  />
                  <span className="ml-2 text-gray-700">{size} GB</span>
                </label>
              ))}
            </div>
          </div>
        )}
        
        {/* Storage Filter */}
        {filterOptions.storage.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Storage</h3>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions.storage.map(type => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.storage.includes(type)}
                    onChange={() => handleCheckboxChange('storage', type)}
                    className="rounded text-violet-accent focus:ring-violet-accent"
                  />
                  <span className="ml-2 text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        
        {/* Reset Button */}
        {(filters.processor.length > 0 || 
          filters.gpu.length > 0 || 
          filters.ram.length > 0 || 
          filters.storage.length > 0) && (
          <button
            onClick={() => {
              onFilterChange('processor', []);
              onFilterChange('gpu', []);
              onFilterChange('ram', []);
              onFilterChange('storage', []);
              onPriceRangeChange(priceRange[0], priceRange[1]);
            }}
            className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
          >
            Reset All Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;