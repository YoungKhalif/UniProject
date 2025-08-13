import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { productService } from '../../../services/api';
import '../Dashboard.css';
import './AdminStyles.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    specifications: {
      cpu: '',
      gpu: '',
      ram: '',
      storage: '',
      motherboard: '',
      psu: '',
      case: ''
    },
    image: '',
    images: [],
    isPreBuilt: true,
    warranty: '12 months'
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts();
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await productService.createProduct(newProduct);
      setShowAddModal(false);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        specifications: {
          cpu: '',
          gpu: '',
          ram: '',
          storage: '',
          motherboard: '',
          psu: '',
          case: ''
        },
        image: '',
        images: [],
        isPreBuilt: true,
        warranty: '12 months'
      });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      await productService.updateProduct(selectedProduct.id, selectedProduct);
      setShowEditModal(false);
      setSelectedProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(productId);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Gaming PC', 'Workstation', 'Budget Build', 'High-End', 'Custom'];

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="product-management"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="admin-section-header">
        <div>
          <h2 className="text-color-dark-charcoal">Product Management</h2>
          <p className="text-gray-600">Manage your product catalog and inventory</p>
        </div>
        <motion.button 
          className="btn-primary bg-violet-accent"
          onClick={() => setShowAddModal(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className="fas fa-plus mr-2"></i>
          Add New Product
        </motion.button>
      </div>

      {/* Filters & Search */}
      <div className="admin-filters mb-6">
        <div className="search-input">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control pl-10"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="form-control w-48"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <div className="text-sm text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        <AnimatePresence>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="product-card bg-white rounded-lg shadow-sm border border-muted-light-grey"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 8px 25px rgba(46, 47, 47, 0.15)"
              }}
            >
              <div className="product-card-header">
                <img 
                  src={product.image || '/api/placeholder/150/120'} 
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-category">
                  <span className="category-badge bg-soft-blue-grey text-white">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="product-card-body">
                <h3 className="product-name text-dark-charcoal">{product.name}</h3>
                <p className="product-description text-gray-600">{product.description}</p>
                
                <div className="product-specs">
                  {product.specifications?.cpu && (
                    <div className="spec-item">
                      <i className="fas fa-microchip text-violet-accent"></i>
                      <span>{product.specifications.cpu}</span>
                    </div>
                  )}
                  {product.specifications?.gpu && (
                    <div className="spec-item">
                      <i className="fas fa-display text-violet-accent"></i>
                      <span>{product.specifications.gpu}</span>
                    </div>
                  )}
                </div>
                
                <div className="product-footer">
                  <div className="product-price">
                    <span className="price-label">Price</span>
                    <span className="price-value text-violet-accent">${product.price}</span>
                  </div>
                  
                  <div className="product-stock">
                    <span className="stock-label">Stock</span>
                    <span className={`stock-badge ${
                      product.stock > 10 ? 'in-stock' : 
                      product.stock > 0 ? 'low-stock' : 'out-of-stock'
                    }`}>
                      {product.stock} units
                    </span>
                  </div>
                  
                  <div className="product-actions">
                    <motion.button
                      className="action-btn edit bg-violet-accent text-white"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowEditModal(true);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fas fa-edit"></i>
                    </motion.button>
                    <motion.button
                      className="action-btn delete bg-red-500 text-white"
                      onClick={() => handleDeleteProduct(product.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fas fa-trash"></i>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredProducts.length === 0 && (
          <motion.div 
            className="no-products text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <i className="fas fa-box-open text-6xl text-muted-light-grey mb-4"></i>
            <h3 className="text-dark-charcoal mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Product</h3>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="product-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    required
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  required
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  rows="3"
                />
              </div>

              {/* Specifications */}
              <div className="specs-section">
                <h4>Specifications</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>CPU</label>
                    <input
                      type="text"
                      value={newProduct.specifications.cpu}
                      onChange={(e) => setNewProduct({
                        ...newProduct,
                        specifications: {...newProduct.specifications, cpu: e.target.value}
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label>GPU</label>
                    <input
                      type="text"
                      value={newProduct.specifications.gpu}
                      onChange={(e) => setNewProduct({
                        ...newProduct,
                        specifications: {...newProduct.specifications, gpu: e.target.value}
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label>RAM</label>
                    <input
                      type="text"
                      value={newProduct.specifications.ram}
                      onChange={(e) => setNewProduct({
                        ...newProduct,
                        specifications: {...newProduct.specifications, ram: e.target.value}
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Storage</label>
                    <input
                      type="text"
                      value={newProduct.specifications.storage}
                      onChange={(e) => setNewProduct({
                        ...newProduct,
                        specifications: {...newProduct.specifications, storage: e.target.value}
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Product</h3>
              <button className="close-btn" onClick={() => setShowEditModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleEditProduct} className="product-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    required
                    value={selectedProduct.name}
                    onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={selectedProduct.price}
                    onChange={(e) => setSelectedProduct({...selectedProduct, price: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={selectedProduct.stock}
                    onChange={(e) => setSelectedProduct({...selectedProduct, stock: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductManagement;
