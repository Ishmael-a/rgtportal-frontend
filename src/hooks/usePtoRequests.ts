import { PtoRequestService } from "@/api/services/pto-request.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRequestPto = () => {
  const queryClient = useQueryClient();

  const { data: ptoData } = useQuery({
    queryKey: ["ptoData"],
    queryFn: () => PtoRequestService.fetchUserPtoRequest(),
  });

  const createPtoRequestMutation = useMutation({
    mutationFn: (newPto: PtoLeave) =>
      PtoRequestService.createPtoRequest(newPto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ptoData"] });
    },
  });

  const deletePtoRequestMutation = useMutation({
    mutationFn: (ptoId: number) => PtoRequestService.deletePtoRequest(ptoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ptoData"] });
    },
  });

  const createPto = (newPto: PtoLeave) => {
    createPtoRequestMutation.mutate(newPto);
  };

  const deletePto = (ptoId: number) => {
    deletePtoRequestMutation.mutate(ptoId);
  };

  return {
    createPto,
    deletePto,
    isPtoLoading: createPtoRequestMutation.isPending,
    ptoData,
  };
};
