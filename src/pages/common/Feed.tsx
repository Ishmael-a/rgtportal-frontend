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
import confetti from "../../assets/images/confetti2.png";
import Avtr from "@/components/Avtr";
import cool from "../../assets/images/coolEmoji.png";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

const Feed = () => {
  const [date, setDate] = React.useState<Date>();

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
    <main className="p-4 flex flex-col-reverse md:flex-row md:justify-end sm:gap-6 relative flex-grow w-full">
      <div className="space-y-10">
        {/* Recognition Section */}
        <section
          className="bg-rgtpurple rounded-lg text-white p-4 min-h-44 flex flex-col  sm:max-w-[430px] md:max-w-[800px]"
          style={{
            backgroundImage: `url(${confetti})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        >
          <header className="">
            <p className="font-semibold  sm:text-[24px] md:text-[32px] text-center">
              Employees of the Week!!
            </p>
            <p className="font-semibold text-xs sm:text-sm text-center">
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
                      className={`sm:w-[50px] sm:h-[50px] md:w-[76.94px] md:h-[76.94px]`}
                    />
                    <img
                      src={cool}
                      className="absolute bottom-0 right-0 w-5 h-5 md:w-10 md:h-10"
                      style={{ zIndex: "100" }}
                    />
                  </div>
                  <p className="font-semibold text-xs  sm:text-sm w-18 truncate text-nowrap text-center">
                    yusif
                  </p>
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

      <section className="pt-5 md:pt-0 md:min-w-[400px] space-y-3 md:sticky md:top-22  h-fit order-2 bg-white rounded-t-2xl">
        {/* Upcoming Events */}
        <p className="text-[#706D8A] font-[700] text-lg p-5">Upcoming Events</p>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          classNames={{
            day_selected:
              "bg-[#C0AFFF] text-white hover:bg-[#C0AFFF] focus:bg-[#C0AFFF] rounded-full",
            month: "w-full",
            caption:
              "flex pb-3 items-center text-center w-full justify-center text-[#4A5660]",
            day: "w-8 h-8 sm:w-10 sm:h-10 font-medium rounded-full",
            head_cell: "w-8 sm:w-10",
          }}
          className="shadow-md shadow-gray-300 rounded-md bg-white flex items-center justify-center "
        />

        {/* Special Events */}
        <div className="px-[34px] py-[24px] bg-white rounded-lg space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-[#706D8A] font-[700] text-lg">Special Events</p>
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
            {/* <Link to="/events-calendar">
              <img
                src="/Down 2.svg"
                className="hover:bg-slate-200 rounded-full transition-all duration-300 ease-in -rotate-90 cursor-pointer"
              />
            </Link> */}
          </div>
          <div className="space-y-5 flex flex-wrap gap-3">
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
