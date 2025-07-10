import React, { useState, useEffect } from 'react';
import './css/Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Search query:', searchQuery);
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        {/* Logo Section */}
        <div className="header__logo">
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
        </div>

        {/* Navigation Menu */}
        <nav className={`header__nav ${isMobileMenuOpen ? 'header__nav--mobile-open' : ''}`}>
          <ul className="nav__list">
            <li className="nav__item">
              <a href="#home" className="nav__link nav__link--active">
                HOME
              </a>
            </li>
            <li className="nav__item">
              <a href="#pre-built" className="nav__link">
                PRE-BUILT SYSTEM
              </a>
            </li>
            <li className="nav__item">
              <a href="#configurator" className="nav__link">
                CUSTOM BUILD CONFIGURATOR
              </a>
            </li>
            <li className="nav__item">
              <a href="#accessories" className="nav__link">
                ACCESSORIES
              </a>
            </li>
          </ul>
        </nav>

        {/* Search Section */}
        <div className="header__search">
          <form 
            className={`search__form ${isSearchFocused ? 'search__form--focused' : ''}`}
            onSubmit={handleSearchSubmit}
          >
            <input
              type="text"
              className="search__input"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <button type="submit" className="search__button">
              <svg className="search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </form>
        </div>

        {/* Cart & User Actions */}
        <div className="header__actions">
          <button className="action__button" aria-label="Shopping Cart">
            <svg className="action__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"></path>
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"></path>
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"></path>
            </svg>
            <span className="cart__badge">0</span>
          </button>
          
          <button className="action__button" aria-label="User Account">
            <svg className="action__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu__toggle ${isMobileMenuOpen ? 'mobile-menu__toggle--active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle Mobile Menu"
        >
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {/* <div className={`mobile-menu__overlay ${isMobileMenuOpen ? 'mobile-menu__overlay--active' : ''}`}>
        <nav className="mobile-nav">
          <ul className="mobile-nav__list">
            <li className="mobile-nav__item">
              <a href="#home" className="mobile-nav__link" onClick={toggleMobileMenu}>
                HOME
              </a>
            </li>
            <li className="mobile-nav__item">
              <a href="#pre-built" className="mobile-nav__link" onClick={toggleMobileMenu}>
                PRE-BUILT SYSTEM
              </a>
            </li>
            <li className="mobile-nav__item">
              <a href="#configurator" className="mobile-nav__link" onClick={toggleMobileMenu}>
                CUSTOM BUILD CONFIGURATOR
              </a>
            </li>
            <li className="mobile-nav__item">
              <a href="#accessories" className="mobile-nav__link" onClick={toggleMobileMenu}>
                ACCESSORIES
              </a>
            </li>
          </ul>
        </nav>
      </div> */}
    </header>
  );
};

export default Header;



