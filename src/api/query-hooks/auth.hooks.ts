import { authService } from "../services/auth.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGoogleAuth = () => {
  return useMutation({
    mutationFn: authService.initiateGoogleAuth,
    onMutate: () => {
      sessionStorage.setItem("oauth_pending", "true");
    },
    onSettled: () => {
      sessionStorage.removeItem("oauth_pending");
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryFn: authService.getCurrentUser,
    queryKey: ["user"],
  });
};
