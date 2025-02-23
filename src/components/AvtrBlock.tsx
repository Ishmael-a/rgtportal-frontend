import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const AvtrBlock = () => {
  return (
    <div className="flex gap-2 items-center">
      <Avatar>
        <AvatarImage
          src="https://randomuser.me/api/portraits/med/women/75.jpg"
          alt="Annette Black"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="">
        <p className="font-bold">Annette Black</p>
        <p className="text-rgtgray text-xs">President Of Americas</p>
      </div>
    </div>
  );
};

export default AvtrBlock;
