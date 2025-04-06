import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "@/types/routes";
import { useAppSelector } from "@/hooks/redux";

/**
 * Restricts access to routes for authenticated users.
 */
function NoAuthGuard() {
  const authState = useAppSelector((store) => store.auth);
  return !authState.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={`/${PublicRoutes.HOME}`} replace />
  );
}

export default NoAuthGuard;
