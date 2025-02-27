import { IAvtrComponent } from "@/types/employee";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Avtr: React.FC<IAvtrComponent> = ({ className, index = 0, url,name }) => {
  return (
    <Avatar
      className={`border-2 border-white ${className}`}
      style={{
        transform: `translateX(${index * 24}px)`, // Adjust overlap spacing
        zIndex: `${100 - index}`, // Higher z-index for first items
      }}
    >
      <AvatarImage
        src={url}
        alt={name}
        className="h-full w-full"
      />
      <AvatarFallback className="h-full w-full">{name}</AvatarFallback>
    </Avatar>
  );
};

export default Avtr;
