import Post from "@/components/Post";
import { avtrDets, imageUrl, poll, postText1, postText2 } from "@/constants";
import { MoreVertical } from "lucide-react";

const Feed = () => {
  return (
    <main className="p-4 flex flex-col md:flex-row">
      <section className="space-y-5 md:w-1/2">
        <Post poll={poll} avtrDets={avtrDets} text={postText2} />
        <Post image={imageUrl} avtrDets={avtrDets} text={postText1} />
      </section>

      <section className="m">
        <div className="flex items-center bg-white p-2 rounded-lg space-x-2">
          <img src="/recognitionIconsvg.svg" alt="recognition" />
          <p className="text-[#706D8A] font-[600]">Recognition</p>
        </div>

        <div>
          <p className="text-[#706D8A] font-[600]">Upcoming Events</p>
        </div>

        <div >
          <p className="text-[#706D8A] font-[600]">Announcements</p>
          <div className="flex h-12">
            <div className="h-full  border-2 border-rgtpink rounded-full" />
            <div className="bg-purpleaccent2 flex justify-between items-center p-4 rounded-sm">
              <div className="w-full">
                <p className="font-medium text-rgtgray text-lg">
                  RGT University
                </p>
                <p className="text-[12px] text-[#706D8A] font-medium">
                  July 27th 2025, 1PM
                </p>
              </div>
              <MoreVertical />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Feed;
