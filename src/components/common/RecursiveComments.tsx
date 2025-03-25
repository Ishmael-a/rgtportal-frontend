/* eslint-disable @typescript-eslint/no-explicit-any */
import LikeIcon from "@/assets/icons/LikeIcon";
import { formatDateToDaysAgo } from "@/lib/helpers";
import { useState } from "react";
import Avtr from "../Avtr";
import { useInteraction } from "@/hooks/use-interaction";
import { Loader } from "lucide-react";
import { useAuthContextProvider } from "@/hooks/useAuthContextProvider";

const RecursiveComments = ({
  comment,
  parentReplyId,
}: {
  comment: IComment | undefined;
  parentReplyId: number | undefined;
}) => {
  const { currentUser } = useAuthContextProvider();
  const { replyComment, toggleCommentLike, isCommentReplyLoading, refetchCommentsReplies } = useInteraction(comment?.id);

  const [reply, setReply] = useState(false);
  const [content, setContent] = useState("");
  // const [viewReplies, setViewReplies] = useState(false);

  const handleCommentReply = async () => {
    console.log("comment.id, content:", comment?.id, content);
    if (!content) return;
    if (comment?.id) {
      await replyComment(comment.id, content, parentReplyId);
      setContent("");
    }
  };

  const handleToggleReply = () => {
    setReply(!reply);
  };

  const isLiked = comment?.likes?.find(
    (item) => item.employeeId === currentUser?.employee.id
  );

  return (
    <div className="flex items-start gap-2">
      <Avtr
        url={comment?.author.profileImage ?? ""}
        name={comment?.author.firstName ?? ""}
        avtBg="#94A3B8"
        className="text-sm font-semibold text-slate-500"
      />
      <div className="w-full flex items-center">
        <div className="flex flex-col items-center w-[90%] gap-1">
          <div className="w-full pb-[12px] space-y-1">
            <p className="text-sm text-[#1E293B] font-semibold text-wrap w-full line-clamp-3 truncate">
              {
                comment?.author.firstName
                // + comment?.author.lastName
              }
              <span className="text-[#706D8A] font-[400] text-sm">
                {comment?.content}
              </span>
            </p>

            <div className="flex w-full items-center font-semibold text-[12px] space-x-2 text-[#8A8A8C]">
              <p>{formatDateToDaysAgo(String(comment?.createdAt))}</p>
              <p>
                {comment?.likes?.length ?? 0}{" "}
                {comment?.likes && comment?.likes.length == 1
                  ? "like"
                  : "likes"}
              </p>
              <p
                className="text-rgtpurple cursor-pointer"
                onClick={handleToggleReply}
              >
                Reply
              </p>
              <div className="" onClick={() => toggleCommentLike(comment?.id)}>
                <LikeIcon
                  size={15}
                  stroke={`${isLiked ? "" : "#6418C3"}`}
                  className={`cursor-pointer ${
                    isLiked ? "fill-[#6418C3]" : ""
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
                    onClick={handleCommentReply}
                  >
                    {comment?.isCommentLoading ? (
                      <Loader className="animate-spin w-4 h-4" />
                    ) : (
                      "Post"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* <div className="flex flex-col w-full">
            {comment && comment.length > 0 && (
              <div
                className="flex items-center gap-2 text-[#8A8A8C] font-semibold text-[12px]"
                onClick={() => setViewReplies(!viewReplies)}
              >
                <div className="w-[31px] border-t-[#8A8A8C] border-1" />
                <p>View replies ({comment?.length})</p>
              </div>
            )}
            <div>
              {viewReplies && (
                <section>
                  {comment?.map((item, index) => (
                    <p key={index}>{item.commentId}</p>
                  ))}
                </section>
              )}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RecursiveComments;
