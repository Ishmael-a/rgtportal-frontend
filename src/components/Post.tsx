import AvtrBlock from "./AvtrBlock";
import FeedActions from "./feedActions";
import CommentBlck from "./CommentBlck";
import { IPost } from "@/types/employee";
import PollUI from "./PollUI";
import { MoreVertical } from "lucide-react";
import Media from "./Media";
import { useAuthContextProvider } from "@/hooks/useAuthContextProvider";

const Post: React.FC<IPost> = ({ poll, media, text }) => {
  const { currentUser } = useAuthContextProvider();

  const formatText = (text: string) => {
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
    if (!media || media.length === 0) return null;

    if (media.length === 1) {
      // Single media item takes full width
      return (
        <div className="w-full">
          <Media url={media[0]} />
        </div>
      );
    } else if (media.length === 2) {
      // Two items side by side
      return (
        <div className="grid grid-cols-2 gap-2">
          {media.map((item, index) => (
            <Media key={index} url={item} />
          ))}
        </div>
      );
    } else if (media.length === 3) {
      // First Media takes half width, other two stacked in second column
      return (
        <div className="grid grid-cols-2 gap-2">
          <div className="row-span-2">
            <Media url={media[0]} />
          </div>
          <div>
            <Media url={media[1]} />
          </div>
          <div>
            <Media url={media[2]} />
          </div>
        </div>
      );
    } else if (media.length === 4) {
      // Grid of 2x2
      return (
        <div className="grid grid-cols-2 gap-2">
          {media.map((item, index) => (
            <Media key={index} url={item} />
          ))}
        </div>
      );
    } else {
      //5+ Medias, show first 4 and indicate there are more
      return (
        <div className="grid grid-cols-2 gap-2">
          {media.slice(0, 4).map((item, index) => (
            <div key={index} className="relative">
              <Media url={item} />
              {index === 3 && media.length > 4 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    +{media.length - 4}
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
        <p className="text-sm">{formatText(text)}</p>
        {poll && <PollUI pollId={poll.id} />}
        <div className="">{renderMedia()}</div>
        <FeedActions />
      </section>

      <div className="hidden sm:block">
        <CommentBlck user={currentUser} />
      </div>
      <div className="sm:hidden pt-2 border-t">
        <p className="text-sm font-medium text-rgtpink">Reply Post</p>
      </div>
    </div>
  );
};

export default Post;
