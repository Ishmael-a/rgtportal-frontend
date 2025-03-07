import { IProjectMembers } from "@/types/employee";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const AvtrBlock: React.FC<{ avtDets: Partial<IProjectMembers> }> = ({
  avtDets,
}) => {
  return (
    <div className="flex gap-2 items-center">
      <Avatar>
        <AvatarImage src={avtDets.avtr?.url} alt={avtDets.name} />
        <AvatarFallback>{avtDets.avtr?.fallBack}</AvatarFallback>
      </Avatar>
      <div className="">
        <p className="font-bold">{avtDets.name}</p>
        <p className="text-rgtgray text-xs">{avtDets.role}</p>
      </div>
    </div>
  );
};

export default AvtrBlock;
