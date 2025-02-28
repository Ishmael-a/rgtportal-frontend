import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";

export interface Recruitment {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  photoUrl?: string;
  cvPath?: string;
  type: string;
  currentStatus: string;
  statusDueDate?: string;
  assignee?: string;
  notified?: boolean;
  location?: string;
  firstPriority?: string;
  secondPriority?: string;
  university?: string;
  position?: string;
  source?: string;
  failStage?: string;
  failReason?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: {
    id: number;
    username: string;
    profileImage?: string;
    email: string;
  };
  employee?: any; 
}

export interface RecruitmentResponse {
  recruitments: Recruitment[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
}

export interface RecruitmentFilters {
  name?: string;
  email?: string;
  status?: string;
  type?: string;
  assignee?: string;
  position?: string;
  source?: string;
  location?: string;
  dateFrom?: Date;
  dateTo?: Date;
  createdFrom?: Date;
  createdTo?: Date;
}

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/recruitment`;
axios.defaults.withCredentials = true;

export const useRecruitments = (
  page = 1,
  limit = 10,
  filters: RecruitmentFilters = {},
  enabled = true
) => {
  return useQuery({
    queryKey: ["recruitments", page, limit, filters],
    queryFn: async () => {
      const params = {
        page,
        limit,
        ...filters,
      };

      const response = await axios.get<ApiResponse<RecruitmentResponse>>(
        API_URL,
        { params }
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to fetch recruitments"
        );
      }

      return response.data.data;
    },
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false, 
    enabled, 
    retry: 1, 
  });
};

export const useUpdateRecruitment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Recruitment>;
    }) => {
      const response = await axios.put<ApiResponse<Recruitment>>(
        `${API_URL}/${id}`,
        data
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to update recruitment"
        );
      }

      return response.data.data;
    },
    onSuccess: (_, variables) => {
      toast({
        title: "Success",
        description: "Recruitment updated successfully",
      })
      queryClient.invalidateQueries({ queryKey: ["recruitments"] });
      queryClient.invalidateQueries({
        queryKey: ["recruitment", variables.id],
      });
    },
      onError: (error: Error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
    },
  });
};

export const useDeleteRecruitment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete<ApiResponse<void>>(
        `${API_URL}/${id}`
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to delete recruitment"
        );
      }

      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["recruitments"] });
      queryClient.removeQueries({ queryKey: ["recruitment", id] });
    },
      onError: (error: Error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
    },
  });
};

export const useRecruitment = (id: number | null, enabled = true) => {
  return useQuery({
    queryKey: ["recruitment", id],
    queryFn: async () => {
      if (!id) throw new Error("Recruitment ID is required");

      const response = await axios.get<ApiResponse<Recruitment>>(
        `${API_URL}/${id}`
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch recruitment");
      }

      return response.data.data;
    },
    enabled: Boolean(id) && enabled,
    staleTime: 5 * 60 * 1000,
  });
};
