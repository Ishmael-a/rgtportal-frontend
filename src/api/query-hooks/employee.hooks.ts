import { useRbacQuery, usePrefetchWithPermission } from '@/features/data-access/rbacQuery';
import { employeeService } from '../services/employee.service';
import { useMutation, useQueryClient, UseQueryOptions, QueryKey} from '@tanstack/react-query';
import {Employee} from "@/types/employee"
import { toast } from '@/hooks/use-toast';


export const useAllEmployees = (
    params?: { 
        departmentId?: string; 
        status?: string;
        search?: string;
        page?: number;
        limit?: number;
    },
    options?: Omit<UseQueryOptions<Employee[],Error,Employee[],QueryKey>,'queryKey' | 'queryFn' > & {
        enabled?: boolean;
    }
) => {
  return useRbacQuery(
    "employeeRecords",
    "view",
    ["employees", params],
    () => employeeService.getAllEmployees(params),
    {
        ...options,
        placeholderData: (previousData) => {
            return previousData;
        },

    }
  );
};

export const useEmployeeDetails = (id: string) => {
  return useRbacQuery(
    "employeeRecords",
    "view",
    ["employee", id],
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
      queryClient.invalidateQueries({ queryKey: ["employee", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    toast({
      title: "Success",
      description: "Employee updated successfully",
    });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  });
};


export const usePrefetchEmployeeData = () => {
  const { prefetchIfAllowed } = usePrefetchWithPermission();

  const prefetchEmployee = (id: string) => {
    return prefetchIfAllowed("employeeRecords", "view", ["employee", id], () =>
      employeeService.getEmployeeById(id)
    );
  };

  return { prefetchEmployee };
};
