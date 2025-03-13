import { X } from "lucide-react";
import React from "react";

const Media: React.FC<{ url: string; alt?: string }> = ({
  url,
  alt = "Media",
}) => {
  const [mediaError, setMediaError] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const isVideo =
    url.endsWith(".mp4") || url.endsWith(".mov") || url.includes("video");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section className="flex justify-center object-contain aspect-video">
        {url && !mediaError ? (
          isVideo ? (
            <video
              controls
              className="w-full h-auto rounded-md cursor-pointer hover:brightness-75 transition-all duration-300 ease-in"
              onError={() => setMediaError(true)}
              onClick={openModal}
            >
              <source src={url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={url}
              alt={alt}
              onError={() => setMediaError(true)}
              onClick={openModal}
              className="w-full h-auto rounded-2xl object-cover cursor-pointer hover:brightness-75 transition-all duration-300 ease-in"
            />
          )
        ) : (
          <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Media not available</span>
          </div>
        )}
      </section>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={closeModal}
        >
          <div className="relative flex justify-center max-w-[80vw] sm:max-w-[50vw] sm:max-h-[70vh]">
            {isVideo ? (
              <video
                controls
                className="w-full h-auto rounded-md"
                onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking video
              >
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={url}
                alt={alt}
                className="w-full h-auto rounded-md object-cover"
                onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking image
              />
            )}
            <button
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition-colors duration-300 ease-in"
              onClick={closeModal}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Media;
