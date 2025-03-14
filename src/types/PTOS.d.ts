interface PTORequest {
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
}
