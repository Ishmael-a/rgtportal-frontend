import { createApiClient } from '../axios';
import { ApiResponse } from '../types';
import {PTO, PtoLeave} from '@/types/PTOS';


const ptoApiClient = createApiClient(
  `${import.meta.env.VITE_API_URL}/leave`
);



export const ptoService =  {


    getAllPTOS: async (): Promise<ApiResponse<PTO[]>> => {
        const response = await ptoApiClient.get<ApiResponse<PTO[]>>("/all");
        return response.data;
    },
}