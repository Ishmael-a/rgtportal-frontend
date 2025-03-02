import { Bookmark, MessageSquareMore, ThumbsUp } from "lucide-react";
import { useState } from "react";

const FeedActions = () => {
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

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
            onClick={handleLike}
          >
            <ThumbsUp
              className={`text-[#94A3B8] ${
                liked ? "fill-rgtpink stroke-0" : "fill-none"
              }`}
            />
          </div>
          <p className="text-sm font-medium">12 Likes</p>
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
          <p className="text-sm font-medium">3 Comments</p>
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
