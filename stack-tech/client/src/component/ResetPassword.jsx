import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { authService } from '../services/api';
import Header from './Header';
import './css/ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams();
  // No longer need navigate as we're using Link components
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(true);

  // Password requirements
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordErrors, setPasswordErrors] = useState({
    length: true,
    upperCase: true,
    lowerCase: true,
    number: true,
    special: true
  });

  useEffect(() => {
    // Check if token is valid
    const verifyToken = async () => {
      try {
        await authService.verifyResetToken(token);
      } catch {
        setIsTokenValid(false);
      }
    };
    
    verifyToken();
  }, [token]);

  useEffect(() => {
    // Check password requirements
    let strength = 0;
    const errors = {
      length: password.length < 8,
      upperCase: !/[A-Z]/.test(password),
      lowerCase: !/[a-z]/.test(password),
      number: !/[0-9]/.test(password),
      special: !/[^A-Za-z0-9]/.test(password)
    };

    // Calculate strength score (0-5)
    if (password.length > 0) {
      strength += !errors.length ? 1 : 0;
      strength += !errors.upperCase ? 1 : 0;
      strength += !errors.lowerCase ? 1 : 0;
      strength += !errors.number ? 1 : 0;
      strength += !errors.special ? 1 : 0;
    }

    setPasswordStrength(strength);
    setPasswordErrors(errors);
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength < 3) {
      setError('Please create a stronger password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Send request to reset password
      await authService.resetPassword(token, password);
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Password reset error:', error);
      
      if (error.response && error.response.data && error.response.data.msg) {
        setError(error.response.data.msg);
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // If token is invalid
  if (!isTokenValid) {
    return (
      <>
        <Header />
        <div className="reset-password">
          <div className="reset-password__container">
            <div className="token-invalid">
              <div className="token-invalid__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </div>
              
              <h2 className="token-invalid__title">Invalid or Expired Link</h2>
              
              <p className="token-invalid__message">
                The password reset link is invalid or has expired. Please request a new password reset link.
              </p>
              
              <Link to="/forgot-password" className="token-invalid__button">
                Request New Link
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // If password has been reset successfully
  if (isSubmitted) {
    return (
      <>
        <Header />
        <div className="reset-password">
          <div className="reset-password__container">
            <div className="success">
              <div className="success__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22,4 12,14.01 9,11.01"></polyline>
                </svg>
              </div>
              
              <h2 className="success__title">Password Reset Successfully</h2>
              
              <p className="success__message">
                Your password has been reset successfully. You can now log in with your new password.
              </p>
              
              <Link to="/login" className="success__button">
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="reset-password">
        <div className="reset-password__container">
          <div className="reset-password__header">
            <div className="header__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          
          <h2 className="header__title">Reset Your Password</h2>
          <p className="header__subtitle">
            Create a new password for your account
          </p>
        </div>

        <form className="reset-password__form" onSubmit={handleSubmit}>
          {error && (
            <div className="form__error">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {error}
            </div>
          )}
          
          <div className="form__group">
            <label htmlFor="password" className="form__label">
              New Password
            </label>
            <div className="form__input-container">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`form__input ${error ? 'form__input--error' : ''}`}
                placeholder="Enter your new password"
                disabled={isLoading}
                autoComplete="new-password"
                autoFocus
              />
              <div className="form__input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
            </div>

            {/* Password strength meter */}
            <div className="password-strength">
              <div className="strength-meter">
                <div 
                  className={`strength-meter__fill strength-meter__fill--${
                    passwordStrength === 0 ? 'empty' : 
                    passwordStrength < 3 ? 'weak' : 
                    passwordStrength < 5 ? 'medium' : 'strong'
                  }`}
                  style={{width: `${passwordStrength * 20}%`}}
                ></div>
              </div>
              <span className="strength-text">
                {password.length === 0 ? 'Enter password' :
                 passwordStrength < 3 ? 'Weak password' :
                 passwordStrength < 5 ? 'Medium strength' :
                 'Strong password'}
              </span>
            </div>

            {/* Password requirements */}
            {password.length > 0 && (
              <div className="password-requirements">
                <div className={`requirement ${!passwordErrors.length ? 'requirement--valid' : ''}`}>
                  <span className="requirement__icon">
                    {!passwordErrors.length ? '✓' : '✗'}
                  </span>
                  <span>At least 8 characters</span>
                </div>
                <div className={`requirement ${!passwordErrors.upperCase ? 'requirement--valid' : ''}`}>
                  <span className="requirement__icon">
                    {!passwordErrors.upperCase ? '✓' : '✗'}
                  </span>
                  <span>Uppercase letter (A-Z)</span>
                </div>
                <div className={`requirement ${!passwordErrors.lowerCase ? 'requirement--valid' : ''}`}>
                  <span className="requirement__icon">
                    {!passwordErrors.lowerCase ? '✓' : '✗'}
                  </span>
                  <span>Lowercase letter (a-z)</span>
                </div>
                <div className={`requirement ${!passwordErrors.number ? 'requirement--valid' : ''}`}>
                  <span className="requirement__icon">
                    {!passwordErrors.number ? '✓' : '✗'}
                  </span>
                  <span>Number (0-9)</span>
                </div>
                <div className={`requirement ${!passwordErrors.special ? 'requirement--valid' : ''}`}>
                  <span className="requirement__icon">
                    {!passwordErrors.special ? '✓' : '✗'}
                  </span>
                  <span>Special character (!@#$%^&*)</span>
                </div>
              </div>
            )}
          </div>

          <div className="form__group">
            <label htmlFor="confirmPassword" className="form__label">
              Confirm Password
            </label>
            <div className="form__input-container">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`form__input ${error ? 'form__input--error' : ''}`}
                placeholder="Confirm your new password"
                disabled={isLoading}
                autoComplete="new-password"
              />
              <div className="form__input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-9.618 5.04L12 21.012l9.618-13.028z"></path>
                </svg>
              </div>
            </div>
            {password && confirmPassword && password !== confirmPassword && (
              <div className="form__message form__message--error">
                Passwords do not match
              </div>
            )}
          </div>

          <button 
            type="submit"
            className="form__submit"
            disabled={isLoading || !password || !confirmPassword || password !== confirmPassword || passwordStrength < 3}
          >
            {isLoading ? (
              <>
                <div className="button__spinner"></div>
                Resetting Password...
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <polyline points="17 11 19 13 23 9"></polyline>
                </svg>
                Reset Password
              </>
            )}
          </button>
        </form>

        <div className="reset-password__footer">
          <Link to="/login" className="footer__link">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default ResetPassword;
