import React, { useState, useEffect } from 'react';
import { productService } from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAllProducts();
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return <div className="admin-error">{error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your store products and orders</p>
      </header>

      <div className="admin-content">
        <div className="admin-sidebar">
          <nav className="admin-nav">
            <ul>
              <li className="active"><a href="#products">Products</a></li>
              <li><a href="#orders">Orders</a></li>
              <li><a href="#users">Users</a></li>
              <li><a href="#analytics">Analytics</a></li>
              <li><a href="#settings">Settings</a></li>
            </ul>
          </nav>
        </div>

        <main className="admin-main">
          <section className="admin-section">
            <div className="admin-section-header">
              <h2>Product Management</h2>
              <button className="admin-button primary">Add New Product</button>
            </div>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id.substring(0, 8)}...</td>
                        <td>
                          <div className="product-cell">
                            {product.image && (
                              <img src={product.image} alt={product.name} className="product-thumbnail" />
                            )}
                            <span>{product.name}</span>
                          </div>
                        </td>
                        <td>{product.category}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>
                          <span className={`stock-badge ${product.stock > 10 ? 'in-stock' : 'low-stock'}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="admin-button small">Edit</button>
                            <button className="admin-button small danger">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-data">No products found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
