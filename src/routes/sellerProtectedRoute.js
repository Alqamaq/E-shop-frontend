import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadSeller } from "../redux/actions/user.js";

const SellerProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  // grab authentication/loading state directly from Redux so callers don't need to pass props
  const { isSellerAuthenticated, isLoading } = useSelector(
    (state) => state.seller,
  );

  useEffect(() => {
    if (!isSellerAuthenticated && !isLoading) {
      dispatch(loadSeller());
    }
  }, [dispatch, isLoading, isSellerAuthenticated]);

  // while the auth check is in progress just render a placeholder so
  // we don't redirect before the request completes
  if (isLoading) {
    return <div>Loading seller information...</div>;
  }

  if (!isSellerAuthenticated) {
    return <Navigate to={`/`} replace />;
  }

  return children;
};

export default SellerProtectedRoute;
