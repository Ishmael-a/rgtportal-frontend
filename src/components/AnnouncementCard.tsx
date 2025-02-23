import { IAnnouncementCard } from "@/types";
import { MoreVertical } from "lucide-react";

const AnnouncementCard: React.FC<IAnnouncementCard> = ({ title, date }) => {
  return (
    <div className="bg-purpleaccent2 flex justify-between items-center rounded-sm w-full">
      <div className="p-6">
        <p className="font-medium text-rgtgray text-sm">{title}</p>
        <p className="text-[12px] text-[#706D8A] font-medium">{date}</p>
      </div>
      <MoreVertical className="cursor-pointer" />
    </div>
  );
};

export default AnnouncementCard;
