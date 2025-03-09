import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Poll } from "@/types/polls";
import { PollService } from "@/api/services/poll.service";
// import { useCurrentUser } from "@/api/query-hooks/auth.hooks";

export const usePoll = (pollId: number) => {
  const queryClient = useQueryClient();
  // const { data: currentUser } = useCurrentUser();

  const { data: poll, isLoading } = useQuery<Poll>({
    queryKey: ["poll", pollId],
    queryFn: () =>
      PollService.getPollById(pollId).then((res) => res.data as Poll),
  });

  const voteMutation = useMutation({
    mutationFn: (optionId: number) => PollService.votePoll(pollId, optionId),
    onSuccess: (data) => {
      queryClient.setQueryData(["poll", pollId], data.data);
      queryClient.invalidateQueries({ queryKey: ["polls"] }); // Refresh polls list
    },
    onError: (error) => {
      console.error("Voting failed:", error);
    },
  });


  const removeVoteMutation = useMutation({
    mutationFn: (optionId: number) =>
      PollService.removeVote(pollId, optionId),
    onSuccess: (data) => {
      queryClient.setQueryData(["poll", pollId], data.data);
      queryClient.invalidateQueries({ queryKey: ["polls"] });
    },
  });

  return {
    poll,
    isLoading,
    vote: voteMutation.mutate,
    removeVote: removeVoteMutation.mutate,
    isVoting: voteMutation.isPending || removeVoteMutation.isPending,
  };
};
