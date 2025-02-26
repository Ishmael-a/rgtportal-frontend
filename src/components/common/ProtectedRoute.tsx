import React, { useEffect} from 'react'
import {useAuthContextProvider} from '../../hooks/useAuthContextProvider'
import { useNavigate, useLocation, Outlet } from 'react-router-dom';


type ProtectedRouteProps = {
    allowedRoles: ROLE[];
    redirectPath?: string;
    loadingComponent?: React.ReactNode;
    unauthorizedComponent?: React.ReactNode;
};


const ProtectedRoute = ({
  allowedRoles,
  redirectPath = '/login',
  loadingComponent = <div className="flex justify-center items-center h-screen">Loading...</div>,
  unauthorizedComponent = <div className="flex justify-center items-center h-screen">Permission Denied! You don't have permission to access this page</div>
}: ProtectedRouteProps) => {
  // Use the new useAuth hook instead of useAuthContextProvider
  const { currentUser, isLoading, isAuthenticated } = useAuthContextProvider();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect if authentication check is complete and user is not authenticated
    if (!isLoading && !isAuthenticated) {
      navigate(redirectPath, {
        state: { from: location.pathname },
        replace: true
      });
    }
  }, [isAuthenticated, isLoading, navigate, redirectPath, location]);

  // Show loading state while checking authentication
  if (isLoading) {
    return <>{loadingComponent}</>;
  }

  // Check if user has permission based on their role
  // Assuming currentUser.role is an object with a name property as defined in your types
  const hasRequiredRole = currentUser && allowedRoles.includes(currentUser.role.name);

  // Return unauthorized component if user doesn't have required role
  if (!hasRequiredRole) {
    return <>{unauthorizedComponent}</>;
  }

  // User has permission, render children
  return <Outlet />;
};

export default ProtectedRoute;
  


