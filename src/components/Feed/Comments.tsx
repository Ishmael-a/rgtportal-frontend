import { Avatar, AvatarImage } from "../ui/avatar";

const Comments = (comment: IComment) => {
  return (
    <>
      <Avatar>
        <AvatarImage
          src={comment.author.profileImage}
          alt={comment.author.firstName}
        />
      </Avatar>
      <div className="w-full">
        <div>
          <div className="flex justify-between items-center w-full">
            {/* <p className="text-sm font-semibold">You</p> */}
            <p className="text-sm font-semibold max-w-[200px] truncate">
              {comment.author.firstName + comment.author.lastName}
            </p>
            <span className="text-sm text-slate-500">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>
          <p> {comment.content}</p>
        </div>
        {/* <div className="flex space-x-2 items-center">
                <p>like</p>
                <p>unlike</p>
                <p className="text-sm text-rgtpink">Reply</p>
              </div>
              <div>
                <p>replies</p>
              </div> */}
      </div>
    </>
  );
};

export default Comments;
