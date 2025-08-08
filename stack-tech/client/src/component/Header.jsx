import React, { useState } from 'react';
import './css/Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

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

            {/* Auth Buttons */}
            <div className="header__auth">
              <button className="auth__button auth__button--login">
                Login
              </button>
              <button className="auth__button auth__button--signup">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Layer - Logo and Navigation */}
      <div className="header__bottom">
        <div className="header__bottom-container">
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
          <nav className="header__nav">
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
        </div>
      </div>
    </header>
  );
};

export default Header;



