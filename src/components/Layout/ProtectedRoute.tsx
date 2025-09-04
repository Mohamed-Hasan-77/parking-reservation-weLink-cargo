import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../store/useUserStore";

const ProtectedRoute = () => {
  const { token } = useAuthStore();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />
};

export default ProtectedRoute;