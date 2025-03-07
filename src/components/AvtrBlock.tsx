import { Avatar, AvatarImage } from "./ui/avatar";

const AvtrBlock: React.FC<User> = ({ profileImage, employee, role }) => {
  return (
    <div className="flex gap-2 items-center">
      <Avatar>
        <AvatarImage src={profileImage} alt={employee.firstName} />
      </Avatar>
      <div className="">
        <p className="font-bold">{employee.firstName + employee.lastName}</p>
        <p className="text-rgtgray text-xs">{role.name.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default AvtrBlock;
