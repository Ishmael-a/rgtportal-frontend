// import { useState } from "react";
// import TextareaAutosize from "react-textarea-autosize";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { avtrDets } from "@/constants";
// import { Vote } from "lucide-react";

// const CreatePost = () => {
//   const [message, setMessage] = useState("");

//   return (
//     <main className="flex-col flex space-y-3">
//       <div className="relative flex items-center">
//         <Avatar>
//           <AvatarImage src={avtrDets[0].avtr?.url} alt="Avatar" />
//           <AvatarFallback>{avtrDets[0].avtr?.fallBack}</AvatarFallback>
//         </Avatar>
//         <TextareaAutosize
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder=" "
//           maxRows={4}
//           style={{
//             width: "100%",
//             padding: "10px",
//             border: "1px solid #ccc",
//             color: "",
//             backgroundColor: "transparent",
//             borderColor: "transparent",
//           }}
//           className="outline-none resize-none"
//         />

//         {/* Custom Placeholder */}
//         {!message && (
//           <div className="absolute inset-0 flex items-center  pointer-events-none pl-12  text-gray-600">
//             <p className="text-[#939393] font-semibold">Write something ...</p>
//             <img src="/Edit.svg" alt="Edit" className="ml-2 " />
//           </div>
//         )}
//       </div>

//       <div className="flex">
//         {/* Creating actions */}
//         <div className="bg-rgtpink w-11/12 p-4 rounded-bl-2xl flex items-center justify-evenly text-white font-medium">
//           <div className="flex space-x-1 cursor-pointer transition-colors duration-300 ease-in  hover:bg-[#d55991] p-2 rounded-lg">
//             <img src="/Image.svg" />
//             <p>Photo</p>
//           </div>
//           <div className="flex space-x-1 cursor-pointer transition-colors duration-300 ease-in  hover:bg-[#d55991] p-2 rounded-lg">
//             <img src="/Video.svg" />
//             <p>Video</p>
//           </div>
//           <div className="flex space-x-1 cursor-pointer transition-colors duration-300 ease-in  hover:bg-[#d55991] p-2 rounded-lg">
//             <Vote />
//             <p>Poll</p>
//           </div>
//         </div>
//         <div
//           className="flex-1 flex bg-purpleaccent2 rounded-br-2xl p-4 hover:bg-[#dfd2f8] transition-colors duration-300 ease-in cursor-pointer items-center justify-center
//         "
//         >
//           <img src="/Post.svg" />
//         </div>
//       </div>
//     </main>
//   );
// };

// export default CreatePost;

import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { avtrDets } from "@/constants";
import { Vote, X } from "lucide-react";

const CreatePost = () => {
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [previewItem, setPreviewItem] = useState<{
    type: "image" | "video";
    url: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Allowed file types and sizes
  const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
  const allowedVideoTypes = ["video/mp4", "video/quicktime"];
  const maxImageSize = 5 * 1024 * 1024; // 5MB
  const maxVideoSize = 100 * 1024 * 1024; // 100MB

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles: File[] = [];

      for (const file of files) {
        if (!allowedImageTypes.includes(file.type)) {
          setError("Invalid image format. Please upload a JPEG, PNG, or GIF.");
          return;
        }
        if (file.size > maxImageSize) {
          setError("Image is too large. Maximum size is 5MB.");
          return;
        }
        validFiles.push(file);
      }

      setImages((prev) => [...prev, ...validFiles]);
      setError(null); // Clear any previous errors
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles: File[] = [];

      for (const file of files) {
        if (!allowedVideoTypes.includes(file.type)) {
          setError("Invalid video format. Please upload an MP4 or MOV.");
          return;
        }
        if (file.size > maxVideoSize) {
          setError("Video is too large. Maximum size is 100MB.");
          return;
        }
        validFiles.push(file);
      }

      setVideos((prev) => [...prev, ...validFiles]);
      setError(null); // Clear any previous errors
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const openPreview = (type: "image" | "video", url: string) => {
    setPreviewItem({ type, url });
  };

  const closePreview = () => {
    setPreviewItem(null);
  };

  return (
    <main className="flex-col flex space-y-3">
      <div className="relative flex items-start">
        <Avatar>
          <AvatarImage src={avtrDets[0].avtr?.url} alt="Avatar" />
          <AvatarFallback>{avtrDets[0].avtr?.fallBack}</AvatarFallback>
        </Avatar>
        <TextareaAutosize
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder=" "
          maxRows={4}
          style={{
            width: "100%",
            padding: "10px",
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

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-sm p-2 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Display selected images */}
        <div className="flex flex-wrap gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`Selected Image ${index}`}
                className="w-18 h-18 object-cover rounded-lg cursor-pointer transition-all duration-300 ease-in hover:brightness-75"
                onClick={() => openPreview("image", URL.createObjectURL(image))}
              />
              <X
                size={18}
                onClick={() => removeImage(index)}
                className="absolute top-0 cursor-pointer left-0 p-1 bg-white border text-black rounded-full"
              />
            </div>
          ))}
        </div>

        {/* Display selected videos */}
        <div className="flex flex-wrap gap-2">
          {videos.map((video, index) => (
            <div key={index} className="relative">
              <video
                src={URL.createObjectURL(video)}
                className="w-18 h-18 object-cover rounded-lg cursor-pointer transition-all duration-300 ease-in hover:brightness-75"
                onClick={() => openPreview("video", URL.createObjectURL(video))}
              />
              <X
                size={18}
                onClick={() => removeVideo(index)}
                className="absolute top-0 cursor-pointer left-0 p-1 bg-white border text-black rounded-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {previewItem && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center cursor-pointer"
          style={{ zIndex: "160" }}
          onClick={closePreview}
        >
          <div className="bg-white p-4 rounded-lg max-w-4xl max-h-full overflow-auto">
            {previewItem.type === "image" ? (
              <img
                src={previewItem.url}
                alt="Preview"
                className="sm:max-w-md sm:max-h-md"
              />
            ) : (
              <video
                src={previewItem.url}
                controls
                className="sm:max-w-md sm:max-h-md"
              />
            )}
          </div>
        </div>
      )}

      <div className="flex">
        {/* Creating actions */}
        <div className="bg-rgtpink w-11/12 p-4 rounded-bl-2xl flex items-center justify-evenly text-white font-medium">
          <div className="flex space-x-1 cursor-pointer transition-colors duration-300 ease-in  hover:bg-[#d55991] p-2 rounded-lg">
            <label htmlFor="image-upload" className="cursor-pointer flex gap-2">
              <img src="/Image.svg" />
              <p>Photo</p>
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              multiple
              style={{ display: "none" }}
            />
          </div>
          <div className="flex space-x-1 cursor-pointer transition-colors duration-300 ease-in  hover:bg-[#d55991] p-2 rounded-lg">
            <label htmlFor="video-upload" className="cursor-pointer flex gap-2">
              <img src="/Video.svg" />
              <p>Video</p>
            </label>
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              multiple
              style={{ display: "none" }}
            />
          </div>
          <div className="flex space-x-1 cursor-pointer transition-colors duration-300 ease-in  hover:bg-[#d55991] p-2 rounded-lg">
            <Vote />
            <p>Poll</p>
          </div>
        </div>
        <div className="flex-1 flex bg-purpleaccent2 rounded-br-2xl p-4 hover:bg-[#dfd2f8] transition-colors duration-300 ease-in cursor-pointer items-center justify-center">
          <img src="/Post.svg" />
        </div>
      </div>
    </main>
  );
};

export default CreatePost;