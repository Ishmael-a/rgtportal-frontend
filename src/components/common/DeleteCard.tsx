import { X } from "lucide-react";
import { Button } from "../ui/button";

interface IDeleteCard {
  onDelete: () => void;
  onCancel?: () => void;
}

const DeleteCard: React.FC<IDeleteCard> = ({ onCancel, onDelete }) => {
  return (
    <section
      className="fixed inset-0  backdrop-blur-xs  flex items-center justify-center w-full"
      style={{ zIndex: 100 }}
    >
      <div className="bg-white p-4 rounded-md h-[292px] max-w-[343px] border shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <img src="/DelCon.svg" alt="delete" />
          <X
            className="text-gray-500 cursor-pointer p-2 rounded-full transition-all duration-300 ease-in hover:bg-gray-100"
            onClick={onCancel}
            size={35}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#181D27] font-semibold">Delete blog post</p>
          <p className="text-sm text-[#535862] font-medium">
            Are you sure you want to delete this post? This action cannot be
            undone.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            className="text-white bg-[#D92D20] font-semibold text-lg hover:bg-red-600"
            onClick={onDelete}
          >
            Delete
          </Button>
          <Button
            className="bg-white text-[#414651] font-semibold text-lg border-1 border-[#D5D7DA]  hover:bg-gray-200"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DeleteCard;
