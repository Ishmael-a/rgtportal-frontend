import React, { useEffect} from 'react'
import {useAuthContextProvider} from '../../hooks/useAuthContextProvider'
import { useNavigate, useLocation, Outlet } from 'react-router-dom';


type ProtectedRouteProps = {
    allowedRoles: User['roles'];
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
    const { currentUser } = useAuthContextProvider();
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      // Redirect to login if user is not authenticated
      if ( currentUser === null) {
        navigate(redirectPath, { 
          state: { from: location.pathname },
          replace: true 
        });
      }
    }, [currentUser, navigate, redirectPath, location]);
  
    // Show loading state while checking authentication
    if (currentUser === undefined) {
      return <>{loadingComponent}</>;
    }
  
    // Check if user has permission
    const hasRequiredRole = currentUser && allowedRoles.some(role => 
      currentUser.roles.includes(role)
    );
  
    // Return unauthorized component if user doesn't have required role
    if (!hasRequiredRole) {
      return <>{unauthorizedComponent}</>;
    }
  
    // User has permission, render children
    return<Outlet />;
  };
  
  export default ProtectedRoute;

