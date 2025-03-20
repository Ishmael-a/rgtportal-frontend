import { PtoRequestService } from "@/api/services/pto-request.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import {PtoLeave} from "@/types/PTOS"

export const useRequestPto = () => {
  const queryClient = useQueryClient();

  const { data: ptoData, isLoading } = useQuery({
    queryKey: ["ptoData"],
    queryFn: () => PtoRequestService.fetchUserPtoRequest(),
  });

  const createPtoRequestMutation = useMutation({
    mutationFn: (newPto: PtoLeave) =>
      PtoRequestService.createPtoRequest(newPto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ptoData"] });
      queryClient.invalidateQueries({ queryKey: ["ptos"] });
      toast({
        title: "Success",
        description: "PTO created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deletePtoRequestMutation = useMutation({
    mutationFn: (ptoId: number) => PtoRequestService.deletePtoRequest(ptoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ptoData"] });
      queryClient.invalidateQueries({ queryKey: ["ptos"] });
      toast({
        title: "Success",
        description: "PTO deleted",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const createPto = async (newPto: PtoLeave) => {
    return createPtoRequestMutation.mutateAsync(newPto);
  };

  const deletePto = async (ptoId: number) => {
    return deletePtoRequestMutation.mutateAsync(ptoId);
  };

  return {
    createPto,
    deletePto,
    isPtoDeleting: deletePtoRequestMutation.isPending,
    isPtoLoading: createPtoRequestMutation.isPending,
    ptoData,
    isLoading
  };
};
