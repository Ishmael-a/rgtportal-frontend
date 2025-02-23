import { Bell } from "lucide-react";
import { useState } from "react";

export interface IEventList {
  event: "holiday" | "birthday" | "meeting";
  date: string;
  title: string;
}

const EventList: React.FC<IEventList> = ({ event, date, title }) => {
  const [ringBell, setRingBell] = useState(false);

  const handleRingBell = () => {
    setRingBell(!ringBell);
  };

  return (
    <div className="flex items-center justify-between border-b pb-4">
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
          className="bg-[#EEF2FF] p-2 rounded-full"
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
      />
    </div>
  );
};

export default EventList;
