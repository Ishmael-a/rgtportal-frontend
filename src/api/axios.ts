import axios,{AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse,  } from 'axios';

// Create custom type for API client configuration
interface ApiClientConfig extends AxiosRequestConfig {
    baseURL: string;
    timeout?: number;
    headers?: Record<string, string>;
    withCredentials?: true;
}


// Create a function to generate axios instance with configurable base URL
export const createApiClient = (baseURL: string = import.meta.env.VITE_BASE_URL): AxiosInstance => {
    const config: ApiClientConfig = {
        baseURL,
        timeout: 15000,
        headers: { 
            'Content-Type': 'application/json' 
        },
        withCredentials: true
    };

    const axiosInstance = axios.create(config);

    // Optional: Add interceptors for global error handling, auth, etc.
    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            // Global error handling
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};


// Default configuration
// const defaultConfig: ApiClientConfig = {
//     baseURL: import.meta.env.VITE_BASE_URL,
//     timeout: 15000,
//     headers: { 
//         'Content-Type': 'application/json' 
//     },
//     withCredentials: true // Enable cookie handling
// }
  
export const defaultApiClient = createApiClient();


export default defaultApiClient;


