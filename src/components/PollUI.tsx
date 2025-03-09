import { usePoll } from "@/hooks/use-poll";

const PollUI = ({ pollId }: { pollId: number }) => {
  const { poll, isLoading, vote, removeVote, isVoting } = usePoll(pollId);

  if (isLoading) return <div>Loading poll...</div>;
  if (!poll) return <div>Poll not found</div>;

  const handleVote = (optionId: number) => {
    if (isVoting) return;

    const hasVotedOnOption = poll?.options.find(
      (o) => o.id === optionId
    )?.hasVoted;

    console.log("hasVotedOnOption:", hasVotedOnOption);

    if (hasVotedOnOption) {
      removeVote(optionId);
    } else {
      vote(optionId);
    }
  };

  const highestVoteCount = Math.max(...poll.options.map((o) => o.voteCount));

  return (
    <div className="border p-2 rounded-lg border-slate-200 space-y-2">
      {poll.options.map((option) => {
        const isUniqueHighest =
          option.voteCount > 0 &&
          option.voteCount === highestVoteCount &&
          poll.options.filter((o) => o.voteCount === highestVoteCount)
            .length === 1;
        return (
          <div
            key={option.id}
            onClick={() => handleVote(option.id)}
            className={`flex items-center justify-between gap-4 relative ${
              !poll.hasVoted
                ? "cursor-pointer hover:bg-gray-50"
                : "cursor-default"
            } ${isVoting ? "opacity-50 pointer-events-none" : ""}`}
          >
            {/* Progress bar background */}
            <div
              style={{ width: `${option.percentage}%` }}
              className={`absolute transition-all duration-300 ease-in h-full rounded-md ${
                option.voteCount === poll.voteCount
                  ? "bg-purpleaccent2"
                  : "bg-[#E2E8F0]"
              }`}
            />

            {/* Option content */}
            <div className="flex items-center gap-1 w-full relative z-10 p-2">
              <p className="text-sm text-nowrap">
                <span className="font-semibold">
                  {option.percentage.toFixed(1)}%
                </span>{" "}
                {option.text}
              </p>

              {/* Voting indicator */}
              {(option.hasVoted || isUniqueHighest) && (
                <img
                  src="/CheckCircle.svg"
                  alt={option.hasVoted ? "Your vote" : "Most voted"}
                  className="ml-2 w-4 h-4"
                />
              )}
            </div>

            <p className="text-[#94A3B8] text-sm relative z-10 pr-2">
              {option.voteCount.toLocaleString()}
            </p>
          </div>
        );
      })}

      <div className="pt-3">
        <p className="text-rgtgray text-[12px]">
          {poll.voteCount.toLocaleString()} votes total •
          {poll.participationRate.toFixed(1)}% participation
        </p>
      </div>
    </div>
  );
};

export default PollUI;
