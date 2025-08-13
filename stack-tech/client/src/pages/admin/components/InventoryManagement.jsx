import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useNotification } from '../../../component/NotificationSystem';
import notificationService from '../../../services/notificationService';
import '../Dashboard.css';
import './AdminStyles.css';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lowStockFilter, setLowStockFilter] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [restockQuantity, setRestockQuantity] = useState('');
  const { addNotification } = useNotification();

  // Mock inventory data - replace with actual API calls
  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockInventory = [
          {
            id: 'INV-001',
            name: 'Intel Core i7-13700K',
            category: 'CPU',
            currentStock: 25,
            minStockLevel: 10,
            maxStockLevel: 50,
            unitCost: 399.99,
            supplier: 'Intel',
            lastRestocked: '2024-08-01',
            location: 'Warehouse A-1'
          },
          {
            id: 'INV-002',
            name: 'NVIDIA RTX 4070',
            category: 'GPU',
            currentStock: 8,
            minStockLevel: 15,
            maxStockLevel: 30,
            unitCost: 599.99,
            supplier: 'NVIDIA',
            lastRestocked: '2024-07-28',
            location: 'Warehouse A-2'
          },
          {
            id: 'INV-003',
            name: 'Corsair Vengeance 32GB DDR5',
            category: 'RAM',
            currentStock: 45,
            minStockLevel: 20,
            maxStockLevel: 100,
            unitCost: 199.99,
            supplier: 'Corsair',
            lastRestocked: '2024-08-05',
            location: 'Warehouse B-1'
          },
          {
            id: 'INV-004',
            name: 'Samsung 980 PRO 1TB',
            category: 'Storage',
            currentStock: 5,
            minStockLevel: 20,
            maxStockLevel: 50,
            unitCost: 129.99,
            supplier: 'Samsung',
            lastRestocked: '2024-07-20',
            location: 'Warehouse B-2'
          },
          {
            id: 'INV-005',
            name: 'ASUS ROG Strix B650',
            category: 'Motherboard',
            currentStock: 12,
            minStockLevel: 8,
            maxStockLevel: 25,
            unitCost: 249.99,
            supplier: 'ASUS',
            lastRestocked: '2024-08-03',
            location: 'Warehouse C-1'
          }
        ];
        setInventory(mockInventory);
        setLoading(false);
        
        // Check for low stock items and create notifications
        mockInventory.forEach(item => {
          if (item.currentStock <= item.minStockLevel) {
            const notification = notificationService.createInventoryAlertNotification(
              item.name,
              item.currentStock,
              item.minStockLevel
            );
            addNotification(notification);
          }
        });
      }, 1000);
    };

    fetchInventory();
  }, [addNotification]);

  const handleRestock = async (e) => {
    e.preventDefault();
    if (!selectedItem || !restockQuantity) return;

    try {
      // Update inventory via API
      const updatedInventory = inventory.map(item =>
        item.id === selectedItem.id
          ? {
              ...item,
              currentStock: item.currentStock + parseInt(restockQuantity),
              lastRestocked: new Date().toISOString().split('T')[0]
            }
          : item
      );
      setInventory(updatedInventory);
      
      // Show success notification
      addNotification({
        id: Date.now().toString(),
        type: 'success',
        title: 'Inventory Restocked',
        message: `Successfully added ${restockQuantity} units to ${selectedItem.name}`,
        timestamp: new Date(),
        category: 'inventory',
        priority: 'normal'
      });
      
      setShowRestockModal(false);
      setSelectedItem(null);
      setRestockQuantity('');
    } catch (error) {
      console.error('Error restocking item:', error);
      addNotification({
        id: Date.now().toString(),
        type: 'error',
        title: 'Restock Failed',
        message: `Failed to restock ${selectedItem.name}: ${error.message}`,
        timestamp: new Date(),
        category: 'inventory',
        priority: 'high'
      });
    }
  };

  const getStockStatus = (item) => {
    if (item.currentStock <= item.minStockLevel) return 'critical';
    if (item.currentStock <= item.minStockLevel * 1.5) return 'low';
    return 'good';
  };

  const getStockStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'stock-critical';
      case 'low': return 'stock-low';
      case 'good': return 'stock-good';
      default: return 'stock-good';
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesLowStock = !lowStockFilter || item.currentStock <= item.minStockLevel;
    return matchesSearch && matchesCategory && matchesLowStock;
  });

  const categories = ['CPU', 'GPU', 'RAM', 'Storage', 'Motherboard', 'PSU', 'Case', 'Cooling'];
  const lowStockItems = inventory.filter(item => item.currentStock <= item.minStockLevel);
  const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.unitCost), 0);

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading inventory...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="inventory-management"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="admin-section-header">
        <div>
          <h2 className="text-color-dark-charcoal">Inventory Management</h2>
          <p className="text-gray-600">Monitor stock levels and manage your inventory</p>
        </div>
      </div>

      {/* Inventory Overview */}
      <div className="inventory-overview">
        <motion.div 
          className="inventory-stat-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="inventory-stat-value text-violet-accent">
            {inventory.length}
          </div>
          <div className="inventory-stat-label">Total Items</div>
        </motion.div>
        
        <motion.div 
          className="inventory-stat-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inventory-stat-value text-red-500">
            {lowStockItems.length}
          </div>
          <div className="inventory-stat-label">Low Stock Items</div>
        </motion.div>
        
        <motion.div 
          className="inventory-stat-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="inventory-stat-value text-green-500">
            ${totalValue.toLocaleString()}
          </div>
          <div className="inventory-stat-label">Total Value</div>
        </motion.div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="alert alert-warning">
          <i className="fas fa-exclamation-triangle"></i>
          <span>{lowStockItems.length} items are running low on stock</span>
          <button 
            className="btn-text"
            onClick={() => setLowStockFilter(!lowStockFilter)}
          >
            {lowStockFilter ? 'Show All' : 'View Low Stock Items'}
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="filters">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="category-filter"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={lowStockFilter}
            onChange={(e) => setLowStockFilter(e.target.checked)}
          />
          Show only low stock items
        </label>
      </div>

      {/* Inventory Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Min/Max Levels</th>
              <th>Unit Cost</th>
              <th>Total Value</th>
              <th>Last Restocked</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map(item => {
              const stockStatus = getStockStatus(item);
              return (
                <tr key={item.id}>
                  <td>
                    <div className="item-cell">
                      <strong>{item.name}</strong>
                      <small>ID: {item.id}</small>
                      <small>Location: {item.location}</small>
                    </div>
                  </td>
                  <td>
                    <span className="category-badge">{item.category}</span>
                  </td>
                  <td>
                    <div className={`stock-indicator ${getStockStatusColor(stockStatus)}`}>
                      <span className="stock-number">{item.currentStock}</span>
                      <span className="stock-status">{stockStatus}</span>
                    </div>
                  </td>
                  <td>
                    <div className="stock-levels">
                      <small>Min: {item.minStockLevel}</small>
                      <small>Max: {item.maxStockLevel}</small>
                    </div>
                  </td>
                  <td>${item.unitCost.toFixed(2)}</td>
                  <td>${(item.currentStock * item.unitCost).toFixed(2)}</td>
                  <td>{new Date(item.lastRestocked).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-restock"
                        onClick={() => {
                          setSelectedItem(item);
                          setShowRestockModal(true);
                        }}
                      >
                        <i className="fas fa-plus"></i>
                        Restock
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Restock Modal */}
      {showRestockModal && selectedItem && (
        <div className="modal-overlay" onClick={() => setShowRestockModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Restock Item</h3>
              <button className="close-btn" onClick={() => setShowRestockModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="restock-form">
              <div className="item-info">
                <h4>{selectedItem.name}</h4>
                <p>Current Stock: <strong>{selectedItem.currentStock}</strong></p>
                <p>Minimum Level: <strong>{selectedItem.minStockLevel}</strong></p>
                <p>Maximum Level: <strong>{selectedItem.maxStockLevel}</strong></p>
                <p>Unit Cost: <strong>${selectedItem.unitCost.toFixed(2)}</strong></p>
              </div>
              
              <form onSubmit={handleRestock}>
                <div className="form-group">
                  <label>Restock Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max={selectedItem.maxStockLevel - selectedItem.currentStock}
                    required
                    value={restockQuantity}
                    onChange={(e) => setRestockQuantity(e.target.value)}
                    placeholder="Enter quantity to add"
                  />
                </div>
                
                {restockQuantity && (
                  <div className="restock-summary">
                    <p>New Stock Level: <strong>{selectedItem.currentStock + parseInt(restockQuantity || 0)}</strong></p>
                    <p>Total Cost: <strong>${(parseInt(restockQuantity || 0) * selectedItem.unitCost).toFixed(2)}</strong></p>
                  </div>
                )}
                
                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowRestockModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Confirm Restock
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Quick Restock Suggestions */}
      {lowStockItems.length > 0 && (
        <div className="quick-restock">
          <h3>Quick Restock Suggestions</h3>
          <div className="suggestion-grid">
            {lowStockItems.slice(0, 3).map(item => (
              <div key={item.id} className="suggestion-card">
                <div className="suggestion-info">
                  <strong>{item.name}</strong>
                  <p>Current: {item.currentStock} | Min: {item.minStockLevel}</p>
                  <p>Suggested: {item.minStockLevel * 2} units</p>
                </div>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    setSelectedItem(item);
                    setRestockQuantity((item.minStockLevel * 2 - item.currentStock).toString());
                    setShowRestockModal(true);
                  }}
                >
                  Quick Restock
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default InventoryManagement;
