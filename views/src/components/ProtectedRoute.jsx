import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element, isAllowed, fallbackPath }) {
  return isAllowed ? element : <Navigate to={fallbackPath} replace />;
}

export default ProtectedRoute;
