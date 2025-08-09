import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

// Security component to prevent unauthorized navigation attempts
const useBrowserSecurity = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Prevent right-click and inspect element (basic protection)
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Prevent F12, Ctrl+Shift+I, Ctrl+U (basic protection)
    const handleKeyDown = (e) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+I (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners only in production
    if (import.meta.env.MODE === 'production') {
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);
    }

    // Cleanup
    return () => {
      if (import.meta.env.MODE === 'production') {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

  // Clear sensitive data from localStorage on logout
  useEffect(() => {
    if (!isAuthenticated) {
      // Clear any sensitive cached data
      const keysToKeep = ['rememberMe']; // Keys we want to keep
      const allKeys = Object.keys(localStorage);
      
      allKeys.forEach(key => {
        if (!keysToKeep.includes(key)) {
          localStorage.removeItem(key);
        }
      });
      
      // Clear session storage
      sessionStorage.clear();
    }
  }, [isAuthenticated]);

  // Prevent back button navigation to sensitive pages after logout
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!isAuthenticated) {
        // Clear history to prevent back button access
        window.history.replaceState(null, null, '/');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isAuthenticated]);
};

export default useBrowserSecurity;
