import { createApiClient } from '../axios';
import { ApiResponse, PaginatedResponse } from '../types';
import { Department, CreateDepartmentDTO } from '@/types/department';


const departmentApiClient = createApiClient(`${import.meta.env.VITE_API_URL}/departments`);


export const departmentService = {


    createNewDepartment: async (data : CreateDepartmentDTO) : Promise<CreateDepartmentDTO> => {
        const response = await departmentApiClient.post<CreateDepartmentDTO>('/', data);
        return response.data;
    },

    getAllDepartments: async (): Promise<ApiResponse<Department[]>> => {
        const response = await departmentApiClient.get<ApiResponse<Department[]>>('/');
        return response.data;
    },
} 