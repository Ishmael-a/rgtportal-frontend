import { useQuery, useMutation, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { useAuthContextProvider } from '../../hooks/useAuthContextProvider';
import { usePermission } from '../../hooks/use-permission';
import { QueryClient } from '@tanstack/react-query';
import { PermissionResource } from '@/types/permissions';



// Create a global query client instance
export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 3,
      },
    },
  });


  
  /**
   * Enhanced React Query hook that integrates with the RBAC permission system
   */
  export function useRbacQuery<TData, TError = unknown>(
    resource: keyof PermissionResource,
    action: string,
    queryKey: QueryKey,
    queryFn: () => Promise<TData>,
    options?: Omit<UseQueryOptions<TData, TError, TData, QueryKey>, 'queryKey' | 'queryFn'>,
    dataForPermissionCheck?: any
  ) {
    const { hasAccess } = usePermission();
    
    // Check if user has permission
    const hasPermission = hasAccess(resource as any, action as any, dataForPermissionCheck);
    
    return useQuery<TData, TError>({
      queryKey,
      queryFn,
      ...options,
      enabled: hasPermission && (options?.enabled !== false),
      meta: {
        ...options?.meta,
        permissionChecked: true,
        resource,
        action,
        hasPermission,
      },
    });
  }
  
  /**
   * Hook for prefetching data with permission checks
   */
  export function usePrefetchWithPermission() {
    const { hasAccess } = usePermission();
    
    return {
      prefetchIfAllowed: <TData>(
        resource: keyof PermissionResource,
        action: string, 
        queryKey: QueryKey,
        queryFn: () => Promise<TData>,
        dataForPermissionCheck?: any
      ) => {
        if (hasAccess(resource as any, action as any, dataForPermissionCheck)) {
          return queryClient.prefetchQuery({
            queryKey,
            queryFn,
          });
        }
        return Promise.resolve();
      }
    };
  }