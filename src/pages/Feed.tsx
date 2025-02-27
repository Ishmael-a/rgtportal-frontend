import AnnouncementCard from "@/components/AnnouncementCard";
import CreatePost from "@/components/CreatePost";
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
import { Link } from "react-router-dom";

const Feed = () => {
  const [showRecognition, setShowRecognition] = useState(false);

  return (
    <main className="p-4 flex flex-col-reverse md:flex-row md:justify-between sm:gap-6 relative">
      {/* Posts section */}
      <section className="space-y-5 flex-1 md:pr-6 md:max-w-[calc(100%-380px-38px)]">
        <CreatePost />
        <Post poll={poll} avtrDets={avtrDets[0]} text={postText2} />
        <Post image={imageUrl} avtrDets={avtrDets[0]} text={postText1} />
      </section>

      {/* Fixed sidebar section */}
      <section className="md:min-w-[380px] fixed right-9 top-30 max-h-screen space-y-3">
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
            className="flex flex-col space-y-3 overflow-y-auto max-h-36"
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
        <div className="p-4 bg-white rounded-lg space-y-5 overflow-y-auto max-h-[calc(100vh-150px)]">
          {/* Upcoming Events */}
          <div className="flex items-center justify-between">
            <p className="text-[#706D8A] font-[600]">Upcoming Events</p>
            <Link to="/events-calendar">
              <img
                src="/Down 2.svg"
                className="hover:bg-slate-200 rounded-full transition-all duration-300 ease-in -rotate-90 cursor-pointer"
              />
            </Link>
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
              <div className="flex h-16" key={index}>
                <div className="h-full border-2 border-rgtpink rounded-full" />
                <AnnouncementCard {...announcement} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacer div to maintain layout with fixed sidebar */}
      <div className="hidden md:block md:min-w-[380px]"></div>
    </main>
  );
};

export default Feed;