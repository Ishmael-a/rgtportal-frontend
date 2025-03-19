import React from "react";
import { MoreHorizontalIcon } from "lucide-react";
import Comments from "../Feed/Comments";
import FeedActions from "../feedActions";
import NoComments from "@/assets/icons/NoComments";
import CommentBlck from "../CommentBlck";
import { useAuthContextProvider } from "@/hooks/useAuthContextProvider";

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  comments: IComment[];
  postId: number;
  userPrevLiked: boolean | undefined;
  onComments: (val: boolean) => void;
  image?: string[] | undefined;
}

const CommentsModal: React.FC<CommentsModalProps> = ({
  isOpen,
  onClose,
  comments,
  postId,
  userPrevLiked,
  onComments,
  image,
}) => {
  const { currentUser } = useAuthContextProvider();
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex justify-center items-center py-15"
      style={{ zIndex: "100" }}
    >
      <div className="bg-white rounded-[30px] p-4 relative flex justify-center gap-3 h-[75%] w-[90%] md:w-[80%] lg:w-[1027px]">
        <div className="max-w-[300px] md:max-w-[500px] flex">
          {image?.map((item, index) => (
            <img
              key={index}
              src={item}
              className="hidden sm:block w-full h-full object-cover rounded-[30px]"
            />
          ))}
        </div>
        <div className="h-full w-  flex-1 space-y-1">
          <div className="flex w-full justify-end">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <MoreHorizontalIcon className="" />
            </button>
          </div>

          <div className="flex flex-col justify-between">
            <div
              className="space-y-4  py-2 border-b h-[250px] overflow-y-scroll"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <Comments key={index} {...comment} />
                ))
              ) : (
                <div className="flex items-center justify-center h-full">
                  <NoComments />
                </div>
              )}
            </div>

            <section className="">
              <FeedActions
                postId={postId}
                userPrevLiked={userPrevLiked}
                onComments={onComments}
              />
              <div className="">
                <p className="text-sm font-medium">Liked by</p>
                <CommentBlck postId={postId} user={currentUser} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
