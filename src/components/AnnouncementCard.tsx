import { IAnnouncementCard } from "@/types/employee";

const AnnouncementCard: React.FC<IAnnouncementCard> = ({ title, time }) => {
  const images = [
    { url: "/bellPink.svg", color: "pink" }, // bg: "#FFCFF2"
    { url: "/bellYellow.svg", color: "yellow" }, // bg: "#FFEBCC"
    { url: "/BellPurple.svg", color: "purple" }, // bg: "#F6EEFF"
  ];


  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];
  return (
    <div className="flex justify-between items-center rounded-sm w-full">
      <div className="flex gap-4 items-center">
        <img
          src={randomImage.url}
          alt=""
          className={`${
            randomImage.color === "pink"
              ? "bg-[#FFCFF2]"
              : randomImage.color === "yellow"
              ? "bg-[#FFEBCC]"
              : "bg-[#F6EEFF]"
          } p-2 rounded-md w-10`}
        />
        <p className="font-semibold text-base">{title}</p>
      </div>
      <p className="text-sm text-[#706D8A] font-semibold">{time}</p>
    </div>
  );
};

export default AnnouncementCard;
