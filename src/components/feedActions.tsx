import { useInteraction } from "@/hooks/use-interaction";
import { Bookmark, MessageSquareMore, ThumbsUp } from "lucide-react";
import { useState } from "react";

const FeedActions = ({
  postId,
  userPrevLiked,
  onComments,
}: {
  postId: number;
  userPrevLiked: boolean | undefined;
  onComments: (val: boolean) => void;
  // setIsComments: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [liked, setLiked] = useState(userPrevLiked || false);
  const [commented, setCommented] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  console.log("postId from FeedActions:", postId);

  const { stats, toggleLike } = useInteraction(postId);

  console.log("stats.comments:", stats?.commentsCount);

  const handleLike = () => {
    setLiked(!liked);
    toggleLike(!liked);
  };

  const showComments = () => {
    setCommented(!commented);
    onComments(!commented);
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
            onClick={handleLike}
          >
            <ThumbsUp
              className={`text-[#94A3B8] ${
                liked ? "fill-rgtpink stroke-0" : "fill-none"
              } 
              `}
            />
          </div>
          <p className="text-sm font-medium">{stats?.likesCount} Likes</p>
        </div>

        <div className="flex items-center">
          <div
            className="p-[6px] rounded-full hover:bg-purple-100 transition-colors duration-200 cursor-pointer"
            onClick={showComments}
          >
            <MessageSquareMore
              className={`text-[#94A3B8] ${
                commented ? "fill-rgtpurple stroke-0" : "fill-none"
              }`}
            />
          </div>
          <p className="text-sm font-medium">{stats?.commentsCount} Comments</p>
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
