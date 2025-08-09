import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// This hook prevents users from manually navigating to protected routes
// by manipulating the browser URL or using browser history
const useNavProtection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  // List of routes that should not be accessible to authenticated users
  const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password'];
  
  // List of routes that should only be accessible to authenticated users
  const protectedRoutes = [
    '/prebuilt', 
    '/custom', 
    '/accessories',
    '/items',
    '/products',
    '/cart',
    '/checkout'
  ];

  // List of admin-only routes
  const adminRoutes = ['/admin'];

  // Monitor URL changes and redirect users as needed
  useEffect(() => {
    if (loading) return; // Don't do anything while auth is still loading

    const currentPath = location.pathname;

    // Prevent authenticated users from accessing auth pages
    const isAuthRoute = authRoutes.some(route => 
      currentPath === route || (route !== '/reset-password' && currentPath.startsWith(route))
    );

    // Check if current path is a protected route
    const isProtectedRoute = protectedRoutes.some(route => 
      currentPath === route || currentPath.startsWith(route)
    );

    // Check if current path is an admin route
    const isAdminRoute = adminRoutes.some(route => 
      currentPath === route || currentPath.startsWith(route)
    );

    if (isAuthRoute && isAuthenticated) {
      // Redirect away from auth pages if authenticated
      navigate('/', { replace: true });
      return;
    }

    if (isProtectedRoute && !isAuthenticated) {
      // Redirect to login if trying to access protected routes while not authenticated
      navigate('/login', { replace: true, state: { from: location } });
      return;
    }

    // Admin routes handling would go here if we have user.role information
  }, [location, isAuthenticated, loading, navigate]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      // Re-evaluate protection on browser back/forward navigation
      const currentPath = window.location.pathname;
      
      // Auth routes checks
      const isAuthRoute = authRoutes.some(route => 
        currentPath === route || (route !== '/reset-password' && currentPath.startsWith(route))
      );
      
      if (isAuthRoute && isAuthenticated) {
        window.history.replaceState(null, '', '/');
        navigate('/', { replace: true });
        return;
      }
      
      // Protected routes checks
      const isProtectedRoute = protectedRoutes.some(route => 
        currentPath === route || currentPath.startsWith(route)
      );
      
      if (isProtectedRoute && !isAuthenticated) {
        window.history.replaceState(null, '', '/login');
        navigate('/login', { replace: true, state: { from: { pathname: currentPath } } });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [authRoutes, protectedRoutes, isAuthenticated, navigate]);
};

export default useNavProtection;
