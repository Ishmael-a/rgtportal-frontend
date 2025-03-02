import { Employee } from "./employee";

export interface Department{
  id: number;
  name: string;
  description: string;
  managerId: number;
  manager: Employee;
  employees: Employee[];
}