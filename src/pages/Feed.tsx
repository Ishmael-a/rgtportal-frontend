import AvtrBlock from "@/components/AvtrBlock";
import { CheckCircle2 } from "lucide-react";

const Feed = () => {
  return (
    <main className="p-4">
      <h1>Feed</h1>
      <div className="flex flex-col p-4 rounded-lg shadow-md">
        <div className="w-full border-b py-3">
          <AvtrBlock />
        </div>
        <div className="pt-3 space-y-3">
          <p className="text-sm">
            which drink do you think is the better summer drink, and why?
            <span className="text-rgtpink">#quickquestion #plsanswer</span>
          </p>
          <div className="border p-2 rounded-lg border-slate-200 space-y-2">
            <div className="flex items-center gap-1 w-[55%] bg-purpleaccent2 rounded-md p-2">
              <p>
                <span className="font-semibold">55%</span> Lemonade
              </p>
              <CheckCircle2 fill="#EA5E9C" stroke="white" />
            </div>

            <div className="flex items-center gap-1 w-[25%] bg-[#F1F5F9] rounded-md p-2">
              <p>
                <span className="font-semibold">25%</span> Energy Drink
              </p>
            </div>
          </div>

          <div>
            <p className="text-rgtgray text-[12px]">Jun 25, 2029 --12,157 votes total</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Feed;
