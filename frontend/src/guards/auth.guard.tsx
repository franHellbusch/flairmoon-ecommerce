import { useAppSelector } from "@/hooks/redux";
import { PublicRoutes } from "@/types/routes";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Restricts access to routes for unauthenticated users.
 */
function AuthGuard() {
  const authState = useAppSelector((store) => store.auth);
  return authState.isAuthenticated ? <Outlet /> : <Navigate to={`/${PublicRoutes.HOME}`} replace />;
}

export default AuthGuard;
