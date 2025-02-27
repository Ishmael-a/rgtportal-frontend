import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { avtrDets } from "@/constants";
import { Vote } from "lucide-react";

const CreatePost = () => {
  const [message, setMessage] = useState("");

  return (
    <main className="flex-col flex space-y-3">
      <div className="relative flex items-center">
        <Avatar>
          <AvatarImage src={avtrDets[0].avatarUrl} alt="Avatar" />
          <AvatarFallback>{avtrDets[0].fallBack}</AvatarFallback>
        </Avatar>
        <TextareaAutosize
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder=" "
          maxRows={4} // Limit to 5 rows
          style={{
            width: "100%",
            padding: "10px",
            // borderRadius: "20px",
            border: "1px solid #ccc",
            color: "",
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
          className="outline-none resize-none"
        />

        {/* Custom Placeholder */}
        {!message && (
          <div className="absolute inset-0 flex items-center  pointer-events-none pl-12  text-gray-600">
            <p className="text-[#939393] font-semibold">Write something ...</p>
            <img src="/Edit.svg" alt="Edit" className="ml-2 " />
          </div>
        )}
      </div>

      <div className="flex">
        {/* Creating actions */}
        <div className="bg-rgtpink w-11/12 p-4 rounded-bl-2xl flex items-center justify-evenly text-white font-medium">
          <div className="flex space-x-1 cursor-pointer transition-colors duration-300 ease-in  hover:bg-[#d55991] p-2 rounded-lg">
            <img src="/Image.svg" />
            <p>Photo</p>
          </div>
          <div className="flex space-x-1 cursor-pointer transition-colors duration-300 ease-in  hover:bg-[#d55991] p-2 rounded-lg">
            <img src="/Video.svg" />
            <p>Video</p>
          </div>
          <div className="flex space-x-1 cursor-pointer transition-colors duration-300 ease-in  hover:bg-[#d55991] p-2 rounded-lg">
            <Vote />
            <p>Poll</p>
          </div>

          <div className="flex space-x-1 cursor-pointer transition-colors duration-300 ease-in  hover:bg-[#d55991] p-2 rounded-lg">
            <img src="/Article.svg" />
            <p>Article</p>
          </div>

          {/* Posting */}
        </div>
        <div
          className="flex-1 flex bg-purpleaccent2 rounded-br-2xl p-4 hover:bg-[#dfd2f8] transition-colors duration-300 ease-in cursor-pointer items-center justify-center
        "
        >
          <img src="/Post.svg" />
        </div>
      </div>
    </main>
  );
};

export default CreatePost;
