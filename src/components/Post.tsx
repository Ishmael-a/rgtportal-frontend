import AvtrBlock from "./AvtrBlock";
import FeedActions from "./feedActions";
import { MoreVertical } from "lucide-react";
import Media from "./Media";
import { useAuthContextProvider } from "@/hooks/useAuthContextProvider";
import { IFeed } from "@/types/employee";
import { useInteraction } from "@/hooks/use-interaction";
import { useState } from "react";
import CommentsModal from "./common/CommentsModal";
import PostSkeleton from "./common/PostSkeleton";

const Post: React.FC<IFeed> = ({ post }) => {
  const { currentUser } = useAuthContextProvider();
  const { stats, isLoading } = useInteraction(post?.id);

  const [isComments, setIsComments] = useState(false);

  const handleIsComments = (val: boolean) => {
    setIsComments(val);
  };

  const formatText = (text: string | undefined) => {
    if (!text) {
      return;
    }
    return text.split(" ").map((word, index) => {
      if (word.startsWith("#")) {
        return (
          <span key={index} className="text-rgtpink">
            {word}{" "}
          </span>
        );
      }
      return <span key={index}>{word} </span>;
    });
  };

  const renderMedia = () => {
    if (!post?.media || post?.media.length === 0) return null;

    if (post?.media.length === 1) {
      // Single media item takes full width
      return (
        <div className="w-full">
          <Media url={post.media[0]} />
        </div>
      );
    } else if (post.media.length === 2) {
      // Two items side by side
      return (
        <div className="grid grid-cols-2 gap-2">
          {post.media.map((item, index) => (
            <Media key={index} url={item} />
          ))}
        </div>
      );
    } else if (post.media.length === 3) {
      // First Media takes half width, other two stacked in second column
      return (
        <div className="grid grid-cols-2 gap-2">
          <div className="row-span-2">
            <Media url={post.media[0]} />
          </div>
          <div>
            <Media url={post.media[1]} />
          </div>
          <div>
            <Media url={post.media[2]} />
          </div>
        </div>
      );
    } else if (post.media.length === 4) {
      // Grid of 2x2
      return (
        <div className="grid grid-cols-2 gap-2">
          {post.media.map((item, index) => (
            <Media key={index} url={item} />
          ))}
        </div>
      );
    } else {
      //5+ Medias, show first 4 and indicate there are more
      return (
        <div className="grid grid-cols-2 gap-2">
          {post?.media.slice(0, 4).map((item, index) => (
            <div key={index} className="relative">
              <Media url={item} />
              {index === 3 && post?.media && post.media.length > 4 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    +{post.media.length - 4}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }
  };
  let recentlyPostedComment;

  if (stats.comments.length > 0) {
    console.log("commentsShow:", stats.comments);
    recentlyPostedComment = stats.comments
      .filter((item) => item.author.id === currentUser?.employee?.id)
      .sort(
        (a, b) =>
          new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime()
      )[0];
    console.log("recentlyPostedComment:", recentlyPostedComment);
  }

  if (isLoading) {
    return <PostSkeleton />;
  }

  return (
    <div className="flex flex-col p-4 rounded-lg shadow-md w-full bg-white">
      {post && currentUser && (
        <div>
          <section className="w-full border-b py-3 flex justify-between">
            <AvtrBlock
              firstName={post.author?.firstName as string}
              lastName={post.author?.lastName as string}
              profileImage={post.author?.profileImage as string}
            />
            <MoreVertical className="text-[#CBD5E1] hover:text-[#8d949c] transition-colors duration-300 ease-in cursor-pointer" />
          </section>

          <section className="pt-3 space-y-3">
            <p className="text-sm">{formatText(post?.content)}</p>
            <div className="">{renderMedia()}</div>
            <FeedActions
              postId={post.id}
              userPrevLiked={
                post.likes.find(
                  (item) => item.employeeId === currentUser.employee.id
                )?.isLike
              }
              onComments={handleIsComments}
            />
          </section>

          {/* Render the CommentsModal */}
          <CommentsModal
            isOpen={isComments}
            onClose={() => setIsComments(false)}
            comments={stats.comments}
            postId={post?.id}
            userPrevLiked={
              post?.likes.find(
                (item) => item.employeeId === currentUser?.employee.id
              )?.isLike
            }
            onComments={handleIsComments}
            image={post.media}
          />
        </div>
      )}
    </div>
  );
};

export default Post;
