import AvtrBlock from "./AvtrBlock";
import Image from "./Image";
import FeedActions from "./feedActions";
import CommentBlck from "./CommentBlck";
import { IPost } from "@/types";
import PollUI from "./PollUI";
import { MoreVertical } from "lucide-react";

const Post: React.FC<IPost> = ({ avtrDets, poll, image, text }) => {
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

  return (
    <div className="flex flex-col p-4 rounded-lg shadow-md max-w-[800px] bg-white">
      <section className="w-full border-b py-3 flex justify-between">
        <AvtrBlock avtDets={avtrDets} />
        <MoreVertical className="text-[#CBD5E1] hover:text-[#8d949c] transition-colors duration-300 ease-in cursor-pointer" />
      </section>

      <section className="pt-3 space-y-3">
        <p className="text-sm">{formatText(text)}</p>
        {poll && <PollUI poll={poll} />}

        {image && <Image url={image.url} alt={image.alt} />}

        <FeedActions />
      </section>

      <div className="hidden sm:block">
        <CommentBlck />
      </div>
      <div className="sm:hidden pt-2 border-t">
        <p className="text-sm font-medium text-rgtpink">Reply Post</p>
      </div>
    </div>
  );
};

export default Post;
