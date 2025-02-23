import { MoreVertical } from "lucide-react";

const AnnouncementCard = () => {
  return (
    <div className="bg-purpleaccent2 flex justify-between items-center rounded-sm">
      <div className="p-6">
        <p className="font-medium text-rgtgray text-sm">RGT University</p>
        <p className="text-[12px] text-[#706D8A] font-medium">
          July 27th 2025, 1PM
        </p>
      </div>
      <MoreVertical />
    </div>
  );
};

export default AnnouncementCard;
