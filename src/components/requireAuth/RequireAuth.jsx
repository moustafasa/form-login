import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const RequireAuth = ({ roles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const userRoles = jwtDecode(auth.token).roles || [];

  return userRoles?.find((role) => roles.includes(role)) ? (
    <Outlet />
  ) : auth.username ? (
    <Navigate to={"/unAuthorized"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
