import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login-user" replace />;
  }
  return children;
};

export default ProtectedRoute;
