import AvtrBlock from "./AvtrBlock";
import Image from "./Image";
import FeedActions from "./feedActions";
import CommentBlck from "./CommentBlck";
import { IPost } from "@/types";
import PollUI from "./PollUI";

// "https://images.unsplash.com/photo-1517825738774-7de9363ef735?q=80&w=1110&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

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
    <div className="flex flex-col p-4 rounded-lg shadow-md max-w-[800px]">
      <section className="w-full border-b py-3">
        <AvtrBlock avtDets={avtrDets} />
      </section>

      <section className="pt-3 space-y-3">
        <p className="text-sm">{formatText(text)}</p>
        {poll && <PollUI poll={poll} />}

        {image && <Image url={image.url} alt={image.alt} />}

        <FeedActions />
      </section>

      <CommentBlck />
    </div>
  );
};

export default Post;
