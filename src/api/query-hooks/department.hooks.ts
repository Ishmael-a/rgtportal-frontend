import { useRbacQuery, usePrefetchWithPermission } from '@/features/data-access/rbacQuery';
import { departmentService } from '../services/department.service';



export const useDepartments = () => {
    return useRbacQuery(
      'employeeRecords',
      'view',
      ['departments'],
      () => departmentService.getAllDepartments(),
      {}
    );
  };