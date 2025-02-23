import AnnouncementCard from "@/components/AnnouncementCard";
import Post from "@/components/Post";
import { avtrDets, imageUrl, poll, postText1, postText2 } from "@/constants";

const Feed = () => {
  return (
    <main className="p-4 flex flex-col md:flex-row md:gap-6">
      <section className="space-y-5 md:w-1/2">
        <Post poll={poll} avtrDets={avtrDets} text={postText2} />
        <Post image={imageUrl} avtrDets={avtrDets} text={postText1} />
      </section>

      <section className="pt-5 md:pt-0">
        <div className="flex items-center bg-white p-2 rounded-lg space-x-2">
          <img src="/recognitionIconsvg.svg" alt="recognition" />
          <p className="text-[#706D8A] font-[600]">Recognition</p>
        </div>

        <div>
          <p className="text-[#706D8A] font-[600]">Upcoming Events</p>
        </div>

        <div>
          <p className="text-[#706D8A] font-[600]">Announcements</p>
          <div className="flex h-12">
            <div className="h-full  border-2 border-rgtpink rounded-full" />
            <AnnouncementCard />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Feed;
