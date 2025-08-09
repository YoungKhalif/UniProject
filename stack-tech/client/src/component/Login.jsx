import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './css/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  
  // Redirect authenticated users away from login page
  useEffect(() => {
    if (isAuthenticated) {
      // If user is already logged in, redirect to home or intended page
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email/Username validation
    if (!formData.emailOrUsername) {
      newErrors.emailOrUsername = 'Email or username is required';
    } else if (formData.emailOrUsername.length < 3) {
      newErrors.emailOrUsername = 'Please enter a valid email or username';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setServerError('');
    setErrors({});
    
    try {
      // Call the login function from AuthContext
      await login({ 
        emailOrUsername: formData.emailOrUsername, // Our backend will handle both email and username
        password: formData.password 
      });
      
      // If login succeeds, navigate to intended page or home
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
      
      // Store remember me preference if needed
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response && error.response.data && error.response.data.msg) {
        setServerError(error.response.data.msg);
      } else {
        setServerError('Invalid credentials. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleGoogleLogin = () => {
    // Handle Google OAuth login
    console.log('Google login initiated');
  };

  const handleGithubLogin = () => {
    // Handle GitHub OAuth login
    console.log('GitHub login initiated');
  };

  return (
    <div className="login">
      <div className="login__container">
        {/* Left Side - Form */}
        <div className="login__form-section">
          <div className="login__form-container">
            {/* Header */}
            <div className="login__header">
              <h1 className="login__title">Welcome Back</h1>
              <p className="login__subtitle">
                Sign in to access your Stack Technologies account
              </p>
            </div>

            {/* Server Error Message */}
            {serverError && (
              <div className="login__error-banner">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{serverError}</span>
              </div>
            )}

            {/* Form */}
            <form className="login__form" onSubmit={handleSubmit}>
              {/* Email/Username Field */}
              <div className="form__group">
                <label htmlFor="emailOrUsername" className="form__label">
                  Email or Username
                </label>
                <input
                  type="text"
                  id="emailOrUsername"
                  name="emailOrUsername"
                  className={`form__input ${errors.emailOrUsername ? 'form__input--error' : ''}`}
                  placeholder="Enter your email or username"
                  value={formData.emailOrUsername}
                  onChange={handleInputChange}
                  required
                />
                {errors.emailOrUsername && (
                  <span className="form__error">{errors.emailOrUsername}</span>
                )}
              </div>

              {/* Password Field */}
              <div className="form__group">
                <label htmlFor="password" className="form__label">
                  Password
                </label>
                <div className="form__input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className={`form__input ${errors.password ? 'form__input--error' : ''}`}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="form__toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="form__error">{errors.password}</span>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="form__options">
                <label className="form__checkbox">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="form__checkbox-mark"></span>
                  <span className="form__checkbox-text">Remember me</span>
                </label>
                
                <button
                  type="button"
                  className="form__forgot-password"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`form__submit ${isLoading ? 'form__submit--loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="form__spinner"></div>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Divider */}
              <div className="form__divider">
                <span className="form__divider-text">Or continue with</span>
              </div>

              {/* Social Login Buttons */}
              <div className="form__social">
                <button
                  type="button"
                  className="form__social-button form__social-button--google"
                  onClick={handleGoogleLogin}
                >
                  <svg className="form__social-icon" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>

                <button
                  type="button"
                  className="form__social-button form__social-button--github"
                  onClick={handleGithubLogin}
                >
                  <svg className="form__social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="form__footer">
                <p className="form__footer-text">
                  Don't have an account?{' '}
                  <button 
                    type="button"
                    className="form__link form__link--primary"
                    onClick={() => navigate('/signup')}
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Background Image */}
        <div className="login__image-section">
          <div className="login__image-overlay">
            <div className="login__image-content">
              <h2 className="login__image-title">
                Power Up Your Gaming Experience
              </h2>
              <p className="login__image-text">
                Access your personalized gaming dashboard, track your orders, and explore the latest in gaming technology.
              </p>
              <div className="login__stats">
                <div className="login__stat">
                  <div className="login__stat-number">50K+</div>
                  <div className="login__stat-label">Happy Gamers</div>
                </div>
                <div className="login__stat">
                  <div className="login__stat-number">10K+</div>
                  <div className="login__stat-label">Custom Builds</div>
                </div>
                <div className="login__stat">
                  <div className="login__stat-number">24/7</div>
                  <div className="login__stat-label">Expert Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
