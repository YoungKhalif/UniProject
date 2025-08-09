import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Navigation guard that handles route protection and browser history
const useRouteGuard = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return; // Don't do anything while auth is loading

    const currentPath = location.pathname;
    
    // Define protected routes that require authentication
    const protectedRoutes = [
      '/prebuilt',
      '/custom', 
      '/accessories',
      '/items',
      '/products',
      '/cart',
      '/checkout',
      '/admin'
    ];

    // Define public routes that authenticated users shouldn't access
    const authRoutes = ['/login', '/signup', '/forgot-password'];

    const isProtectedRoute = protectedRoutes.some(route => 
      currentPath.startsWith(route)
    );
    
    const isAuthRoute = authRoutes.some(route => 
      currentPath.startsWith(route)
    );

    // Handle back/forward button navigation
    const handlePopState = (event) => {
      // Prevent navigation to protected routes when not authenticated
      if (isProtectedRoute && !isAuthenticated) {
        event.preventDefault();
        navigate('/login', { replace: true });
        return;
      }

      // Prevent navigation to auth routes when authenticated
      if (isAuthRoute && isAuthenticated) {
        event.preventDefault();
        navigate('/', { replace: true });
        return;
      }
    };

    // Add event listener for browser navigation
    window.addEventListener('popstate', handlePopState);

    // Cleanup event listener
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isAuthenticated, loading, location, navigate]);

  // Also handle direct URL access attempts
  useEffect(() => {
    if (loading) return;

    const currentPath = location.pathname;
    
    // Block direct access to protected routes via URL bar
    const protectedRoutes = ['/prebuilt', '/custom', '/accessories', '/items', '/products', '/cart', '/checkout', '/admin'];
    const authRoutes = ['/login', '/signup', '/forgot-password'];

    const isProtectedRoute = protectedRoutes.some(route => currentPath.startsWith(route));
    const isAuthRoute = authRoutes.some(route => currentPath.startsWith(route));

    if (isProtectedRoute && !isAuthenticated) {
      navigate('/login', { replace: true, state: { from: location } });
    }

    if (isAuthRoute && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, loading, location, navigate]);
};

export default useRouteGuard;
