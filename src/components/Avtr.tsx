import { IAvtrComponent } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Avtr: React.FC<IAvtrComponent> = ({ className, index, avtr }) => {
  return (
    <Avatar
      className={`border-2 border-white ${className}`}
      style={{
        left: `${index ? index * 20 : 0}px`,
        zIndex: `${index ? 10 - index : 0}`,
      }} // Adjust stacking
    >
      <AvatarImage
        src={avtr.avatarUrl}
        alt={avtr.name}
        className="h-full w-full"
      />
      <AvatarFallback className="h-full w-full">{avtr.fallBack}</AvatarFallback>
    </Avatar>
  );
};

export default Avtr;
