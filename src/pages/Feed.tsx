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
} from "@/constants";
import { Link } from "react-router-dom";
import confetti2 from "../assets/images/confetti2.png";
import Avtr from "@/components/Avtr";

const Feed = () => {
  return (
    <main className="p-4 flex flex-col-reverse md:flex-row md:justify-end sm:gap-6 relative">
      <div>
        {/* Recognition Section */}
        <section
          className="bg-rgtpurple rounded-lg text-white p-4 min-h-44"
          style={{
            backgroundImage: `url(${confetti2})`,
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

          <div>
            <div className="border-3 rounded-full p-2 flex w-fit items-center justify-center">
              <Avtr avtr={avtrDets[0]} className= "" />
            </div>
          </div>
        </section>

        {/* Posts section */}
        <section className="space-y-5">
          <CreatePost />
          <Post poll={poll} avtrDets={avtrDets[0]} text={postText2} />
          <Post image={imageUrl} avtrDets={avtrDets[0]} text={postText1} />
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

// {
//   /* Recognition section */
// }
// <div
//   className={`flex flex-col bg-white p-4 rounded-lg space-y-3 transition-all duration-300 ease-in ${
//     showRecognition ? "max-h-[500px]" : "max-h-16 overflow-hidden"
//   }`}
// >
//   <div className="flex items-center justify-between ">
//     <div className="flex items-center space-x-2">
//       <img src="/recognitionIconsvg.svg" alt="recognition" />
//       <p className="text-[#706D8A] font-[600]">Recognition</p>
//     </div>
//     <img
//       src="/Down 2.svg"
//       className={`hover:bg-slate-200 rounded-full transition-all duration-300 ease-in cursor-pointer ${
//         showRecognition ? "rotate-180" : ""
//       }`}
//       onClick={() => setShowRecognition(!showRecognition)}
//     />
//   </div>

//   {/* Recognition List */}
//   <div
//     className="flex flex-col space-y-3 overflow-y-scroll h-36"
//     style={{
//       scrollbarWidth: "none" /* Firefox */,
//       msOverflowStyle: "none" /* IE and Edge */,
//     }}
//   >
//     <style>
//       {`
//         .hide-scrollbar::-webkit-scrollbar {
//         display: none; /* Chrome, Safari, and Opera */
//          }
//       `}
//     </style>

//     {recognees.map((recognee, index) => (
//       <div
//         className="flex justify-between items-center bg-slate-100 p-2 rounded-md text-sm font-medium"
//         key={index}
//       >
//         <p className="text-rgtpurple"> {recognee.name} </p>
//         <p>{recognee.project}</p>
//       </div>
//     ))}
//   </div>
// </div>;

export default Feed;
