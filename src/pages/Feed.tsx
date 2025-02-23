import AnnouncementCard from "@/components/AnnouncementCard";
import EventList from "@/components/EventList";
import Post from "@/components/Post";
import {
  announcements,
  avtrDets,
  eventList,
  imageUrl,
  poll,
  postText1,
  postText2,
  recognees,
} from "@/constants";
import { useState } from "react";

const Feed = () => {
  const [showRecognition, setShowRecognition] = useState(false);

  return (
    <main className="p-4 flex flex-col-reverse md:flex-row md:justify-end sm:gap-6 relative">
      {/* Posts section */}
      <section className="space-y-5">
        <Post poll={poll} avtrDets={avtrDets} text={postText2} />
        <Post image={imageUrl} avtrDets={avtrDets} text={postText1} />
      </section>

      <section className="pt-5 md:pt-0 md:min-w-[380px] space-y-3 md:sticky md:top-3  h-fit">
        {/* Recognition section */}
        <div
          className={`flex flex-col bg-white p-4 rounded-lg space-y-3 transition-all duration-300 ease-in ${
            showRecognition ? "max-h-[500px]" : "max-h-16 overflow-hidden"
          }`}
        >
          <div className="flex items-center justify-between ">
            <div className="flex items-center space-x-2">
              <img src="/recognitionIconsvg.svg" alt="recognition" />
              <p className="text-[#706D8A] font-[600]">Recognition</p>
            </div>
            <img
              src="/Down 2.svg"
              className={`hover:bg-slate-200 rounded-full transition-all duration-300 ease-in cursor-pointer ${
                showRecognition ? "rotate-180" : ""
              }`}
              onClick={() => setShowRecognition(!showRecognition)}
            />
          </div>

          {/* Recognition List */}
          <div
            className="flex flex-col space-y-3 overflow-y-scroll h-36"
            style={{
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* IE and Edge */,
            }}
          >
            <style>
              {`
                .hide-scrollbar::-webkit-scrollbar {
                display: none; /* Chrome, Safari, and Opera */
                 }
              `}
            </style>
            {recognees.map((recognee, index) => (
              <div
                className="flex justify-between items-center bg-slate-100 p-2 rounded-md text-sm font-medium"
                key={index}
              >
                <p className="text-rgtpurple"> {recognee.name} </p>
                <p>{recognee.project}</p>
              </div>
            ))}
          </div>
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
