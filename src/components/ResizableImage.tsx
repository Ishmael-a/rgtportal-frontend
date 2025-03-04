import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ResizableImageComponent from "./ResizableImageComponent";

const ResizableImage = Node.create({
  name: "resizableImage",
  group: "block",
  content: "inline*",
  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      width: {
        default: "100%",
      },
      height: {
        default: "auto",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img[src]",
        getAttrs: (dom) => {
          if (typeof dom === "string") return {};
          const img = dom as HTMLImageElement;
          return {
            src: img.getAttribute("src"),
            alt: img.getAttribute("alt"),
            width: img.getAttribute("width") || "100%",
            height: img.getAttribute("height") || "auto",
          };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return ["img", HTMLAttributes];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },
});

export default ResizableImage;
