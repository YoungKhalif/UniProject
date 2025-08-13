import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../Dashboard.css';
import './AdminStyles.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  // Mock users data - replace with actual API calls
  useEffect(() => {
    const fetchUsers = async () => {
      setTimeout(() => {
        const mockUsers = [
          {
            id: 'USR-001',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            username: 'johndoe',
            role: 'user',
            status: 'active',
            joinDate: '2024-01-15',
            lastLogin: '2024-08-10',
            orderCount: 12,
            totalSpent: 3456.78
          },
          {
            id: 'USR-002',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            username: 'janesmith',
            role: 'admin',
            status: 'active',
            joinDate: '2023-11-20',
            lastLogin: '2024-08-11',
            orderCount: 8,
            totalSpent: 2134.50
          },
          {
            id: 'USR-003',
            firstName: 'Mike',
            lastName: 'Johnson',
            email: 'mike.johnson@example.com',
            username: 'mikej',
            role: 'user',
            status: 'inactive',
            joinDate: '2024-03-05',
            lastLogin: '2024-07-15',
            orderCount: 3,
            totalSpent: 899.99
          },
          {
            id: 'USR-004',
            firstName: 'Sarah',
            lastName: 'Wilson',
            email: 'sarah.wilson@example.com',
            username: 'sarahw',
            role: 'user',
            status: 'banned',
            joinDate: '2024-02-10',
            lastLogin: '2024-06-20',
            orderCount: 1,
            totalSpent: 299.99
          }
        ];
        setUsers(mockUsers);
        setLoading(false);
      }, 1000);
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      // Update role via API
      const updatedUsers = users.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      // Update status via API
      const updatedUsers = users.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'admin';
      case 'user': return 'user';
      default: return 'user';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'active';
      case 'inactive': return 'inactive';
      case 'banned': return 'banned';
      default: return 'inactive';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const adminUsers = users.filter(u => u.role === 'admin').length;

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="user-management"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="admin-section-header">
        <div>
          <h2 className="text-color-dark-charcoal">User Management</h2>
          <p className="text-gray-600">Manage user accounts, roles and permissions</p>
        </div>
      </div>

      {/* User Statistics */}
      <div className="inventory-overview mb-6">
        <motion.div 
          className="inventory-stat-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="inventory-stat-value text-violet-accent">
            {totalUsers}
          </div>
          <div className="inventory-stat-label">Total Users</div>
        </motion.div>
        
        <motion.div 
          className="inventory-stat-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inventory-stat-value text-green-500">
            {activeUsers}
          </div>
          <div className="inventory-stat-label">Active Users</div>
        </motion.div>
        
        <motion.div 
          className="inventory-stat-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="inventory-stat-value text-blue-500">
            {adminUsers}
          </div>
          <div className="inventory-stat-label">Admin Users</div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="admin-filters mb-6">
        <div className="search-input">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="form-control w-48"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="form-control w-48"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="banned">Banned</option>
        </select>
        <div className="text-sm text-gray-600">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>

      {/* Users Grid */}
      <div className="users-grid">
        <AnimatePresence>
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              className="user-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="user-info">
                <div className="user-avatar">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
                <div className="user-details">
                  <h3>{user.firstName} {user.lastName}</h3>
                  <p>{user.email}</p>
                  <p>@{user.username}</p>
                </div>
              </div>
              
              <div className="user-meta">
                <div className="user-badges">
                  <span className={`role-badge ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                  <span className={`status-badge ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </div>
                
                <div className="user-stats">
                  <div className="stat-item">
                    <span className="stat-label">Orders:</span>
                    <span className="stat-value">{user.orderCount}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Spent:</span>
                    <span className="stat-value">${user.totalSpent.toLocaleString()}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Joined:</span>
                    <span className="stat-value">{new Date(user.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="user-actions">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="action-select"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                
                <select
                  value={user.status}
                  onChange={(e) => handleStatusChange(user.id, e.target.value)}
                  className="action-select"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="banned">Banned</option>
                </select>

                <motion.button
                  className="action-btn view bg-violet-accent text-white"
                  onClick={() => {
                    setSelectedUser(user);
                    setShowUserModal(true);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-eye"></i>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredUsers.length === 0 && (
          <motion.div 
            className="no-users text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <i className="fas fa-users text-6xl text-muted-light-grey mb-4"></i>
            <h3 className="text-dark-charcoal mb-2">No users found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>

      {/* User Detail Modal */}
      <AnimatePresence>
        {showUserModal && selectedUser && (
          <motion.div
            className="admin-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUserModal(false)}
          >
            <motion.div
              className="admin-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>User Details</h3>
                <button
                  className="close-modal"
                  onClick={() => setShowUserModal(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="modal-body">
                <div className="user-detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Full Name:</span>
                    <span className="detail-value">{selectedUser.firstName} {selectedUser.lastName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{selectedUser.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Username:</span>
                    <span className="detail-value">@{selectedUser.username}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Role:</span>
                    <span className="detail-value">{selectedUser.role}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className="detail-value">{selectedUser.status}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Join Date:</span>
                    <span className="detail-value">{new Date(selectedUser.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Last Login:</span>
                    <span className="detail-value">{new Date(selectedUser.lastLogin).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Order Count:</span>
                    <span className="detail-value">{selectedUser.orderCount}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Total Spent:</span>
                    <span className="detail-value">${selectedUser.totalSpent.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserManagement;
