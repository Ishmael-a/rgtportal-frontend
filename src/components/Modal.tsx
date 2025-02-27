import { ClassNameValue } from "tailwind-merge";

interface ITimeOffModal {
  title: string;
  buttons?: { name: string; fn: () => void }[];
  className?: ClassNameValue;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const TimeOffModal: React.FC<ITimeOffModal> = ({
  title,
  buttons,
  children,
  className,
  onSubmit,
}) => {
  return (
    <div
      className="fixed inset-0  backdrop-blur-xs  flex items-start justify-end"
      style={{ zIndex: 100 }}
    >
      <div className="bg-white shadow-lg  max-w-md w-full p-6 h-screen">
        <h2 className="text-xl font-semibold mb-4 text-[#706D8A]">{title}</h2>

        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-start h-full"
        >
          {children}

          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            {buttons &&
              buttons.map((item, index) => (
                <button
                  key={index}
                  type={
                    item.name.toLowerCase() !== "cancel" ? "submit" : "button"
                  }
                  onClick={item.fn}
                  className={`px-6 py-4 w-1/2 ${
                    item.name.toLowerCase() === "cancel"
                      ? "text-red-600 border-red-500 hover:bg-gray-100"
                      : className ?? ""
                  }  font-medium border-2 rounded-md  cursor-pointer`}
                >
                  {item.name}
                </button>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimeOffModal;
