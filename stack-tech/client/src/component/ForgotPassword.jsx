import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import './css/ForgotPassword.css';
import Header from './Header';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email address is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authService.forgotPassword(email);
      setIsSubmitted(true);
      console.log('Password reset email sent to:', email);
    } catch (error) {
      console.error('Password reset error:', error);
      if (error.response && error.response.data && error.response.data.msg) {
        setError(error.response.data.msg);
      } else {
        setError('Failed to send reset email. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleTryAgain = () => {
    setIsSubmitted(false);
    setEmail('');
    setError('');
  };
  
  if (isSubmitted) {
    return (
      <div>
        <Header />
        <div className={`forgot-password-overlay ${isVisible ? 'forgot-password-overlay--visible' : ''}`}>
          <div className="forgot-password">
            <div className="forgot-password__container forgot-password__container--success">
              <button 
                className="forgot-password__close"
                onClick={handleBackToLogin}
                aria-label="Back to Login"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M19 12H5M12 5l-7 7 7 7"></path>
                </svg>
              </button>
              <div className="success__content">
                <div className="success__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                  </svg>
                </div>
                <h2 className="success__title">Check Your Email</h2>
                <p className="success__message">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <div className="success__instructions">
                  <p>Please check your email and click the link to reset your password.</p>
                  <p>The link will expire in 1 hour for security reasons.</p>
                </div>
                <div className="success__actions">
                  <button 
                    className="success__button success__button--primary"
                    onClick={handleBackToLogin}
                  >
                    Back to Login
                  </button>
                  <button 
                    className="success__button success__button--secondary"
                    onClick={handleTryAgain}
                  >
                    Try Different Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className={`forgot-password-overlay ${isVisible ? 'forgot-password-overlay--visible' : ''}`}>
        <div className="forgot-password">
          <div className="forgot-password__container">
            <button 
              className="forgot-password__close"
              onClick={handleBackToLogin}
              aria-label="Back to Login"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M19 12H5M12 5l-7 7 7 7"></path>
              </svg>
            </button>
            <div className="forgot-password__header">
              <div className="header__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <circle cx="12" cy="16" r="1"></circle>
                  <path d="m7 11 V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h2 className="header__title">Forgot Password?</h2>
              <p className="header__subtitle">
                No worries! Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>
            <form className="forgot-password__form" onSubmit={handleSubmit}>
              <div className="form__group">
                <label htmlFor="email" className="form__label">
                  Email Address
                </label>
                <div className="form__input-container">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`form__input ${error ? 'form__input--error' : ''}`}
                    placeholder="Enter your email address"
                    disabled={isLoading}
                    autoComplete="email"
                    autoFocus
                  />
                  <div className="form__input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                </div>
                {error && (
                  <div className="form__error">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                    {error}
                  </div>
                )}
              </div>
              <button 
                type="submit"
                className="form__submit"
                disabled={isLoading || !email.trim()}
              >
                {isLoading ? (
                  <>
                    <div className="button__spinner"></div>
                    Sending Reset Link...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                    </svg>
                    Send Reset Link
                  </>
                )}
              </button>
            </form>
            <div className="forgot-password__footer">
              <p className="footer__text">
                Remember your password?
              </p>
              <button 
                className="footer__link"
                onClick={handleBackToLogin}
                disabled={isLoading}
              >
                Back to Login
              </button>
            </div>
            <div className="forgot-password__security">
              <div className="security__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <p className="security__text">
                Your security is our priority. The reset link will expire in 1 hour.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
