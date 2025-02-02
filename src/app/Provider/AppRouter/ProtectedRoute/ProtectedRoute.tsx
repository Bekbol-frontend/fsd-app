import { routePaths } from "@/shared/config/route";
import { useUser } from "@/shared/hooks/useUser";
import { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = useUser();

  return user ? <Outlet /> : <Navigate to={routePaths.HOME} replace />;
};

export default memo(ProtectedRoute);
