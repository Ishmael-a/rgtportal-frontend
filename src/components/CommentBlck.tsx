import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
// import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { PostInteractionService } from "@/api/services/post-interaction.service";
import { queryClient } from "@/features/data-access/rbacQuery";
import { toast } from "@/hooks/use-toast";

const CommentBlck: React.FC<{
  user: User | null;
  postId: number | undefined;
}> = ({ user, postId }) => {
  const [comment, setComment] = useState("");

  const commentMutation = useMutation({
    mutationFn: (commentData: string) => {
      return PostInteractionService.commentOnPost(postId, commentData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast({
        title: "Success",
        description: `Comment created successfully. ${data}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "Failed to create comment:" + error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmitComment = async () => {
    try {
      await commentMutation.mutateAsync(comment);
    } catch (err) {
      console.error("Error creating comment:", err);
    }
  };

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
        onChange={(e) => setComment(e.target.value)}
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

        <div
          className="px-[4px] py-[1px]  rounded-full flex items-center justify-center "
          onClick={handleSubmitComment}
        >
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
