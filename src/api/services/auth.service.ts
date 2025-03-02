import { defaultApiClient } from '../axios'; 
import { ApiResponse } from '../types';

export interface LoginRequest {
    email: string;
    password: string;
  }
  
export interface LoginResponse {
    user: User;
    token: string;
}

export const authService = {

    initiateGoogleAuth: (): Promise<void> => {
        return new Promise((resolve) => {
          // Show loader for at least 500ms to prevent flash
          setTimeout(() => {
            window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;
            resolve();
          }, 50); // Minimum time to allow React state update
        });
    },

    login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
      const response = await defaultApiClient.post<ApiResponse<LoginResponse>>('/auth/login', data);
      return response.data;
    },
    
    logout: async (): Promise<ApiResponse<null>> => {
      const response = await defaultApiClient.post<ApiResponse<null>>('/auth/logout');
      return response.data;
    },
    
    getCurrentUser: async (): Promise<ResponseUser> => {
      const response = await defaultApiClient.get('/user');
      console.log("User data",response.data)
      return response.data;
    },
};



// export const AuthService = {


//   handleGoogleCallback: async (code: string): Promise<AuthResponse> => {
//     const response = await axiosInstance.post<AuthResponse>(
//       '/auth/google/callback',
//       { code }
//     );
//     return response.data;
//   },

//   getCurrentUser: async (): Promise<UserProfile> => {
//     const response = await axiosInstance.get<UserProfile>('/auth/me');
//     return response.data;
//   },

//   refreshToken: async (): Promise<{ accessToken: string }> => {
//     const response = await axiosInstance.post<{ accessToken: string }>(
//       '/auth/refresh'
//     );
//     return response.data;
//   },
// };