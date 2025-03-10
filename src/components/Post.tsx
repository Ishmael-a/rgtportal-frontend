import AvtrBlock from "./AvtrBlock";
import FeedActions from "./feedActions";
import CommentBlck from "./CommentBlck";
import PollUI from "./PollUI";
import { MoreVertical } from "lucide-react";
import Media from "./Media";
import { useAuthContextProvider } from "@/hooks/useAuthContextProvider";
import { IFeed } from "@/types/employee";

const Post: React.FC<IFeed> = ({ poll, post }) => {
  const { currentUser } = useAuthContextProvider();

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

  return (
    <div className="flex flex-col p-4 rounded-lg shadow-md w-full bg-white">
      <section className="w-full border-b py-3 flex justify-between">
        <AvtrBlock user={currentUser} />
        <MoreVertical className="text-[#CBD5E1] hover:text-[#8d949c] transition-colors duration-300 ease-in cursor-pointer" />
      </section>

      <section className="pt-3 space-y-3">
        <p className="text-sm">
          {formatText(post?.content || poll?.description)}
        </p>
        {poll && <PollUI pollId={poll.id} />}
        <div className="">{renderMedia()}</div>
        <FeedActions
          commentCount={post?.stats?.totalComments}
          likeCount={post?.stats?.totalLikes}
          postId={post?.id || poll?.id || 0}
        />
      </section>

      <div className="hidden sm:block">
        <CommentBlck user={currentUser} postId={post?.id} />
      </div>
      <div className="sm:hidden pt-2 border-t">
        <p className="text-sm font-medium text-rgtpink">Reply Post</p>
      </div>
    </div>
  );
};

export default Post;
