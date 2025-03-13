import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { useInteraction } from "@/hooks/use-interaction";
import { useAuthContextProvider } from "@/hooks/useAuthContextProvider";
import { User } from "@/types/authUser";
import SendIcon from "@/assets/icons/SendIcon";
import EmojiIcon from "@/assets/icons/EmojiIcon";

const CommentBlck: React.FC<{
  user: User | null;
  postId: number | undefined;
}> = ({ user, postId }) => {
  const { currentUser } = useAuthContextProvider();

  const [comment, setComment] = useState<IComment>({
    content: "",
    author: {
      id: currentUser?.employee?.id,
      firstName: currentUser?.employee?.firstName ?? "",
      lastName: currentUser?.employee?.lastName ?? "",
      profileImage: currentUser?.profileImage ?? "",
    },
    createdAt: new Date(),
  });

  const { addComment, isCommentLoading } = useInteraction(postId);

  // console.log("statsCommnets:", stats);

  const handleSubmitComment = async () => {
    try {
      if (!comment.content) {
        return;
      }
      addComment(comment);
      setComment({ ...comment, content: "" });
    } catch (err) {
      console.error("Error creating comment:", err);
    }
  };

 

  if (!user) return;

  return (
    <section className="border-t pt-4 flex items-center space-x-2">
      <Avatar>
        <AvatarImage
          src={user.profileImage}
          alt={user.employee.firstName ?? ""}
        />
        <AvatarFallback>{user.employee.firstName}</AvatarFallback>
      </Avatar>
      <Input
        className="rounded-full p-6 max-w-[500px]"
        placeholder="Write your comment..."
        onChange={(e) => setComment({ ...comment, content: e.target.value })}
        value={comment.content}
        disabled={isCommentLoading}
      />

      <div className="flex  min-w-[200px] justify-center space-x-">
        <div className="px-[4px] py-[1px]  rounded-full flex items-center justify-center ">
          <img
            src="/Attachment.svg"
            className=" border-2 p-[2px] rounded-full   transition-colors duration-200 cursor-pointer hover:bg-slate-200 border-[#CBD5E1]"
          />
        </div>

        <div className="px-[4px] py-[1px]  rounded-full flex items-center justify-center ">
          {/* <img
            src="/Smile.svg"
            className=" border-2 p-[8px] rounded-full   transition-colors duration-200 cursor-pointer hover:bg-slate-200 border-[#CBD5E1]"
          /> */}

          <EmojiIcon />
        </div>

        <div
          className="px-[4px] py-1  border-rgtpink border-2  rounded-full flex items-center justify-center hover:text-blue-400 hover:bg-pink-200 cursor-pointer transition-all duration-200 "
          onClick={handleSubmitComment}
        >
          <SendIcon className=" w-8 h-7 rounded-full  fill-[#EA5E9C]" />
        </div>
      </div>
    </section>
  );
};

export default CommentBlck;
