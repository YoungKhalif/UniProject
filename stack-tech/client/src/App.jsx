import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page Components
import Home from './pages/Home';
import PreBuiltSystem from './pages/PreBuiltSystem';
import CustomBuildConfigurator from './pages/CustomBuildConfigurator';
import Accessories from './pages/Accessories';
import ItemsDisplay from './pages/ItemsDisplay';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Dashboard from './pages/admin/Dashboard';
import Unauthorized from './pages/Unauthorized';

// Auth Components
import SignUp from './component/SignUp';
import Login from './component/Login';
import ForgotPassword from './component/ForgotPassword';
import ResetPassword from './component/ResetPassword';

// Other Components
import ProductList from './component/ProductList';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './component/ProtectedRoute';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Home/Landing page */}
            <Route path="/" element={<Home />} />
            
            {/* Main product pages */}
            <Route path="/prebuilt" element={<PreBuiltSystem />} />
            <Route path="/custom" element={<CustomBuildConfigurator />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/items" element={<ItemsDisplay />} />
            <Route path="/products" element={<ProductList />} />
            
            {/* Shopping flow - Protected Routes */}
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            
            {/* Authentication */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly={true}>
                <Dashboard />
              </ProtectedRoute>
            } />

            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
