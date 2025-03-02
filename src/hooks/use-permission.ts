import { useAuthContextProvider } from '../hooks/useAuthContextProvider';
import { ROLES } from '../lib/constants/roles';
import type { Permissions, PermissionResource, PermissionCheck } from '@/types/permissions';

export const usePermission = () => {
    const { currentUser } = useAuthContextProvider();
  
    const hasAccess = <K extends keyof PermissionResource>(
      resource: K,
      action: PermissionResource[K],
      data?: Permissions[K]["dataType"]
    ): boolean => {
      if (!currentUser) return false;
  
      // Check permissions for the user's current role
      const rolePermissions = ROLES[currentUser.role.name];
      
      // Check for global access
      if (rolePermissions.$all) return true;

      // Type-safe permission access using type guard
      const resourcePermissions = rolePermissions[resource] as 
        Record<PermissionResource[K], boolean | PermissionCheck<Permissions[K]["dataType"]>> | undefined;

      const permission = resourcePermissions?.[action];
      
      if (typeof permission === 'function') {
        return permission(currentUser, data);
      }
      
      return !!permission;
    };
  
    return { hasAccess };
};
