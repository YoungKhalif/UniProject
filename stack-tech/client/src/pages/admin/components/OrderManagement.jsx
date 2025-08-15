import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../../../component/NotificationSystem';
import notificationService from '../../../services/notificationService';
import { adminService } from '../../../services/adminService';
import '../Dashboard.css';
import './AdminStyles.css';

const OrderManagement = forwardRef((props, ref) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const { addNotification } = useNotification();
  
  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    showPendingOrders: () => {
      setStatusFilter('pending');
    },
    getOrderCount: () => orders.length
  }));

  // Mock orders data - replace with actual API calls
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await adminService.getAllOrders({
          status: statusFilter === 'all' ? undefined : statusFilter,
          search: searchTerm,
          page: 1,
          limit: 50
        });
        
        // The API returns orders directly at the top level, not in data.data.orders
        if (response.data && response.data.orders) {
          setOrders(response.data.orders || []);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        // Fallback to mock data on error
        const mockOrders = [
          {
            id: 'ORD-001',
            customerName: 'John Doe',
            customerEmail: 'john@example.com',
            items: [
              { name: 'Gaming PC Pro', quantity: 1, price: 1299.99 }
            ],
            total: 1299.99,
            status: 'pending',
            orderDate: '2024-08-10',
            shippingAddress: '123 Main St, City, State 12345',
            buildTime: '5-7 business days'
          },
          // Add more mock orders...
        ];
        setOrders(mockOrders);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [statusFilter, searchTerm]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Update order status via API
      const response = await adminService.updateOrderStatus(orderId, { 
        status: newStatus,
        trackingNumber: newStatus === 'shipped' ? `TRK${Date.now()}` : undefined
      });
      
      if (response.data.success) {
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
        
        // Create and show notification
        const notification = notificationService.createOrderUpdateNotification(
          orderId,
          newStatus,
          { carrier: 'FedEx', trackingNumber: 'FDX' + Math.random().toString(36).substr(2, 9) }
        );
        addNotification(notification);
        
        // Show admin success notification
        addNotification({
          id: Date.now().toString(),
          type: 'success',
          title: 'Order Updated',
          message: `Order ${orderId} status changed to ${newStatus}`,
          timestamp: new Date(),
          category: 'admin',
          priority: 'normal'
        });
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      addNotification({
        id: Date.now().toString(),
        type: 'error',
        title: 'Update Failed',
        message: `Failed to update order ${orderId}: ${error.message}`,
        timestamp: new Date(),
        category: 'admin',
        priority: 'high'
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'building': return 'status-building';
      case 'testing': return 'status-testing';
      case 'shipped': return 'status-shipped';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const orderStatuses = ['pending', 'building', 'testing', 'shipped', 'delivered', 'cancelled'];

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="order-management">
      <div className="section-header">
        <h2>Order Management</h2>
        <div className="header-stats">
          <span className="stat">
            <strong>{orders.filter(o => o.status === 'pending').length}</strong> Pending
          </span>
          <span className="stat">
            <strong>{orders.filter(o => o.status === 'building').length}</strong> Building
          </span>
          <span className="stat">
            <strong>{orders.filter(o => o.status === 'shipped').length}</strong> Shipped
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter"
        >
          <option value="all">All Statuses</option>
          {orderStatuses.map(status => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td>
                  <strong>{order.id}</strong>
                </td>
                <td>
                  <div>
                    <strong>{order.customerName}</strong>
                    <small>{order.customerEmail}</small>
                  </div>
                </td>
                <td>
                  <div className="items-summary">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    <small>{order.items[0]?.name}</small>
                  </div>
                </td>
                <td>
                  <strong>${order.total.toFixed(2)}</strong>
                </td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`status-select ${getStatusColor(order.status)}`}
                  >
                    {orderStatuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-view"
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowOrderModal(true);
                      }}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="btn-print">
                      <i className="fas fa-print"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Order Details - {selectedOrder.id}</h3>
              <button className="close-btn" onClick={() => setShowOrderModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="order-details">
              <div className="order-info-grid">
                <div className="info-section">
                  <h4>Customer Information</h4>
                  <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                  <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                  <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                </div>
                <div className="info-section">
                  <h4>Shipping Address</h4>
                  <p>{selectedOrder.shippingAddress}</p>
                  {selectedOrder.trackingNumber && (
                    <p><strong>Tracking:</strong> {selectedOrder.trackingNumber}</p>
                  )}
                </div>
              </div>

              <div className="order-items">
                <h4>Order Items</h4>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>${(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="order-total">
                  <strong>Total: ${selectedOrder.total.toFixed(2)}</strong>
                </div>
              </div>

              <div className="build-info">
                <h4>Build Information</h4>
                <p><strong>Estimated Build Time:</strong> {selectedOrder.buildTime}</p>
                <p><strong>Current Status:</strong> 
                  <span className={`status-badge ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default OrderManagement;
