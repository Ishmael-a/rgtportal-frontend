import AnnouncementCard from "@/components/AnnouncementCard";
import EventList, { IEventList } from "@/components/EventList";
import Post from "@/components/Post";
import { avtrDets, imageUrl, poll, postText1, postText2 } from "@/constants";
import { IAnnouncementCard } from "@/types";
import { useState } from "react";

const eventList: IEventList[] = [
  {
    event: "holiday",
    date: "Mar 06, 2025",
    title: "Independence Day",
  },
  {
    event: "meeting",
    date: "Apr 25, 2025",
    title: "Group Meetup",
  },
  {
    event: "birthday",
    date: "Jun 25, 2025",
    title: "Fatimah's Birthday",
  },
];

const announcements: IAnnouncementCard[] = [
  {
    title: "RGT University",
    date: "Jun 25, 2025",
  },
  {
    title: "New Policy Update",
    date: "Jun 25, 2025",
  },
];

const Feed = () => {
  const [showRecognition, setShowRecognition] = useState(false);

  return (
    <main className="p-4 flex flex-col sm:flex-row sm:gap-6">
      <section className="space-y-5">
        <Post poll={poll} avtrDets={avtrDets} text={postText2} />
        <Post image={imageUrl} avtrDets={avtrDets} text={postText1} />
      </section>

      <section className="pt-5 md:pt-0 min-w-[380px] space-y-3">
        {/* Recognition section */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg space-x-2">
          <div className="flex items-center space-x-2">
            <img src="/recognitionIconsvg.svg" alt="recognition" />
            <p className="text-[#706D8A] font-[600]">Recognition</p>
          </div>
          <img
            src="/Down 2.svg"
            className={`hover:bg-slate-200 rounded-full transition-all duration-300 ease-in ${
              showRecognition ? "rotate-180" : ""
            }`}
            onClick={() => setShowRecognition(!showRecognition)}
          />
        </div>

        {/* Upcoming Events and Announcements */}
        <div className="p-4 bg-white rounded-lg space-y-5">
          {/* Upcoming Events */}
          <div className="flex items-center justify-between">
            <p className="text-[#706D8A] font-[600]">Upcoming Events</p>
            <img
              src="/Down 2.svg"
              className="hover:bg-slate-200 rounded-full transition-all duration-300 ease-in -rotate-90 cursor-pointer"
            />
          </div>

          {/* Events List */}
          <div className="flex flex-col space-y-5">
            {eventList.map((event, index) => (
              <EventList key={index} {...event} />
            ))}
          </div>

          {/* Announcements */}
          <div className="w-full space-y-2">
            <p className="text-[#706D8A] font-[600]">Announcements</p>
            {announcements.map((announcement, index) => (
              <div className="flex h-16 ">
                <div className="h-full  border-2 border-rgtpink rounded-full" />
                <AnnouncementCard {...announcement} key={index} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Feed;
