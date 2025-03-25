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
  const { replyToReply, toggleReplyLike, isReplyReplyLoading, replyReplies } =
    useInteraction();

  const [reply, setReply] = useState(false);
  const [content, setContent] = useState("");
  const [viewReplies, setViewReplies] = useState(false);

  console.log("comment.id, content:", comment?.id, content, parentReplyId);
  const handleReplyToReply = async () => {
    if (!content || !comment?.id) return;
    await replyToReply(comment.id, content, parentReplyId);
    setContent("");
    setReply(false);
  };

  console.log("replyReplies:", replyReplies);

  // const handleToggleReply = () => {
  //   setReply(!reply);
  // };

  const isLiked = comment?.likes?.find(
    (item) => item.employeeId === currentUser?.employee.id
  );

  // console.log("Reply reply of comment:", commentsReplies);

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
              <p className="text-nowrap">
                {formatDateToDaysAgo(String(comment?.createdAt))}
              </p>
              <p className="text-nowrap">
                {comment?.likes?.length ?? 0}{" "}
                {comment?.likes && comment?.likes.length == 1
                  ? "like"
                  : "likes"}
              </p>
              <p
                className="text-rgtpurple cursor-pointer"
                onClick={() => setReply(!reply)}
              >
                Reply
              </p>
              <div className="" onClick={() => toggleReplyLike(comment?.id)}>
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
              <div className="flex sm:flex-row flex-col items-center gap-4 pt-2 w-64">
                <input
                  className="w-full border-b-1 shadow-none outline-0 text-sm font-medium text-slate-500"
                  placeholder="Wanna say something?"
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                />
                <div className="flex justify-end">
                  <button
                    className="text-sm font-semibold text-rgtpink cursor-pointer"
                    onClick={handleReplyToReply}
                  >
                    {isReplyReplyLoading ? (
                      <Loader className="animate-spin w-4 h-4" />
                    ) : (
                      "Post"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
          {replyReplies && replyReplies.length > 0 && (
            <div className="flex flex-col w-full">
              <div
                className="flex items-center gap-2 text-[#8A8A8C] font-semibold text-[12px] cursor-pointer"
                onClick={() => setViewReplies(!viewReplies)}
              >
                <div className="w-[31px] border-t-[#8A8A8C] border-1" />
                <p>View replies ({replyReplies.length})</p>
              </div>

              {viewReplies && (
                <>
                  {replyReplies.map((reply, index) => (
                    <div key={index} className="pt-3">
                      <RecursiveComments
                        comment={reply}
                        parentReplyId={comment?.id}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecursiveComments;
