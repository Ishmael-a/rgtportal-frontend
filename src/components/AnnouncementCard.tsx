import { IAnnouncementCard } from "@/types/employee";
import { AlarmClock } from "lucide-react";

const AnnouncementCard: React.FC<IAnnouncementCard> = ({ date, title }) => {
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const day = date.getDate();
  const dayOfWeek = date.toDateString().split(" ")[0];
  console.log("day, time:", day, time, dayOfWeek);
  return (
    <section className="flex bg-[#F6F6F9]">
      <div className="min-w-4 bg-[#E328AF] text-white p-3 rounded-md flex flex-col items-center justify-center text-sm">
        <p>{dayOfWeek}</p>
        <p>{day}</p>
      </div>
      <div className="flex sm:flex-col items-center justify-center md:space-y-1 text-[#706D8A] p-3">
        <p className="text-sm  w-[113px] text-nowrap truncate ">{title}</p>
        <div className="flex items-center justify-center gap-1">
          <AlarmClock size={15} />
          <p className="text-[12px]">{time.toLocaleLowerCase()}</p>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementCard;

// const images = [
//   { url: "/bellPink.svg", color: "pink" }, // bg: "#FFCFF2"
//   { url: "/bellYellow.svg", color: "yellow" }, // bg: "#FFEBCC"
//   { url: "/BellPurple.svg", color: "purple" }, // bg: "#F6EEFF"
// ];

// const randomIndex = Math.floor(Math.random() * images.length);
// const randomImage = images[randomIndex];

{
  /* <img
  src={randomImage.url}
  alt=""
  className={`${
    randomImage.color === "pink"
      ? "bg-[#FFCFF2]"
      : randomImage.color === "yellow"
      ? "bg-[#FFEBCC]"
      : "bg-[#F6EEFF]"
  } p-2 rounded-md w-10`}
/> */
}
