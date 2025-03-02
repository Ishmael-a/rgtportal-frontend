import { useRbacQuery } from '@/features/data-access/rbacQuery';
import { departmentService } from '../services/department.service';
import { CreateDepartmentDTO } from '@/types/department';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';


export const useDepartments = () => {
    return useRbacQuery(
      'employeeRecords',
      'view',
      ['departments'],
      () => departmentService.getAllDepartments(),
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
        queryClient.invalidateQueries({ queryKey: ['departments'] });
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