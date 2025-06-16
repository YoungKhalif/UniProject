// src/routes/AdminRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  
  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

export default AdminRoute;