import { IImage } from "@/types";
import React from "react";


const Image:React.FC<IImage> = ({
  url,
  alt = "Image",
}) => {
  const [imageError, setImageError] = React.useState(false);
  

  console.log(url);
  return (
    <section className="flex justify-center object-contain aspect-video">
      {url && !imageError ? (
        <img
          src={url}
          alt={alt}
          onError={() => setImageError(true)} 
          className="w-full h-auto rounded-md"
        />
      ) : (
        <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Image not available</span>
        </div>
      )}
    </section>
  );
};

export default Image;
