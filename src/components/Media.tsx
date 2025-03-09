import { IMedia } from "@/types/employee";
import React from "react";

const Media: React.FC<IMedia> = ({ url, alt = "Media" }) => {
  const [mediaError, setMediaError] = React.useState(false);

  const isVideo =
    url.endsWith(".mp4") || url.endsWith(".mov") || url.includes("video");

  return (
    <section className="flex justify-center object-contain aspect-video">
      {url && !mediaError ? (
        isVideo ? (
          <video
            controls
            className="w-full h-auto rounded-md"
            onError={() => setMediaError(true)}
          >
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={url}
            alt={alt}
            onError={() => setMediaError(true)}
            className="w-full h-auto rounded-2xl object-cover"
          />
        )
      ) : (
        <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Media not available</span>
        </div>
      )}
    </section>
  );
};

export default Media;
