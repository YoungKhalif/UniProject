import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products when component mounts
    const fetchProducts = async () => {
      try {
        const response = await productService.getAllProducts();
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error loading products. Please try again later.');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  // Handle loading state
  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  // Handle error state
  if (error) {
    return <div className="error">{error}</div>;
  }

  // Render products
  return (
    <div className="product-list">
      <h2>Available Products</h2>
      <div className="products-container">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map(product => (
            <div key={product.id} className="product-card">
              <img 
                src={product.image || 'https://via.placeholder.com/150'} 
                alt={product.name} 
                className="product-image" 
              />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductList;
