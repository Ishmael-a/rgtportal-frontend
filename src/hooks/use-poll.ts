// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Poll } from "@/types/polls";
// import { PollService } from "@/api/services/poll.service";
// // import { useCurrentUser } from "@/api/query-hooks/auth.hooks";

// export const usePoll = (pollId: number) => {
//   const queryClient = useQueryClient();
//   // const { data: currentUser } = useCurrentUser();

//   const { data: poll, isLoading } = useQuery<Poll>({
//     queryKey: ["poll", pollId],
//     queryFn: () =>
//       PollService.getPollById(pollId).then((res) => res.data as Poll),
//   });

//   const voteMutation = useMutation({
//     mutationFn: (optionId: number) => PollService.votePoll(pollId, optionId),
//     onSuccess: (data) => {
//       queryClient.setQueryData(["poll", pollId], data.data);
//       queryClient.invalidateQueries({ queryKey: ["polls"] }); // Refresh polls list
//     },
//     onError: (error) => {
//       console.error("Voting failed:", error);
//     },
//   });


//   const removeVoteMutation = useMutation({
//     mutationFn: (optionId: number) =>
//       PollService.removeVote(pollId, optionId),
//     onSuccess: (data) => {
//       queryClient.setQueryData(["poll", pollId], data.data);
//       queryClient.invalidateQueries({ queryKey: ["polls"] });
//     },
//   });

//   return {
//     poll,
//     isLoading,
//     vote: voteMutation.mutate,
//     removeVote: removeVoteMutation.mutate,
//     isVoting: voteMutation.isPending || removeVoteMutation.isPending,
//   };
// };


// use-poll.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Poll } from "@/types/polls";
import { PollService } from "@/api/services/poll.service";

export const usePoll = (pollId: number) => {
  const queryClient = useQueryClient();

  const { data: poll, isLoading } = useQuery<Poll>({
    queryKey: ["poll", pollId],
    queryFn: () =>
      PollService.getPollById(pollId).then((res) => res.data as Poll),
  });

  const updatePollData = (newData: Partial<Poll>) => {
    queryClient.setQueryData<Poll>(["poll", pollId], (old) => {
      if (!old) return;
      return { ...old, ...newData };
    });
  };

  const voteMutation = useMutation({
    mutationFn: (optionId: number) => PollService.votePoll(pollId, optionId),
    onMutate: async (optionId) => {
      await queryClient.cancelQueries({ queryKey: ["poll", pollId] });
      
      const previousPoll = queryClient.getQueryData<Poll>(["poll", pollId]);
      if (!previousPoll) return;

      // Optimistic update
      const updatedOptions = previousPoll.options.map(option => {
        if (option.id === optionId) {
          const newVoteCount = option.voteCount + 1;
          return {
            ...option,
            voteCount: newVoteCount,
            hasVoted: true,
            percentage: ((newVoteCount) / (previousPoll.voteCount + 1)) * 100
          };
        }
        return {
          ...option,
          percentage: (option.voteCount / (previousPoll.voteCount + 1)) * 100
        };
      });

      const newPoll = {
        ...previousPoll,
        voteCount: previousPoll.voteCount + 1,
        options: updatedOptions
      };

      updatePollData(newPoll);
      return { previousPoll };
    },
    onError: (err, optionId, context) => {
      if (context?.previousPoll) {
        updatePollData(context.previousPoll);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["poll", pollId] });
      queryClient.invalidateQueries({ queryKey: ["polls"] });
    }
  });

  const removeVoteMutation = useMutation({
    mutationFn: (optionId: number) => PollService.removeVote(pollId, optionId),
    onMutate: async (optionId) => {
      await queryClient.cancelQueries({ queryKey: ["poll", pollId] });
      
      const previousPoll = queryClient.getQueryData<Poll>(["poll", pollId]);
      if (!previousPoll) return;

      // Optimistic update
      const updatedOptions = previousPoll.options.map(option => {
        if (option.id === optionId) {
          const newVoteCount = option.voteCount - 1;
          return {
            ...option,
            voteCount: newVoteCount,
            hasVoted: false,
            percentage: previousPoll.voteCount > 1 ? 
              ((newVoteCount) / (previousPoll.voteCount - 1)) * 100 : 0
          };
        }
        return {
          ...option,
          percentage: previousPoll.voteCount > 1 ? 
            (option.voteCount / (previousPoll.voteCount - 1)) * 100 : 0
        };
      });

      const newPoll = {
        ...previousPoll,
        voteCount: previousPoll.voteCount - 1,
        options: updatedOptions
      };

      updatePollData(newPoll);
      return { previousPoll };
    },
    onError: (err, optionId, context) => {
      if (context?.previousPoll) {
        updatePollData(context.previousPoll);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["poll", pollId] });
      queryClient.invalidateQueries({ queryKey: ["polls"] });
    }
  });

  const handleVote = (optionId: number) => {
    if (!poll) return;
    
    const hasVotedOnOption = poll.options.find(o => o.id === optionId)?.hasVoted;
    if (hasVotedOnOption) {
      removeVoteMutation.mutate(optionId);
    } else {
      voteMutation.mutate(optionId);
    }
  };

  return {
    poll,
    isLoading,
    handleVote,
    isVoting: voteMutation.isPending || removeVoteMutation.isPending
  };
};