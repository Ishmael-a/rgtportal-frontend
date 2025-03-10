import { PostInteractionService } from "@/api/services/post-interaction.service";
import { queryClient } from "@/features/data-access/rbacQuery";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Bookmark, MessageSquareMore, ThumbsUp } from "lucide-react";
import { useState } from "react";

const FeedActions = ({
  postId,
  commentCount,
  likeCount,
}: {
  postId: number;
  commentCount: number | undefined;
  likeCount: number | undefined;
}) => {
  const [liked, setLiked] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [commented, setCommented] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const likeMutation = useMutation({
    mutationFn: (liked: boolean) => {
      return PostInteractionService.likePost(postId, liked);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes"] });
    },
  });

  // const handleLike = async () => {
  //   if (isLikeLoading) return;
  //   const newLikedState = !liked;

  //   try {
  //     setIsLikeLoading(true);
  //     // Optimistic update
  //     setLiked(newLikedState);

  //     // Send actual request
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/posts/${postId}/likes`,
  //       { isLike: newLikedState }
  //     );

  //     if (response.data?.success) {
  //       setLiked(response.data.data.isLike);
  //     }
  //   } catch (error) {
  //     console.error("Failed to update like:", error);
  //     // Rollback on error
  //     setLiked(!newLikedState);
  //   } finally {
  //     setIsLikeLoading(false);
  //   }
  // };

  const handleComment = () => {
    setCommented(!commented);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex items-center space-x-8">
        <div className="flex items-center">
          <div
            className="p-[6px] rounded-full hover:bg-pink-100 transition-colors duration-200 cursor-pointer"
            // onClick={handleLike}
          >
            <ThumbsUp
              className={`text-[#94A3B8] ${
                liked ? "fill-rgtpink stroke-0" : "fill-none"
              } 
              `}
            />
            {/* ${isLikeLoading ? "opacity-50" : ""} */}
          </div>
          <p className="text-sm font-medium">{likeCount || 0} Likes</p>
        </div>

        <div className="flex items-center">
          <div
            className="p-[6px] rounded-full hover:bg-purple-100 transition-colors duration-200 cursor-pointer"
            onClick={handleComment}
          >
            <MessageSquareMore
              className={`text-[#94A3B8] ${
                commented ? "fill-rgtpurple stroke-0" : "fill-none"
              }`}
            />
          </div>
          <p className="text-sm font-medium">{commentCount || 0} Comments</p>
        </div>
      </div>
      <div
        className="p-[6px] rounded-full hover:bg-purple-100 transition-colors duration-200 cursor-pointer"
        onClick={handleBookmark}
      >
        <Bookmark
          className={`text-[#94A3B8] ${
            bookmarked ? "fill-rgtblue stroke-0" : "fill-none"
          }`}
        />
      </div>
    </div>
  );
};

export default FeedActions;
