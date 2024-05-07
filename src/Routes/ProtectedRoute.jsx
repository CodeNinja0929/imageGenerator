import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated === undefined ? null : isAuthenticated === true ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
