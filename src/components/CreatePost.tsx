import { useMemo, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { avtrDets } from "@/constants";
import { Plus, Vote, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FileUploadServices } from "@/api/services/fileUpload.services";
import { PollService } from "@/api/services/poll.service";
import { PostService } from "@/api/services/posts.service";

const CreatePost = () => {
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [previewItem, setPreviewItem] = useState<{
    type: "image" | "video";
    url: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [poll, setPoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>([]);

  const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
  const allowedVideoTypes = ["video/mp4", "video/quicktime"];
  const maxImageSize = 5 * 1024 * 1024; // 5MB
  const maxVideoSize = 100 * 1024 * 1024; // 100MB

  const imageUrls = useMemo(
    () => images.map((image) => URL.createObjectURL(image)),
    [images]
  );
  const videoUrls = useMemo(
    () => videos.map((video) => URL.createObjectURL(video)),
    [videos]
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoll(false);
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
      setError(null);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoll(false);
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
      setError(null);
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

  const addPollOption = () => {
    setPollOptions((prev) => [...prev, ""]);
  };

  const handlePollOptionChange = (index: number, value: string) => {
    setPollOptions((prev) => {
      const newOptions = [...prev];
      newOptions[index] = value;
      return newOptions;
    });
  };

  const submitPost = async () => {
    try {
      const formData = new FormData();

      // Add text message
      if (message) {
        formData.append("content", message);
      }

      // Create instances of the services
      const fileUploadService = new FileUploadServices();
      const pollService = new PollService();
      const postService = new PostService();

      // Upload images and add their URLs to the formData
      for (const image of images) {
        const uploadResponse = await fileUploadService.uploadFile(image);
        formData.append("images", uploadResponse.data.url);
      }

      // Upload videos and add their URLs to the formData
      for (const video of videos) {
        const uploadResponse = await fileUploadService.uploadFile(video);
        formData.append("videos", uploadResponse.data.url);
      }

      // Add poll data
      if (poll) {
        const pollResponse = await pollService.createPoll({
          description: pollQuestion,
          options: pollOptions,
        });
        formData.append("pollId", pollResponse.data.id);
      }

      formData.append("title", "new title");

      console.log("form:", formData);
      // Submit the post
      const postResponse = await postService.createPost(formData);

      console.log("Post submitted successfully:", postResponse);

      // Reset form after successful submission
      setMessage("");
      setImages([]);
      setVideos([]);
      setPoll(false);
      setPollQuestion("");
      setPollOptions([]);
      setError(null);

      alert("Post submitted successfully!");
    } catch (error) {
      console.error("Error submitting post:", error);
      setError("Failed to submit post. Please try again.");
    }
  };

  // const submitPost = async () => {
  //   try {
  //     const formData = new FormData();

  //     // Add text message
  //     if (message) {
  //       formData.append("content", message);
  //     }

  //     // Add images
  //     images.forEach((image) => {
  //       formData.append(`images`, image);
  //     });

  //     // Add videos
  //     videos.forEach((video) => {
  //       formData.append(`videos`, video);
  //     });

  //     // Add poll data
  //     if (poll) {
  //       formData.append("pollQuestion", pollQuestion);
  //       pollOptions.forEach((option, index) => {
  //         formData.append(`pollOptions[${index}]`, option);
  //       });
  //     }

  //     // Send data to the backend
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/posts/posts`,
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to submit post");
  //     }

  //     const result = await response.json();
  //     console.log("Post submitted successfully:", result);

  //     console.log("form submit:", formData);

  //     // Reset form after successful submission
  //     setMessage("");
  //     setImages([]);
  //     setVideos([]);
  //     setPoll(false);
  //     setPollQuestion("");
  //     setPollOptions([]);
  //     setError(null);

  //     alert("Post submitted successfully!");
  //   } catch (error) {
  //     console.error("Error submitting post:", error);
  //     setError("Failed to submit post. Please try again.");
  //   }
  // };

  return (
    <main className="flex-col flex space-y-1">
      <div className="relative flex items-start gap-1">
        <Avatar>
          <AvatarImage src={avtrDets[0].avtr?.url} alt="Avatar" />
          <AvatarFallback>{avtrDets[0].avtr?.fallBack}</AvatarFallback>
        </Avatar>
        {!poll ? (
          <>
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
                <p className="text-[#939393] font-semibold">
                  Write something ...
                </p>
                <img src="/Edit.svg" alt="Edit" className="ml-2 " />
              </div>
            )}
          </>
        ) : (
          <div className="w-full space-y-2">
            <div>
              <label className="font-semibold text-sm">Question</label>
              <Input
                placeholder="Write poll question..."
                className="border shadow-none w-full h-12 "
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
              />
            </div>
            <>
              <p className="font-semibold text-sm">Options</p>
              {pollOptions.map((option, index) => (
                <Input
                  key={index}
                  placeholder={`Option ${index + 1}`}
                  className="border shadow-none w-full"
                  value={option}
                  onChange={(e) =>
                    handlePollOptionChange(index, e.target.value)
                  }
                />
              ))}
            </>

            <Button
              variant={"ghost"}
              className="text-rgtpurple font-semibold cursor-pointer"
              onClick={addPollOption}
            >
              <Plus /> Add Option
            </Button>
          </div>
        )}
      </div>

      {!poll ? (
        <>
          {error && (
            <div className="text-red-500 text-sm p-2 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex items-center gap-2">
            {/* Display selected images */}
            <div className="flex flex-wrap gap-2">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Selected Image ${index}`}
                    className="w-18 h-18 object-cover rounded-lg cursor-pointer transition-all duration-300 ease-in hover:brightness-75"
                    onClick={() => openPreview("image", url)}
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
              {videoUrls.map((url, index) => (
                <div key={index} className="relative">
                  <video
                    src={url}
                    className="w-18 h-18 object-cover rounded-lg cursor-pointer transition-all duration-300 ease-in hover:brightness-75"
                    onClick={() => openPreview("video", url)}
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
                    className="sm:max-w-md sm:max-h-md aspect-video"
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
        </>
      ) : null}

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
          <div
            className="flex space-x-1 cursor-pointer transition-colors duration-300 ease-in  hover:bg-[#d55991] p-2 rounded-lg"
            onClick={() => setPoll(true)}
          >
            <Vote />
            <p>Poll</p>
          </div>
        </div>
        <div
          className="flex-1 flex bg-purpleaccent2 rounded-br-2xl p-4 hover:bg-[#dfd2f8] transition-colors duration-300 ease-in cursor-pointer items-center justify-center"
          onClick={submitPost}
        >
          <img src="/Post.svg" />
        </div>
      </div>
    </main>
  );
};

export default CreatePost;
