import { defaultApiClient } from "../axios";
import { ApiResponse } from "../types";

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
      setTimeout(() => {
        window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;
        resolve();
      }, 50);
    });
  },

  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await defaultApiClient.post<ApiResponse<LoginResponse>>(
      "/auth/login",
      data
    );
    return response.data;
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const response = await defaultApiClient.post<ApiResponse<null>>(
      "/auth/logout"
    );
    return response.data;
  },

  getCurrentUser: async (): Promise<ResponseUser> => {
    const response = await defaultApiClient.get("/user");
    console.log("User data", response.data);
    return response.data;
  },
};
