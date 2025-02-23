import { IPollUI } from "@/types";
const PollUI = ({ poll }: { poll: IPollUI[] }) => {
  const totalVotes = poll.reduce((acc, item) => acc + item.totalVotes, 0);

  const highestVoted = poll.reduce((prev, current) => {
    return current.totalVotes > prev.totalVotes ? current : prev;
  });

  return (
    <div className="border p-2 rounded-lg border-slate-200 space-y-2">
      {poll.map((item, index) => (
        <div key={index} className="flex items-center justify-between gap-4">
          <div
            style={{ width: `${item.percentage}%` }}
            className={`flex items-center gap-1 ${
              highestVoted.pollOption === item.pollOption
                ? "bg-purpleaccent2"
                : "bg-[#E2E8F0]"
            } rounded-md p-2`}
          >
            <p className="text-sm text-nowrap">
              <span className="font-semibold">{item.percentage}%</span>{" "}
              {item.pollOption}
            </p>
            {highestVoted.pollOption === item.pollOption && (
              <img src="/CheckCircle.svg" />
            )}
          </div>
          <p className="text-[#94A3B8] text-sm">
            {item.totalVotes.toLocaleString()}
          </p>
        </div>
      ))}

      <div className="pt-3">
        <p className="text-rgtgray text-[12px]">
          Jun 25, 2029 -- {totalVotes.toLocaleString()} votes total
        </p>
      </div>
    </div>
  );
};

export default PollUI;
