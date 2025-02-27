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
  projectCards,
} from "@/constants";
import { Link } from "react-router-dom";
import confetti from '../../assets/images/confetti2.png'
import Avtr from "@/components/Avtr";
import cool from "../../assets/images/coolEmoji.png";

const Feed = () => {
  const colors = [
    { color: "#FFCFF2", name: "pink" }, // bg: "#FFCFF2"
    { color: "#FFEBCC", name: "yellow" }, // bg: "#FFEBCC"
    { color: "#F6EEFF", name: "purple" }, // bg: "#F6EEFF"
  ];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <main className="p-4 flex flex-col-reverse md:flex-row md:justify-end sm:gap-6 relative">
      <div className="space-y-10">
        {/* Recognition Section */}
        <section
          className="bg-rgtpurple rounded-lg text-white p-4 min-h-44 max-w-[800px]"
          style={{
            backgroundImage: `url(${confetti})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        >
          <header className="">
            <p className="font-semibold text-[32px] text-center">
              Employees of the Week!!
            </p>
            <p className="font-semibold text-sm text-center">
              Them of the week: Dedication... Let's Lock in
            </p>
          </header>

          <div
            className="w-full flex justify-center gap-4 p-2 items-center overflow-x-scroll"
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
              //{" "}
            </style>
            {projectCards[0].members.map((item, index) => {
              const randomColor = getRandomColor();
              return (
                <div className="flex flex-col items-center">
                  <div
                    className={`border-3 rounded-full p-1 flex w-fit items-center justify-center relative ${
                      randomColor.name === "pink"
                        ? "border-[#EA5E9C]"
                        : randomColor.name === "yellow"
                        ? "border-[#F9B500]"
                        : "border-[#C0AFFF]"
                    }`}
                    key={index}
                  >
                    <Avtr
                      url={item.avtr.url}
                      name={item.avtr.fallBack}
                      className={`w-[76.94px] h-[76.94px]`}
                      
                    />
                    <img src={cool} className="absolute bottom-0 right-0" />
                  </div>
                  <p className="font-semibold text-sm">Name</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Posts section */}
        <section className="space-y-7">
          <CreatePost />
          <div className="space-y-3">
            <header className="font-semibold text-lg text-[#706D8A]">
              For you
            </header>
            <Post poll={poll} avtrDets={avtrDets[0]} text={postText2} />
            <Post image={imageUrl} avtrDets={avtrDets[0]} text={postText1} />
          </div>
        </section>
      </div>

      <section className="pt-5 md:pt-0 md:min-w-[380px] space-y-3 md:sticky md:top-22  h-fit order-2">
        {/* Upcoming Events and Announcements */}
        <div className="px-[34px] py-[24px] bg-white rounded-lg space-y-5">
          {/* Upcoming Events */}
          <div className="flex items-center justify-between">
            <p className="text-[#706D8A] font-[700] text-lg">Upcoming Events</p>
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
              <EventList
                key={index}
                {...event}
                className={`${
                  eventList.length - 1 === index ? "border-b-0" : ""
                }`}
              />
            ))}
          </div>
        </div>
        {/* Announcements */}
        <div className="p-4 bg-white rounded-lg space-y-2">
          <div className="flex items-center justify-between pb-4">
            <p className="font-[700] text-lg">Announcements</p>
            <Link to="/events-calendar">
              <img
                src="/Down 2.svg"
                className="hover:bg-slate-200 rounded-full transition-all duration-300 ease-in -rotate-90 cursor-pointer"
              />
            </Link>
          </div>
          <div className="space-y-5">
            {announcements.map((announcement, index) => (
              <AnnouncementCard {...announcement} key={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Feed;
