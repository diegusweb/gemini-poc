import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    isAuthenticated: boolean;
    redirectPath?: string;
  }

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    isAuthenticated,
    redirectPath = '/',
  }) => {
    if (!isAuthenticated) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return <Outlet />;
  };
  
  export default ProtectedRoute;