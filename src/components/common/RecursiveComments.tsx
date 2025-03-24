/* eslint-disable @typescript-eslint/no-explicit-any */
import LikeIcon from "@/assets/icons/LikeIcon";
import { formatDateToDaysAgo } from "@/lib/helpers";
import { useState } from "react";
import Avtr from "../Avtr";
import { useInteraction } from "@/hooks/use-interaction";
import { Loader } from "lucide-react";

const RecursiveComments = ({
  comment,
  commentsReply,
  parentReplyId,
}: {
  comment: IComment;
  // replyComment: (commentId: number, content: string) => Promise<void>;
  commentsReply: any[] | undefined;
  parentReplyId: number;
}) => {
  const { replyComment } = useInteraction(comment.id);

  const [reply, setReply] = useState(false);
  const [content, setContent] = useState("");
  const [viewReplies, setViewReplies] = useState(false);
  const [isLiked] = useState(commentsReply?.isLiked);

  const handleCommentReply = async () => {
    console.log("comment.id, content:", comment.id, content);
    if (!content) return;
    if (comment.id) {
      await replyComment(comment.id, content, parentReplyId);
      setContent("");
    }
  };

  const handleToggleReply = () => {
    setReply(!reply);
  };

  return (
    <div className="flex items-start gap-2">
      <Avtr
        url={commentsReply?.author.profileImage}
        name={commentsReply?.author.firstName}
        avtBg="#94A3B8"
        className="text-sm font-semibold text-slate-500"
      />
      <div className="w-full flex items-center">
        <div className="flex flex-col items-center w-[90%] gap-1">
          <div className="w-full pb-[12px] space-y-1">
            <p className="text-sm text-[#1E293B] font-semibold text-wrap w-full line-clamp-3 truncate">
              {
                commentsReply?.author.firstName
                // + commentsReply?.author.lastName
              }
              <span className="text-[#706D8A] font-[400] text-sm">
                {commentsReply?.content}
              </span>
            </p>

            <div className="flex w-full items-center font-semibold text-[12px] space-x-2 text-[#8A8A8C]">
              <p>{formatDateToDaysAgo(String(commentsReply?.createdAt))}</p>
              <p>
                {commentsReply?.likes ?? 0}{" "}
                {commentsReply?.likes && commentsReply?.likes == 1
                  ? "like"
                  : "likes"}
              </p>
              <p
                className="text-rgtpurple cursor-pointer"
                onClick={handleToggleReply}>
                Reply
              </p>
              <div
                className=""
                onClick={() =>
                  commentsReply?.id && commentsReply?.onLike
                    ? commentsReply?.onLike(commentsReply?.id)
                    : 0
                }>
                <LikeIcon
                  size={15}
                  stroke="#6418C3"
                  className={`cursor-pointer ${
                    isLiked ? "fill-[#6418C3] stroke-0" : ""
                  }`}
                />
              </div>
            </div>
            {reply && (
              <div className="flex sm:flex-row flex-col items-center gap-4 pt-2">
                <input
                  className="w-full border-b-1 shadow-none outline-0 text-sm font-medium text-slate-500"
                  placeholder="Wanna say something?"
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                />
                <div className="flex justify-end">
                  <button
                    className="text-sm font-semibold text-rgtpink cursor-pointer"
                    onClick={handleCommentReply}>
                    {comment.isCommentLoading ? (
                      <Loader className="animate-spin w-4 h-4" />
                    ) : (
                      "Post"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col w-full">
            {commentsReply && commentsReply.length > 0 && (
              <div
                className="flex items-center gap-2 text-[#8A8A8C] font-semibold text-[12px]"
                onClick={() => setViewReplies(!viewReplies)}>
                <div className="w-[31px] border-t-[#8A8A8C] border-1" />
                <p>View replies ({commentsReply?.length})</p>
              </div>
            )}
            <div>
              {viewReplies && (
                <section>
                  {commentsReply?.map((item, index) => (
                    <p key={index}>{item.commentId}</p>
                  ))}
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecursiveComments;
