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
import NotificationDemo from './pages/NotificationDemo';
import EmailVerification from './pages/EmailVerification';

// Auth Components
import SignUp from './component/SignUp';
import Login from './component/Login';
import ForgotPassword from './component/ForgotPassword';
import ResetPassword from './component/ResetPassword';

// Other Components
import ProductList from './component/ProductList';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './component/NotificationSystem';
import ProtectedRoute from './component/ProtectedRoute';
import PublicRoute from './component/PublicRoute';
import useRouteGuard from './hooks/useRouteGuard';
import useBrowserSecurity from './hooks/useBrowserSecurity';
import useNavProtection from './hooks/useNavProtection';

import './App.css';

// Main App content component to use the route guard
function AppContent() {
  useRouteGuard(); // Apply route protection
  useBrowserSecurity(); // Apply browser security measures
  useNavProtection(); // Apply comprehensive navigation protection

  return (
    <div className="App">
      <Routes>
        {/* Home/Landing page */}
        <Route path="/" element={<Home />} />
        
        {/* Main product pages - Protected Routes */}
        <Route path="/prebuilt" element={
          <ProtectedRoute>
            <PreBuiltSystem />
          </ProtectedRoute>
        } />
        <Route path="/custom" element={
          <ProtectedRoute>
            <CustomBuildConfigurator />
          </ProtectedRoute>
        } />
        <Route path="/accessories" element={
          <ProtectedRoute>
            <Accessories />
          </ProtectedRoute>
        } />
        <Route path="/items" element={
          <ProtectedRoute>
            <ItemsDisplay />
          </ProtectedRoute>
        } />
        <Route path="/products" element={
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        } />
        
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
        
        {/* Authentication - Public Routes (redirect if logged in) */}
        <Route path="/signup" element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        } />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/forgot-password" element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        } />
        <Route path="/reset-password/:token" element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        } />
        <Route path="/verify-email/:token" element={
          <PublicRoute>
            <EmailVerification />
          </PublicRoute>
        } />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {/* Demo Route for Testing Notifications and Email System */}
        <Route path="/demo" element={
          <ProtectedRoute>
            <NotificationDemo />
          </ProtectedRoute>
        } />

        {/* Fallback route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <AppContent />
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
