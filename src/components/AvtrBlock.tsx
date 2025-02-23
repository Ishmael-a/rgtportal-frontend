import { IAvtrBlock } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const AvtrBlock: React.FC<{ avtDets: IAvtrBlock }> = ({ avtDets }) => {
  return (
    <div className="flex gap-2 items-center">
      <Avatar>
        <AvatarImage src={avtDets.avatarUrl} alt={avtDets.name} />
        <AvatarFallback>{avtDets.fallBack}</AvatarFallback>
      </Avatar>
      <div className="">
        <p className="font-bold">{avtDets.name}</p>
        <p className="text-rgtgray text-xs">{avtDets.role}</p>
      </div>
    </div>
  );
};

export default AvtrBlock;
