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
}

const CommentsModal: React.FC<CommentsModalProps> = ({
  isOpen,
  onClose,
  comments,
  postId,
  userPrevLiked,
  onComments,
}) => {
  const { currentUser } = useAuthContextProvider();

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center py-15"
      style={{ zIndex: "100" }}
    >
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative ">
        <div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <MoreHorizontalIcon className="size-6" />
          </button>
        </div>

        <div className="space-y-4  py-2 border-b">
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

        <section>
          <FeedActions
            postId={postId}
            userPrevLiked={userPrevLiked}
            onComments={onComments}
          />
          <div>
            <p>Liked by {``}</p>
            <CommentBlck postId={postId} user={currentUser} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CommentsModal;
