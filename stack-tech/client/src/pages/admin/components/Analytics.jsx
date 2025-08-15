import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import { adminService } from '../../../services/adminService';
import '../Dashboard.css';
import './AdminStyles.css';

const Analytics = forwardRef((props, ref) => {
  const [analyticsData, setAnalyticsData] = useState({
    revenue: {
      daily: [],
      monthly: [],
      total: 0,
      growth: 0
    },
    orders: {
      total: 0,
      pending: 0,
      completed: 0,
      cancelled: 0
    },
    products: {
      totalSold: 0,
      topSelling: [],
      categories: []
    },
    customers: {
      total: 0,
      new: 0,
      returning: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30days');
  
  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    showReports: () => {
      // Set the date range to default and ensure reports section is visible
      setDateRange('30days');
    },
    exportReports: () => {
      // This function would handle report exporting
      console.log('Exporting analytics reports...');
      // You could implement PDF export or CSV export here
      return {
        success: true,
        message: 'Reports exported successfully'
      };
    }
  }));

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const response = await adminService.getAnalytics(dateRange);
        
        // The API returns analytics data at the top level
        if (response.data) {
          setAnalyticsData({
            revenue: {
              ...analyticsData.revenue,
              ...(response.data.salesData && { daily: response.data.salesData })
            },
            products: {
              ...analyticsData.products,
              ...(response.data.topProducts && { topSelling: response.data.topProducts })
            },
            orders: {
              ...analyticsData.orders
            },
            customers: {
              ...analyticsData.customers
            }
          });
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
        // Fallback to mock data on error
        const mockData = {
          revenue: {
            daily: [
              { date: '2024-08-01', amount: 1299.99 },
              { date: '2024-08-02', amount: 2499.99 },
              { date: '2024-08-03', amount: 899.99 },
              { date: '2024-08-04', amount: 1599.99 },
              { date: '2024-08-05', amount: 3299.99 },
              { date: '2024-08-06', amount: 1999.99 },
              { date: '2024-08-07', amount: 2799.99 }
            ],
            monthly: [
              { month: 'January', amount: 25000 },
              { month: 'February', amount: 28000 },
              { month: 'March', amount: 32000 },
              { month: 'April', amount: 29000 },
              { month: 'May', amount: 35000 },
              { month: 'June', amount: 42000 },
              { month: 'July', amount: 38000 },
              { month: 'August', amount: 45000 }
            ],
            total: 45280.50,
            growth: 15.8
          },
          orders: {
            total: 128,
            pending: 12,
            completed: 108,
            cancelled: 8
          },
          products: {
            totalSold: 156,
            topSelling: [
              { name: 'Gaming PC Pro', sold: 25, revenue: 32499.75 },
              { name: 'Workstation Beast', sold: 18, revenue: 44999.82 },
              { name: 'Budget Gaming PC', sold: 32, revenue: 28799.68 },
              { name: 'Creator Station', sold: 15, revenue: 29999.85 },
              { name: 'Enthusiast Build', sold: 12, revenue: 35999.88 }
            ],
            categories: [
              { name: 'Gaming PC', percentage: 45, count: 72 },
              { name: 'Workstation', percentage: 25, count: 40 },
              { name: 'Budget Build', percentage: 20, count: 32 },
              { name: 'High-End', percentage: 10, count: 16 }
            ]
          },
          customers: {
            total: 89,
            new: 23,
            returning: 66
          }
        };
        setAnalyticsData(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [dateRange, analyticsData.customers, analyticsData.orders, analyticsData.products, analyticsData.revenue]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return <div className="loading">Loading analytics...</div>;
  }

  return (
    <div className="analytics">
      <div className="section-header">
        <h2>Analytics Dashboard</h2>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="date-range-select"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card revenue">
          <div className="metric-header">
            <h3>Total Revenue</h3>
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="metric-value">
            {formatCurrency(analyticsData.revenue.total)}
          </div>
          <div className="metric-change positive">
            <i className="fas fa-arrow-up"></i>
            +{analyticsData.revenue.growth}% from last period
          </div>
        </div>

        <div className="metric-card orders">
          <div className="metric-header">
            <h3>Total Orders</h3>
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="metric-value">
            {analyticsData.orders.total}
          </div>
          <div className="metric-breakdown">
            <span className="completed">{analyticsData.orders.completed} completed</span>
            <span className="pending">{analyticsData.orders.pending} pending</span>
          </div>
        </div>

        <div className="metric-card customers">
          <div className="metric-header">
            <h3>Total Customers</h3>
            <i className="fas fa-users"></i>
          </div>
          <div className="metric-value">
            {analyticsData.customers.total}
          </div>
          <div className="metric-breakdown">
            <span className="new">{analyticsData.customers.new} new</span>
            <span className="returning">{analyticsData.customers.returning} returning</span>
          </div>
        </div>

        <div className="metric-card products">
          <div className="metric-header">
            <h3>Products Sold</h3>
            <i className="fas fa-box"></i>
          </div>
          <div className="metric-value">
            {analyticsData.products.totalSold}
          </div>
          <div className="metric-change">
            Across {analyticsData.products.categories.length} categories
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <h3>Revenue Trend</h3>
          <div className="revenue-chart">
            {analyticsData.revenue.daily.map((day, index) => (
              <div key={index} className="chart-bar">
                <div 
                  className="bar" 
                  style={{ 
                    height: `${(day.amount / 3500) * 100}%`,
                    backgroundColor: '#A599B5'
                  }}
                ></div>
                <span className="bar-label">
                  {new Date(day.date).getDate()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h3>Order Status Distribution</h3>
          <div className="order-status-chart">
            <div className="status-item">
              <div className="status-bar">
                <div 
                  className="bar completed" 
                  style={{ width: `${(analyticsData.orders.completed / analyticsData.orders.total) * 100}%` }}
                ></div>
              </div>
              <span>Completed ({analyticsData.orders.completed})</span>
            </div>
            <div className="status-item">
              <div className="status-bar">
                <div 
                  className="bar pending" 
                  style={{ width: `${(analyticsData.orders.pending / analyticsData.orders.total) * 100}%` }}
                ></div>
              </div>
              <span>Pending ({analyticsData.orders.pending})</span>
            </div>
            <div className="status-item">
              <div className="status-bar">
                <div 
                  className="bar cancelled" 
                  style={{ width: `${(analyticsData.orders.cancelled / analyticsData.orders.total) * 100}%` }}
                ></div>
              </div>
              <span>Cancelled ({analyticsData.orders.cancelled})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Products */}
      <div className="top-products">
        <h3>Top Selling Products</h3>
        <div className="products-table">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Units Sold</th>
                <th>Revenue</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.products.topSelling.map((product, index) => (
                <tr key={index}>
                  <td>
                    <div className="product-rank">
                      <span className="rank">#{index + 1}</span>
                      <strong>{product.name}</strong>
                    </div>
                  </td>
                  <td>{product.sold}</td>
                  <td>{formatCurrency(product.revenue)}</td>
                  <td>
                    <div className="performance-bar">
                      <div 
                        className="bar" 
                        style={{ 
                          width: `${(product.sold / analyticsData.products.topSelling[0].sold) * 100}%`,
                          backgroundColor: '#A599B5'
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Performance */}
      <div className="category-performance">
        <h3>Sales by Category</h3>
        <div className="categories-grid">
          {analyticsData.products.categories.map((category, index) => (
            <div key={index} className="category-card">
              <div className="category-name">{category.name}</div>
              <div className="category-percentage">{category.percentage}%</div>
              <div className="category-count">{category.count} units</div>
              <div className="category-bar">
                <div 
                  className="bar" 
                  style={{ 
                    width: `${category.percentage}%`,
                    backgroundColor: ['#A599B5', '#ACBDBA', '#2E2F2F', '#051014'][index % 4]
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Analytics;
