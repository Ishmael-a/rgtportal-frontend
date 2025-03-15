import { Avatar, AvatarImage } from "./ui/avatar";

const AvtrBlock: React.FC<{ user: User | null }> = ({ user }) => {
  if (!user) return;
  return (
    <div className="flex gap-2 items-center">
      <Avatar>
        <AvatarImage src={user.profileImage} alt={user.employee.firstName} />
      </Avatar>
      <div className="">
        <p className="font-bold">
          {user.employee.firstName + user.employee.lastName}
        </p>
        <p className="text-rgtgray text-xs">{user.role.name.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default AvtrBlock;
