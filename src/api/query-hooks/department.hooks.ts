import { useMutation, useQueryClient } from '@tanstack/react-query';



import { useRbacQuery } from '@/features/data-access/rbacQuery';
import { toast } from '@/hooks/use-toast';
import { AddEmployeeToDepartmentDTO, AddEmployeesToDepartmentDTO, CreateDepartmentDTO, DepartmentQueryParams } from '@/types/department';



import { departmentService } from '../services/department.service';





export const useDepartments = (options?: { includeEmployees?: boolean }) => {
  return useRbacQuery(
    'employeeRecords',
    'view',
    ['departments', options],
    () => departmentService.getAllDepartments({includeEmployees: options?.includeEmployees}),
    {}
  );
};
export const useGetDepartmentById = (
  id: string,
  options?: {
    includeEmployees?: boolean;
  }
) => {
  return useRbacQuery(
    'employeeRecords',
    'view',
    ['departments', id],
    () => departmentService.getDepartmentById(
        id, {
        includeEmployees: options?.includeEmployees,
    }),
    {}
  );
};

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ data }: { data: CreateDepartmentDTO }) => 
      departmentService.createNewDepartment(data),
    onSuccess: (_, variables) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ['departments'],
        exact: false
      });
      toast({
        title: 'Success',
        description: 'Department created successfully',
      })
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    }
  });
};


export const useAddEmployeeToDepartment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: AddEmployeeToDepartmentDTO }) => 
      departmentService.addEmployeeToDepartment(id, data),
    onSuccess: (_, variables) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['departments', variables.id] });
      queryClient.invalidateQueries({
        queryKey: ['departments'],
        exact: false 
      });
      toast({
        title: 'Success',
        description: 'Employee Added To Department Successfully',
      })
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    }
  });
};


export const useAddEmployeesToDepartment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: AddEmployeesToDepartmentDTO }) => 
      departmentService.addEmployeesToDepartment(id, data),
    onSuccess: (_, variables) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['departments', variables.id] });
      queryClient.invalidateQueries({
        queryKey: ['departments'],
        exact: false
      });
      toast({
        title: 'Success',
        description: 'Employees Added To Department Successfully',
      })
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    }
  });
};