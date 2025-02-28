import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const sideModalVariants = cva(
  "fixed z-50 bg-white shadow-lg overflow-auto transition-transform duration-300 ease-in-out",
  {
    variants: {
      position: {
        right: "top-0 right-0 bottom-0 h-full border-l",
        left: "top-0 left-0 bottom-0 h-full border-r",
        top: "top-0 left-0 right-0 w-full border-b",
        bottom: "bottom-0 left-0 right-0 w-full border-t",
      },
      size: {
        sm: "max-w-md",
        md: "max-w-xl",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-full",
      },
    },
    defaultVariants: {
      position: "right",
      size: "md",
    },
  }
);

export interface SideModalProps extends VariantProps<typeof sideModalVariants> {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  showCloseButton?: boolean;
  closeOnClickOutside?: boolean;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  footerContent?: ReactNode;
  showOverlay?: boolean;
  overlayClassName?: string;
}

export const SideModal = ({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
  position = "right",
  size = "md",
  showCloseButton = true,
  closeOnClickOutside = true,
  className = "",
  contentClassName = "",
  headerClassName = "",
  footerClassName = "",
  footerContent,
  showOverlay = true,
  overlayClassName = "",
}: SideModalProps) => {
  const getTransformStyle = () => {
    switch (position) {
      case "right":
        return { transform: isOpen ? "translateX(0)" : "translateX(100%)" };
      case "left":
        return { transform: isOpen ? "translateX(0)" : "translateX(-100%)" };
      case "top":
        return { transform: isOpen ? "translateY(0)" : "translateY(-100%)" };
      case "bottom":
        return { transform: isOpen ? "translateY(0)" : "translateY(100%)" };
      default:
        return { transform: isOpen ? "translateX(0)" : "translateX(100%)" };
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {showOverlay && (
          <Dialog.Overlay
            className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ease-in-out ${overlayClassName} ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => closeOnClickOutside && onOpenChange(false)}
          />
        )}

        <Dialog.Content
          className={`${sideModalVariants({ position, size })} ${className}`}
          style={getTransformStyle()}
          onEscapeKeyDown={() => onOpenChange(false)}
          onInteractOutside={(e) => closeOnClickOutside && onOpenChange(false)}
        >
          {(title || showCloseButton) && (
            <div
              className={`flex justify-between items-center p-4 border-b ${headerClassName}`}
            >
              <div>
                {title && (
                  <Dialog.Title className="text-lg font-semibold text-gray-900">
                    {title}
                  </Dialog.Title>
                )}
                {description && (
                  <Dialog.Description className="text-sm text-gray-500">
                    {description}
                  </Dialog.Description>
                )}
              </div>

              {showCloseButton && (
                <Dialog.Close asChild>
                  <button className="rounded-full p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </Dialog.Close>
              )}
            </div>
          )}

          <div className={`p-4 ${contentClassName}`}>{children}</div>

          {footerContent && (
            <div className={`p-4 border-t ${footerClassName}`}>
              {footerContent}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
