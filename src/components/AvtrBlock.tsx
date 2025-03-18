import { User } from "@/types/authUser";
import { Avatar, AvatarImage } from "./ui/avatar";

const AvtrBlock: React.FC<{ user: User | null }> = ({ user }) => {
  if (!user) return;
  return (
    <div className="flex gap-2 items-center">
      <Avatar>
        <AvatarImage
          src={user.profileImage || "https://randomuser.me/api/portraits/med/women/75.jpg"}
          alt={user.employee?.firstName || "AvtrImg"}
        />
      </Avatar>
      <div className="">
        <p className="font-bold">
          {user.employee?.firstName ||
            "No Employee FirstName" + user.employee?.lastName ||
            "No Employee LastName"}
        </p>
        <p className="text-rgtgray text-xs">{user.role.name.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default AvtrBlock;
