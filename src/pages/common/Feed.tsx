import AnnouncementCard from "@/components/AnnouncementCard";
import CreatePost from "@/components/CreatePost";
import EventList from "@/components/EventList";
import Post from "@/components/Post";
import { announcements, eventList } from "@/constants";
import { Link } from "react-router-dom";
import confetti from "../../assets/images/confetti2.png";
import { Calendar } from "@/components/ui/calendar";
import React, { useMemo, useState } from "react";
import { PollService } from "@/api/services/poll.service";
import { useQuery } from "@tanstack/react-query";
import { Poll } from "@/types/polls";
import { PostService } from "@/api/services/posts.service";
import { FeedSkeleton } from "../../FeedSkeleton";
import PollUI from "@/components/PollUI";
import WithRole from "@/common/WithRole";
import { useAuthContextProvider } from "@/hooks/useAuthContextProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import Avtr from "@/components/Avtr";
import fume from "../../assets/images/fume.png";

const Feed = () => {
  const [date, setDate] = useState<Date>();
  const [showEvents, setShowEvents] = useState(false);
  const { currentUser: user } = useAuthContextProvider();

  const { departments } = useSelector((state: RootState) => state.sharedState);

  const { data: polls, isLoading: pollsLoading } = useQuery({
    queryKey: ["polls"],
    queryFn: () =>
      PollService.getPolls().then((res) => {
        console.log("polls:", res.data);
        return res.data as Poll[];
      }),
  });

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => PostService.getPosts().then((res) => res.data as IPost[]),
  });

  console.log("posts:", posts);

  const mergedFeed = useMemo(() => {
    const postsWithType =
      posts?.map((p) => ({ ...p, feedType: "post" as const })) || [];
    const pollsWithType =
      polls?.map((p) => ({ ...p, feedType: "poll" as const })) || [];

    return [...postsWithType, ...pollsWithType].sort((a, b) => {
      const dateA = a.feedType === "post" ? a.publishDate : a.createdAt;
      const dateB = b.feedType === "post" ? b.publishDate : b.createdAt;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
  }, [posts, polls]);

  const colors = [
    { color: "#FFCFF2", name: "pink" },
    { color: "#FFEBCC", name: "yellow" },
    { color: "#F6EEFF", name: "purple" },
  ];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  if (pollsLoading || postsLoading) {
    return (
      <main className="flex flex-col gap-2 md:flex-row h-full px-5 sm:px-0">
        <FeedSkeleton />
      </main>
    );
  }

  return (
    <main
      className={`flex flex-col gap-2 md:flex-row h-full px-5 sm:px-0 pb-5`}
    >
      <div
        className="space-y-10 md:w-3/5 overflow-y-auto"
        style={{
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* IE and Edge */,
        }}
      >
        {/* Recognition Section */}
        <section
          className="bg-rgtpurple sticky top-0 z-50 rounded-[20px] text-white flex flex-col  max-w-full p-3 space-y-1"
          style={{
            backgroundImage: `url(${confetti})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        >
          <header className="">
            <p className="font-semibold text-xl md:text-2xl text-center">
              Employees of the Week!!
            </p>
            <p className="font-semibold text-xs sm:text-sm text-center">
              Theme of the week: Dedication... Let's Lock in
            </p>
          </header>

          <div
            className="w-full flex justify-center gap-1 items-center overflow-x-scroll"
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
            {departments[1].employees.map((item, index) => {
              const randomColor = getRandomColor();
              return (
                <div className="flex flex-col items-center justify-end">
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
                      url={item.user.profileImage as string}
                      name={item.firstName as string}
                      className={`w-[55px] h-[55px]`}
                    />
                    <img
                      src={fume}
                      className="absolute bottom-0 right-0  "
                      style={{ zIndex: "100" }}
                    />
                  </div>
                  <p className="font-semibold text-xs  sm:text-sm w-20 truncate  text-center">
                    {item.firstName}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Posts section */}
        <section className="space-y-7">
          <WithRole
            roles={["hr", "markerter", "admin"]}
            userRole={user?.role.name as string}
          >
            <CreatePost />
          </WithRole>

          <div className="space-y-3">
            <header className="font-semibold text-lg text-[#706D8A]">
              For you
            </header>
            <div className="space-y-5">
              {mergedFeed.map((item) => (
                <React.Fragment key={item.id}>
                  {item.feedType === "post" ? (
                    <Post post={item} postId={item.id} />
                  ) : item.feedType === "poll" ? (
                    <PollUI pollId={item.id} /> // Render PollUI directly for polls
                  ) : (
                    <div>No post or poll data available</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className={`flex flex-col order-first`}>
        {/* <div className="w-fit" onClick={() => setShowEvents(!showEvents)}>
          <ArrowIcon
            className={`bg-white rounded-full shadow-md cursor-pointer md:hidden transition-all duration-300 ease-in ${
              showEvents ? "rotate-180" : ""
            }`}
          />
        </div> */}
        <section
          className={`flex justify-center md:fixed md:right-0 md:top-0 md:h-screen md:w-[30%] md:py-[78px] overflow-y-auto max-h-[1600px] h-0 transition-all duration-300 ease-in ${
            showEvents ? "h-[500px]" : ""
          }`}
        >
          <div className="pt-5 space-y-3 h-fit  bg-white rounded-t-2xl w-full">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              classNames={{
                day_selected:
                  "bg-[#C0AFFF] text-white hover:bg-[#C0AFFF] focus:bg-[#C0AFFF] rounded-full",
                month: "flex flex-col space-y-3 flex-grow",
                day: "w-8 h-8 sm:w-10 sm:h-10 font-medium rounded-full",
                head_cell: "w-8 sm:w-10 flex-grow",
                cell: "flex items-center justify-center flex-grow",
              }}
              className="shadow-md shadow-gray-300 p-2 rounded-md flex flex-col w-full h-full"
            />

            <div className="px-[34px] py-[24px] bg-white rounded-lg space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-[#706D8A] font-[700] text-lg">
                  Special Events
                </p>
                <Link to="/events-calendar">
                  <img
                    src="/Down 2.svg"
                    className="hover:bg-slate-200 rounded-full transition-all duration-300 ease-in -rotate-90 cursor-pointer"
                  />
                </Link>
              </div>

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

            <div className="p-4 bg-white rounded-lg space-y-2">
              <div className="flex items-center justify-between pb-4">
                <p className="font-[700] text-lg">Announcements</p>
              </div>
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 ">
                {announcements.map((announcement, index) => (
                  <AnnouncementCard {...announcement} key={index} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Feed;
