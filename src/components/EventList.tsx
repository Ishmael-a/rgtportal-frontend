import { Bell } from "lucide-react";
import { useState } from "react";
import { ClassNameValue } from "tailwind-merge";

export interface IEventList {
  event: "holiday" | "birthday" | "meeting";
  date: string;
  title: string;
  className?: ClassNameValue;
}

const EventList: React.FC<IEventList> = ({ event, date, title, className }) => {
  const [ringBell, setRingBell] = useState(false);

  const handleRingBell = () => {
    setRingBell(!ringBell);
  };

  return (
    <div
      className={`flex items-center justify-between border-b pb-4 ${className}`}
    >
      <div className="flex items-center space-x-2">
        <img
          src={
            event === "birthday"
              ? "/Gift.svg"
              : event === "holiday"
              ? "/Moon.svg"
              : "/UsersFour.svg"
          }
          alt="calendar"
          className="bg-[#EEF2FF] p-2 rounded-[8px]"
        />
        <div>
          <p className="text-rgtgray text-sm font-medium">{title}</p>
          <p className="text-rgtgray text-xs font-medium">{date}</p>
        </div>
      </div>

      <Bell
        onClick={handleRingBell}
        className={`cursor-pointer text-rgtgray ${
          ringBell ? "fill-rgtpurple stroke-0" : ""
        }`}
        size={20}
      />
    </div>
  );
};

export default EventList;
