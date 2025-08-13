import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import './css/SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Redirect authenticated users away from signup page
  useEffect(() => {
    if (isAuthenticated) {
      // If user is already logged in, redirect to home
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Phone number validation (optional)
    if (formData.phoneNumber) {
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Please enter a valid phone number';
      }
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
    
    try {
      const { confirmPassword, ...userData } = formData;
      
      // Call the auth service to register the user (this now sends verification email)
      const response = await authService.register(userData);
      
      // Store email for potential resend verification
      localStorage.setItem('verificationEmail', formData.email);
      
      // Show success message instead of auto-login
      setRegistrationSuccess(true);
      
      // Reset form on success
      setFormData({
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
      });
      
    } catch (error) {
      console.error('Sign up error:', error);
      
      if (error.response && error.response.data && error.response.data.msg) {
        setServerError(error.response.data.msg);
      } else {
        setServerError('An error occurred during sign up. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup">
      <div className="signup__container">
        {/* Left Side - Form or Success Message */}
        <div className="signup__form-section">
          <div className="signup__form-container">
            {!registrationSuccess ? (
              <>
                {/* Header */}
                <div className="signup__header">
                  <h1 className="signup__title">Create Account</h1>
                  <p className="signup__subtitle">
                    Join Stack Technologies and build your dream gaming setup
                  </p>
                </div>

                {/* Form */}
                <form className="signup__form" onSubmit={handleSubmit}>
              {/* Name Fields */}
              <div className="form__group form__group--inline">
                <div className="form__field">
                  <label htmlFor="firstName" className="form__label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form__input"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  {errors.firstName && (
                    <span className="form__error">{errors.firstName}</span>
                  )}
                </div>

                <div className="form__field">
                  <label htmlFor="lastName" className="form__label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form__input"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  {errors.lastName && (
                    <span className="form__error">{errors.lastName}</span>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="form__group">
                <label htmlFor="email" className="form__label">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form__input ${errors.email ? 'form__input--error' : ''}`}
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {errors.email && (
                  <span className="form__error">{errors.email}</span>
                )}
              </div>

              {/* Username Field */}
              <div className="form__group">
                <label htmlFor="username" className="form__label">
                  Username *
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className={`form__input ${errors.username ? 'form__input--error' : ''}`}
                  placeholder="Choose a unique username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
                {errors.username && (
                  <span className="form__error">{errors.username}</span>
                )}
              </div>

              {/* Phone Number Field */}
              <div className="form__group">
                <label htmlFor="phoneNumber" className="form__label">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className={`form__input ${errors.phoneNumber ? 'form__input--error' : ''}`}
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
                {errors.phoneNumber && (
                  <span className="form__error">{errors.phoneNumber}</span>
                )}
                <small className="form__help">
                  Used for two-factor authentication and account recovery
                </small>
              </div>

              {/* Password Field */}
              <div className="form__group">
                <label htmlFor="password" className="form__label">
                  Password *
                </label>
                <div className="form__input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className={`form__input ${errors.password ? 'form__input--error' : ''}`}
                    placeholder="Create a strong password"
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
                <small className="form__help">
                  Must contain at least 8 characters with uppercase, lowercase, number, and special character
                </small>
              </div>

              {/* Confirm Password Field */}
              <div className="form__group">
                <label htmlFor="confirmPassword" className="form__label">
                  Confirm Password *
                </label>
                <div className="form__input-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`form__input ${errors.confirmPassword ? 'form__input--error' : ''}`}
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="form__toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
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
                {errors.confirmPassword && (
                  <span className="form__error">{errors.confirmPassword}</span>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="form__group">
                <label className="form__checkbox">
                  <input type="checkbox" required />
                  <span className="form__checkbox-mark"></span>
                  <span className="form__checkbox-text">
                    I agree to the{' '}
                    <a href="#terms" className="form__link">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#privacy" className="form__link">Privacy Policy</a>
                  </span>
                </label>
              </div>

              {/* Server Error Message */}
              {serverError && (
                <div className="form__server-error">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <span>{serverError}</span>
                </div>
              )}
              
              {/* Submit Button */}
              <button
                type="submit"
                className={`form__submit ${isLoading ? 'form__submit--loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="form__spinner"></div>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Login Link */}
              <div className="form__footer">
                <p className="form__footer-text">
                  Already have an account?{' '}
                  <button 
                    type="button"
                    className="form__link form__link--primary"
                    onClick={() => navigate('/login')}
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
            </>
            ) : (
              <div className="signup__success">
                <div className="signup__success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                  </svg>
                </div>
                <h2 className="signup__success-title">Account Created Successfully!</h2>
                <p className="signup__success-message">
                  We've sent a verification email to your email address. 
                  Please check your inbox and click the verification link to activate your account.
                </p>
                <div className="signup__success-actions">
                  <button 
                    className="form__submit"
                    onClick={() => navigate('/login')}
                  >
                    Go to Login
                  </button>
                  <p className="signup__success-help">
                    Didn't receive the email? Check your spam folder or{' '}
                    <button 
                      type="button"
                      className="form__link"
                      onClick={() => setRegistrationSuccess(false)}
                    >
                      try again
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Background Image */}
        <div className="signup__image-section">
          <div className="signup__image-overlay">
            <div className="signup__image-content">
              <h2 className="signup__image-title">
                Build Your Ultimate Gaming Setup
              </h2>
              <p className="signup__image-text">
                Join thousands of gamers who trust Stack Technologies for their custom PC builds and gaming accessories.
              </p>
              <div className="signup__features">
                <div className="signup__feature">
                  <div className="signup__feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  </div>
                  <span>Custom PC Configurator</span>
                </div>
                <div className="signup__feature">
                  <div className="signup__feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  </div>
                  <span>Expert Support & Warranty</span>
                </div>
                <div className="signup__feature">
                  <div className="signup__feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  </div>
                  <span>Fast & Secure Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
