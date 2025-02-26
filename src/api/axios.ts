import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

// Create custom type for API client configuration
interface ApiClientConfig {
    baseURL: string;
    timeout?: number;
    headers?: Record<string, string>;
    withCredentials?: true;
}


// Default configuration
const defaultConfig: ApiClientConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 15000,
    headers: { 
        'Content-Type': 'application/json' 
    },
    withCredentials: true // Enable cookie handling
}


  
const axiosInstance = axios.create(defaultConfig);


export default axiosInstance;


