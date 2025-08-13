import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLinks from './AuthLinks';
import NotificationButton from './NotificationButton';
import './css/Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
    // You can implement search functionality here
  };

  // Removed unused handler functions for login/signup as they're now handled by AuthLinks

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="header">
      {/* Top Layer - Search and Auth */}
      <div className="header__top">
        <div className="header__top-container">
          <div className="header__top-right">
            {/* Search Component */}
            <div className="header__search">
              <form className="search__form" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  className="search__input"
                  placeholder="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search__button">
                  <svg className="search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>
              </form>
            </div>

            {/* Notifications - only show for authenticated users */}
            {isAuthenticated && <NotificationButton />}

            {/* Auth Buttons or User Profile */}
            <div className="header__auth">
              {isAuthenticated ? (
                <div className="user-profile" ref={dropdownRef}>
                  <div className="user-profile__container" onClick={toggleDropdown}>
                    <div className="user-avatar">
                      {user?.firstName?.charAt(0) || user?.username?.charAt(0) || '?'}
                    </div>
                    <span className="user-name">
                      {user?.firstName || user?.username || 'User'}
                    </span>
                    <svg className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </div>
                  
                  {dropdownOpen && (
                    <div className="user-dropdown">
                      {user?.role === 'admin' && (
                        <Link to="/admin" className="dropdown-item">
                          Admin Dashboard
                        </Link>
                      )}
                      <Link to="/profile" className="dropdown-item">
                        My Profile
                      </Link>
                      <Link to="/orders" className="dropdown-item">
                        My Orders
                      </Link>
                      <button className="dropdown-item logout-btn" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <AuthLinks />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Layer - Logo and Navigation */}
      <div className="header__bottom">
        <div className="header__bottom-container">
          {/* Logo Section */}
          <div className="header__logo">
            <Link to="/home" className="logo__link">
              <div className="logo__icon">
                <div className="logo__stack">
                  <div className="stack__layer stack__layer--1"></div>
                  <div className="stack__layer stack__layer--2"></div>
                  <div className="stack__layer stack__layer--3"></div>
                </div>
              </div>
              <div className="logo__text">
                <h1 className="logo__title">STACKS</h1>
                <span className="logo__subtitle">TECHNOLOGIES</span>
              </div>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="header__nav">
            <ul className="nav__list">
              <li className="nav__item">
                <Link 
                  to="/home" 
                  className={`nav__link ${isActiveRoute('/home') || isActiveRoute('/') ? 'nav__link--active' : ''}`}
                >
                  HOME
                </Link>
              </li>
              <li className="nav__item">
                <Link 
                  to="/prebuilt" 
                  className={`nav__link ${isActiveRoute('/prebuilt') ? 'nav__link--active' : ''}`}
                >
                  PRE-BUILT SYSTEM
                </Link>
              </li>
              <li className="nav__item">
                <Link 
                  to="/custom" 
                  className={`nav__link ${isActiveRoute('/custom') ? 'nav__link--active' : ''}`}
                >
                  CUSTOM BUILD CONFIGURATOR
                </Link>
              </li>
              <li className="nav__item">
                <Link 
                  to="/accessories" 
                  className={`nav__link ${isActiveRoute('/accessories') ? 'nav__link--active' : ''}`}
                >
                  ACCESSORIES
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;



