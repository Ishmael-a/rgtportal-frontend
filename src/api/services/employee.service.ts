import { createApiClient } from "../axios";
import { PaginatedResponse } from "../types";
import { Employee, UpdateEmployeeInterface } from "@/types/employee";

const employeeApiClient = createApiClient(
  `${import.meta.env.VITE_API_URL}/employees`
);

export const employeeService = {
  getAllEmployeesPaginated: async (params?: {
    departmentId?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Employee>> => {
    const response = await employeeApiClient.get<PaginatedResponse<Employee>>(
      "/",
      {
        params,
      }
    );
    return response.data;
  },

  getAllEmployees: async (params?: {
    departmentId?: string;
    status?: string;
    search?: string;
  }): Promise<{ data: Employee[]; message: string }> => {
    const response = await employeeApiClient.get<{
      data: Employee[];
      message: string;
    }>("/", {
      params,
    });
    return response.data;
  },

  getEmployeeById: async (
    id: string
  ): Promise<{ data: Employee; message: string }> => {
    const response = await employeeApiClient.get<{
      data: Employee;
      message: string;
    }>(`/${id}`);
    return response.data;
  },

  updateEmployee: async (
    id: number,
    data: UpdateEmployeeInterface
  ): Promise<Employee> => {
    const response = await employeeApiClient.put<Employee>(`/${id}`, data);
    return response.data;
  },
};
