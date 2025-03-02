import { createApiClient } from '../axios';
import { ApiResponse, PaginatedResponse } from '../types';
import { Department } from '@/types/department';


const departmentApiClient = createApiClient(`${import.meta.env.VITE_API_URL}/departments`);


export const departmentService = {


    getAllDepartments: async (): Promise<Department[]> => {
        const response = await departmentApiClient.get<Department[]>('/');
        return response.data;
    },
} 