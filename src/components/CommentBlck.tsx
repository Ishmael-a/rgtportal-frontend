import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";

const CommentBlck: React.FC<{ user: User | null }> = ({ user }) => {
  if (!user) return;

  return (
    <section className="border-t px-2 pt-4 flex items-center space-x-2">
      <Avatar>
        <AvatarImage src={user.profileImage} alt={user.employee.firstName} />
        <AvatarFallback>{user.employee.firstName}</AvatarFallback>
      </Avatar>
      <Input
        className="rounded-full p-6 max-w-[500px]"
        placeholder="Write your comment..."
      />

      <div className="flex  min-w-[200px] justify-center space-x-">
        <div className="px-[4px] py-[1px]  rounded-full flex items-center justify-center ">
          <img
            src="/Attachment.svg"
            className=" border-2 p-[2px] rounded-full   transition-colors duration-200 cursor-pointer hover:bg-slate-200 border-[#CBD5E1]"
          />
        </div>

        <div className="px-[4px] py-[1px]  rounded-full flex items-center justify-center ">
          <img
            src="/Smile.svg"
            className=" border-2 p-[8px] rounded-full   transition-colors duration-200 cursor-pointer hover:bg-slate-200 border-[#CBD5E1]"
          />
        </div>

        <div className="px-[4px] py-[1px]  rounded-full flex items-center justify-center ">
          <img
            src="/Send 3.svg"
            className="border-rgtpink border-2 p-[2px] rounded-full hover:bg-pink-200  transition-colors duration-200 cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
};

export default CommentBlck;
