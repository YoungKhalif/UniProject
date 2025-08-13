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
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockUsers = [
          {
            id: 'USR-001',
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            email: 'john@example.com',
            phoneNumber: '+1-555-0123',
            role: 'user',
            status: 'active',
            lastLogin: '2024-08-10T14:30:00Z',
            registrationDate: '2024-07-15T10:00:00Z',
            totalOrders: 5,
            totalSpent: 2599.95
          },
          {
            id: 'USR-002',
            firstName: 'Jane',
            lastName: 'Smith',
            username: 'janesmith',
            email: 'jane@example.com',
            phoneNumber: '+1-555-0124',
            role: 'admin',
            status: 'active',
            lastLogin: '2024-08-11T09:15:00Z',
            registrationDate: '2024-06-01T08:00:00Z',
            totalOrders: 12,
            totalSpent: 5899.88
          },
          {
            id: 'USR-003',
            firstName: 'Mike',
            lastName: 'Johnson',
            username: 'mikej',
            email: 'mike@example.com',
            phoneNumber: '+1-555-0125',
            role: 'user',
            status: 'inactive',
            lastLogin: '2024-07-20T16:45:00Z',
            registrationDate: '2024-05-10T12:30:00Z',
            totalOrders: 2,
            totalSpent: 1299.99
          },
          {
            id: 'USR-004',
            firstName: 'Sarah',
            lastName: 'Wilson',
            username: 'sarahw',
            email: 'sarah@example.com',
            phoneNumber: '+1-555-0126',
            role: 'user',
            status: 'active',
            lastLogin: '2024-08-09T11:20:00Z',
            registrationDate: '2024-08-01T14:15:00Z',
            totalOrders: 1,
            totalSpent: 899.99
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
      // Update user role via API
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      // Update user status via API
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'role-admin';
      case 'user': return 'role-user';
      default: return 'role-user';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      case 'suspended': return 'status-suspended';
      default: return 'status-inactive';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="user-management">
      <div className="section-header">
        <h2>User Management</h2>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-value">{totalUsers}</span>
            <span className="stat-label">Total Users</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{activeUsers}</span>
            <span className="stat-label">Active Users</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{adminUsers}</span>
            <span className="stat-label">Admins</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="role-filter"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Orders/Spent</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar">
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </div>
                    <div>
                      <strong>{user.firstName} {user.lastName}</strong>
                      <small>@{user.username}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div>{user.email}</div>
                    <small>{user.phoneNumber}</small>
                  </div>
                </td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className={`role-select ${getRoleColor(user.role)}`}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <select
                    value={user.status}
                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                    className={`status-select ${getStatusColor(user.status)}`}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </td>
                <td>
                  <div>
                    {new Date(user.lastLogin).toLocaleDateString()}
                    <small>{new Date(user.lastLogin).toLocaleTimeString()}</small>
                  </div>
                </td>
                <td>
                  <div>
                    <strong>{user.totalOrders} orders</strong>
                    <small>${user.totalSpent.toFixed(2)}</small>
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-view"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowUserModal(true);
                      }}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="btn-edit">
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowUserModal(false)}>
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>User Details - {selectedUser.firstName} {selectedUser.lastName}</h3>
              <button className="close-btn" onClick={() => setShowUserModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="user-details">
              <div className="user-info-grid">
                <div className="info-section">
                  <h4>Personal Information</h4>
                  <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
                  <p><strong>Username:</strong> @{selectedUser.username}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Phone:</strong> {selectedUser.phoneNumber}</p>
                </div>
                <div className="info-section">
                  <h4>Account Information</h4>
                  <p><strong>User ID:</strong> {selectedUser.id}</p>
                  <p><strong>Role:</strong> 
                    <span className={`role-badge ${getRoleColor(selectedUser.role)}`}>
                      {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                    </span>
                  </p>
                  <p><strong>Status:</strong> 
                    <span className={`status-badge ${getStatusColor(selectedUser.status)}`}>
                      {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                    </span>
                  </p>
                  <p><strong>Registration Date:</strong> {new Date(selectedUser.registrationDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="activity-section">
                <h4>Activity Summary</h4>
                <div className="activity-stats">
                  <div className="activity-stat">
                    <span className="stat-number">{selectedUser.totalOrders}</span>
                    <span className="stat-label">Total Orders</span>
                  </div>
                  <div className="activity-stat">
                    <span className="stat-number">${selectedUser.totalSpent.toFixed(2)}</span>
                    <span className="stat-label">Total Spent</span>
                  </div>
                  <div className="activity-stat">
                    <span className="stat-number">{new Date(selectedUser.lastLogin).toLocaleDateString()}</span>
                    <span className="stat-label">Last Login</span>
                  </div>
                </div>
              </div>

              <div className="user-actions">
                <h4>Quick Actions</h4>
                <div className="action-buttons">
                  <button className="btn-primary">Send Email</button>
                  <button className="btn-secondary">View Orders</button>
                  <button className="btn-warning">Reset Password</button>
                  {selectedUser.status === 'active' ? (
                    <button 
                      className="btn-danger"
                      onClick={() => handleStatusChange(selectedUser.id, 'suspended')}
                    >
                      Suspend User
                    </button>
                  ) : (
                    <button 
                      className="btn-success"
                      onClick={() => handleStatusChange(selectedUser.id, 'active')}
                    >
                      Activate User
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
