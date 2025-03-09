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

      // Find existing vote for single-choice polls
      const existingVote = previousPoll.options.find((o) => o.hasVoted);
      const isSingleChoice = previousPoll.type === "single_choice";

      // Optimistic update
      const updatedOptions = previousPoll.options.map((option) => {
        // Reset previous vote for single-choice
        if (isSingleChoice && existingVote?.id === option.id) {
          const newVoteCount = Math.max(option.voteCount - 1, 0);
          return {
            ...option,
            voteCount: newVoteCount,
            hasVoted: false,
            percentage: (newVoteCount / (previousPoll.voteCount || 1)) * 100,
          };
        }

        // Update new option
        if (option.id === optionId) {
          const voteCountChange = isSingleChoice ? 0 : 1; // No net change for single-choice
          const newVoteCount = option.voteCount + (option.hasVoted ? -1 : 1);
          return {
            ...option,
            voteCount: newVoteCount,
            hasVoted: !option.hasVoted,
            percentage:
              (newVoteCount / (previousPoll.voteCount + voteCountChange)) * 100,
          };
        }

        // Update percentages for other options
        const totalVotes = isSingleChoice
          ? previousPoll.voteCount
          : previousPoll.voteCount + (option.hasVoted ? -1 : 1);

        return {
          ...option,
          percentage:
            totalVotes > 0 ? (option.voteCount / totalVotes) * 100 : 0,
        };
      });

      const newVoteCount = isSingleChoice
        ? previousPoll.voteCount
        : previousPoll.voteCount + (existingVote ? 0 : 1);

      const newPoll = {
        ...previousPoll,
        voteCount: newVoteCount,
        options: updatedOptions,
        hasVoted: true,
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
    },
  });

  const removeVoteMutation = useMutation({
    mutationFn: (optionId: number) => PollService.removeVote(pollId, optionId),
    onMutate: async (optionId) => {
      await queryClient.cancelQueries({ queryKey: ["poll", pollId] });

      const previousPoll = queryClient.getQueryData<Poll>(["poll", pollId]);
      if (!previousPoll) return;

      // Optimistic update
      const updatedOptions = previousPoll.options.map((option) => {
        if (option.id === optionId) {
          const newVoteCount = option.voteCount - 1;
          return {
            ...option,
            voteCount: newVoteCount,
            hasVoted: false,
            percentage:
              previousPoll.voteCount > 1
                ? (newVoteCount / (previousPoll.voteCount - 1)) * 100
                : 0,
          };
        }
        return {
          ...option,
          percentage:
            previousPoll.voteCount > 1
              ? (option.voteCount / (previousPoll.voteCount - 1)) * 100
              : 0,
        };
      });

      const newPoll = {
        ...previousPoll,
        voteCount: previousPoll.voteCount - 1,
        options: updatedOptions,
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
    },
  });

  const handleVote = (optionId: number) => {
    if (!poll) return;

    const hasVotedOnOption = poll.options.find(
      (o) => o.id === optionId
    )?.hasVoted;
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
    isVoting: voteMutation.isPending || removeVoteMutation.isPending,
  };
};
