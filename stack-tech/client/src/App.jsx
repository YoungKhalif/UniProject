import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PreBuiltSystem from './pages/PreBuiltSystem';
import CustomBuildConfigurator from './pages/CustomBuildConfigurator';
import Accessories from './pages/Accessories';
import ItemsDisplay from './pages/ItemsDisplay';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import SignUp from './component/SignUp';
import Login from './component/Login';
import ForgotPassword from './component/ForgotPassword';
import './App.css';

function App() {
  return (
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
          
          {/* Shopping flow */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          
          {/* Authentication */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Fallback route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
