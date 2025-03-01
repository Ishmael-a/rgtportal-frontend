import { useRbacQuery, usePrefetchWithPermission } from '@/features/data-access/rbacQuery';
import { employeeService } from '../services/employee.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast'; // Assuming you use this for notifications
import {Employee} from "@/types/employee"

export const useAllEmployees = (params?: { 
  departmentId?: string; 
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  return useRbacQuery(
    'employeeRecords',
    'view',
    ['employees', params],
    () => employeeService.getAllEmployees(params),
    {
        placeholderData: (previousData) => {
            // Use the previous data as placeholder data while fetching new data
            return previousData;
        },
      // Show error notification on failure
    //   onError: (error) => {
    //     toast.error(`Failed to fetch employees: ${error instanceof Error ? error.message : 'Unknown error'}`);
    //   }
    }
  );
};

export const useEmployeeDetails = (id: string) => {
  return useRbacQuery(
    'employeeRecords',
    'view',
    ['employee', id],
    () => employeeService.getEmployeeById(id),
    {
      enabled: !!id,
    }
  );
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Employee> }) => 
      employeeService.updateEmployee(id, data),
    onSuccess: (_, variables) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['employee', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success('Employee updated successfully');
    },
    onError: (error) => {
      toast.error(`Updating Employee failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
};


// Hook for prefetching employee data when navigating to employee details
export const usePrefetchEmployeeData = () => {
    const { prefetchIfAllowed } = usePrefetchWithPermission();
    
    const prefetchEmployee = (id: string) => {
      return prefetchIfAllowed(
        'employeeRecords',
        'view',
        ['employee', id],
        () => employeeService.getEmployeeById(id),
      );
    };
    
    return { prefetchEmployee };
};