import { useRbacQuery, usePrefetchWithPermission } from '@/features/data-access/rbacQuery';
import { departmentService } from '../services/department.service';
import { CreateDepartmentDTO } from '@/types/department';
import { useMutation, useQueryClient, UseQueryOptions, QueryKey} from '@tanstack/react-query';
import { toast } from 'react-hot-toast'; 




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
        toast.success(`${variables.data.name} Department created successfully`);
      },
      onError: (error) => {
        toast.error(`Creating Department failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    });
  };