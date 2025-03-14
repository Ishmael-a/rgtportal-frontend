import { PtoRequestService } from "@/api/services/pto-request.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRequestPto = () => {
  const queryClient = useQueryClient();

  const { data: ptoData } = useQuery({
    queryKey: ["ptoData"],
    queryFn: () => PtoRequestService.fetchUserPtoRequest(),
  });

  const ptoRequestMutation = useMutation({
    mutationFn: (newPto: PtoLeave) =>
      PtoRequestService.createPtoRequest(newPto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ptoData"] });
    },
  });

  const createPto = (newPto: PtoLeave) => {
    ptoRequestMutation.mutate(newPto);
  };

  return {
    createPto,
    isPtoLoading: ptoRequestMutation.isPending,
    ptoData,
  };
};
