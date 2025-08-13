import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EmailVerification.css';

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verificationState, setVerificationState] = useState({
    status: 'verifying', // 'verifying', 'success', 'error', 'expired'
    message: 'Verifying your email address...'
  });
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        console.log('Attempting to verify token:', token);
        const response = await fetch(`http://localhost:5000/api/auth/verify-email/${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);

        if (response.ok) {
          setVerificationState({
            status: 'success',
            message: 'Your email has been successfully verified! You can now log in to your account.'
          });
          
          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setVerificationState({
            status: data.msg?.includes('expired') ? 'expired' : 'error',
            message: data.msg || 'Email verification failed. Please try again.'
          });
        }
      } catch (error) {
        console.error('Verification error:', error);
        setVerificationState({
          status: 'error',
          message: 'Something went wrong. Please try again later.'
        });
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setVerificationState({
        status: 'error',
        message: 'Invalid verification link. No token provided.'
      });
    }
  }, [token, navigate]);

  const resendVerification = async () => {
    setIsResending(true);
    try {
      // You'll need to implement this endpoint and pass user email
      const email = localStorage.getItem('verificationEmail');
      if (!email) {
        alert('No email found for resending verification. Please sign up again.');
        return;
      }

      const response = await fetch('http://localhost:5000/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        alert('Verification email sent! Please check your inbox.');
      } else {
        alert('Failed to resend verification email. Please try again.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again later.');
    } finally {
      setIsResending(false);
    }
  };

  const getStatusIcon = () => {
    switch (verificationState.status) {
      case 'verifying':
        return (
          <div className="verification-spinner">
            <div className="spinner"></div>
          </div>
        );
      case 'success':
        return (
          <div className="verification-icon success">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
        );
      case 'error':
      case 'expired':
        return (
          <div className="verification-icon error">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="email-verification-container">
      <div className="email-verification-card">
        <div className="verification-header">
          <h1>Email Verification</h1>
          <p className="verification-subtitle">Stack Technologies</p>
        </div>

        <div className="verification-content">
          {getStatusIcon()}
          
          <h2 className={`verification-title ${verificationState.status}`}>
            {verificationState.status === 'verifying' && 'Verifying Email...'}
            {verificationState.status === 'success' && 'Email Verified!'}
            {verificationState.status === 'error' && 'Verification Failed'}
            {verificationState.status === 'expired' && 'Link Expired'}
          </h2>

          <p className="verification-message">
            {verificationState.message}
          </p>

          <div className="verification-actions">
            {verificationState.status === 'success' && (
              <button 
                className="btn-primary"
                onClick={() => navigate('/login')}
              >
                Go to Login
              </button>
            )}

            {(verificationState.status === 'error' || verificationState.status === 'expired') && (
              <div className="error-actions">
                <button 
                  className="btn-secondary"
                  onClick={resendVerification}
                  disabled={isResending}
                >
                  {isResending ? 'Sending...' : 'Resend Verification Email'}
                </button>
                <button 
                  className="btn-outline"
                  onClick={() => navigate('/signup')}
                >
                  Back to Sign Up
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="verification-footer">
          <p>
            Need help? Contact our{' '}
            <a href="mailto:support@stacktechnologies.com">support team</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
