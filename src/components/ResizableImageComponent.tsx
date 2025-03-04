import { useState, useEffect, useRef } from "react";

const ResizableImageComponent = ({ node, updateAttributes }) => {
  const [width, setWidth] = useState(node.attrs.width || "100%");
  const [height, setHeight] = useState(node.attrs.height || "auto");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    updateAttributes({ width, height });
  }, [width, height, updateAttributes]);

  const handleResize = (e) => {
    const newWidth = e.target.offsetWidth;
    const newHeight = e.target.offsetHeight;
    setWidth(`${newWidth}px`);
    setHeight(`${newHeight}px`);
  };

  return (
    <div style={{ display: "inline-block", position: "relative" }}>
      <img
        ref={imgRef}
        src={node.attrs.src}
        alt={node.attrs.alt}
        style={{ width, height, resize: "both", overflow: "auto" }}
        onLoad={handleResize}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "10px",
          height: "10px",
          background: "blue",
          cursor: "se-resize",
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          const startX = e.clientX;
          const startY = e.clientY;
          const startWidth = imgRef.current?.offsetWidth || 0;
          const startHeight = imgRef.current?.offsetHeight || 0;

          const onMouseMove = (e) => {
            const newWidth = startWidth + (e.clientX - startX);
            const newHeight = startHeight + (e.clientY - startY);
            setWidth(`${newWidth}px`);
            setHeight(`${newHeight}px`);
          };

          const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
          };

          window.addEventListener("mousemove", onMouseMove);
          window.addEventListener("mouseup", onMouseUp);
        }}
      />
    </div>
  );
};

export default ResizableImageComponent;
