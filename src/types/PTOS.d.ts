interface PTORequest {
<<<<<<< HEAD
  employee_id: string;
  department_id: string;
}

interface PtoLeave {
  //   employeeId: number;
  id?: number;
  startDate: Date | undefined;
  endDate: Date | undefined;
  type: string;
  reason?: string;
  approverId?: number;
  createdAt?: Date;
  departmentId?: number;
  status?: string;
  statusReason?: string;
=======
    employee_id: string;
    department_id: string;
};


export interface PTO {
  id: number;
  employeeId: number;
  startDate: Date;
  endDate: Date;
  status: string;
  type: string;
  reason?: string;
  statusReason?: string;
  approverId: number;
  createdAt: Date;
  employee: Employee;
  approver: Employee;
>>>>>>> 721aeaadb19a8b9b4f981432b9cc7da7d740ecae
}
